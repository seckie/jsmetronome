"use strict";

const Constants = {
  BELL_VALUES: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  MARKINGS: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 126, 132, 138, 144, 152, 160, 168, 176, 184, 192, 200, 208],
  DEFAULT_MARKING_INDEX: 16,
  TEMPO_MIN: 1,
  TEMPO_MAX: 300,
  SCHEDULE_AHEAD_TIME: 0.1, // (sec)
  NOTE_LENGTH: 0.5, // (sec)
  TICK_INTERVAL: 100, // (msec)
  DEFAULT_TEMPO: 200,
  Messages: {
    TEMPO_VALUE_ERROR: "Invalid value of tempo!"
  }
};

export default Constants;
export const Messages = Constants.Messages;
