"use strict";

import Immutable from "immutable"
import { MapStore } from "flux/utils";
import MetronomeDispatcher from "./MetronomeDispatcher.jsx";

class MetronomeStore extends MapStore {
  getInitialState (): State {
    return Immutable.Map({
      playing: false,
      tempo: 100,
      range: 1,
      tradMode: false,
      bellCount: 0,
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
          time: Date.now()
        });
        break;
      case "tempoUp":
        var tradMode = state.get("tradMode");
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        return state.set("tempo", tempo + range);
        break;
      case "tempoDown":
        var tradMode = state.get("tradMode");
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        return state.set("tempo", tempo - range);
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
        return state.set("bellCount",  action.count);
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
