"use strict";

import React, { Component } from "react";
import MetronomeActions from "../MetronomeActions.jsx";

class StartButton extends Component {
  render () {
    var playing = this.props.appState.playing;
    var button = playing ? (
      <button type="button" id="toggle" className="btn-toggle" onClick={this.stop.bind(this)}>Stop</button>
    ) : (
      <button type="button" id="toggle" className="btn-toggle" onClick={this.start.bind(this)}>Start</button>
    );
    return (
      <p>{button}</p>
    );
  }

  start () {
    MetronomeActions.start();
  }
  stop () {
    MetronomeActions.stop();
  }
};

export default StartButton;
