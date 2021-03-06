"use strict";
import React, { Component } from "react";
import MetronomeActions from "../MetronomeActions.jsx";

class TempoSetting extends Component {
  render () {
    var appState = this.props.appState;
    var modeButton = appState.tradMode === true ? (
      <button type="button" id="tempo-mode" className="btn-tempo mode mode-trad" onClick={this.setMode.bind(this)}>Trad</button>
    ) : (
      <button type="button" id="tempo-mode" className="btn-tempo mode mode-one" onClick={this.setMode.bind(this)}>+- 1</button>
    );
    return (
      <p className="group-tempo">
      <button type="button" id="tempo-down" className="btn-tempo down" onClick={this.decrement.bind(this)}>
        - {appState.range}
      </button>
      {modeButton}
      <button type="button" id="tempo-up" className="btn-tempo up" onClick={this.increment.bind(this)}>
        + {appState.range}
      </button>
      </p>
    );
  }

  setMode () {
    MetronomeActions.setTradMode(!this.props.appState.tradMode);
  }
  decrement () {
    MetronomeActions.tempoDown();
  }
  increment () {
    MetronomeActions.tempoUp();
  }
};

export default TempoSetting;
