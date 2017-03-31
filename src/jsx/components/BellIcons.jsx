"use strict";
import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";

var rafID;

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
    } else if (state.nextNoteTime !== nextState.nextNoteTime) {
      this.setState({ active: true });
      rafID = window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  draw () {
    //console.log('draw!');
    if (this.props.appState.playing === true) {
      rafID = window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  render () {
    var state = this.props.appState;
    var count = state.bellCount;
    var beat = state.beat;
    var cName = classnames("bell-icon", {
      "bell-icon-active": state.playing
    });
    var icons = count <= 1 ? (
      <span className={cName} />
    ): _.map(_.range(count), (i) => {
      var cName = classnames("bell-icon", {
        "bell-icon-top": i === 0,
        "bell-icon-active": i + 1 === beat && state.playing
      });
      return <span className={cName} key={"bell-icon" + i} />;
    });
    return (
      <p className={"group-bell-icons bell-icons" + count}>{icons}</p>
    );
  }
};


export default BellIcons;
