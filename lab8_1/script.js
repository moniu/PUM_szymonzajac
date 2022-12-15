let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
let time = 0;

document.onclick = clickHandler;
document.onkeydown = keyHandler;

let linesX = 9;
let linesY = 9;
let pieceSizeX = 800 / (linesX+1)
let pieceSizeY = 600 / (linesY+1)

const pieceState = {
    Empty: "Empty",
    Black: "Black",
    White: "White"
};

let board = new Array(linesY)
for (var y=0; y < linesY; y++){
    board[y] = new Array(linesX);
    for (var x=0; x<linesX; x++) {
        board[y][x] = pieceState.Empty;
    }
}

let turn = "Black";

ctx.font = '16px Consolas';
refreshCanvas()

function refreshCanvas() {
    paintBackground()
    paintAllPieces()
    printWhoseTurn()
}

function paintBackground() {
    ctx.fillStyle = "#BBB145";
    ctx.fillRect(0, 0, 800, 600);

    ctx.fillStyle = "#FFF"
    for(var x = 0; x < linesX; x++) {
        ctx.beginPath();
        ctx.moveTo(pieceSizeX*(x+1), pieceSizeY)
        ctx.lineTo(pieceSizeX*(x+1), 600-pieceSizeY)
        ctx.stroke();
    }

    for(var y = 0; y < linesY; y++) {
        ctx.beginPath();
        ctx.moveTo(pieceSizeX, pieceSizeY*(y+1))
        ctx.lineTo(800 - pieceSizeX, pieceSizeY*(y+1))
        ctx.stroke();
    }
}

function paintAllPieces() {
    for (var y=0; y < linesY; y++){
        for (var x=0; x<linesX; x++) {
            paintPiece(x, y, board[y][x])
        }
     }
}

function paintPiece(x, y, color) {
    if (color == pieceState.Empty) {
        return;
    }
    var radius = Math.min(pieceSizeX, pieceSizeY)/2.2;

    if (color == pieceState.White) {
        ctx.fillStyle = "#DDD";
        ctx.beginPath();
        ctx.arc((x+1) * pieceSizeX, (y+1) * pieceSizeY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "#EEE";
        ctx.beginPath();
        ctx.arc((x+1) * pieceSizeX, (y+1) * pieceSizeY, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
    if (color == pieceState.Black) {
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc((x+1) * pieceSizeX, (y+1) * pieceSizeY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc((x+1) * pieceSizeX, (y+1) * pieceSizeY, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function printWhoseTurn() {
    ctx.fillStyle = "#FFF"
    ctx.fillText(turn+"s turn",5,12)
}

function swapTurn() {
    if (turn == pieceState.White)
        turn = pieceState.Black
    else turn = pieceState.White
}

function keyHandler(event) {
    if (event.which == 32) {
        swapTurn();
        refreshCanvas();
        return;
    }
}

function getBoardClone() {
    return JSON.parse(JSON.stringify(board));
}

function clickHandler(event) {
    var clickedX = Math.round(event.offsetX/pieceSizeX) - 1;
    var clickedY = Math.round(event.offsetY/pieceSizeY) - 1;

    if (board[clickedY][clickedX] == pieceState.Empty) {
        board[clickedY][clickedX] = turn;
        swapTurn();
    }

    var groups = generateGroups();
    groups.forEach(g => {
        if (isGroupSurrounded(g)) {
            if (countEylets(g) < 2)
                killGroup(g);
        }
    })

    refreshCanvas();
}

function generateGroups() {
    var groups = []
    for (var y = 0; y < linesY; y++){
        for (var x = 0; x < linesX; x++) {
            if (board[y][x] == pieceState.Empty) {
                continue;
            }
            if (getPiecesGroup(x, y, groups) == null) {
                createGroup(x, y, groups);
            }
        }
    }
    return groups;
}

function createGroup(x, y, groups) {
    var newGroup = []
    groups.push(newGroup)
    recursiveAddToGroup(x, y, newGroup);
}

function recursiveAddToGroup(x, y, group) {
    if (isPieceInGroup(x, y, group)) {
        return;
    }

    group.push({x:x,y:y})

    var color = board[y][x];

    if (x > 0) {
        if (board[y][x-1] == color) {
            recursiveAddToGroup(x-1, y, group)
        }
    }
    if (y > 0) {
        if (board[y-1][x] == color) {
            recursiveAddToGroup(x, y-1, group)
        }
    }
    if (x < linesX-1) {
        if (board[y][x+1] == color) {
            recursiveAddToGroup(x+1, y, group)
        }
    }
    if (y < linesY-1) {
        if (board[y+1][x] == color) {
            recursiveAddToGroup(x, y+1, group)
        }
    }
}

function getPiecesGroup(x, y, groups) {
    var foundGroup = null;
    groups.forEach(g => {
        if (isPieceInGroup(x, y, g)) {
            foundGroup = g;
            return;
        }
    })
    return foundGroup;
}

function isPieceInGroup(x, y, group) {
    var returnValue = false;
    group.forEach(p => {
        if (p.x == x && p.y == y)
        returnValue = true;
        return;
    })
    return returnValue;
}

function killGroup(group) {
    group.forEach(p => {
        board[p.y][p.x] = pieceState.Empty;
    })
}

function isEyelet(x, y) {
    var emptyNeighbours = 0;
    if (x > 0) {
        if (board[y][x-1] == pieceState.Empty) {
            emptyNeighbours++;
        }
    }
    if (y > 0) {
        if (board[y-1][x] == pieceState.Empty) {
            emptyNeighbours++;
        }
    }
    if (x < linesX-1) {
        if (board[y][x+1] == pieceState.Empty) {
            emptyNeighbours++;
        }
    }
    if (y < linesY-1) {
        if (board[y+1][x] == pieceState.Empty) {
            emptyNeighbours++;
        }
    }
    return emptyNeighbours == 0;
}

function countEylets(group) {
    var eylets = [];
    group.forEach(p => {
        eylets += getEyletNeighbours(p.x, p.y);
    })

    eylets.filter((v,i,a) => {
        if (a.find(v) != i)
            return false;
        return true;
    })
    return eylets.length;

}

function isGroupSurrounded(group) {
    var isSurrounded = true;
    group.forEach(p => {
        if (!isPieceSurrounded(p.x, p.y)) {
            isSurrounded = false;
        }
    })
    return isSurrounded;
}

function isPieceSurrounded(x, y) {
    if (x > 0) {
        if (board[y][x-1] == pieceState.Empty) {
            if (!isEyelet(x-1, y)) {
                return false;
            }
        }
    }
    if (y > 0) {
        if (board[y-1][x] == pieceState.Empty) {
            if (!isEyelet(x, y-1)) {   
                return false;
            }
        }
    }
    if (x < linesX-1) {
        if (board[y][x+1] == pieceState.Empty) {
            if (!isEyelet(x+1, y)) {   
                return false;
            }
        }
    }
    if (y < linesY-1) {
        if (board[y+1][x] == pieceState.Empty) {
            if (!isEyelet(x, y+1)) {   
                return false;
            }
        }
    }
    return true;
}

function getEyletNeighbours(x, y) {
    var eylets = [];
    if (x > 0) {
        if (board[y][x-1] == pieceState.Empty) {
            if (isEyelet(x-1, y)) {
                eylets.push({x:x-1, y:y})
            }
        }
    }
    if (y > 0) {
        if (board[y-1][x] == pieceState.Empty) {
            if (isEyelet(x, y-1)) {   
                eylets.push({x:x, y:y-1})
            }
        }
    }
    if (x < linesX-1) {
        if (board[y][x+1] == pieceState.Empty) {
            if (!isEyelet(x+1, y)) {   
                eylets.push({x:x+1, y:y})
            }
        }
    }
    if (y < linesY-1) {
        if (board[y+1][x] == pieceState.Empty) {
            if (!isEyelet(x, y+1)) {   
                eylets.push({x:x, y:y+1})
            }
        }
    }
    return eylets;
}