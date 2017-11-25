/**
 * Conway's Game Of Life
 * rules:
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */

export function initCells() {
  return [
    '  oo                          ',
    ' o   o        oo              ',
    'o     o      o  o             ',
    'o   o oo      oo              ',
    'o     o               ooo     ',
    ' o   o        oo     o  o     ',
    '  oo         o  o             ',
    '              oo              ',
    '                              ',
    '           oo                 ',
    '           o         o        ',
    '              o       o       ',
    '             oo    ooo        ',
    '                              ',
    '                              ',
    '  ooo                         ',
    ' ooo         ooo              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    ' oooooooooooooooooooooooooo   ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
  ].map(str => str.split('').map(s => s === 'o' ? 1 : 0))
}


export function updateCells(cells, cb) {
  cells = [...cells].map((row, i) => row.map((c, j) => updateLife(c, cells, i, j)));
  cb(cells);
  setTimeout(() => updateCells(cells, cb), 500);
}

function updateLife(live, cells, i, j) {
  const count = liveNeighboursCount(cells, i, j)
  if (live && (count === 2 || count === 3)) {
    return 1;
  }

  if (live) {
    return 0;
  }

  if (count === 3) {
    return 1;
  }

  return 0;
}

function liveNeighboursCount(cells, i, j) {
  const width  = cells[0].length;
  const height = cells.length;
  const count  = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
    [i - 1, j - 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
    [i + 1, j + 1]
  ].reduce((sum, [y, x]) => {
    if (y < 0 || x < 0 || y >= height || x >= width) {
      return sum;
    }
    return sum + cells[y][x];
  }, 0);

  return count;
}

