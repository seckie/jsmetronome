"use strict";

describe("Web Workers test:", () => {
  var worker;
  var onMessage = () => { };

  beforeEach(() => {
    worker = new Worker("/base/test/Worker.js");
  });
  afterEach(() => {
    worker.removeEventListener("message", onMessage);
  });

  it("Transfer message string", (done) => {
    onMessage = (e) => {
      expect(e.data.type).toEqual("ready");
      worker.removeEventListener("message", onMessage);
      done();
    };
    worker.addEventListener("message", onMessage, false);
    worker.postMessage({ type: "ready" });
  });

  it("Slower interval when this window goes background:", (done) => {
    var time;
    onMessage = (e) => {
      switch (e.data.type) {
        case "ready":
          time = Date.now();
          break;
        case "tick":
          var diff = Date.now() - time;
          console.log('diff:', diff);
          expect(diff < 1050).toBe(true);
          time = Date.now();
          break;
        case "end":
          clearInterval(timer);
          done();
          break;
      }
    };
    worker.addEventListener("message", onMessage, false);
    worker.postMessage({ type: "ready" });
    var timer = setInterval(() => {
      worker.postMessage({ type: "tick" });
    }, 1000);
  });
});
