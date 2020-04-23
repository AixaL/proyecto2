var socket = io.connect('http://localhost:8081', {
    'forceNew': true
});

socket.on('messages', function (data) {
    document.getElementById("imagen").setAttribute("src", "");
    console.log(data);
    document.getElementById("imagen").setAttribute("src", `img/${data.fileName}`);
})

function render(file) {
    var html = `<div>
                <img src="data:image/jpg;base64,${file}" /></div>`
    document.getElementById('primera').innerHTML=html;
}

function addMessage(e) {
    base64()
    async function base64(){
        var fileBase64 = await getBase64(document.getElementById('texto').files[0])
        fileBase64 = fileBase64.split(",")[1];
        console.log(fileBase64)
        message(fileBase64)
        render(fileBase64)
        return fileBase64;
    }

    function message(text){
        var encrypted = (sjcl.encrypt("patos", text));
        console.log(encrypted);
        var extension = document.getElementById('texto').files[0].name.split('.').pop().toLowerCase();
        var nombre = document.getElementById('texto').files[0].name;
        var nombre2= nombre.split(".");
         var message = {
             img: text,
             name: nombre2[0],
             encrypted: encrypted,
         };
         socket.emit('new-message', message);
    }
   document.getElementById("imagen").setAttribute("src", "");
    return false;
}

async function base64(file){
    var fileBase64 = await getBase64(file)
    fileBase64 = fileBase64.split(",")[1];
    console.log(fileBase64)
    return fileBase64;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // console.log(reader.result);
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            // console.log('Error: ', error);
            reject(null);
        };
    });
}