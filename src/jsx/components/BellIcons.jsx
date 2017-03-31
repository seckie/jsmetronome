"use strict";
import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";

import MetronomeActions from "../MetronomeActions.jsx";

var rafID;
var currentQuaterNote;
var last16thNoteDrawn;

class BellIcons extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps (nextProps) {
    var state = this.props.appState;
    var nextState = nextProps.appState;
    if (nextState.playing === false) {
      this.setState({ active: false });
      window.cancelAnimationFrame(rafID);
    } else if (state.playing === false && nextState.playing === true) {
      this.setState({ active: true });
      rafID = window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  draw () {
    var state = this.props.appState;
    var notesInQueue = state.notesInQueue;

    var next16thNote = last16thNoteDrawn;
    var isQueueUpdated = false;
    while (notesInQueue.length &&
      notesInQueue[0].time < state.audioContext.currentTime) {
      next16thNote = notesInQueue[0].note;
      notesInQueue.splice(0, 1);
      isQueueUpdated = true;
    }

    // Check: is the note already drawn
    if (last16thNoteDrawn !== next16thNote) {
      // draw
      currentQuaterNote = Math.ceil(next16thNote / 4);
      this.forceUpdate();
      last16thNoteDrawn = next16thNote;
    }

    // update queue
    if (isQueueUpdated === true) {
      MetronomeActions.updateQueue(notesInQueue);
    }
    // loop
    if (state.playing === true) {
      rafID = window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  render () {
    var state = this.props.appState;
    var count = state.bellCount;
    var cName = classnames("bell-icon", {
      "bell-icon-active": state.playing
    });
    var icons = count <= 1 ? (
      <span className={cName} />
    ): _.map(_.range(count), (i) => {
      var cName = classnames("bell-icon", {
        "bell-icon-top": i === 0,
        "bell-icon-active": i + 1 === currentQuaterNote && state.playing
      });
      return <span className={cName} key={"bell-icon" + i} />;
    });
    return (
      <p className={"group-bell-icons bell-icons" + count}>{icons}</p>
    );
  }
};


export default BellIcons;
