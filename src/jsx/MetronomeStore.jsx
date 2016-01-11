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
      bellCount: 1
    });
  }
  reduce (state: State, action: Object): State {
    switch (action.type) {
      case "start":
        return state.set("playing", true);
        break;
      case "stop":
        return state.set("playing", false);
        break;
      case "tempoUp":
        var tempo = state.get("tempo");
        var tradMode = state.get("tradMode");
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        return state.set("tempo", tempo + range);
        break;
      case "tempoDown":
        var tempo = state.get("tempo");
        var tradMode = state.get("tradMode");
        // TODO
        // if in "tradMode"
        // round next value to nearest trad value
        var range = tradMode ? getRange(tempo) : 1;
        return state.set("tempo", tempo - range);
        break;
      case "changeTradMode":
        var tempo = state.get("tempo");
        var tradMode = action.tradMode;
        var range = tradMode ? getRange(tempo) : 1;
        return state.merge({
          tradMode: action.tradMode,
          range: range
        });
        break;
      case "changeBellCount":
        return state.set("bellCount",  action.bellCount);
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

const instance = new MetronomeStore(MetronomeDispatcher);
export default instance;
