"use strict";
import MetronomeDispatcher from "./MetronomeDispatcher.jsx";

const MetronomeActions = {
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
  changeTradMode (tradMode: Boolean) {
    MetronomeDispatcher.dispatch({
      type: "changeTradMode",
      tradMode: tradMode
    });
  },
  changeBellCount (count: Number) {
    MetronomeDispatcher.dispatch({
      type: "changeBellCount",
      count: count
    });
  }
};

export default MetronomeActions;
