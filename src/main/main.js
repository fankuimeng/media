const { app, BrowserWindow, ipcMain } = require('electron');

const remoteMain = require('@electron/remote/main');
const path = require('path');
// const pkg = require('../../package');
const previewIcon =
  process.env.NODE_ENV === 'dev'
    ? 'public/images/tray.ico'
    : `${global.__images}/tray.ico`;

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      maximizable: true,
      minimizable: true,

      resizable: true,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        nodeIntegrationInWorker: true,
      },
      show: false,
      backgroundColor: '#efefef',
    };
    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    this.loadURL(urlLocation);
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

app.on('ready', () => {
  const mainWindowConfig = {
    width: 1440,
    height: 768,
    icon: previewIcon,
    titleBarStyle: 'hiddenInset',
    frame: process.platform !== 'win32',
    show: true,
    backgroundColor: '#2e2c29',
    hasShadow: process.platform !== 'darwin',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  };

  let mainWindow = null;
  const urlLocation =
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8002'
      : `file://${path.join(__dirname, '../renderer/index.html')}`;

  mainWindow = globalThis.mainWindow = new AppWindow(
    mainWindowConfig,
    urlLocation
  );
  remoteMain.initialize();
  remoteMain.enable(mainWindow.webContents);
  if (process.platform === 'win32') {
    // app.setAppUserModelId(pkg.appId);
    // 去除原生顶部菜单栏
    mainWindow.setMenu(null);
    // 如果是windows系统模拟托盘菜单
    // global.tray = createTray(Tray);
  }
  if (process.env.NODE_ENV === 'dev') mainWindow.webContents.openDevTools();

  //接收渲染进程的信息
  ipcMain.on('window-min', function () {
    mainWindow.minimize();
  });
  ipcMain.on('window-max', (e, isMax) => {
    isMax ? mainWindow.unmaximize() : mainWindow.maximize();
  });

  ipcMain.on('window-closed', function () {
    mainWindow = null;
    app.quit();
  });
});
