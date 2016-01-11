"use strict";

import React from "react"
import ReactDOM from "react-dom";
import MetronomeApp from "./MetronomeApp.jsx";

window.addEventListener("load", function () {
  ReactDOM.render(
    <MetronomeApp />,
    document.getElementsByClassName("container")[0]
  );
}, false);
