type Mode = 'number' | 'image';
type ImageKey = 'mario' | 'luigi' | 'marioluigi';

export class Puzzle {
  private container: HTMLElement;
  private tiles: (number | null)[];
  private solvedState: (number | null)[];
  private mode: Mode = 'image';
  private imageKey: ImageKey = 'mario';
  private image: HTMLImageElement = new Image();
  private images: Record<ImageKey, string> = {
    mario: '/mario.jpg',
    luigi: '/luigi.jpg',
    marioluigi: '/mario-luigi.jpg',
  };
  private gridSize = 4;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error('Puzzle container not found');
    this.container = el;
    this.tiles = [];
    this.solvedState = [];

    this.preloadImages(() => {
      this.setImage('mario');
      this.setMode('number');
      this.init();
    });
  }

  private preloadImages(callback: () => void) {
    let loaded = 0;
    const keys = Object.keys(this.images) as ImageKey[];
    for (const key of keys) {
      const img = new Image();
      img.src = this.images[key];
      img.onload = () => {
        loaded++;
        if (loaded === keys.length) callback();
      };
      if (key === this.imageKey) this.image = img;
    }
  }

  public setImage(key: ImageKey) {
    this.imageKey = key;
    this.image.src = this.images[key];
    this.image.onload = () => this.render();
  }

  public setMode(mode: Mode) {
    this.mode = mode;
    this.render();
  }

  public shuffle() {
    this.tiles = this.shuffleArray([...this.tiles]);
    this.render();
  }

  private init() {
    this.solvedState = Array.from({ length: this.gridSize * this.gridSize - 1 }, (_, i) => i + 1);
    this.solvedState.push(null);
    this.tiles = [...this.solvedState];
    this.shuffle();
    this.render();
  }

  private render() {
    this.container.innerHTML = '';

    this.tiles.forEach((tile, index) => {
      const div = document.createElement('div');
      div.className = 'tile';

      
    
      
      const imageSelect = document.getElementById('imageSelect') as HTMLSelectElement;
      const previewBtn = document.getElementById('previewBtn')!;

      if (tile === null) {
        div.classList.add('empty');
        //div.style.background = this.accentColors[this.imageKey];
      } else {
        div.dataset.index = String(index);
        div.addEventListener('click', () => this.move(index));

        const tileX = ((tile - 1) % this.gridSize);
        const tileY = Math.floor((tile - 1) / this.gridSize);
div.style.backgroundSize = `${this.gridSize * 100}%`;
      div.style.backgroundPosition = `${(tileX / (this.gridSize - 1)) * 100}% ${(tileY / (this.gridSize - 1)) * 100}%`;
      div.style.backgroundRepeat = 'no-repeat';

        if (this.mode === 'number') {
          previewBtn.style.display = 'none';
          imageSelect.style.display = 'none';
          div.textContent = tile.toString();
        } else if (this.mode === 'image') {
          previewBtn.style.display = 'inline-block';
          imageSelect.style.display = 'inline';
          // div.style.backgroundImage = `url(${this.image.src})`;
          //div.style.backgroundSize = `${this.gridSize * this.tileSize}px`;
          const tileX = ((tile - 1) % this.gridSize);
          const tileY = Math.floor((tile - 1) / this.gridSize);

        div.style.backgroundImage = `url(${this.image.src})`;
        div.style.backgroundSize = `${this.gridSize * 100}%`;
        div.style.backgroundPosition = `${(tileX / (this.gridSize - 1)) * 100}% ${(tileY / (this.gridSize - 1)) * 100}%`;
        div.style.backgroundRepeat = 'no-repeat';

          
        }
      }

      this.container.appendChild(div);
    });
  }

  private move(index: number) {
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

  private getValidMoves(nullIndex: number): number[] {
    const moves: number[] = [];
    const row = Math.floor(nullIndex / this.gridSize);
    const col = nullIndex % this.gridSize;

    if (row > 0) moves.push(nullIndex - this.gridSize); // up
    if (row < this.gridSize - 1) moves.push(nullIndex + this.gridSize); // down
    if (col > 0) moves.push(nullIndex - 1); // left
    if (col < this.gridSize - 1) moves.push(nullIndex + 1); // right

    return moves;
  }

  private shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private isSolved(): boolean {
    return this.tiles.every((val, idx) => val === this.solvedState[idx]);
  }

  public getCurrentImage(): string {
    return this.image.src;
  }
}
