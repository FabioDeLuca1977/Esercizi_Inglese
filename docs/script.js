// script.js

const exercises = [
  {
    type: 'select',
    title: 'Superlatives - Easy',
    question: 'Mount Everest is the (higher / highest) mountain in the world.',
    options: ['higher', 'highest'],
    answer: 'highest'
  },
  {
    type: 'select',
    title: 'Comparatives - Easy',
    question: 'Summer is (hot / hotter) than winter.',
    options: ['hot', 'hotter'],
    answer: 'hotter'
  },
  {
    type: 'select',
    title: 'Could / Couldn\'t - Easy',
    question: 'When I was a child, I (could / couldn\'t) swim very well.',
    options: ['could', 'couldn\'t'],
    answer: 'couldn\'t'
  },
  {
    type: 'dragdrop',
    title: 'Geographical Features - Medium',
    question: 'A large body of salt water:',
    words: ['lake', 'sea', 'river'],
    answer: 'sea'
  },
  {
    type: 'dragdrop',
    title: 'Holiday Places - Easy',
    question: 'A small house in the countryside:',
    words: ['caravan', 'cottage', 'hotel'],
    answer: 'cottage'
  },
  {
    type: 'dialogue',
    title: 'Dialogue Ordering - Travel Plans',
    sentences: [
      'Where are we going for our holidays?',
      'I would love to visit Spain!',
      'Great idea, let\'s book it.',
      'What about Italy?'
    ],
    correctOrder: [
      'Where are we going for our holidays?',
      'What about Italy?',
      'I would love to visit Spain!',
      'Great idea, let\'s book it.'
    ]
  }
];

function startExercises() {
  const container = document.getElementById('exerciseArea');
  container.innerHTML = '';

  exercises.forEach((ex, index) => {
    const div = document.createElement('div');
    div.className = 'exercise';
    div.innerHTML = `<h3>${index + 1}. ${ex.title}</h3>`;

    if (ex.type === 'select') {
      div.innerHTML += `<p>${ex.question}</p><select id="ex${index}"><option value="" disabled selected>Select an option</option>` + ex.options.map(opt => `<option value="${opt}">${opt}</option>`).join('') + `</select><br><button onclick="checkSelect(${index})">Check</button>`;
    }

    if (ex.type === 'dragdrop') {
      div.innerHTML += `<p>${ex.question}</p>` + ex.words.map(w => `<div class="draggable" draggable="true" id="drag${index}_${w}">${w}</div>`).join('') + `<div class="dropzone" id="drop${index}"></div><br><button onclick="checkDragDrop(${index})">Check</button>`;
    }

    if (ex.type === 'dialogue') {
      div.innerHTML += '<p>Drag and order the sentences correctly:</p>' + ex.sentences.map((s, i) => `<div class="draggable" draggable="true" id="dialog${index}_${i}">${s}</div>`).join('') + Array(ex.sentences.length).fill().map((_, i) => `<div class="dropzone" id="dropdialog${index}_${i}"></div>`).join('') + `<br><button onclick="checkDialogue(${index})">Check</button>`;
    }

    div.innerHTML += `<p id="result${index}"></p>`;
    container.appendChild(div);
  });

  let draggedItem = null;

  document.addEventListener('dragstart', function (e) {
    if (e.target.classList.contains('draggable')) draggedItem = e.target;
  });

  document.addEventListener('dragover', function (e) {
    if (e.target.classList.contains('dropzone')) e.preventDefault();
  });

  document.addEventListener('drop', function (e) {
    if (e.target.classList.contains('dropzone')) {
      e.preventDefault();
      if (e.target.innerHTML.trim() === '') {
        e.target.appendChild(draggedItem);
      }
    }
  });
}

function addAttempt(exercise, result) {
  const table = document.getElementById('attempts');
  const row = document.createElement('tr');
  const name = document.getElementById('studentName').value || 'Anonymous';
  row.innerHTML = `<td>${name}</td><td>${exercise}</td><td class="${result === 'Correct' ? 'correct' : 'incorrect'}">${result}</td>`;
  table.appendChild(row);
}

function checkSelect(index) {
  const selected = document.getElementById(`ex${index}`).value;
  const result = document.getElementById(`result${index}`);
  if (selected === exercises[index].answer) {
    result.textContent = 'Correct!';
    result.className = 'correct';
    addAttempt(exercises[index].title, 'Correct');
  } else {
    result.textContent = 'Incorrect.';
    result.className = 'incorrect';
    addAttempt(exercises[index].title, 'Incorrect');
  }
}

function checkDragDrop(index) {
  const dropped = document.getElementById(`drop${index}`).textContent.trim();
  const result = document.getElementById(`result${index}`);
  if (dropped === exercises[index].answer) {
    result.textContent = 'Correct!';
    result.className = 'correct';
    addAttempt(exercises[index].title, 'Correct');
  } else {
    result.textContent = 'Incorrect.';
    result.className = 'incorrect';
    addAttempt(exercises[index].title, 'Incorrect');
  }
}

function checkDialogue(index) {
  let correct = true;
  exercises[index].correctOrder.forEach((text, i) => {
    if (document.getElementById(`dropdialog${index}_${i}`).textContent.trim() !== text) correct = false;
  });
  const result = document.getElementById(`result${index}`);
  if (correct) {
    result.textContent = 'Correct order!';
    result.className = 'correct';
    addAttempt(exercises[index].title, 'Correct');
  } else {
    result.textContent = 'Incorrect order.';
    result.className = 'incorrect';
    addAttempt(exercises[index].title, 'Incorrect');
  }
}
