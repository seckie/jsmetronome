"use strict";

import React, { Component } from "react";
import { Container } from "flux/utils";
// Information from: http://stackoverflow.com/questions/34427446/bundle-error-using-webpack-for-electron-application-cannot-resolve-module-elec
const ipcRenderer = window.require("electron").ipcRenderer;

import TempoValue from "./components/TempoValue.jsx";
import TempoSetting from "./components/TempoSetting.jsx";
import BellSetting from "./components/BellSetting.jsx";
import BellIcons from "./components/BellIcons.jsx";
import StartButton from "./components/StartButton.jsx";
import SE from "./components/SE.jsx";

import MetronomeStore from "./MetronomeStore.jsx";
import MetronomeActions from "./MetronomeActions.jsx";
import WorkerTimer from "./utils/WorkerTimer.jsx";

//var timer;
var blob = new Blob(
  [ WorkerTimer ],
  { type: "text/javascript" }
);
var blobURL = window.URL.createObjectURL(blob);
var worker = new Worker(blobURL);

worker.addEventListener("message", (e) => {
  switch(e.data.type) {
    case "ready":
      break;
    case "tick":
      MetronomeActions.tick();
      break;
    case "end":
      break;
  }
}, false);


ipcRenderer.on("complete-save-state", (ev, arg) => {
  console.log(arg);
});
ipcRenderer.on("initialized", (ev, data) => {
  console.log('data:', data);
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  MetronomeActions.save(data);
});

class MetronomeApp extends Component {
  static getStores (): Array {
    return [ MetronomeStore ];
  }
  static calculateState (prevState): State {
    var state = MetronomeStore.getState().toJS();
    if (state.clearTimer) {
      worker.postMessage({ type: "end" });
      if (state.playing === true) {
        worker.postMessage({ type: "start", interval: state.interval });
      }
    } else {
      if (prevState && prevState.playing === false && state.playing === true) {
        worker.postMessage({ type: "start", interval: state.interval });
      } else if (prevState && prevState.playing === true && state.playing === false) {
        worker.postMessage({ type: "end", interval: state.interval });
      }
    }
    // to save state
    if (prevState && state &&
      (prevState.bellCount !== state.bellCount ||
      prevState.tempo !== state.tempo ||
      prevState.tradMode !== state.tradMode)) {
      ipcRenderer.send("save-state", state);
    }
    return state;
  }

  componentWillMount () {
    ipcRenderer.send("initialized");
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
