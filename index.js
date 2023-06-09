let imagenes = [
    'imagen-0', 'imagen-1', 'imagen-2',
    'imagen-3', 'imagen-4', 'imagen-5',
    'imagen-6', 'imagen-7', 'imagen-8'
];


const puzzle = document.getElementById('puzzle')
const piezas = document.getElementById('piezas')
const mensaje = document.getElementById('mensaje')
const recomenzar = document.getElementById('restart')
console.log(puzzle.dataset)

recomenzar.style.display = 'none'



let terminado = imagenes.length

const varagearPuzzle = () => {
    while (imagenes.length) {
        const index = Math.floor(Math.random() * imagenes.length)
        const div = document.createElement('div');
        div.className = 'pieza';
        div.id = imagenes[index];
        div.draggable = true
        div.style.backgroundImage = `url("recursos/${imagenes[index]}.jpg")`
        piezas.appendChild(div)
        imagenes.splice(index, 1)
    }
}
crearContenedoresPuzzle = () => {
    for (let i = 0; i < terminado; i++) {
        const div = document.createElement('div');
        div.className = 'placeholder';
        div.dataset.id = i;
        puzzle.appendChild(div)
    }
}
varagearPuzzle()
crearContenedoresPuzzle()

piezas.addEventListener('dragstart', e => {
    e.dataTransfer.setData('id', e.target.id)
})

puzzle.addEventListener('dragover', e => {
    e.preventDefault();
    e.target.classList.add('hover')
})

puzzle.addEventListener('dragleave', e => {
    e.target.classList.remove('hover')
})

puzzle.addEventListener('drop', e => {
    e.target.classList.remove('hover')

    let id = e.dataTransfer.getData('id')
    const numero = id.split('-')[1];

    if (e.target.dataset.id === numero) {
        e.target.appendChild(document.getElementById(id))

        terminado--;

        if (terminado == 0) {
            document.body.classList.add('ganaste')
            recomenzar.style.display = 'block'
        }
    }
})
restart.addEventListener('click', e => {
    imagenes = [
        'imagen-0', 'imagen-1', 'imagen-2',
        'imagen-3', 'imagen-4', 'imagen-5',
        'imagen-6', 'imagen-7', 'imagen-8'
    ];
    terminado = imagenes.length;
    document.body.classList.remove('ganaste')
    var puzzle = document.getElementById("puzzle");
    var puzzleChildNodes = puzzle.childNodes;
    var childNodesArray = Array.from(puzzleChildNodes);

    for (var i = 0; i < childNodesArray.length; i++) {
        var childNode = childNodesArray[i];
        puzzle.removeChild(childNode);
    }
    varagearPuzzle()
    crearContenedoresPuzzle()
    recomenzar.style.display = 'none'

})


