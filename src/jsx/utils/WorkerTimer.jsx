"use strict";

var blob = "";
blob += 'var timer;';

blob += 'self.addEventListener("message", (e) => {';
blob += '  switch(e.data.type) {';
blob += '    case "ready":';
blob += '      self.postMessage({ type: "ready" });';
blob += '      break;';
blob += '    case "start":';
blob += '      timer = setInterval(() => {';
blob += '        self.postMessage({ type: "tick" });';
blob += '      }, e.data.interval || 100);';
blob += '      break;';
blob += '    case "stop":';
blob += '      self.postMessage({ type: "stop" });';
blob += '      clearInterval(timer);';
blob += '      break;';
blob += '    default:';
blob += '      self.postMessage(e.data);';
blob += '  }';
blob += '}, false);';

export default blob;
