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
    console.log('state:', state);
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

  componentWillMount () {
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);
  }
  componentWillUnmount () {
    window.removeEventListener("keyup", this.onKeyUp.bind(this), false);
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

  onKeyUp (e) {
    console.log('keycode:', e.keyCode);
    switch (e.keyCode) {
      case 32: // <Space>
        this.togglePlaying();
        break;
    }
  }

  togglePlaying () {
    if (this.state.playing) {
      MetronomeActions.stop();
    } else {
      MetronomeActions.start();
    }
  }
};

const MetronomeAppContainer = Container.create(MetronomeApp);
export default MetronomeAppContainer;
