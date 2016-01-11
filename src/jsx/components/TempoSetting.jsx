"use strict";
import React, { Component } from "react";

class TempoSetting extends Component {
  render () {
    return (
      <p>
      <button type="button" id="tempo-up" className="btn-tempo up">+</button>
      <button type="button" id="tempo-mode" className="btn-tempo mode">+- 0</button>
      <button type="button" id="tempo-down" className="btn-tempo down">-</button>
      </p>
    );
  }
};

export default TempoSetting;
