"use strict";
import React, { Component } from "react";
import { BELL_VALUES } from "../Constants.jsx";

class BellSetting extends Component {
  render () {
    var buttonGroup1 = BELL_VALUES.map((val, i) => {
      if (i > 3) { return; }
      var label = val === 0 ? "-" : val;
      return <button type="button" id={"bell-" + val} className={"btn-bell bell" + val} key={"btn-bell" + val}>{label}</button>
    });
    var buttonGroup2 = BELL_VALUES.map((val, i) => {
      if (i < 4) { return; }
      return <button type="button" id={"bell-" + val} className={"btn-bell bell" + val} key={"btn-bell" + val}>{val}</button>
    });
    return (
      <p>
        <span className="row">{buttonGroup1}</span>
        <span className="row">{buttonGroup2}</span>
      </p>
    );
  }

  setBellCount (count) {
    MetronomeActions.setBellCount(count);
  }
};

export default BellSetting;
