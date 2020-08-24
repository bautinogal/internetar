// Me devuelve las celebridades con mas seguidores en facebook de argentina
const getTopCelebritys = require('./topCelebritysArg');
var topCelebritys = [];
// Me devuelve las marcas con mas seguidores en facebook de argentina
const getTopBrands = require('./topBrandsArg');
var topBrands = [];

// Se encarga de scrapear cada cierto intervalo
var worker;

// Scrapeo todos los valores con el intervalo recibido
const start = (interval) => {
    //Si ya tengo un worker corriendo, lo mato antes de arrancar otro
    if (worker) clearInterval(myVar);
    update();
    worker = setInterval(update, interval * 1000);
}

// Dejo de scrapear
const end = (interval) => {
    //Si tengo un worker corriendo lo mato
    if (worker) clearInterval(myVar);
}

// Scrapeo todos los valores
const update = () => {
    getTopCelebritys.getTopCelebritys()
        .then((res) => topCelebritys = res)
        .catch((err) => console.log(err));
    getTopBrands.getTopBrands()
        .then((res) => topBrands = res)
        .catch((err) => console.log(err));
}

// Devuelve los valores actualizados del scrapeo
const getData = () => {
    var result = {
        topCelebritys,
        topBrands
    }
    return result;
}


module.exports = { start, end, getData }