"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 328,
//    width: 800,
//    height: 728
    resizable: false,
    title: "JSMetronome",
    frame: false,
    transparent: true
  });
  mainWindow.loadURL("file://" + __dirname + "/public/index.html");
  //mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

