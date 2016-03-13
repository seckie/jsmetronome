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
      range: 1,
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
          result = {
            tempo: newTempo,
            viewTempo: newTempo,
            tempoError: false,
            playing: false,
            time: Date.now()
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
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        var result = {
          tempo: tempo + range,
          viewTempo:  tempo + range,
          tempoError: false,
          playing: false,
          time: Date.now()
        };
        return state.merge(result);
        break;
      case "tempoDown":
        var tradMode = state.get("tradMode");
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        var result = {
          tempo: tempo - range,
          viewTempo:  tempo - range,
          tempoError: false,
          playing: false,
          time: Date.now()
        };
        return state.merge(result);
        break;
      case "setTradMode":
        var tradMode = action.tradMode;
        var range = tradMode ? getRange(tempo) : 1;
        return state.merge({
          tradMode: action.tradMode,
          range: range
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

function getRange(tempo) {
  var range = 1;
  switch (true) {
    case (tempo < 60):
      range = 2;
      break;
    case (60 < tempo && tempo <= 72):
      range = 3;
      break;
    case (72 < tempo && tempo <= 120):
      range = 4;
      break;
    case (120 < tempo && tempo <= 144):
      range = 6;
      break;
    case (144 < tempo):
      range = 8;
      break;
    default:
      range = 1;
  }
  return range;
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
