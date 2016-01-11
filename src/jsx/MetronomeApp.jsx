"use strict";

import React, { Component } from "react";
import { Container } from "flux/utils";

import TempoValue from "./components/TempoValue.jsx";
import TempoSetting from "./components/TempoSetting.jsx";
import BellSetting from "./components/BellSetting.jsx";
import BellIcons from "./components/BellIcons.jsx";
import StartButton from "./components/StartButton.jsx";

import MetronomeStore from "./MetronomeStore.jsx";

class MetronomeApp extends Component {
  static getStores (): Array {
    return [ MetronomeStore ];
  }
  static calculateState (prevState): State {
    var state = MetronomeStore.getState();
    return state;
  }

  render () {
    return (
      <div className="app">
        <TempoValue metronomeState={this.state} />
        <TempoSetting metronomeState={this.state} />
        <BellSetting metronomeState={this.state} />
        <BellIcons metronomeState={this.state} />
        <StartButton metronomeState={this.state} />
      </div>
    );
  }
};

const MetronomeAppContainer = Container.create(MetronomeApp);
export default MetronomeAppContainer;
