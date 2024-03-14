
//returns array of winning coords from the last move
function checkBoard(row, col, arr){
    const vertical = checkVertical(row, col, arr)
    if(vertical.length > 3) return vertical

    const horizontal = checkHorizontal(row, col, arr)
    if(horizontal.length > 3) return horizontal

    const posSlope = checkPositiveSlope(row, col, arr)
    if(posSlope.length > 3) return posSlope

    const negSlope = checkNegativeSlope(row, col, arr)
    if(negSlope.length > 3) return negSlope

    return []
  }

//helper functions to return array of winning coords
function checkVertical(row, col, arr){
let val = arr[row][col]
let checkWin = [[row, col]]
//look below piece
for(let i=row+1; i < arr.length; i++){
  if(arr[i][col] === val){
    checkWin.push([i, col])
  }else{
    break
  }
}
return checkWin
}

function checkHorizontal(row, col, arr){
let val = arr[row][col]
let checkWin = [[row, col]]
//look to the right of the piece
for(let i = col+1; i < arr[0].length; i++){
  if(arr[row][i] === val){
    checkWin.push([row, i])
  }else{
    break
  }
}
//look to the left
for(let j = col-1; j > -1; j--){
  if(arr[row][j] === val){
    checkWin.push([row, j])
  }else{
    break
  }
}
return checkWin
}

function checkPositiveSlope(row, col, arr){
let val = arr[row][col]
let checkWin = [[row, col]]
let i = row+1
let j = col+1
//look above the piece
while(i < arr.length && j < arr[0].length){
  if(arr[i][j] === val){
    checkWin.push([i, j])
    i++
    j++
  }else{
    break
  }
}
i = row-1
j = col-1
//look below
while(i > -1 && j > -1){
  if(arr[i][j] === val){
    checkWin.push([i, j])
    i--;
    j--;
  }else{
    break
  }
}
return checkWin
}

function checkNegativeSlope(row, col, arr){
let val = arr[row][col]
let checkWin = [[row, col]]
let i = row-1
let j = col+1
while(i > -1 && j < arr[0].length){
  if(arr[i][j] === val){
    checkWin.push([i, j])
    i--
    j++
  }else{
    break
  }
}
i = row+1
j = col-1
while(i < arr.length && j > -1){
  if(arr[i][j] === val){
    checkWin.push([i, j])
    i++
    j--
  }else{
    break
  }
}
return checkWin
}

export default checkBoard