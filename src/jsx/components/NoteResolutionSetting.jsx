"use strict";
import React, { Component } from "react";
import classnames from "classnames";
import MetronomeActions from "../MetronomeActions.jsx";

class NoteResolutionSetting extends Component {

  setNoteResolution (e) {
    var target = e.currentTarget;
    var resolution = +target.dataset.value;
    MetronomeActions.setNoteResolution(resolution);
  }

  render () {
    var currentNoteResolution = this.props.appState.noteResolution;
    var cNames = [1, 2, 3].map((value) => {
      var baseCName = "resolution-setting-button";
      return (value === currentNoteResolution) ? `${baseCName} ${baseCName}-active` : baseCName;
    });
    return (
      <div className="resolution-setting">
      <button type="button" className={cNames[0]}
        data-value={1} onClick={this.setNoteResolution.bind(this)}>
        <svg viewBox="0 0 16.56 55.2"><path d="M14.16,0h2.4V45c0,6.24-5.28,10.2-11,10.2C2.82,55.2,0,53.7,0,50.76c0-4.26,5.46-8.28,10.38-8.28a8.82,8.82,0,0,1,3.78.78Z"/></svg>
      </button>
      <button type="button" className={cNames[1]}
        data-value={2} onClick={this.setNoteResolution.bind(this)}>
        <svg viewBox="0 0 30.61 53.36"><path d="M14.28,0h1.51c0,5.57,3.33,9.69,7,12.76s7.8,7.6,7.8,13c0,4.87-2.18,9.69-5.08,14.15H24c1.33-2.67,3.81-7.54,3.81-12.18A13.7,13.7,0,0,0,16.7,14.38V43.5c0,6-5.32,9.86-11.07,9.86C2.84,53.36,0,51.91,0,49.07c0-4.12,5.51-8,10.47-8a9.22,9.22,0,0,1,3.81.75Z"/></svg>
      </button>
      <button type="button" className={cNames[2]}
        data-value={3} onClick={this.setNoteResolution.bind(this)}>
        <svg viewBox="0 0 30.36 55.2"><path d="M30.36,22.57c0-4.77-4.08-8.72-7.74-11.41-3.37-2.47-6.42-5.72-6.89-10L15.66,0h-1.5V43.26a8.82,8.82,0,0,0-3.78-.78C5.46,42.48,0,46.5,0,50.76,0,53.7,2.82,55.2,5.58,55.2c5.7,0,11-4,11-10.2V22.68c6.24,1.08,11,5.39,11,10.82,0,3.75-2.46,7.68-3.78,9.84h1.56c2.88-3.61,5-7.5,5-11.43a8.28,8.28,0,0,0-1.22-4.17A9.47,9.47,0,0,0,30.36,22.57Zm-2.81,3a26.38,26.38,0,0,0-4.92-4.19A17,17,0,0,1,16.56,15v-.11l-.13-2.11c5.88,1.42,11,5.92,11.11,11.52C27.55,24.77,27.55,25.18,27.54,25.56Z"/></svg>
      </button>
      </div>
    );
  }
}

export default NoteResolutionSetting;
