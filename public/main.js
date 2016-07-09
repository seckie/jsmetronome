"use strict";

const {app, BrowserWindow, ipcMain} = require("electron");
const settingsJSONPath = app.getPath("userData") + "/settings.json";
const fs = require("fs");

var mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
//    width: 300,
//    height: 328,
    width: 1200,
    height: 728,
    //resizable: false,
    title: "JSMetronome",
    //frame: false,
    //transparent: true
  });
  mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.on("initialized", (event) => {
  fs.readFile(settingsJSONPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return console.error(err.message);
    }
    event.sender.send("initialized", data);
  });
});

ipcMain.on("save-state", (event, arg) => {
  var data = JSON.stringify(arg);
  fs.writeFile(settingsJSONPath, data, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  event.sender.send("complete-save-state");
});
