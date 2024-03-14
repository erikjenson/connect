//minimax as described in the awesome video by Keith Galli (https://www.youtube.com/@KeithGalli)

const rowCount = 6
const colCount = 7
const playerPiece = 1
const aiPiece = 2

function minimax(board, depth, alpha, beta, maximizingPlayer){
    //check for open columns
	let openColumns = getOpenColumns(board)
    //check for tree depth, win, loss, or full board
    let isTerminal = isTerminalNode(board)
    if(depth === 0 || isTerminal){
        if(isTerminal){
            if (winningMove(board, aiPiece)){
                return [null, 100000000000000]
            }
            else if (winningMove(board, playerPiece)){
                return [null, -10000000000000]
            }
            //no more valid moves
            else {
                return [null, 0]
            }
        } else {
        //depth === 0
            return [null, scorePosition(board, aiPiece)]
        }
    }
    //the maximizing player scores the AI best move
    //it will return the highest possible score from child nodes         
	if (maximizingPlayer){
        //initialize value to store largest score
		let value = Number.NEGATIVE_INFINITY
        let column = 0

		//iterate over open columns to test moves
        for(let i = 0; i < openColumns.length; i++){
            let c = openColumns[i]
			let row = getNextOpenRow(board, c)
            //we don't want to update the original game board data here
            let bCopy = []
            for (let i = 0; i < board.length; i++){
                bCopy[i] = board[i].slice()
            }
            //add an AI piece to copy of board in the next open column
			dropPiece(bCopy, row, c, aiPiece)
            //make recursive call for the minimizing player's next test move and return a score for following this branch
			let newScore = minimax(bCopy, depth-1, alpha, beta, false)[1]
			//update the best score and column
            if (newScore > value){
				value = newScore
				column = c
            }
            //"alpha beta pruning" to conserve memory at greater depths
            //beta represents the minimizer's best while alpha is maximizer's best from higher nodes on this branch. In this case if the maximizer's current best (alpha) is bigger than the minimizer's best (beta) then don't bother returning a value because it wouldn't get chosen by the minimizer if it was returned and that branch was followed.

            //These are variables in scope passed down from the previous minimax call and updated here for subsequent minimax calls in the for loop.
			alpha = alpha > value ? alpha : value;
            
			if (alpha >= beta){
				break
            }
        }
		return [column, value]
    } 
    else {
    //the minimizer player scores the Player best move
    //it will return the lowest possible score from child nodes 
    let value = Infinity
    let column = 0

    for(let i = 0; i < openColumns.length; i++){
        let c = openColumns[i]
        let row = getNextOpenRow(board, c)
        let b_copy = [];
        //the loop is needed for a copy of nested arrays
        for (let i = 0; i < board.length; i++){
            b_copy[i] = board[i].slice()
        }
        dropPiece(b_copy, row, c, playerPiece)

        let newScore = minimax(b_copy, depth-1, alpha, beta, true)[1]

        if (newScore < value){
            value = newScore
            column = c
        }

        //beta is set for nodes down the branches of the max and min calls above
        beta = beta < value ? beta : value;
        
        //beta is the current minimizer best score. If a maximizer above this node on this branch has found a larger value (alpha), further checks on this branch will be skipped
        if (alpha >= beta){
            break
        }
    }
    return [column, value]
    }
}

//the heuristic for scoring a group of four on the board
function checkGroup(group, piece){
	let score = 0
	let opponentPiece = piece === aiPiece ? playerPiece : aiPiece;

    if (group.filter(p => p === piece).length === 3 && group.filter(p => p === 0).length === 1){
		score += 5
    }
    else if (group.filter(p => p === piece).length === 2 && group.filter(p => p === 0).length === 2){
		score += 2
    }
	//reduce the score if this board results in 3 in a group for the opponent to favor another move
    if (group.filter(p => p === opponentPiece).length === 3 && group.filter(p => p === 0).length === 1){
		score -= 6
    }
	return score
}

//return a score for the board by checking all groups of four
function scorePosition(board, piece){
	let score = 0
    
	//score center column due to the greater value of placing pieces there
    let centerCount = 0
    let centerCol = Math.floor(colCount/2)
    for(let r = 0; r < rowCount; r++){
        if(board[r][centerCol] == piece){
            centerCount++
        }
    }
    score += centerCount * 3

    //score rows
    for(let r = 0; r < rowCount; r++){
        let rowArray = board[r]
        for(let c = 0; c < colCount-3; c++){
            let group = rowArray.slice(c,c+4)
            
            score += checkGroup(group, piece)
        }
    }
	//score columns
    for(let c = 0; c < colCount; c++){
        let colArray = []
        for(let r = 0; r < rowCount; r++){
            colArray.push(board[r][c])
        }
        for(let r = 0; r < rowCount-3; r++){
            let group = colArray.slice(r, r+4)
            score += checkGroup(group, piece)
        }
    }
	//score positive sloped diagonals
    for(let r = 0; r < rowCount-3; r++){
        for(let c = 0; c < colCount-3; c++){
            let group = []
            for(let i = 0; i < 4; i++){
                group.push(board[r+i][c+i])
            }
            score += checkGroup(group, piece)
        }
    }    
	//score negative sloped diagonals
    for(let r = 0; r < rowCount-3; r++){
        for(let c = 0; c < colCount-3; c++){
            let group = []
            for(let i = 0; i < 4; i++){
                group.push(board[r+3-i][c+i])
            }
            score += checkGroup(group, piece)
        }
    }
	return score
}

//return indexes of open columns in the top row
function getOpenColumns(board){
    let columns = [];
    for(let i = 0; i < colCount; i++){
        if(board[0][i] == 0){
            columns.push(i);
        }
    }
    return columns
}

//return the index of the lowest empty row in a given column
function getNextOpenRow(board, col){
    for(let i = board.length-1; i >=0; i--){
        if(board[i][col] === 0){
            return i;
        }
    }
}

//add a piece to test in the copy board array
function dropPiece(board, row, col, piece){
    board[row][col] = piece
}

//return true if the game is over (win, loss, tie)
function isTerminalNode(board){
    let isTerminal = (winningMove(board, aiPiece) || winningMove(board, playerPiece) || getOpenColumns(board).length === 0)
    return isTerminal
}

//return true if the board has a connect 4 for the given player
function winningMove(board, piece){
    //Check rows for win
	for (let c = 0; c < colCount-3; c++){
		for (let r = 0; r < rowCount; r++){
			if (board[r][c] == piece && board[r][c+1] == piece && board[r][c+2] == piece && board[r][c+3] == piece){
				return true
            }
        }
    }
	//Check columns for win
	for (let c = 0; c < colCount; c++){
		for (let r = 0; r < rowCount-3; r++){
			if (board[r][c] == piece && board[r+1][c] == piece && board[r+2][c] == piece && board[r+3][c] == piece){
				return true
            }
        }
    }
	//Check positively sloped diagonals
	for (let c = 0; c < colCount-3; c++){
		for (let r = 0; r < rowCount-3; r++){
			if (board[r][c] == piece && board[r+1][c+1] == piece && board[r+2][c+2] == piece && board[r+3][c+3] == piece){
				return true
            }
        }
    }
	//Check negatively sloped diagonals
	for (let c = 0; c < colCount-3; c++){
		for (let r = 3; r < rowCount; r++){
			if (board[r][c] == piece && board[r-1][c+1] == piece && board[r-2][c+2] == piece && board[r-3][c+3] == piece){
				return true
            }
        }
    }
}

export default minimax