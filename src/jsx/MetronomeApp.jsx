"use strict";

import React, { Component } from "react";
import { Container } from "flux/utils";

import TempoValue from "./components/TempoValue.jsx";
import TempoSetting from "./components/TempoSetting.jsx";
import BellSetting from "./components/BellSetting.jsx";
import BellIcons from "./components/BellIcons.jsx";
import StartButton from "./components/StartButton.jsx";
import SE from "./components/SE.jsx";

import MetronomeStore from "./MetronomeStore.jsx";
import MetronomeActions from "./MetronomeActions.jsx";

let timer;

class MetronomeApp extends Component {
  static getStores (): Array {
    return [ MetronomeStore ];
  }
  static calculateState (prevState): State {
    var state = MetronomeStore.getState().toJS();
    if (state.playing) {
      timer = setTimeout(() => {
        MetronomeActions.tick();
      }, state.interval);
    } else {
      if (timer) {
       clearTimeout(timer);
       timer = null;
      }
    }
    return state;
  }

  render () {
    return (
      <div className="app">
        <TempoValue appState={this.state} />
        <TempoSetting appState={this.state} />
        <BellSetting appState={this.state} />
        <BellIcons appState={this.state} />
        <StartButton appState={this.state} />
        <SE appState={this.state} />
      </div>
    );
  }
};

const MetronomeAppContainer = Container.create(MetronomeApp);
export default MetronomeAppContainer;
