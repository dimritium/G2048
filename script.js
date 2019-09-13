import { GridElement } from "/modules/TypeModule.js";

let gride = new GridElement(4, false);

let grid = 4;
let array = new Array(grid * grid);
var arrayEmptyPos = new Array();

for (let i = 0; i < grid * grid; i++) {
    array[i] = new GridElement(0, true);
}

console.log(array[0].value);

function gameEnv(grid) {
    let gameEnv = document.getElementById("game-env");
    let gameEnvTable = "";
    gameEnvTable += "<table>";
    for (let i = 0; i < grid; i++) {
        gameEnvTable += "<tr>";
        for (let j = 0; j < grid; j++) {
            gameEnvTable +=
                '<td class="block" id="val-' + (i * grid + (j + 1)) + '"><div></div></td>';
        }
        gameEnvTable += "</tr>";
    }
    gameEnv.innerHTML = gameEnvTable;
}

function gameOver() {
    alert("Game Over");
}

function getArrayEmptyPos() {
    // arrayEmptyPos.fill(undefined);
    arrayEmptyPos.length = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].value == 0) {
            arrayEmptyPos.push(i);
        }
    }
    if (arrayEmptyPos.length == 0) {
        document.removeEventListener("keydown", gameOver);
        return false;
    }
    return true;
}

function randomInsert() {
    if (getArrayEmptyPos()) {
        let val;
        let index = arrayEmptyPos[Math.floor(Math.random() * arrayEmptyPos.length)];
        let k = Math.floor(2 * Math.random());
        if (k == 0) val = 2;
        else val = 4;
        array[index].value = val;
        document
            .getElementById("val-" + (index + 1))
            .getElementsByTagName("div")[0].innerHTML = val;
    } else {
        alert("GameOver");
    }
}

function updateGridValue() {
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            document
                .getElementById("val-" + (i * grid + j + 1))
                .getElementsByTagName("div")[0].innerHTML =
                array[i * grid + j].value == 0 ? "" : array[i * grid + j].value;
        }
    }
    randomInsert();
}

function handleMovements(event) {
    switch (event.key) {
        case "ArrowUp":
            for (let row = 0; row < grid; row++) {
                let flag = false;
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = (col + 1) * grid + row; k > row; k -= 4) {
                        if (array[k].value != array[k - grid].value && array[k - grid].value == 0) {
                            array[k - grid] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k - grid].value &&
                            array[k].value != 0 &&
                            !flag
                        ) {
                            array[k - grid] = new GridElement(array[k - grid].value * 2, true);
                            array[k] = new GridElement(0, true);
                            flag = true;
                        }
                    }
                }
            }
            break;

        //TODO
        case "ArrowDown":
            for (let row = 0; row < grid; row++) {
                let flag = false;
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = (col + 1) * grid + row; k < (row; k += 4) {
                        if (array[k].value != array[k + grid].value && array[k + grid].value == 0) {
                            array[k + grid] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k + grid].value &&
                            array[k].value != 0 &&
                            !flag
                        ) {
                            array[k + grid] = new GridElement(array[k + grid].value * 2, true);
                            array[k] = new GridElement(0, true);
                            flag = true;
                        }
                    }
                }
            }
            break;

        case "ArrowLeft":
            for (let row = 0; row < grid; row++) {
                let flag = false;
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = row * grid + col + 1; k > row * grid; k--) {
                        if (array[k].value != array[k - 1].value && array[k - 1].value == 0) {
                            array[k - 1] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k - 1].value &&
                            array[k].value != 0 &&
                            !flag
                        ) {
                            array[k - 1] = new GridElement(array[k - 1].value * 2, true);
                            array[k] = new GridElement(0, true);
                            flag = true;
                        }
                    }
                }
            }
            console.log(array);
            break;

        case "ArrowRight":
            for (let row = 0; row < grid; row++) {
                let flag = false;
                for (let col = 1; col < grid; col++) {
                    for (let k = (row + 1) * grid - (col + 1); k < (row + 1) * grid - 1; k++) {
                        if (array[k].value != array[k + 1].value && array[k + 1].value == 0) {
                            array[k + 1] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k + 1].value &&
                            array[k].value != 0 &&
                            !flag
                        ) {
                            array[k + 1] = new GridElement(array[k + 1].value * 2, true);
                            array[k] = new GridElement(0, true);
                            flag = true;
                        }
                    }
                }
            }
            break;
    }
    updateGridValue();
    console.log(array);
    console.log(event.key);
}

function main() {
    gameEnv(grid);
    getArrayEmptyPos(array);
    randomInsert();
    document.addEventListener("keydown", function(event) {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            handleMovements(event);
        }
    });
}

// document.addEventListener("onKe")

main();
