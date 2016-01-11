"use strict";
import React, { Component } from "react";

class TempoValue extends Component {
  render () {
    var appState = this.props.appState;
    return (
      <p><input type="text" value={appState.tempo} id="tempo" className="tempo" disabled={true} /></p>
    );
  }
};

TempoValue.defaultProps = {
  appState: {}
};

export default TempoValue;
