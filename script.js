const defaultSize = 16;
const defaultColor = '#333333';
const defaultMode = 'color';

let currentSize = defaultSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

function setSize(newSize){
    currentSize = newSize;
}

function setColor(newColor){
    currentColor = newColor;
}

function setMode(newMode){
    buttonEffect(newMode);
    currentMode = newMode;
}

const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const outlineButton = document.getElementById('outline');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('erase');
const colorButton = document.getElementById('color');

clearButton.onclick = () => clearGrid();
slider.onmousemove = (e) => setSliderValue(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);
outlineButton.onclick = () => toggleOutline();
colorPicker.onchange = (e) => setColor(e.target.value)
eraserButton.onclick = (e) => setMode('eraser');
colorButton.onclick = (e) => setMode('color');

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
        gridElement.addEventListener('click', chooseColor);
        grid.appendChild(gridElement);
    }
}

function resetGrid(){
    grid.innerHTML = "";
}

function clearGrid(){
    let needOutline = true;

    if(grid.firstChild.className == 'unit')
    needOutline = false;

    resetGrid();
    makeGrid(currentSize, needOutline);
}

function chooseColor(e){
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = '#F5F5F5';
    }
}

function buttonEffect(newMode){
    if(currentMode === 'color')
        colorButton.classList.remove('buttonActive');
    else if(currentMode === 'eraser')
        eraserButton.classList.remove('buttonActive');

    if(newMode === 'color')
        colorButton.classList.add('buttonActive');
    else if(newMode === 'eraser')
        eraserButton.classList.add('buttonActive');
}

window.onload = () => {
    makeGrid(defaultSize, false);
    buttonEffect(defaultMode);
}