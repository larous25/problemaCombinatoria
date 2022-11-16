
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
    if(vectorCombinacion.length != 0) {
        vectorCombinacion.map(e => {
            m[0][e] = 1
        })
    }
    
    llenado(m)
        
    return [...[...m]]
    
}

function llenado(m) {
    for (let i = 1; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            m[i][j] = m[i-1][j] + (-1)**(m[i-1][j])
        }
    }
    return m
}


function conseguirTodasLasCombinaciones(partes, a) {
    let combinaciones = []

    for (let indexPotencia = 0; indexPotencia < partes.length; indexPotencia++) {        
        const vectorCombinacion = partes[indexPotencia];
        combinaciones.push(conseguirUnaCombinacion(vectorCombinacion, a))
    }

    return combinaciones
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) {
            console.log(arr[i])
            continue; 
        }

        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}


// para realizar la transpocición
function transponerMatrices (combinaciones) {
    return combinaciones.map(c => c[0].map((_, colIndex) => c.map(row => row[colIndex])))
}


// main XD
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
    let combinacionAPintar = 0
    
    let combianacionesFila = conseguirTodasLasCombinaciones(partesFila, a)
    let combinacionesColumna = transponerMatrices(combianacionesFila)
    
    let todasLasCombinaciones = multiDimensionalUnique([...combianacionesFila, ...combinacionesColumna])
    

    pintarCombinacion(todasLasCombinaciones[combinacionAPintar])

    // pinta la respuesta
    document.querySelector('#mensaje').removeAttribute('style')
    document.querySelector('#posibilidades').innerHTML = `${2**numeroFilas + 2**numeroColumnas - 2}`
    let mensajeCombinacionElement = document.querySelector('#combianacion')



    document.querySelector('#anterior').addEventListener('click', () => {
        combinacionAPintar--;
        mensajeCombinacionElement.innerHTML = (combinacionAPintar+1) 
        pintarCombinacion(todasLasCombinaciones[combinacionAPintar])
    })

    document.querySelector('#siguiente').addEventListener('click', () => {
        combinacionAPintar++;
        mensajeCombinacionElement.innerHTML = (combinacionAPintar+1)
        pintarCombinacion(todasLasCombinaciones[combinacionAPintar])
    })
}


function pintarCombinacion(combinacionAPintar) {
    console.log(combinacionAPintar)
    let divs = document.querySelectorAll("#tablero > div")
    for (let i = 0; i < divs.length; i++) 
        divs[i].removeAttribute('style')
    

    let con = 0;
    for (let i = 0; i < combinacionAPintar.length; i++) {
        for (let j = 0; j < combinacionAPintar[i].length; j++) {
            if(combinacionAPintar[i][j] == 1) {
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