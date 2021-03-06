// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ipcRenderer = require('electron').ipcRenderer;

const textAreaParent = document.getElementById('textarea-parent');
const textAreaChild1 = document.getElementById('textarea-child1');
const textAreaChild2 = document.getElementById('textarea-child2');
const textAreaLog = document.getElementById('textarea-log');
const startButton = document.getElementById('start-button'); 
const sigintButton = document.getElementById('sigint-button');
const canvas = document.getElementById('canvas');

const displayNewSquare = (length, color='#DFDFDF') => {
    const context = canvas.getContext('2d');

    canvas.width = canvas.width;
    context.fillStyle = color;
    context.fillRect(0, 0, length, length); 	
};


startButton.addEventListener('click', (event) => {
    ipcRenderer.send('start-button-click');
});

sigintButton.addEventListener('click', (event) => {
    ipcRenderer.send('sigint-button-click');
});

// 第二个参数 data 是一个对象
// data.type 有五种取值，具体可以参见下面的五个 if 分支
// data.content 是消息的具体内容（即进程的输出）
// 现在是直接把进程的输出给显示到 textarea 里面
ipcRenderer.on('procs-message', (event, data) => {
    // console.log(data);
    if(data.type === 'parent') {
        textAreaParent.value += data.content + '\n';
        textAreaParent.scrollTop = textAreaParent.scrollHeight;
    } else if(data.type === 'child1') {
        textAreaChild1.value += data.content + '\n';
        textAreaChild1.scrollTop = textAreaChild1.scrollHeight;
    } else if(data.type === 'child2') {
        textAreaChild2.value += data.content + '\n';
        textAreaChild2.scrollTop = textAreaChild2.scrollHeight;
    } else if(data.type === 'child3') {
        // textArea4.value += data.content + '\n';
        // textArea4.scrollTop = textArea4.scrollHeight;
        displayNewSquare(data.content*80);
    } else if(data.type === 'log') {
        console.log(data.content);
        textAreaLog.value += data.content + '\n';
    }
});