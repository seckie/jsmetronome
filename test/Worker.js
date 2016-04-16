"use strict";

var count = 0;

self.addEventListener("message", (e) => {
  switch(e.data.type) {
    case "ready":
      self.postMessage({ type: "ready" });
      break;
    case "tick":
      count++;
      if (count > 2) {
        count = 0;
        self.postMessage({ type: "end" });
      } else {
        self.postMessage({ type: "tick" });
      }
      break;
    default:
      self.postMessage(e.data);
  }
}, false);
