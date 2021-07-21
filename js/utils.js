function renderMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat.length; j++) {
      var cell = '';
      // var className = `cell`;
      var className = 'cell cell' + i + '-' + j;
      // strHTML += `<td class="${className}>${cell}</td>`;
      strHTML += `<td oncontextmenu="markCell(this, ${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})" class="${className}">${cell}</td>`;
      // strHTML += '<td onclick="cellClicked(this, ${i}, ${j}) " class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
  
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInteger(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}

function blowUpNegs(cellI, cellJ, mines) {
  
  var count = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gLevel.size) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gLevel.size) continue
      if (i === cellI && j === cellJ) continue
      for (var idx = 0; idx < mines.length; idx++) {
        if (i === mines[idx].i && j === mines[idx].j) {
          count++;
        }
      }
    }
  }
  return count;
}

function showNegs(cellI, cellJ) {


  
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard.length) continue
      
      if (!gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;

        renderCell({
          i,
          j
        },gBoard[i][j].minesAroundCount )
      }

    }
  }

}