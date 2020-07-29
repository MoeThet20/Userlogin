var socket = io();
$(document).ready(function () {
    $('#toggle').bootstrapToggle({
        on: 'ON',
        off: 'OFF'
    });
    $('#toggle1').bootstrapToggle({
        on: 'ON',
        off: 'OFF'
    });
});

var websocket,websocket1 = false;
$('#toggle').change(function () {
    if (!websocket) {
        if ($('#toggle').prop('checked') == true) {
            socket.emit('buttonOn', 'on\n');
        } else {
            socket.emit('buttonOff', 'off\n');
        }
    }
    else { websocket = false; }
});
socket.on('buttonOn', function () {
    websocket = true;
    console.log('Button On');
    $('#toggle').bootstrapToggle('on');
});
socket.on('buttonOff', function () {
    websocket = true;
    console.log('Button Off');
    $('#toggle').bootstrapToggle('off');
});


$('#toggle1').change(function () {
    if (!websocket1) {
        if ($('#toggle1').prop('checked') == true) {
            socket.emit('buttonOn1', 'on\n');
        } else {
            socket.emit('buttonOff1', 'off\n');
        }
    }
    else { websocket1 = false; }
});
socket.on('buttonOn1', function () {
    websocket1 = true;
    console.log('Button On');
    $('#toggle1').bootstrapToggle('on');
});
socket.on('buttonOff1', function () {
    websocket1 = true;
    console.log('Button Off');
    $('#toggle1').bootstrapToggle('off');
});
