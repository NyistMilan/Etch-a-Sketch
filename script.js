const defaultSize = 16;
const defaultColor = '#333333';
const defaultMode = 'color';

let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

const grid = document.getElementById('grid');



function makeGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}

function resetGrid(){
    grid.innerHTML = "";
}

function clearGrid(){
    resetGrid();
    makeGrid(defaultSize);
}

function changeColor(e){
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
}

window.onload = () => {
    makeGrid(defaultSize);
}