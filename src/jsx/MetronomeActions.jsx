"use strict";
import MetronomeDispatcher from "./MetronomeDispatcher.jsx";

const MetronomeActions = {
  save (settings) {
    // send all state
    MetronomeDispatcher.dispatch({
      type: "save",
      settings: settings
    });
  },
  start () {
    MetronomeDispatcher.dispatch({
      type: "start"
    });
  },
  stop () {
    MetronomeDispatcher.dispatch({
      type: "stop"
    });
  },
  tick () {
    MetronomeDispatcher.dispatch({
      type: "tick"
    });
  },
  tempoUpdate (val) {
    MetronomeDispatcher.dispatch({
      type: "tempoUpdate",
      tempo: val
    });
  },
  tempoUp () {
    MetronomeDispatcher.dispatch({
      type: "tempoUp"
    });
  },
  tempoDown () {
    MetronomeDispatcher.dispatch({
      type: "tempoDown"
    });
  },
  setTradMode (tradMode: Boolean) {
    MetronomeDispatcher.dispatch({
      type: "setTradMode",
      tradMode: tradMode
    });
  },
  setBellCount (count: Number) {
    MetronomeDispatcher.dispatch({
      type: "setBellCount",
      count: count
    });
  }
};

export default MetronomeActions;
