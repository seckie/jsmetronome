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
import ErrorHandler from "./ErrorHandler.jsx";
import Constants, { Messages } from "./Constants.jsx";

class MetronomeStore extends MapStore {
  getInitialState (): State {
    return Immutable.Map({
      clearTimer: true,
      playing: false,
      tempo: 100,
      viewTempo: 100,
      tempoError: false,
      markingIndex: Constants.DEFAULT_MARKING_INDEX,
      tradMode: false,
      bellCount: 4,
      beat: 1, // 1 <= beat <= bellCount
      time: Date.now(),
      interval: 0
    });
  }
  reduce (state: State, action: Object): State {
    var tempo = state.get("tempo");
    switch (action.type) {
      case "start":
        var interval = 60 / tempo * 1000;
        return state.merge({
          playing: true,
          time: Date.now(),
          interval: interval
        });
        break;
      case "stop":
        return state.merge({
          playing: false,
          time: Date.now()
        });
        break;
      case "tick":
        // TODO
        // Correct tempo interval (may cause by system performance)
        // through Date.now()
        var beat = getBeat(state);
        return state.merge({
          beat: beat,
          clearTimer: false,
          time: Date.now()
        });
        break;
      case "tempoUpdate":
        var result;
        var newTempo = +action.tempo;
        if (Constants.TEMPO_MIN <= newTempo &&
          newTempo <= Constants.TEMPO_MAX) {
          var interval = 60 / newTempo * 1000;
          result = {
            tempo: newTempo,
            viewTempo: newTempo,
            tempoError: false,
            clearTimer: true,
            interval: interval
          };
        } else {
          result = {
            tempoError: true,
            viewTempo: action.tempo,
            playing: false
          };
          ErrorHandler(Messages.TEMPO_VALUE_ERROR);
        }
        return state.merge(result);
        break;
      case "tempoUp":
        var tradMode = state.get("tradMode");
        var index = updateMarkingIndex(state.get("markingIndex") + 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo + 1;
        var interval = 60 / newTempo * 1000;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
          interval: interval,
          markingIndex: index
        };
        return state.merge(result);
        break;
      case "tempoDown":
        var tradMode = state.get("tradMode");
        var index = updateMarkingIndex(state.get("markingIndex") - 1);
        var newTempo = tradMode ? Constants.MARKINGS[index] : tempo - 1;
        var interval = 60 / newTempo * 1000;
        var result = {
          tempo: newTempo,
          viewTempo:  newTempo,
          tempoError: false,
          clearTimer: true,
          interval: interval,
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

const instance = new MetronomeStore(MetronomeDispatcher);
export default instance;
