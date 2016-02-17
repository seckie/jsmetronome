"use strict";
import React, { Component } from "react";
import Actions from "../MetronomeActions.jsx";
import classnames from "classnames";

class TempoValue extends Component {
  render () {
    var appState = this.props.appState;
    var cName = classnames({
      tempo: true,
      error: appState.tempoError
    });
    return (
      <p><input type="text" value={appState.viewTempo} id="tempo" className={cName} onChange={this.onChange.bind(this)} /></p>
    );
  }

  onChange (e) {
    var el = e.currentTarget;
    Actions.tempoUpdate(el.value);
    console.log("value:", el.value);
  }
};

TempoValue.defaultProps = {
  appState: {}
};

export default TempoValue;
