"use strict";

import _ from "lodash";

export default function (err) {
  if (_.isObject(err) && err.message) {
    console.error(err.message);
  } else if (_.isString(err)) {
    console.error(err);
  }
  return;
};
