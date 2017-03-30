"use strict";
import { dispatch }  from "./MetronomeDispatcher.jsx";

const MetronomeActions = {
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
  draw () {
    dispatch({
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
  }
};

export default MetronomeActions;
