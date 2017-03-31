'use strict';

export default function (ctx, url, onLoad, onError) {
  if (! ctx instanceof AudioContext ||
    ! url instanceof String ||
    ! onLoad instanceof Function) {
    console.error('Invalid arguments for loadSound() function');
    return;
  }
  onError = typeof onError === 'function' ? onError : function () {};

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    ctx.decodeAudioData(xhr.response, onLoad, onError);
  };
  xhr.send();
};
