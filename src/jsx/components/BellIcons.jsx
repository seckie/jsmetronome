"use strict";
import React, { Component } from "react";
import _ from "lodash";

class BellIcons extends Component {
  render () {
    var bellCount = this.props.bellCount;
    var icons = bellCount <= 1 ? (
      <span className="bell-icon" />
    ): _.map(_.range(bellCount), function (count) {
      return  (count === 0) ? (
        <span className="bell-icon top" />
      ) : (
        <span className="bell-icon" />
      );
    });
    return (
      <p>{icons}</p>
    );
  }
};

export default BellIcons;
