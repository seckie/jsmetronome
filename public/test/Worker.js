"use strict";

var count = 0;
var timer;

self.addEventListener("message", (e) => {
  switch(e.data.type) {
    case "ready":
      self.postMessage({ type: "ready" });
      break;
    case "tickStart":
      timer = setInterval(() => {
        count++;
        if (count > 10) {
          count = 0;
          self.postMessage({ type: "end" });
          clearInterval(timer);
        } else {
          self.postMessage({ type: "tick" });
        }
      }, 1000);
      break;
    default:
      self.postMessage(e.data);
  }
}, false);
