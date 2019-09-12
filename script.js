let grid = 4;
let array = new Array(grid * grid);
var arrayEmptyPos = new Array();

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
        if (array[i] == undefined) {
            arrayEmptyPos.push(i);
        }
    }
    if (arrayEmptyPos.length == 0) {
        document.removeEventListener("keydown", gameOver);
        return false;
    }
    return true;
    console.log(arrayEmptyPos, "emptyyyyyarrpos");
}

function randomInsert() {
    if (getArrayEmptyPos()) {
        let index = arrayEmptyPos[Math.floor(Math.random() * arrayEmptyPos.length)];
        let k = Math.floor(2 * Math.random());
        if (k == 0) val = 2;
        else val = 4;
        // document.getElementById('val-' + (index + 1));
        array[index] = val;
        document
            .getElementById("val-" + (index + 1))
            .getElementsByTagName("div")[0].innerHTML = val;
        // console.log(document.getElementById('val-' + (index + 1)).getElementsByTagName('div'));
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
                array[i * grid + j] == undefined ? "" : array[i * grid + j];
        }
    }
    randomInsert();
}

function handleMovements(event) {
    switch (event.key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            console.log(array, "In <=");
            for (let row = 0; row < grid; row++) {
                for (let col = 0; col < grid - 1; col++) {
                    let flag = false;
                    for (let k = row * grid + col + 1; k > row * grid; k--) {
                        if (array[k] != array[k - 1] && array[k - 1] == undefined) {
                            array[k - 1] = array[k];
                            array[k] = undefined;
                        } else if (array[k] == array[k - 1] && array[k] != undefined && !flag) {
                            array[k - 1] *= 2;
                            array[k] = undefined;
                            flag = true;
                        }
                    }
                }
            }
            console.log(array);
            updateGridValue();
            break;
        case "ArrowRight":
            break;
    }
    console.log(array);
    console.log(event.key);
}

function main() {
    gameEnv(grid);
    getArrayEmptyPos(array);
    randomInsert();
    document.addEventListener("keydown", function(event) {
        handleMovements(event);
    });
}

// document.addEventListener("onKe")

main();
