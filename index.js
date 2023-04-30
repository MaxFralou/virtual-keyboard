const firstRow = {
  Backquote: ['`', '~', 'ё', 'Ё'],
  Digit1: ['1', '!', '1', '!'],
  Digit2: ['2', '@', '2', '"'],
  Digit3: ['3', '#', '3', '№'],
  Digit4: ['4', '$', '4', ';'],
  Digit5: ['5', '%', '5', '%'],
  Digit6: ['6', '^', '6', ':'],
  Digit7: ['7', '&', '7', '?'],
  Digit8: ['8', '*', '8', '*'],
  Digit9: ['9', '(', '9', '('],
  Digit0: ['0', ')', '0', ')'],
  Minus: ['-', '_', '-', '_'],
  Equal: ['=', '+', '=', '+'],
  Backspace: 'Backspace',
};

const secondRow = {
  Tab: 'Tab',
  KeyQ: ['q', 'Q', 'й', 'Й'],
  KeyW: ['w', 'W', 'ц', 'Ц'],
  KeyE: ['e', 'E', 'у', 'У'],
  KeyR: ['r', 'R', 'к', 'К'],
  KeyT: ['t', 'T', 'е', 'Е'],
  KeyY: ['y', 'Y', 'н', 'Н'],
  KeyU: ['u', 'U', 'г', 'Г'],
  KeyI: ['i', 'I', 'ш', 'Ш'],
  KeyO: ['o', 'O', 'щ', 'Щ'],
  KeyP: ['p', 'P', 'з', 'З'],
  BracketLeft: ['[', '{', 'х', 'Х'],
  BracketRight: [']', '}', 'ъ', 'Ъ'],
  Backslash: ['\\', '|', '\\', '/'],
};

const thirdRow = {
  CapsLock: 'CapsLock',
  KeyA: ['a', 'A', 'ф', 'Ф'],
  KeyS: ['s', 'S', 'ы', 'Ы'],
  KeyD: ['d', 'D', 'в', 'В'],
  KeyF: ['f', 'F', 'а', 'А'],
  KeyG: ['g', 'G', 'п', 'П'],
  KeyH: ['h', 'H', 'р', 'Р'],
  KeyJ: ['j', 'J', 'о', 'О'],
  KeyK: ['k', 'K', 'л', 'Л'],
  KeyL: ['l', 'L', 'д', 'Д'],
  Semicolon: [';', ':', 'ж', 'Ж'],
  Quote: ['\'', '"', 'э', 'Э'],
  Enter: 'Enter',
};

const fourthRow = {
  ShiftLeft: 'Shift',
  KeyZ: ['z', 'Z', 'я', 'Я'],
  KeyX: ['x', 'X', 'ч', 'Ч'],
  KeyC: ['c', 'C', 'с', 'С'],
  KeyV: ['v', 'V', 'м', 'М'],
  KeyB: ['b', 'B', 'и', 'И'],
  KeyN: ['n', 'N', 'т', 'Т'],
  KeyM: ['m', 'M', 'ь', 'Ь'],
  Comma: [',', '<', 'б', 'Б'],
  Period: ['.', '>', 'ю', 'Ю'],
  Slash: ['/', '?', '.', ','],
  ShiftRight: 'Shift',
};

const fifthRow = {
  ControlLeft: 'Control',
  AltLeft: 'Alt',
  Space: 'space',
  AltRight: 'Alt',
  ControlRight: 'Control',
  ArrowLeft: '←',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowRight: '→',
};

let isCaps = false;
let isRussianLayout = false;
let isShift = false;

const virKey = document.querySelector('.virtual-keyboard');

function renderKeyboard() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];

  let keyboardHtml = `<p class="description">Клавиатура создана в операционной системе Linux</p>
                        <p class="language">Для переключения языка комбинация: левый control + space</p>
                        <textarea class="textarea" id="textarea" cols="50" rows="5"></textarea>`;

  rows.forEach((row) => {
    keyboardHtml += '<div class="keyboard-row">';
    Object.entries(row).forEach(([key, value]) => {
      keyboardHtml += `
                      <div class="keyboard-key ${key} ${key === 'Space' ? 'space' : ''} 
                      ${key === 'ShiftLeft' || key === 'ShiftRight' ? 'shift' : ''}">
                      ${Array.isArray(value) ? value[0] : value}</div>`;
    });
    keyboardHtml += '</div>';
  });

  virKey.innerHTML = keyboardHtml;

  document.addEventListener('keydown', (event) => {
    const virtualKey = virKey.querySelector(`.${event.code}`);
    if (virtualKey && event.code !== 'CapsLock') {
      virtualKey.classList.add('active');
    }
  });

  document.addEventListener('keyup', (event) => {
    const virtualKey = virKey.querySelector(`.${event.code}`);
    if (virtualKey && event.code !== 'CapsLock') {
      virtualKey.classList.remove('active');
    }
  });
}

renderKeyboard();

function updateKeyboardTextShift() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow];

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const keyElement = virKey.querySelector(`.${key}`);

      if (Array.isArray(row[key])) {
        const [a, b, c, d] = row[key];
        let text;
        if (isShift) {
          text = isRussianLayout ? d : b;
        } else {
          text = isRussianLayout ? c : a;
        }
        if (isCaps && /[a-zA-Zа-яА-ЯЁ]/.test(text)) {
          text = text.toLowerCase();
        }

        keyElement.textContent = text;
      }
    });
  });
}

function updateKeyboardTextCaps() {
  const rows = [firstRow, secondRow, thirdRow, fourthRow];

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const keyElement = virKey.querySelector(`.${key}`);

      if (Array.isArray(row[key])) {
        const [a, b, c, d] = row[key];
        let text;
        if (isRussianLayout && isCaps && /[a-zA-Zа-яА-ЯЁ]/.test(d)) {
          text = d;
        } else if (!isRussianLayout && isCaps && /[a-zA-Zа-яА-ЯЁ]/.test(a)) {
          text = b;
        } else {
          text = isRussianLayout ? c : a;
        }

        if (isShift && /[a-zA-Z]/.test(text)) {
          text = text.toLowerCase();
        }

        keyElement.textContent = text;
      }
    });
  });
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    isShift = true;
    updateKeyboardTextShift();

    document.addEventListener('keyup', (e) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        isShift = false;
        updateKeyboardTextCaps();
      }
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && event.ctrlKey && !event.repeat) {
    isRussianLayout = !isRussianLayout;
    updateKeyboardTextCaps();
  }
});

document.addEventListener('keydown', (event) => {
  const virtualKey = virKey.querySelector(`.${event.code}`);
  if (virtualKey) {
    if (event.code === 'CapsLock') {
      virtualKey.classList.toggle('active');
      isCaps = !isCaps;
      updateKeyboardTextCaps();
    }
  }
});

function setLocalStorage() {
  localStorage.setItem('isRussianLayout', isRussianLayout);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('isRussianLayout')) {
    isRussianLayout = localStorage.getItem('isRussianLayout') === 'true';
    updateKeyboardTextCaps();
  }
}

getLocalStorage();

window.addEventListener('load', getLocalStorage);
