function getParameterFromURL(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

function selectCharacter(characterId) {
    document.getElementById(characterId).checked = true;
    document.selectForm.submit();
}

function readyGame() {
    const loc = document.querySelector("#game > div")
    loc.classList.add("parent-container");
    loc.firstElementChild.remove()
    loc.insertAdjacentHTML("beforeend", `<div class="board"></div>`)
}

function restartGame() {
    const loc = document.querySelector("#game > div")
    c = loc.childElementCount
    for (let i = 0; i < c; i++) {
        loc.children[0].remove()
    }
    loc.insertAdjacentHTML("beforeend", `<div class="board"></div>`)
    main()
}


document.addEventListener('DOMContentLoaded', function () {
    if (getParameterFromURL("chara") === "takina" || getParameterFromURL("chara") === "chisato") {
        readyGame()
        main()
    }
});

function main() {
    const displayer = document.querySelector("#game > h2");
    const board = document.querySelector('.board');
    const cells = [];
    let place_loc = [];

    const EMPTY = 0;
    const takina = 1; //takina
    const chisato = 2; //chisato
    let piece = {
        1: 2,
        2: 2
    }


    const initialBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let game = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let currentPlayer = takina;
    let user;
    if (getParameterFromURL("chara") === "takina") {
        user = takina

    } else if (getParameterFromURL("chara") === "chisato") {
        user = chisato
        setTimeout(computerMove, 500);
    }
    fin = false
    display(currentPlayer, piece[takina], piece[chisato])


    function createBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (initialBoard[i][j] === EMPTY) {
                    cell.classList.add('empty');
                } else if (initialBoard[i][j] === takina) {
                    cell.classList.add('takina');
                } else if (initialBoard[i][j] === chisato) {
                    cell.classList.add('chisato');
                }

                cells.push(cell);
                cell.addEventListener('click', function () {
                    if (fin) {
                        return
                    }
                    if (!can_place(i, j, currentPlayer, true)) {
                        return
                    }

                    if (!canmove(getOpponent(currentPlayer))) {
                        if (is_game_finish(getOpponent(currentPlayer)) || (!canmove(currentPlayer))) {
                            //finish
                            display_fin(piece[takina], piece[chisato])
                            fin = true;
                            //console.log(game);
                            return
                        }
                        //pass to other
                        //console.log("pass");
                        currentPlayer = getOpponent(currentPlayer);

                    }

                    currentPlayer = getOpponent(currentPlayer);
                    display(currentPlayer, piece[takina], piece[chisato])
                    if (currentPlayer !== user) {
                        setTimeout(computerMove, 500);
                    }
                });
                board.appendChild(cell);
            }
        }
    }

    const directions = [{
            x: -1,
            y: -1
        },
        {
            x: -1,
            y: 0
        },
        {
            x: -1,
            y: 1
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: -1
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: 1
        }
    ];

    function can_place(r, c, player, shouldPlace) {
        is_ok = false;
        if (game[r][c] !== EMPTY) {
            return false;
        }

        for (let dir of directions) {
            let row = r + dir.x * 2;
            let col = c + dir.y * 2;

            if (isOutOfRange(row, col)) {
                continue;
            }
            otherplayer = getOpponent(player)
            if (game[row - dir.x][col - dir.y] !== otherplayer) {
                continue
            }
            count = 2;
            while ((!isOutOfRange(row, col)) && (game[row][col] !== 0)) {
                if (game[row][col] === player) {
                    is_ok = true;
                    if (shouldPlace) {
                        turnOver(r, c, player, dir, count)
                    }
                    break;
                }
                count++;
                row += dir.x;
                col += dir.y;
            }

        }
        if (shouldPlace) {
            if (is_ok) {
                place(player, r, c)
            }
        }
        return is_ok;
    }

    function place(player, r, c) {
        game[r][c] = player;
        cells[r * 8 + c].classList.remove('empty');
        cells[r * 8 + c].classList.add(player === takina ? 'takina' : 'chisato');
        piece[player]++
    }

    function canmove(player) {
        place_loc = []
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (can_place(i, j, player, false)) {
                    place_loc.push({
                        row: i,
                        col: j
                    })
                    continue
                }
            }
        }
        return place_loc.length > 0
    }

    function has_empty() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (game[i][j] === EMPTY) {
                    return true
                }
            }
        }
        return false
    }

    function isOutOfRange(row, col) {
        return !(row >= 0 && row < 8 && col >= 0 && col < 8);
    }

    function getOpponent(player) {
        return 3 ^ player;
    }

    function turnOver(r, c, player, dir, count) {
        for (i = 1; i < count; i++) {
            row = r + dir.x * i
            col = c + dir.y * i
            cells[row * 8 + col].classList.remove(player === takina ? 'chisato' : 'takina');
            piece[getOpponent(player)]--

            place(player, row, col)
        }

    }

    function is_game_finish(player) {
        if (!has_empty()) {
            return true
        }

        otherplayer = getOpponent(player);
        count = 0
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (game[i][j] == otherplayer) {
                    count++;
                }
            }
        }
        if (count === 0) {
            return true
        }
        return false
    }


    function computerMove() {
        let bestScore = -Infinity;
        let bestMove = null;
        canmove(currentPlayer)
        for (p of place_loc) {
            const score = evaluateMove(p.row, p.col, currentPlayer);
            if (score > bestScore) {
                bestScore = score;
                bestMove = p;
            }
        }


        if (bestMove) {
            cells[bestMove.row * 8 + bestMove.col].click()
        }
    }

    function evaluateMove(row, col, player) {
        let score = 0;


        for (let dir of directions) {
            let r = row + dir.x;
            let c = col + dir.y;
            let disksToFlip = [];
            while (!isOutOfRange(r, c) && game[r][c] === getOpponent(player)) {
                disksToFlip.push({
                    row: r,
                    col: c
                });
                r += dir.x;
                c += dir.y;
            }
            if (!isOutOfRange(r, c) && game[r][c] === player) {
                score += disksToFlip.length;
                continue
            }
        }

        return score;
    }

    function display(turn, takinaCount, chisatoCount) {

        displayer.innerHTML = `${turn === 1 ? "Takina" : "Chisato"}'s turn<br><span><img src="../images/game/face_takina_a.png" alt="" style="height: 2em;">${takinaCount} - ${chisatoCount}<img src="../images/game/face_chisato_b.png" alt="" style="height: 2em;"></span>`
    }

    function display_fin(takinaCount, chisatoCount) {
        let s;
        if (takinaCount > chisatoCount) {
            s = "Takina win!"
        } else if (takinaCount < chisatoCount) {
            s = "Chisato win!"
        } else {
            s = "Tie!"
        }
        displayer.innerHTML = `${s}<br><span><img src="../images/game/face_takina_a.png" alt="" style="height: 2em;">${takinaCount} - ${chisatoCount}<img src="../images/game/face_chisato_b.png" alt="" style="height: 2em;"></span>`
        const loc = document.querySelector("#game > div")
        let t;

        if (piece[user] > piece[getOpponent(user)]) {
            t = "win"
        } else if (piece[user] < piece[getOpponent(user)]) {
            t = "lose"
        } else {
            loc.insertAdjacentHTML("afterbegin", `<button type="button" onclick="restartGame()">Play Again!!</button><img src="../images/game/tie.jpg" alt="" style="width: 100%;"><br>`)
            return
        }

        loc.insertAdjacentHTML("afterbegin", `<button type="button" onclick="restartGame()">Play Again!!</button><img src="../images/game/${user}_${t}.jpg" alt="" style="width: 100%;"><br>`)
    }

    createBoard();
}