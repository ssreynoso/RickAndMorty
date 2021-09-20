const setPadding = (rootElement, anchoPantalla) => {
    if (anchoPantalla >= 1440) { 
        rootElement.style.setProperty('--padding', '19.5rem');
    }
    else if (anchoPantalla > 768) {
        rootElement.style.setProperty('--padding', '11.7rem');
    }
    else {
        rootElement.style.setProperty('--padding', '1.6rem');
    }
}

const setFooter = (rootElement, altoPantalla) => {
    const footer   = document.getElementById('footer');
    let bodyHeight = document.getElementById('body').offsetHeight + (4 * footer.offsetHeight); //Con esta propiedad obtengo el alto de un elemento
    
    if (bodyHeight < altoPantalla){
        //Hago que el footer esté fijado en el fondo
        // console.log(`Body (${bodyHeight}) < pantalla (${altoPantalla})`)
        footer.style.setProperty('position','fixed');
    }
    else {
        //Lo dejo como está en el CSS
        // console.log(`Body (${bodyHeight}) > pantalla (${altoPantalla})`)
        footer.style.setProperty('position','relative');
    }
}

const cambiarTamaños = () => {
    
    const rootElement = document.documentElement //Obtengo el elemento :root en CSS
    let anchoPantalla = screen.width;
    // let altoPantalla  = screen.height;

    setPadding(rootElement, anchoPantalla);
    // setFooter (rootElement, altoPantalla);
    
}

cambiarTamaños();

window.onresize = () => cambiarTamaños();