// shim
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

// Elements
const toggleBtn = document.getElementById('toggle-btn');
const languageSelector = document.getElementById('language-selector');
const wordsContainer = document.getElementById('words');
const visualizer = document.querySelector('.visualizer');

let listening = false;
let p = document.createElement('p');
wordsContainer.innerHTML = '';
wordsContainer.appendChild(p);

// Update language
languageSelector.addEventListener('change', (e) => {
  recognition.lang = e.target.value;
  console.log('Language set to', e.target.value);
});

// Start or stop recognition
toggleBtn.addEventListener('click', () => {
  if (!listening) {
    recognition.start();
  } else {
    recognition.stop();
  }
});

// Recognition event handlers
recognition.addEventListener('start', () => {
  listening = true;
  toggleBtn.textContent = 'Stop Listening';
  console.log('Recognition started, lang=', recognition.lang);
});

recognition.addEventListener('error', (e) => {
  console.error('Recognition error:', e.error);
});

recognition.addEventListener('end', () => {
  listening = false;
  toggleBtn.textContent = 'Start Listening';
  visualizer.classList.add('paused');
  console.log('Recognition ended');
});

recognition.addEventListener('result', (e) => {
  visualizer.classList.remove('paused');

  const transcript = Array.from(e.results)
    .map(r => r[0].transcript)
    .join('');

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    wordsContainer.appendChild(p);
  }
});
