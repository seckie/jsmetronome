"use strict";
import React, { Component } from "react";
import classnames from "classnames";
import Constants from "../Constants.jsx";
import MetronomeActions from "../MetronomeActions.jsx";

class BellSetting extends Component {
  render () {
    var count = this.props.appState.bellCount;
    var buttonGroup1 = Constants.BELL_VALUES.map((val, i) => {
      if (i > 3) { return; }
      var label = val === 0 ? "-" : val;
      var cName = classnames("btn-bell", "btn-bell" + val, {
        "btn-bell-active": count === val
      });
      return <button type="button" id={"bell-" + val} className={cName} key={"btn-bell" + val} data-value={val} onClick={this.setBellCount.bind(this)}>{label}</button>
    });
    var buttonGroup2 = Constants.BELL_VALUES.map((val, i) => {
      if (i < 4) { return; }
      var cName = classnames("btn-bell", "btn-bell" + val, {
        "btn-bell-active": count === val
      });
      return <button type="button" id={"bell-" + val} className={cName} key={"btn-bell" + val} data-value={val} onClick={this.setBellCount.bind(this)}>{val}</button>
    });
    return (
      <p>
        <span className="row">{buttonGroup1}</span>
        <span className="row">{buttonGroup2}</span>
      </p>
    );
  }

  setBellCount (e) {
    var target = e.currentTarget;
    var count = +target.dataset.value;
    MetronomeActions.setBellCount(count);
  }
};

export default BellSetting;
