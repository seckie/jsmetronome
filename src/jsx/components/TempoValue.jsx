"use strict";
import React, { Component } from "react";

class TempoValue extends Component {
  render () {
    return (
      <p><input type="text" value="" id="tempo" className="tempo" disabled={true} /></p>
    );
  }
};

export default TempoValue;
