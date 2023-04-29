const firstRow = {
  'Backquote': ['`', '~', 'ё', 'Ё'],
  'Digit1': ['1', '!', '1', '!'],
  'Digit2': ['2', '@', '2', '"'],
  'Digit3': ['3', '#', '3', '№'],
  'Digit4': ['4', '$', '4', ';'],
  'Digit5': ['5', '%', '5', '%'],
  'Digit6': ['6', '^', '6', ':'],
  'Digit7': ['7', '&', '7', '?'],
  'Digit8': ['8', '*', '8', '*'],
  'Digit9': ['9', '(', '9', '('],
  'Digit0': ['0', ')', '0', ')'],
  'Minus': ['-', '_', '-', '_'],
  'Equal': ['=', '+', '=', '+'],
  'Backspace': 'Backspace'
};

const secondRow = {
  'Tab': 'Tab',
  'KeyQ': ['q', 'Q', 'й', 'Й'],
  'KeyW': ['w', 'W', 'ц', 'Ц'],
  'KeyE': ['e', 'E', 'у', 'У'],
  'KeyR': ['r', 'R', 'к', 'К'],
  'KeyT': ['t', 'T', 'е', 'Е'],
  'KeyY': ['y', 'Y', 'н', 'Н'],
  'KeyU': ['u', 'U', 'г', 'Г'],
  'KeyI': ['i', 'I', 'ш', 'Ш'],
  'KeyO': ['o', 'O', 'щ', 'Щ'],
  'KeyP': ['p', 'P', 'з', 'З'],
  'BracketLeft': ['[', '{', 'х', 'Х'],
  'BracketRight': [']', '}', 'ъ', 'Ъ'],
  'Backslash': ['\\', '|', '\\', '/']
}

const thirdRow = {
  'CapsLock': 'CapsLock',
  'KeyA': ['a', 'A', 'ф', 'Ф'],
  'KeyS': ['s', 'S', 'ы', 'Ы'],
  'KeyD': ['d', 'D', 'в', 'В'],
  'KeyF': ['f', 'F', 'а', 'А'],
  'KeyG': ['g', 'G', 'п', 'П'],
  'KeyH': ['h', 'H', 'р', 'Р'],
  'KeyJ': ['j', 'J', 'о', 'О'],
  'KeyK': ['k', 'K', 'л', 'Л'],
  'KeyL': ['l', 'L', 'д', 'Д'],
  'Semicolon': [';', ':', 'ж', 'Ж'],
  'Quote': [`'`, '"', 'э', 'Э'],
  'Enter': 'Enter'
}

const fourthRow = {
  'ShiftLeft': 'Shift',
  'KeyZ': ['z', 'Z', 'я', 'Я'],
  'KeyX': ['x', 'X', 'ч', 'Ч'],
  'KeyC': ['c', 'C', 'с', 'С'],
  'KeyV': ['v', 'V', 'м', 'М'],
  'KeyB': ['b', 'B', 'и', 'И'],
  'KeyN': ['n', 'N', 'т', 'Т'],
  'KeyM': ['m', 'M', 'ь', 'Ь'],
  'Comma': [',', '<', 'б', 'Б'],
  'Period': ['.', '>', 'ю', 'Ю'],
  'Slash': ['/', '?', '.', ','],
  'ShiftRight': 'Shift'
};

const fifthRow = {
  'ControlLeft': 'Control',
  'AltLeft': 'Alt',
  'Space': 'space',
  'AltRight': 'Alt',
  'ControlRight': 'Control',
  'ArrowLeft': '←',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowRight': '→'
};

const virKey = document.querySelector(".virtual-keyboard")

function renderKeyboard() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];

  let keyboardHtml = `<p class="description">Клавиатура создана в операционной системе Linux</p>
                        <p class="language">Для переключения языка комбинация: левый control + space</p>
                        <textarea class="textarea" id="textarea" cols="50" rows="5"></textarea>`;

  for (const row of rows) {
    keyboardHtml += '<div class="keyboard-row">';

    for (const [key, value] of Object.entries(row)) {
      keyboardHtml += `
          <div class="keyboard-key ${key} ${key === 'Space' ? 'space' : ''} 
          ${key === 'ShiftLeft' || key === 'ShiftRight' ? 'shift' : ''}">
          ${Array.isArray(value) ? value[0] : value}</div>`;
    }

    keyboardHtml += '</div>';
  }

  virKey.innerHTML = keyboardHtml;

  document.addEventListener('keydown', (event) => {
    const virtualKey = virKey.querySelector(`.${event.code}`);
    if (virtualKey) {
      virtualKey.classList.add('active');
    }
  });

  document.addEventListener('keyup', (event) => {
    const virtualKey = virKey.querySelector(`.${event.code}`);
    if (virtualKey) {
      virtualKey.classList.remove('active');
    }
  });

}

renderKeyboard();

let isRussianLayout = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && event.ctrlKey && !event.repeat) {
    isRussianLayout = !isRussianLayout;
    updateKeyboardText();
  }
});

function updateKeyboardText() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow];

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      const keyElement = virKey.querySelector(`.${key}`);

      if (Array.isArray(value)) {
        const text = isRussianLayout ? value[2] : value[0];
        keyElement.textContent = text;
      }
    }
  }
}

let isShift = false;

document.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    isShift = true;
    updateKeyboardTextShift()

    document.addEventListener('keyup', (event) => {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isShift = false;
        updateKeyboardTextShift();
      }
    })
  }
});

function updateKeyboardTextShift() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow];

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      const keyElement = virKey.querySelector(`.${key}`);

      if (Array.isArray(value)) {
        let text;
        if (isShift) {
          text = isRussianLayout ? value[3] : value[1];
        } else {
          text = isRussianLayout ? value[2] : value[0];
        }
        keyElement.textContent = text;
      }
    }
  }
}
