const { app, BrowserWindow, ipcMain } = require('electron')

let window

const createWindow = () => {
    window = new BrowserWindow({ width: 800, height: 608 })
    window.loadURL(`file://${__dirname}/index.html`) 
}

ipcMain.on('openFile', (event) => {
    const dialog = require('electron').dialog
    dialog.showOpenDialog(filenames => {
        if(filenames !== undefined){
            readFile(filenames[0])
        }
        else {
            console.log('file not found!')
        }
    })
    const readFile = filepath => {
        const fs = require('fs')
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(!err) {
                event.sender.send('filePath', filepath)
                event.sender.send('fileData', data)
            }
            else {
                console.log(err)
            }
        })
    }
})

app.on('ready', createWindow)