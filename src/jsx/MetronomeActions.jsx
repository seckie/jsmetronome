"use strict";
import MetronomeDispathcer from "./MetronomeDispatcher.jsx";

const MetronomeActions = {
  start () {
    MetronomeDispatcher.dispatch({
      type: "start"
    });
  }
  stop () {
    MetronomeDispatcher.dispatch({
      type: "stop"
    });
  }
  tempoUp (tempo: Number) {
    MetronomeDispatcher.dispatch({
      type: "tempoUp",
      tempo: tempo
    });
  }
  tempoDown (tempo: Number) {
    MetronomeDispatcher.dispatch({
      type: "tempoDown",
      tempo: tempo
    });
  }
  changeTempoMode (mode: String) {
    MetronomeDispatcher.dispatch({
      type: "changeTempoMode",
      mode: mode
    });
  }
  changeBellCount (count: Number) {
    MetronomeDispatcher.dispatch({
      type: "changeBellCount",
      count: count
    });
  }
};


