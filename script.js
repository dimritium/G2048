let grid = 4;
let array = new Array(grid * grid);
let arrayEmptyPos = new Array();

function gameEnv(grid) {
    let gameEnv = document.getElementById("game-env");
    let gameEnvTable = '';
    gameEnvTable += '<table>';
    for (let i = 0; i < grid; i++) {
        gameEnvTable += '<tr>';
        for (let j = 0; j < grid; j++) {
            gameEnvTable += '<td class="block" id="val-' + (i * grid + (j + 1)) + '"><div></div></td>';
        }
        gameEnvTable += '</tr>'
    }
    gameEnv.innerHTML = gameEnvTable;
}

function getArrayEmptyPos(array) {
    // arrayEmptyPos.fill(undefined);
    for (let i = 0; i < array.length; i++) {
        if (array[i] == undefined && !arrayEmptyPos.includes(i)) {
            arrayEmptyPos.push(i);
        }
    }
    console.log(arrayEmptyPos);
}

function randomInsert() {
    getArrayEmptyPos(array);
    let index = arrayEmptyPos[Math.floor(Math.random() * arrayEmptyPos.length)];
    let k = Math.floor(2 * Math.random());
    if (k == 0)
        val = 2;
    else
        val = 4;
    // document.getElementById('val-' + (index + 1));
    document.getElementById('val-' + (index + 1)).getElementsByTagName('div')[0].innerHTML = val;
    // console.log(document.getElementById('val-' + (index + 1)).getElementsByTagName('div'));
}

function updateGridAndArray(event) {
    switch(event.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            break;
        case "ArrowRight":
            break;
    }
    console.log(event.key);
}

function main() {
    gameEnv(grid);
    getArrayEmptyPos(array);
    randomInsert();
    document.addEventListener("keydown", function (event) { updateGridAndArray(event) });
}

// document.addEventListener("onKe")

main();