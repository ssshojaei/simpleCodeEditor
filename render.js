const ipc = require('electron').ipcRenderer
const fs = require('fs')

let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    theme: 'pastel-on-dark',
    mode: 'javascript'
})

editor.setSize('auto', 500)

const $ = require('jquery')
$('#open').click(function () {
    console.log('clicked')
    ipc.send('openFile')
})

$('#save').click(function(){
    fs.writeFile($('#location').text(), editor.getValue())
    alert('file is saved successfully!')
})

ipc.on('filePath', (event, path) => {
    $('#location').text(path)
    $('#fileType').text(path.split('.').pop())
})
ipc.on('fileData', (event, data) => {
    editor.getDoc().setValue(data)
})