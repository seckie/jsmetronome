"use strict";
/**
 * - data validation
 * - error handling
 * - event handling
 * - store data
 */


import Immutable from "immutable"
import { MapStore } from "flux/utils";
import MetronomeDispatcher from "./MetronomeDispatcher.jsx";
import errorHandler from "./utils/errorHandler.jsx";
import Constants, { Messages } from "./Constants.jsx";
import loadSound from "./utils/loadSound.jsx";

var snareBuffer, baseBuffer;

class MetronomeStore extends MapStore {
  getInitialState (): State {
    return Immutable.Map({
      clearTimer: true,
      playing: false,
      viewTempo: 100,
      tempoError: false,
      markingIndex: Constants.DEFAULT_MARKING_INDEX,
      beat: 1, // 1 <= beat <= bellCount

      nextNoteTime: 0, // sec:integer
      current16thNote: 0, // :integer
      notesInQueue: [],

      // settings
      bellCount: 4,
      tempo: 100,
      tradMode: false
    });
  }

  reduce (state: State, action: Object): State {

    const tempo = state.get("tempo");

    switch (action.type) {
      case "init":
        loadSound(action.audioContext, './sound/snare.mp3', function (buffer) {
          snareBuffer = buffer;
        });
        loadSound(action.audioContext, './sound/base.mp3', function (buffer) {
          baseBuffer = buffer;
        });
        return state;
        break;
      case "save":
        var index = getMarkingIndexFromTempo(action.settings.tempo);
        return state.merge({
          bellCount: action.settings.bellCount,
          tempo: action.settings.tempo,
          tradMode: action.settings.tradMode,

          viewTempo: action.settings.tempo,
          markingIndex: index
        });
        break;
      case "start":
        return state.merge({
          playing: true,
          current16thNote: 0,
        });
        break;
      case "stop":
        return state.merge({
          playing: false
        });
        break;
      case "tick":
        const ctx = action.audioContext;
        const queue = state.get("notesInQueue");
        const bellCount = state.get("bellCount");
        var nextNoteTime = state.get("nextNoteTime");
        var current16thNote = state.get("current16thNote");
        while (nextNoteTime < ctx.currentTime + Constants.SCHEDULE_AHEAD_TIME) {
          // Schedule note
            // Update queue
          queue.push({
            time: ctx.currentTime,
            note: current16thNote
          });
            // Play sound
          playSound(ctx, current16thNote, nextNoteTime, bellCount);

          // Update setting of next note
          const secondsPerBeat = 60.0 / tempo;
          const secondsFor16thNote = 1 / 4 * secondsPerBeat;
          nextNoteTime += secondsFor16thNote;
          current16thNote++;
          if (current16thNote === bellCount * 4) {
            current16thNote = 0;
          }
        }

        const beat = getBeat(state);
        return state.merge({
          beat: beat,
          clearTimer: false,
          nextNoteTime: nextNoteTime,
          current16thNote: current16thNote,
          notesInQueue: queue
        });
        break;

      case "tempoUpdate":
        var result;
        var newTempo = +action.tempo;
        if (Constants.TEMPO_MIN <= newTempo &&
          newTempo <= Constants.TEMPO_MAX) {
          result = {
            tempo: newTempo,
            viewTempo: newTempo,
            tempoError: false,
            clearTimer: true,
          };
        } else {
          result = {
            tempoError: true,
            viewTempo: action.tempo,
            playing: false
          };
          errorHandler(Messages.TEMPO_VALUE_ERROR);
        }
        return state.merge(result);
        break;

      case "tempoUp":
        var tradMode = state.get("tradMode");
        var index = updateMarkingIndex(state.get("markingIndex") + 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo + 1;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
          markingIndex: index
        };
        return state.merge(result);
        break;
      case "tempoDown":
        var tradMode = state.get("tradMode");
        var index = updateMarkingIndex(state.get("markingIndex") - 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo - 1;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
          markingIndex: index
        };
        return state.merge(result);
        break;
      case "setTradMode":
        var tradMode = action.tradMode;
        var index = getMarkingIndexFromTempo(tempo);
        return state.merge({
          tradMode: action.tradMode,
          markingIndex: index
        });
        break;
      case "setBellCount":
        return state.merge({
          bellCount: action.count,
          clearTimer: true
        });
        break;
      default:
        return state;
    }
  }
};

function updateMarkingIndex(index) {
  var markings = Constants.MARKINGS;
  if (index >= markings.length) {
    index = markings.length - 1;
  } else if (index < 0) {
    index = 0;
  }
  return index;
}
function getMarkingIndexFromTempo(tempo) {
  return _.findIndex(Constants.MARKINGS, (marking) => {
    return tempo <= marking;
  });
}
function getBeat(state) {
  var beat = state.get("beat") + 1;
  if (beat > state.get("bellCount")) {
    beat = 1;
  }
  return beat;
}
function playSound (ctx, current16thNote, nextNoteTime) {
  // 4分音符の頭では snare
  const buffer = (current16thNote % 4 === 1)  ? snareBuffer : baseBuffer;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(ctx.destination);
  src.start(nextNoteTime);
  src.stop(nextNoteTime + Constants.NOTE_LENGTH);
}

const instance = new MetronomeStore(MetronomeDispatcher);
export default instance;
