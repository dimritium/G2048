// import { GridElement } from "/types/GridElement.js";

class GridElement {
    constructor(value, canMerge) {
        this.value = value;
        this.canMerge = canMerge;
    }
}

let grid = 4;
let array = new Array(grid * grid);
let arrayEmptyPos = new Array();

for (let i = 0; i < grid * grid; i++) {
    array[i] = new GridElement(0, true);
}

function gameEnv(grid) {
    let gameEnv = document.getElementById("game-env");
    let gameEnvTable = '';
    gameEnvTable += '<table class="table is-bordered">';
    for (let i = 0; i < grid; i++) {
        gameEnvTable += "<tr>";
        for (let j = 0; j < grid; j++) {
            gameEnvTable +=
                '<td id="val-' + (i * grid + (j + 1)) + '"><div class="block"></div></td>';
        }
        gameEnvTable += "</tr>";
    }
    gameEnv.innerHTML = gameEnvTable;
}

function gameWon() {
    alert("You Won The Game!!!!, you can continue to play");
}

function gameOver() {
    alert("Game Over");
    location.reload();
}

function isMovePossible() {
    for (let i = 0; i < grid - 1; i++) {
        for (let j = (i * grid); j < (i * grid + grid); j++) {
            if (j == (i * grid + grid - 1)) {
                if(array[j].value == array[j+4].value) {
                    return true;
                }
            } else {
                if(array[j].value == array[j+4].value || array[j].value == array[j+1].value) {
                    return true;
                }
            }
        }
    }
    return false;
}

function getArrayEmptyPos() {
    arrayEmptyPos.length = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].value == 0) {
            arrayEmptyPos.push(i);
        }
    }

    if (arrayEmptyPos.length == 0) {
        if (isMovePossible()) {
            return false;
        } else {
            document.removeEventListener("keydown", gameOver());
            return false;
        }
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

function updateCanMerge() {
    for (let i = 0; i < grid * grid; i++) {
        array[i].canMerge = true;
    }
    console.log(array);
}

function handleMovements(event) {
    switch (event.key) {
        case "ArrowUp":
            for (let row = 0; row < grid; row++) {
                updateCanMerge();
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = (col + 1) * grid + row; k > row; k -= 4) {
                        if (array[k].value != array[k - grid].value && array[k - grid].value == 0) {
                            array[k - grid] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k - grid].value &&
                            array[k].value != 0 &&
                            array[k - grid].canMerge && array[k].canMerge
                        ) {
                            array[k - grid] = new GridElement(array[k - grid].value * 2, false);
                            if(array[k - grid].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);

                        }
                    }
                }
            }
            break;

        case "ArrowDown":
            for (let row = 0; row < grid; row++) {
                updateCanMerge(array);
                for (let col = grid - 2; col >= 0; col--) {
                    for (let k = col * grid + row; k < (grid) * (grid - 1) + row; k += 4) {
                        if (array[k].value != array[k + grid].value && array[k + grid].value == 0) {
                            array[k + grid] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k + grid].value &&
                            array[k].value != 0 &&
                            array[k + grid].canMerge && array[k].canMerge
                        ) {
                            array[k + grid] = new GridElement(array[k + grid].value * 2, false);
                            if(array[k + grid].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);

                        }
                    }
                }
            }
            break;

        case "ArrowLeft":
            for (let row = 0; row < grid; row++) {
                updateCanMerge(array);
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = row * grid + col + 1; k > row * grid; k--) {
                        if (array[k].value != array[k - 1].value && array[k - 1].value == 0) {
                            array[k - 1] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k - 1].value &&
                            array[k].value != 0 &&
                            array[k - 1].canMerge && array[k].canMerge
                        ) {
                            array[k - 1] = new GridElement(array[k - 1].value * 2, false);
                            if(array[k - 1].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);

                        }
                    }
                }
            }
            break;

        case "ArrowRight":
            for (let row = 0; row < grid; row++) {
                updateCanMerge(array);
                for (let col = 1; col < grid; col++) {
                    for (let k = (row + 1) * grid - (col + 1); k < (row + 1) * grid - 1; k++) {
                        if (array[k].value != array[k + 1].value && array[k + 1].value == 0) {
                            array[k + 1] = array[k];
                            array[k] = new GridElement(0, true);
                        } else if (
                            array[k].value == array[k + 1].value &&
                            array[k].value != 0 &&
                            array[k + 1].canMerge && array[k].canMerge
                        ) {
                            array[k + 1] = new GridElement(array[k + 1].value * 2, false);
                            if(array[k + 1].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);

                        }
                    }
                }
            }
            break;
    }
    updateGridValue();
}

(function main() {
    gameEnv(grid);
    getArrayEmptyPos(array);
    randomInsert();
    document.addEventListener("keydown", function (event) {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            handleMovements(event);
        }
    });
}());
