//Consumo una API con callbacks y XMLHttpRequest.
const fetchDataCallback = function (url_api, callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', url_api, true);

    //Función que lidiará con el response
    xhttp.onreadystatechange = function (event) {
        //Evalúo si se recibió un response del request hecho
        if (xhttp.readyState === 4) {
            //Evalúo response que se recibió fue exitoso.
            if (xhttp.status === 200) {
                //Al texto que recibo lo convierto en un obj JS con JSON.parse().
                let response = JSON.parse(xhttp.responseText);
                //LLamo a la función que va a usar el response recibido (la callback que me traigo como parámetro).
                callback(null, response);
            } else {
                //Si ocurre un error, lo retorno.
                const error = new Error('Error ' + url_api);
                return callback (error, null)
            }
        }
    }

    xhttp.send();
}

const fetchDataPromise = function (url_api) {
    return new Promise((resolve, reject) => {
        //Esta es la función que se le pasa a la promesa.
        
        const xhttp = new XMLHttpRequest();
    
        xhttp.open('GET', url_api, true);
    
        //Función que lidiará con el response
        xhttp.onreadystatechange = () => {
            //Evalúo si se recibió un response del request hecho
            if (xhttp.readyState === 4) {
                //Evalúo response que se recibió fue exitoso.
                if (xhttp.status === 200) {
                    //Al texto que recibo lo convierto en un obj JS con JSON.parse().
                    let response = JSON.parse(xhttp.responseText);
                    //LLamo a la función que va a usar el response recibido (la callback que me traigo como parámetro).
                    resolve(response);
                } else {
                    //Si ocurre un error, lo llamo a reject.
                    const error = new Error('Error ' + url_api);
                    reject(error);
                }
            }
        }
    
        xhttp.send();
    })
}

export {fetchDataCallback, fetchDataPromise};