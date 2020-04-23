var sjcl = require('./sjcl.js');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var base64ToImage = require('base64-to-image');

app.use(express.static('public'));

app.get('/hello', function (req, res) {
    res.status(200).send("Hello World!");
});
io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    // socket.emit('messages', messages);
    socket.on('new-message', function (data) {
        console.log(data)
        // var base64 ="data:image/jpg;base64,"+data.img
        var path = "C:/Users/Aixa Lievana/Desktop/Distribuidos/proyecto2/public/img/";
        console.log(__dirname);
        var optional= {'fileName': data.name, 'type':'jpg'}

        // console.log(data.encrypted)
        var dec = sjcl.decrypt("patos", data.encrypted);
        console.log(dec);
        var base64 = "data:image/jpg;base64," + dec;

       var image= base64ToImage(base64,path,optional)

        io.sockets.emit('messages',image );
    });
});
server.listen(8081, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});