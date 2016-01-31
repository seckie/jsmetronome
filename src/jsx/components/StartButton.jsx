"use strict";

import React, { Component } from "react";
import MetronomeActions from "../MetronomeActions.jsx";

class StartButton extends Component {
  render () {
    var label = this.props.appState.playing ? "Stop" : "Start";
    return (
      <p>
        <button type="button" id="toggle" className="btn-toggle" onClick={this.toggle.bind(this)}>{label}</button>
      </p>
    );
  }

  toggle (e) {
    var playing = this.props.appState.playing;
    var target = e.currentTarget;
    target.blur();
    if (this.props.appState.playing) {
      MetronomeActions.stop();
    } else {
      MetronomeActions.start();
    }
  }
};

export default StartButton;
