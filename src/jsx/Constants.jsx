"use strict";

const Constants = {
  BELL_VALUES: [ 0, 2, 3, 4, 5, 6, 7, 8 ],
  TEMPO_MIN: 1,
  TEMPO_MAX: 300,
  Messages: {
    TEMPO_VALUE_ERROR: "Invalid value of tempo!"
  }
};

export default Constants;
export const Messages = Constants.Messages;
