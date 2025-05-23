import './style.css';
import { Puzzle } from './puzzle';

// Set up the app root content
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Sliding Puzzle</h1>
    <div style="margin-bottom: 1rem;">
      <select id="modeSelect">
        <option value="number" selected>Number</option>
        <option value="image">Image</option>
      </select>
      <select id="imageSelect">
        <option value="mario">Mario</option>
        <option value="luigi">Luigi</option>
        <option value="marioluigi">Mario x Luigi</option>
      </select>
      <button id="shuffleBtn">Shuffle</button>
       <button id="previewBtn">Preview Original</button>

    </div>
    <div id="puzzle" class="grid"></div>
    <div id="previewModal" class="preview-modal hidden">
      <div class="preview-content">
        <button id="closePreview">×</button>
        <img id="previewImage" />
      </div>
    </div>
  </div>
`;

// Initialize puzzle logic
const puzzle = new Puzzle('puzzle');

const shuffleBtn = document.getElementById('shuffleBtn') as HTMLButtonElement;
const modeSelect = document.getElementById('modeSelect') as HTMLSelectElement;
const imageSelect = document.getElementById('imageSelect') as HTMLSelectElement;
const previewBtn = document.getElementById('previewBtn')!;
const previewModal = document.getElementById('previewModal')!;
const previewImage = document.getElementById('previewImage') as HTMLImageElement;
const closePreview = document.getElementById('closePreview')!;

// Event listeners
shuffleBtn.addEventListener('click', () => puzzle.shuffle());

modeSelect.addEventListener('change', (e) => {
  const mode = (e.target as HTMLSelectElement).value as 'number' | 'image';
  puzzle.setMode(mode);
});

imageSelect.addEventListener('change', (e) => {
  const image = (e.target as HTMLSelectElement).value as 'mario' | 'luigi' | 'marioluigi';
  puzzle.setImage(image);
});
previewBtn.addEventListener('click', () => {
  if (modeSelect.value === 'image') {
    previewImage.src = puzzle.getCurrentImage();
    previewModal.classList.remove('hidden');
  }
});

closePreview.addEventListener('click', () => {
  previewModal.classList.add('hidden');
});