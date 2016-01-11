"use strict";
import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";

class BellIcons extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.appState.playing) {
      this.setState({ active: false });
      return;
    }
    if (this.props.appState.time !== nextProps.appState.time) {
      this.setState({ active: true });
      setTimeout(() => {
        this.setState({ active: false });
      }, 100);
    }
  }
  render () {
    var count = this.props.appState.bellCount;
    var beat = this.props.appState.beat;
    var cName = classnames("bell-icon", {
      "bell-icon-active": this.state.active
    });
    var icons = count <= 1 ? (
      <span className={cName} />
    ): _.map(_.range(count), function (i) {
      var cName = classnames("bell-icon", {
        "bell-icon-top": i === 0,
        "bell-icon-active": i + 1 === beat && this.state.active
      });
      return <span className={cName} />;
    });
    return (
      <p className={"bell-icons bell-icons" + count}>{icons}</p>
    );
  }
};


export default BellIcons;
