"use strict";

import Immutable from "immutable"
import { MapStore } from "flux/utils";
import MetronomeDispatcher from "./MetronomeDispatcher.jsx";


class MetronomeStore extends MapStore {
  getInitialState (): State {
    return Immutable.Map({
      playing: false,
      tempo: 100,
      tempoMode: "one",
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
        return state.set("tempo", state.tempo += action.tempo);
        break;
      case "tempoDown":
        return state.set("tempo", state.tempo -= action.tempo);
        break;
      case "changeTempoMode":
        return state.set("tempoMode",  action.tempoMode);
        break;
      case "changeBellCount":
        return state.set("bellCount",  action.bellCount);
        break;
      default:
        return state;
    }
  }
};

const instance = new MetronomeStore(MetronomeDispatcher);
export default instance;
