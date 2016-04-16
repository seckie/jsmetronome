"use strict";

var blob = "";
blob += 'var timer;';
blob += '';
blob += 'self.addEventListener("message", (e) => {';
blob += '  switch(e.data.type) {';
blob += '    case "ready":';
blob += '      self.postMessage({ type: "ready" });';
blob += '      break;';
blob += '    case "start":';
blob += '      timer = setInterval(() => {';
blob += '        self.postMessage({ type: "tick" });';
blob += '      }, e.data.interval || 1000);';
blob += '      break;';
blob += '    case "end":';
blob += '      self.postMessage({ type: "end" });';
blob += '      clearInterval(timer);';
blob += '      break;';
blob += '    default:';
blob += '      self.postMessage(e.data);';
blob += '  }';
blob += '}, false);';

export default blob;
