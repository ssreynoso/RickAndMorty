import { fetchDataCallback, fetchDataPromise } from './modules/asincronismo.js';
import { createCard } from './modules/createCard.js';

'use strict';

const API = 'https://rickandmortyapi.com/api/character'

const usingCallbacks = function () {
    
    //Llamo a la función que realiza el request
    fetchDataCallback(API, (error1, data1) => {
        if (error1) return console.error(error1);
        
        fetchDataCallback(API + data1.results[0].id, (error2, data2) => {
            if (error2) return console.error(error2);
            console.log('[CALLBACK] Existen ' + data1.info.count + ' personajes.');
            console.log('[CALLBACK] Nombre [1]: ' + data2.name);
        })
    })
}

// const usingPromises = function () {
//     fetchDataPromise(API)
//         .then( data1 => {
//             console.log('[PROMISE] Existen ' + data1.info.count + ' personajes.');
//             return fetchDataPromise(API + data1.results[0].id)
//         })
//         .then( data2 => {
//             console.log('[PROMISE] Nombre [1]: ' + data2.name);
//         })
//         .catch( error => console.error(error));
// }

const usingPromisesWithHTTPRequest = function () {
    fetchDataPromise(API)
        .then( data1 => {
            let cantPaginas     = data1.info.pages;
            const arrayPromises = [];

            for (let i = 1; i <= cantPaginas; i++){
                let currentPage = `${API}?page=${i}`
                arrayPromises.push(fetchDataPromise(currentPage));
            }

            return Promise.all(arrayPromises);
        })
        //paginas contiene los resultados del array de promesas.
        .then  ( paginas => paginas.forEach( pagina => pagina.results.forEach( personaje => createCard(personaje))))
        .catch ( error => console.error(error));
}

const usingPromisesWithFetch = function () {
 
    const arrayPromises = [];

    fetch(API)
        .then(response => response.json())
        .then(informacionAPI => {
            
            let cantPaginas = informacionAPI.info.pages;     

            for (let i = 1; i <= cantPaginas; i++){
                let currentPage = `${API}?page=${i}`
                arrayPromises.push(fetchDataPromise(currentPage));
            }
    
            Promise.all(arrayPromises)
                .then(paginas => paginas.forEach(pagina => pagina.results.forEach(personaje => createCard(personaje))))
    
        })
}

const usingAsyncAwaitWithHTTPRequest = async function () {
    try{
        const informacionAPI = await fetchDataPromise(API); //Esto me devuelve el JSON directamente. 
        const arrayPromises  = [];
        let cantPaginas      = informacionAPI.info.pages;     

        for (let i = 1; i <= cantPaginas; i++){
            let currentPage = `${API}?page=${i}`
            arrayPromises.push(fetchDataPromise(currentPage));
        }

        let paginas = await Promise.all(arrayPromises);
        
        paginas.forEach( pagina => pagina.results.forEach( personaje => createCard(personaje) ) );
    }
    catch (error) {
        console.error(error)
    }
}

const usingAsyncAwaitWithFetch = async function () {
    try{
        const fetch_informacionAPI = await fetch(API);                  //Esto me devuelve una promesa.
        const informacionAPI       = await fetch_informacionAPI.json(); //Esto también.
        const arrayPromises        = [];
        let cantPaginas            = informacionAPI.info.pages;     

        for (let i = 1; i <= cantPaginas; i++){
            let currentPage = `${API}?page=${i}`
            //Supuestamente usar Promise.all() es mejor que muchos await.
            arrayPromises.push(fetchDataPromise(currentPage));
            // let pagina      = await fetchDataPromise(currentPage);
            // pagina.results.forEach( personaje => createCard(personaje))
        }

        let paginas = await Promise.all(arrayPromises);
        
        paginas.forEach( pagina => pagina.results.forEach( personaje => createCard(personaje) ) );
    }
    catch (error) {
        console.error(error)
    }
}

//Ejecución del código.

// usingCallbacks();

// usingPromisesWithHTTPRequest();

// usingPromisesWithFetch();

usingAsyncAwaitWithHTTPRequest();

// usingAsyncAwaitWithFetch();