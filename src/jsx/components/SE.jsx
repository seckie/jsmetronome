"use strict";

import React, { Component } from "react";

class SE extends Component {

  constructor (props) {
    super(props);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.appState.playing) {
      var snare = this.refs.snare;
      var base = this.refs.base;
      var sound = (nextProps.appState.beat === 1) ? snare : base;
      sound.currentTime = 0;
      sound.play();
    }
  }

  render () {
    return (
      <div className="se">
        <audio src="./sound/snare.mp3" type="audio/mpeg" controls={false} ref="snare" />
        <audio src="./sound/base.mp3" type="audio/mpeg" controls={false} ref="base" />
      </div>
    );
  }
};

export default SE;
