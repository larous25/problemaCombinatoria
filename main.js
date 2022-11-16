
// funcion que crea matrices
function crearMatriz (x, y) {
    let a = []
    for (let k = 0; k < x; k++) 
        a.push(new Array(y).fill(0))

    return a
}

// Funcion que crea todos los subconjunto
const getAllSubsets = theArray => theArray.reduce(
    (subsets, value) => subsets.concat( 
            subsets.map(set => [value,...set])
    ),
    [[]]
);

// consigue el array del tablero o sea todas las casillas del trablero
function conseguirUnaCombinacion (vectorCombinacion, a) {
    let m = JSON.parse(JSON.stringify(a))
    if(vectorCombinacion.length == 0) {
        for (let i = 1; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                m[i][j] = m[i-1][j] + (-1)**(i+1)
            }
        }
    } else {         
        vectorCombinacion.map(e => {
            console.log("elemento de inicio: " +e)
            m[0][e] = 1
        })

        for (let i = 1; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                m[i][j] = m[i-1][j] + (-1)**(m[i-1][j])
            }
        }
    }
        
    return [...[...m]]
    
}


function conseguirTodasLasCombinaciones(partes, a) {
    let combinaciones = [];

    for (let indexPotencia = 0; indexPotencia < partes.length; indexPotencia++) {        
        const vectorCombinacion = partes[indexPotencia];
        console.log("combinacion actual: ", vectorCombinacion);
        combinaciones.push(conseguirUnaCombinacion(vectorCombinacion, a))
    }

    return combinaciones();
}

// para realizar la transpocición
// output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));



function crearTablero () {
    let numeroFilas = parseInt(document.querySelector("#filas").value)
    let numeroColumnas = parseInt(document.querySelector("#columnas").value)
        
    let a = crearMatriz(numeroFilas, numeroColumnas)
    console.log("matriz inicial")
    // console.log(a)
    // creamos un vector con los indices de la fila de la matrix 
    let vectorFilaIndices = Array(numeroFilas).fill().map((x,i)=>i)
    let partesFila = getAllSubsets(vectorFilaIndices)
    // console.log(partesFila)
    let vectorColumnaIndices = Array(numeroColumnas).fill().map((x,i)=>i)
    let partesColumnas = getAllSubsets(vectorColumnaIndices)
    // falta calcular transpuesta en caso de que las columnas sean diferentes a las filas
    
    estructurarTablero(numeroFilas, numeroColumnas)
    let combianacionAPintar = 0
    pintarCombinacion(conseguirUnaCombinacion(partesFila[combianacionAPintar], a))

    document.querySelector('#mensaje').removeAttribute('style')
    document.querySelector('#posibilidades').innerHTML = `${2**numeroFilas + 2**numeroColumnas - 2}`
    let mensajeCombinacionElement = document.querySelector('#combianacion')

    document.querySelector('#anterior').addEventListener('click', () => {
        combianacionAPintar--;
        mensajeCombinacionElement.innerHTML = combianacionAPintar 
        // console.log("se manda a una combinación anterior; ", combianacionAPintar)
        const vectorCombinacion = partesFila[combianacionAPintar];
        // console.log(vectorCombinacion)
        pintarCombinacion(conseguirUnaCombinacion(vectorCombinacion, a))
    })

    document.querySelector('#siguiente').addEventListener('click', () => {
        combianacionAPintar++;
        mensajeCombinacionElement.innerHTML = combianacionAPintar
        // console.log("se manda a una combinación siguiente; ", combianacionAPintar)
        const vectorCombinacion = partesFila[combianacionAPintar];
        // console.log(vectorCombinacion)
        pintarCombinacion(conseguirUnaCombinacion(vectorCombinacion, a))
    })
}


function pintarCombinacion(combianacionAPintar) {
    console.log(combianacionAPintar)
    let divs = document.querySelectorAll("#tablero > div")
    for (let i = 0; i < divs.length; i++) 
        divs[i].removeAttribute('style')
    

    let con = 0;
    for (let i = 0; i < combianacionAPintar.length; i++) {
        for (let j = 0; j < combianacionAPintar[i].length; j++) {
            if(combianacionAPintar[i][j] == 1) {
                let s = ``;
                divs[con].style.background = '#F24B6A';
            }
            con++;
        }
    }
}


function estructurarTablero (y,x) {
    let t = document.querySelector("#tablero")
    t.style = `display: grid;
        grid-gap: 0;
        grid-template-columns: repeat(${x}, ${600/x}px);
        grid-template-rows:  repeat(${y}, ${600/y}px);
        grid-auto-flow: row;`
    for (let i = 0; i < (x*y); i++) {
        let d = document.createElement('div')
        d.classList.add('casilla')
        t.appendChild(d)
    }
    
}