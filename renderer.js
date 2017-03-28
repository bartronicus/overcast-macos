// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow
const { setCurrentUri, getCurrentUri } = require('electron').remote.require('./main.js')
const path = require('path')
const contextMenu = require('electron-context-menu')

const webview = document.getElementById('trello')
const loader = document.querySelector('.loader')

let loadedCurrent = false;

onload = () => {
  const loadstart = () => {
    loader.classList.add('is-loading')

    if (!loadedCurrent) {
      webview.loadURL(getCurrentUri())
    }

    loadedCurrent = true;
  }

  const loadstop = () => {
    loader.classList.remove('is-loading')
  }

  webview.addEventListener('dom-ready', () => {
    contextMenu({window: webview})
  })

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)

  webview.addEventListener('did-navigate-in-page', function (event) {
    setCurrentUri(webview.getURL());
  })
}
