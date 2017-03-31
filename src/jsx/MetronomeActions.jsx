"use strict";
import { dispatch }  from "./MetronomeDispatcher.jsx";

const MetronomeActions = {
  init (audioContext) {
    dispatch({
      type: "init",
      audioContext: audioContext
    });
  },
  save (settings) {
    // send all state
    dispatch({
      type: "save",
      settings: settings
    });
  },
  start () {
    dispatch({
      type: "start"
    });
  },
  stop () {
    dispatch({
      type: "stop"
    });
  },
  tick () {
    dispatch({
      type: "tick"
    });
  },
  tempoUpdate (val) {
    dispatch({
      type: "tempoUpdate",
      tempo: val
    });
  },
  tempoUp () {
    dispatch({
      type: "tempoUp"
    });
  },
  tempoDown () {
    dispatch({
      type: "tempoDown"
    });
  },
  setTradMode (tradMode: Boolean) {
    dispatch({
      type: "setTradMode",
      tradMode: tradMode
    });
  },
  setBellCount (count: Number) {
    dispatch({
      type: "setBellCount",
      count: count
    });
  },
  updateQueue (queue) {
    dispatch({
      type: "updateQueue",
      queue: queue
    });
  }
};

export default MetronomeActions;
