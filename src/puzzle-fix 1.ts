class Puzzle {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.gridSize = 4;
    this.tiles = [];
    this.solvedState = [];
    this.init();
  }

  init() {
    this.solvedState = Array.from({ length: this.gridSize * this.gridSize - 1 }, (_, i) => i + 1);
    this.solvedState.push(null);
    this.tiles = [...this.solvedState];
    this.shuffle();
    this.render();
  }

  shuffle() {
    do {
      this.tiles = this.solvedState.slice();
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      }
    } while (!this.isSolvable() || this.isSolved());
  }

  isSolvable() {
    let inversions = 0;
    const tilesWithoutNull = this.tiles.filter(tile => tile !== null);
    for (let i = 0; i < tilesWithoutNull.length - 1; i++) {
      for (let j = i + 1; j < tilesWithoutNull.length; j++) {
        if (tilesWithoutNull[i] > tilesWithoutNull[j]) inversions++;
      }
    }
    const emptyRow = Math.floor(this.tiles.indexOf(null) / this.gridSize);
    if (this.gridSize % 2 === 0) {
      return (inversions + emptyRow) % 2 === 1;
    } else {
      return inversions % 2 === 0;
    }
  }

  render() {
    this.container.innerHTML = '';
    this.tiles.forEach((tile, index) => {
      const div = document.createElement('div');
      div.className = 'tile';
      if (tile === null) {
        div.classList.add('empty');
      } else {
        div.textContent = tile;
        div.addEventListener('click', () => this.move(index));
      }
      this.container.appendChild(div);
    });
  }

  move(index) {
    const nullIndex = this.tiles.indexOf(null);
    const validMoves = this.getValidMoves(nullIndex);
    if (validMoves.includes(index)) {
      [this.tiles[index], this.tiles[nullIndex]] = [this.tiles[nullIndex], this.tiles[index]];
      this.render();
      if (this.isSolved()) {
        setTimeout(() => {
          alert('🎉 You solved it!');
        }, 100);
      }
    }
  }

  getValidMoves(nullIndex) {
    const moves = [];
    const row = Math.floor(nullIndex / this.gridSize);
    const col = nullIndex % this.gridSize;

    if (row > 0) moves.push(nullIndex - this.gridSize); // up
    if (row < this.gridSize - 1) moves.push(nullIndex + this.gridSize); // down
    if (col > 0) moves.push(nullIndex - 1); // left
    if (col < this.gridSize - 1) moves.push(nullIndex + 1); // right

    return moves;
  }

  isSolved() {
    return this.tiles.every((val, idx) => val === this.solvedState[idx]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Puzzle('puzzle');
});