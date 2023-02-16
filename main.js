const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const { resourceLimits } = require('worker_threads');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// Create the main windows
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Higro App',
        width: 605,
        height: 300,
    });

    //Open devtools if in dev env
    if(isDev){
       // mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Create About window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About Higro App',
        width: 300,
        height: 300,
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

function createInputWindow() {
    const inputWindow = new BrowserWindow({
        title: 'Info straturi',
        width: 1150,
        height: 550,
    });

    inputWindow.loadFile(path.join(__dirname, './renderer/input.html'));
}
function createDataWindow() {
    const DataWindow = new BrowserWindow({
        title: 'Date',
        width: 300,
        height: 300,
    });

    DataWindow.loadFile(path.join(__dirname, './renderer/db.html'));
}
function createChartWindow() {
    const ChartWindow = new BrowserWindow({
        title: 'Grafic',
        width: 900,
        height: 500,
    });

    ChartWindow.loadFile(path.join(__dirname, './renderer/chart.html'));
}
// App is ready
app.whenReady().then(() => {
    createMainWindow();

// Implement menu
const mainMenu = Menu.buildFromTemplate(menu);
Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow()
        }
      
    });
});


//Menu template
const menu = [
    {
        role: 'fileMenu',
    },
    {
        label: 'About',
        click: createAboutWindow,
    },
    {
        label: 'Input',
        click: createInputWindow,
    },
    {
        label: 'Date',
        click: createDataWindow,
    },
    {
        label: 'Grafic',
        click: createChartWindow,
    }
   
]

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })


