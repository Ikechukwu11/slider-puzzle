import './style.css';
import { Puzzle } from './puzzle';

// Set up the app root content
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="puzzleContainer">
    <h1 id="title">Sliding Puzzle</h1>
    <div id="controls" style="margin-bottom: 1rem;">
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
      <button id="previewBtn">Hint</button>

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

window.onload = () => {
// Initialize puzzle logic
const puzzle = new Puzzle('puzzle');
const shuffleBtn = document.getElementById('shuffleBtn') as HTMLButtonElement;
const modeSelect = document.getElementById('modeSelect') as HTMLSelectElement;
const imageSelect = document.getElementById('imageSelect') as HTMLSelectElement;
const previewBtn = document.getElementById('previewBtn')!;
const previewModal = document.getElementById('previewModal')!;
const previewImage = document.getElementById('previewImage') as HTMLImageElement;
const closePreview = document.getElementById('closePreview')!;
const titleDiv = document.getElementById('title')!;


  titleDiv.textContent = 'Number Slide Puzzle';
  


// Event listeners
shuffleBtn.addEventListener('click', () => puzzle.shuffle());

modeSelect.addEventListener('change', (e) => {
  const mode = (e.target as HTMLSelectElement).value as 'number' | 'image';
  let theme = (e.target as HTMLSelectElement).value as 'number' | 'mario';
  if(mode === 'number'){ 
    theme = 'number';
    titleDiv.textContent = 'Number Slide Puzzle';
  } else {
    theme = 'mario';
    titleDiv.textContent = 'Mario Image Slide Puzzle';
  }
  applyTheme(theme);
  puzzle.setMode(mode);
});

imageSelect.addEventListener('change', (e) => {
  const image = (e.target as HTMLSelectElement).value as 'mario' | 'luigi' | 'marioluigi';
  const theme = (e.target as HTMLSelectElement).value as Theme;
  applyTheme(theme);
  puzzle.setImage(image);
  let textContent = image.charAt(0).toUpperCase() + image.slice(1)  + ' Image Slide Puzzle';

  if (image === 'marioluigi') {
    textContent = 'Mario x Luigi Image Slide Puzzle';
  }
  titleDiv.textContent = textContent;
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

};

type Theme = 'number' | 'mario' | 'luigi' | 'marioluigi';

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  switch (theme) {
    case 'mario':
      root.style.setProperty('--accent-color', '#e63946');
      root.style.setProperty('--accent-glow', 'rgba(230, 57, 70, 0.4)');
      //root.style.setProperty('--empty-bg', '#2a0000');
      root.style.setProperty('--empty-bg', '#e63946');
      root.style.setProperty('--border-color', '#e63946');
      break;
    case 'luigi':
      root.style.setProperty('--accent-color', '#1fab89');
      root.style.setProperty('--accent-glow', 'rgba(31, 171, 137, 0.4)');
      root.style.setProperty('--empty-bg', '#1fab89');
      root.style.setProperty('--border-color', '#1fab89');
      break;
    case 'marioluigi':
      root.style.setProperty('--accent-color', 'linear-gradient(to right, #2e53a1,#82c247)');
      root.style.setProperty('--accent-glow', 'rgba(255, 105, 180, 0.4)');
      //root.style.setProperty('--empty-bg', '#140014');
      root.style.setProperty('--empty-bg', 'linear-gradient(to right, #82c247, #2e53a1)');
      root.style.setProperty('--border-color', 'transparent');
      break;
    case 'number':
      root.style.setProperty('--accent-color', '#121212');
      root.style.setProperty('--accent-glow', 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--empty-bg', '#121212');
      root.style.setProperty('--border-color', '#121212');
      break;
  }
}