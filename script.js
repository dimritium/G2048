class GridElement {
    style = "";
    constructor(value, canMerge) {
        this.value = value;
        this.canMerge = canMerge;
    }
}

let rainbow = new Rainbow();
rainbow.setNumberRange(2, 2048);

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
                if (array[j].value == array[j + 4].value) {
                    return true;
                }
            } else {
                if (array[j].value == array[j + 4].value || array[j].value == array[j + 1].value) {
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
        
            // document
            // .getElementById("val-" + (index + 1)).style.backgroundColor = "#" + rainbow.colorAt(val);
    }
}

function updateGridValue() {
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            document
                .getElementById("val-" + (i * grid + j + 1))
                .getElementsByTagName("div")[0].innerHTML =
                array[i * grid + j].value == 0 ? "" : array[i * grid + j].value;
            
                // document
                // .getElementById("val-" + (i * grid + j + 1)).style.backgroundColor = "#" + (rainbow.colorAt(array[i * grid + j].value));
        }
    }
    randomInsert();
}

function updateCanMerge() {
    for (let i = 0; i < grid * grid; i++) {
        array[i].canMerge = true;
    }
}

function handleMovements(key) {
    let isGridMoved = false;
    switch (key) {
        case "ArrowUp":
            for (let row = 0; row < grid; row++) {
                updateCanMerge();
                for (let col = 0; col < grid - 1; col++) {
                    for (let k = (col + 1) * grid + row; k > row; k -= 4) {
                        if (array[k].value != array[k - grid].value && array[k - grid].value == 0) {
                            array[k - grid] = array[k];
                            array[k] = new GridElement(0, true);
                            isGridMoved = true;
                        } else if (
                            array[k].value == array[k - grid].value &&
                            array[k].value != 0 &&
                            array[k - grid].canMerge && array[k].canMerge
                        ) {
                            array[k - grid] = new GridElement(array[k - grid].value * 2, false);
                            if (array[k - grid].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);
                            isGridMoved = true;
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
                            isGridMoved = true;
                        } else if (
                            array[k].value == array[k + grid].value &&
                            array[k].value != 0 &&
                            array[k + grid].canMerge && array[k].canMerge
                        ) {
                            array[k + grid] = new GridElement(array[k + grid].value * 2, false);
                            if (array[k + grid].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);
                            isGridMoved = true;
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
                            isGridMoved = true;
                        } else if (
                            array[k].value == array[k - 1].value &&
                            array[k].value != 0 &&
                            array[k - 1].canMerge && array[k].canMerge
                        ) {
                            array[k - 1] = new GridElement(array[k - 1].value * 2, false);
                            if (array[k - 1].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);
                            isGridMoved = true;
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
                            isGridMoved = true;
                        } else if (
                            array[k].value == array[k + 1].value &&
                            array[k].value != 0 &&
                            array[k + 1].canMerge && array[k].canMerge
                        ) {
                            array[k + 1] = new GridElement(array[k + 1].value * 2, false);
                            if (array[k + 1].value == 2048) {
                                gameWon();
                            }
                            array[k] = new GridElement(0, true);
                            isGridMoved = true;
                        }
                    }
                }
            }
            break;
    }
    if (isGridMoved)
        updateGridValue();
    else 
        getArrayEmptyPos();
}

(function main() {
    gameEnv(grid);
    getArrayEmptyPos(array);
    randomInsert();
    document.addEventListener("keydown", function (event) {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
            handleMovements(event.key);
        }
    });

    let element = document.getElementById("game");
    let swipemanager = new Hammer.Manager(element, {
        recognizers: [
            [Hammer.Swipe, { velocity: 0.1, threshold: 5, direction: Hammer.DIRECTION_ALL }],
        ]
    });

    swipemanager.set({ enable: true });
    swipemanager.on("swipe", function (ev) {
        if (ev.direction == 2) {
            handleMovements("ArrowLeft");
        } else if (ev.direction == 4) {
            handleMovements("ArrowRight");
        } else if (ev.direction == 8) {
            handleMovements("ArrowUp");
        } else if (ev.direction == 16) {
            handleMovements("ArrowDown");
        }
    });

}());
