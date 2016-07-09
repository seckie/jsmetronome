"use strict";

const {app, BrowserWindow, ipcMain} = require("electron");
const userDataPath = app.getPath("userData");
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

ipcMain.on("save-state", (event, arg) => {
  console.log(userDataPath);

  var data = JSON.stringify(arg);
  fs.writeFile(userDataPath + "/settings.json", data, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  event.sender.send("complete-save-state");
});
