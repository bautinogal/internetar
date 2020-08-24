const express = require('express'); // Framework de Node para armar servidores
const bodyParser = require('body-parser'); // Herramienta para parsear el "cuerpo" de los requests
const workers = require('./lib/index');

// Inicializo el servidor
const app = express();

// Configuración del servidor
app.set('port', process.env.PORT || 3000);
console.log(`App: Puerto del servidor seteado en: ${app.get('port')}`);


// Adición de Middlewares al servidor
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

workers.start(600); // Scrapea y actualiza los valores cada 600 segundos (10 minutos)

app.get('/api/getdata', function(req, res) { // End point que me devuelve un objeto con los últimos valores de la data scrapeada
    res.send(JSON.stringify(workers.getData()));
});

app.listen(app.get('port'), () => {
    console.log(`App: Servidor escuchando en el puerto:  ${app.get('port')}`);
});