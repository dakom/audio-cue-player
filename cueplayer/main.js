'use strict';

function logError(err) {
  console.log(err.message);
  console.log(err.stack);
  //console.log(JSON.stringify(Object.getOwnPropertyNames(err));
}

process.on('uncaughtException', logError);
process.on('error', logError);

/* ELECTRON REQUIRES */
const electron = require('electron');
const fs = require('fs');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const ipcRenderer = require('electron').ipcRenderer;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let webContents;

////////////////////////////////////////////////
///////////MAIN APP HANDLERS////////////////////
////////////////////////////////////////////////
function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Audio Cue Player",
    backgroundColor: "#fff",
  });

  webContents = mainWindow.webContents;

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  webContents.on('did-fail-load', function(err) {
    console.log("FAILED LOAD!")
  });

  mainWindow.on('app-command', function(e, cmd) {

  });

  electron.globalShortcut.register('f5', function() {
    mainWindow.reload();
  });

  //mainWindow.toggleDevTools();

  firstAction();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


///IPC STUFF

////////////////////////////////////////////////
///////////BROWSER METHODS//////////////////////
////////////////////////////////////////////////

function firstAction() {
  changePage("player");
}

function changePage(targetPage, callbackWhenReady) {
  var finalURL;

  webContents.removeAllListeners('dom-ready');

  finalURL = 'file://' + __dirname + '/pages/html/' + targetPage + '.html';

  if (callbackWhenReady !== undefined) {
    webContents.on('dom-ready', callbackWhenReady);
  }

  mainWindow.loadURL(finalURL);
  updateMenu();
}

////////////////////////////////////////////////
///////////MENU METHODS/////////////////////////
////////////////////////////////////////////////
function updateMenu() {
  var templateSignin;

  var template = [{
    label: "File",
    submenu: [{
      label: "Quit",
      click: app.quit,
    }]
  }, {
    label: "DEVELOPERS",
    submenu: [{
      label: "Toggle Dev Tools",
      click: function() {
        mainWindow.toggleDevTools();
      }
    }]
  }];

  mainWindow.setMenu(Menu.buildFromTemplate(template));
}
