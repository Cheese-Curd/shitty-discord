const { app, BrowserWindow } = require('electron');

function createWindow()
{
    const window = new BrowserWindow(
    {
        'width':1188,
        'height':630,
        'autoHideMenuBar':true,
        'webPreferences':
        {
            'nodeIntegration':true,
            'enableRemoteModule':true,
            'contextIsolation':false
        }
    });

    window.setMenuBarVisibility(false);
    window.loadFile('index.html');
}

app.once('ready', createWindow);