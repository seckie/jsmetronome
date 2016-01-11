"use strict";
import React, { Component } from "react";

class BellSetting extends Component {
  render () {
    return (
      <p>
        <span className="row">
          <button type="button" id="bell-0" className="btn-bell bell0">0</button>
          <button type="button" id="bell-2" className="btn-bell bell2">2</button>
          <button type="button" id="bell-3" className="btn-bell bell3">3</button>
          <button type="button" id="bell-4" className="btn-bell bell4">4</button>
        </span>
        <span className="row">
          <button type="button" id="bell-5" className="btn-bell bell5">5</button>
          <button type="button" id="bell-6" className="btn-bell bell6">6</button>
          <button type="button" id="bell-7" className="btn-bell bell7">7</button>
          <button type="button" id="bell-8" className="btn-bell bell8">8</button>
        </span>
      </p>
    );
  }
};

export default BellSetting;
