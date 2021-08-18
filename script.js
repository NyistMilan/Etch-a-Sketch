const defaultSize = 16;
const defaultColor = '#333333';
const defaultMode = 'color';

let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

function setSize(value){
    currentSize = value;
}

function setColor(value){
    currentColor = value;
}

function setMode(value){
    currentMode = value;
}

const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const outlineButton = document.getElementById('outline');

clearButton.onclick = () => clearGrid();
slider.onmousemove = (e) => setSliderValue(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);
outlineButton.onclick = () => toggleOutline();

function toggleOutline(){
    grid.childNodes.forEach((element) => {
        if(element.className == "unit"){
            element.classList.remove('unit');
        }
        else{
            element.classList.add('unit');
        }
    });
}


function changeSize(value){
    setSize(value);
    setSliderValue(value);
    clearGrid();
}

function setSliderValue(value){
    sliderText.textContent = value + " x " + value;
}

function makeGrid(size, needOutline){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        if(!needOutline)
            gridElement.classList.add('unit');
        gridElement.addEventListener('click', function(e){
            e.target.style.backgroundColor = '#333333';
        });
        grid.appendChild(gridElement);
    }
}

function resetGrid(){
    grid.innerHTML = "";
}

function clearGrid(){
    let needOutline = true;
    console.log(grid.firstChild.className);

    if(grid.firstChild.className == 'unit')
    needOutline = false;

    resetGrid();
    makeGrid(currentSize, needOutline);
}

window.onload = () => {
    makeGrid(defaultSize, false);
}