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
var current16thNote = 1; // (1 <= n <= 16)
var nextNoteTime = 0; // (sec)
var audioContext = new AudioContext();
var markingIndex = Constants.DEFAULT_MARKING_INDEX;

class MetronomeStore extends MapStore {
  getInitialState (): State {
    return Immutable.Map({
      clearTimer: true,
      playing: false,
      viewTempo: Constants.DEFAULT_TEMPO,
      tempoError: false,

      audioContext: null,
      notesInQueue: Immutable.List(),

      // settings
      bellCount: 4,
      tempo: Constants.DEFAULT_TEMPO,
      tradMode: false,
      noteResolution: 1 // 1 == quater, 2 == 8th, 3 == 16th
    });
  }

  reduce (state: State, action: Object): State {

    const tempo = state.get("tempo");

    switch (action.type) {
      case "init":
        loadSound(audioContext, './sound/snare.mp3', function (buffer) {
          snareBuffer = buffer;
        });
        loadSound(audioContext, './sound/base.mp3', function (buffer) {
          baseBuffer = buffer;
        });

        return state.merge({ audioContext: audioContext });
        break;
      case "save":
        markingIndex = getMarkingIndexFromTempo(action.settings.tempo);
        return state.merge({
          bellCount: action.settings.bellCount,
          tempo: action.settings.tempo,
          tradMode: action.settings.tradMode,
          viewTempo: action.settings.tempo,
          noteResolution: action.settings.noteResolution
        });
        break;
      case "start":
        current16thNote = 1;
        nextNoteTime = getNextNoteTime(audioContext.currentTime, tempo);
        return state.merge({
          playing: true
        });
        break;
      case "stop":
        return state.merge({
          playing: false
        });
        break;
      case "tick":
        const bellCount = state.get("bellCount");
        const noteResolution = state.get("noteResolution");
        var queue = state.get("notesInQueue");
        while (nextNoteTime < audioContext.currentTime + Constants.SCHEDULE_AHEAD_TIME) {
          // Schedule note
            // Update queue
          queue = queue.push({
            time: audioContext.currentTime,
            note: current16thNote
          });
            // Play sound
          playSound(state);

          // Update setting of next note
          nextNoteTime = getNextNoteTime(nextNoteTime, tempo);

          current16thNote++;
          if (current16thNote > bellCount * 4) {
            current16thNote = 1;
          }
        }

        return state.merge({
          clearTimer: false,
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
        var index = updateMarkingIndex(markingIndex + 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo + 1;
        markingIndex = index;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
        };
        return state.merge(result);
        break;
      case "tempoDown":
        var tradMode = state.get("tradMode");
        var index = updateMarkingIndex(markingIndex - 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo - 1;
        markingIndex = index;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
        };
        return state.merge(result);
        break;
      case "setTradMode":
        var tradMode = action.tradMode;
        markingIndex = getMarkingIndexFromTempo(tempo);
        return state.merge({
          tradMode: action.tradMode,
        });
        break;
      case "setBellCount":
        return state.merge({
          bellCount: action.count,
          clearTimer: true
        });
        break;
      case "setNoteResolution":
        return state.merge({
          noteResolution: action.resolution,
          clearTimer: true
        });
        break;

      case "updateQueue":
        return state.merge({
          notesInQueue: action.queue
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
function playSound (state) {
  const noteResolution = state.get("noteResolution");
  if (noteResolution === 1 &&
      current16thNote % 4 !== 1) {
      return;
  }
  if (noteResolution === 2 &&
      current16thNote % 2 !== 1) {
      return;
  }
  // 4分音符の頭では snare
  const buffer = (current16thNote % 4 === 1)  ? snareBuffer : baseBuffer;
  const src = audioContext.createBufferSource();
  src.buffer = buffer;
  src.connect(audioContext.destination);
  src.start(nextNoteTime);
  src.stop(nextNoteTime + Constants.NOTE_LENGTH);
}
function getNextNoteTime (currentTime, tempo) {
  const secondsPerBeat = 60.0 / tempo;
  const secondsFor16thNote = 1 / 4 * secondsPerBeat;
  return currentTime + secondsFor16thNote;
}

const instance = new MetronomeStore(MetronomeDispatcher);
export default instance;
