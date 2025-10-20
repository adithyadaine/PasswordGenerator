// Default settings
let settings = {
  excludeSimilar: false,
  includeUppercase: true,
  minAlphabet: 1,
  minNumber: 1,
  minSpecial: 1,
};

/**
 * Shuffles an array in place using the Fisher-Yates (aka Knuth) Shuffle.
 * This is a cryptographically sound way to randomize an array.
 * @param {Array} array The array to shuffle.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const random = new Uint32Array(1);
    window.crypto.getRandomValues(random);
    const j = Math.floor((random[0] / (0xffffffff + 1)) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateLengthValue(value) {
  document.getElementById('length-value').textContent = value;
  calculateEntropy();
}

function calculateEntropy() {
  const length = parseInt(document.getElementById('length').value);
  let charsetSize = 0;

  if (document.getElementById('alphabet').checked) {
    let alphaSize = 26; // lowercase
    if (settings.includeUppercase) alphaSize += 26; // uppercase
    if (settings.excludeSimilar) alphaSize -= 6; // i, l, 1, O, 0 (approx)
    charsetSize += alphaSize;
  }
  if (document.getElementById('number').checked) {
    charsetSize += settings.excludeSimilar ? 8 : 10;
  }
  if (document.getElementById('special').checked) {
    charsetSize += 12; // Based on your special character set
  }

  if (charsetSize === 0) {
    document.getElementById('entropy').textContent = 'Entropy: 0.00 bits';
    document.getElementById('strength').textContent = 'Strength: Very Weak';
    document.getElementById('strength').className = 'weak';
    document.getElementById('strengthExplanation').innerHTML =
      '<p>Please select at least one character set to generate a password.</p>';
    return;
  }

  const entropy = Math.log2(Math.pow(charsetSize, length));
  document.getElementById('entropy').textContent = `Entropy: ${entropy.toFixed(
    2,
  )} bits`;

  let strength = '',
    strengthClass = '',
    explanation = '',
    suggestions = '';

  if (entropy < 50) {
    strength = 'Weak';
    strengthClass = 'weak';
    explanation =
      'This password has low entropy and may be vulnerable to brute-force attacks.';
    suggestions =
      'Increase the password length or include more character types (like numbers and symbols).';
  } else if (entropy < 80) {
    strength = 'Medium';
    strengthClass = 'medium';
    explanation =
      'This password has moderate entropy and provides a reasonable level of security.';
    suggestions =
      'To make it stronger, consider adding a few more characters to its length.';
  } else {
    strength = 'Strong';
    strengthClass = 'strong';
    explanation =
      'This password has high entropy, offering excellent security against common attacks.';
    suggestions =
      'This is a great password. Maintain this length and character complexity for other accounts.';
  }

  document.getElementById('strength').textContent = `Strength: ${strength}`;
  document.getElementById('strength').className = strengthClass;
  document.getElementById(
    'strengthExplanation',
  ).innerHTML = `<p>${explanation}</p><p><strong>Suggestions:</strong> ${suggestions}</p>`;
}

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const includeAlphabet = document.getElementById('alphabet').checked;
  const includeNumber = document.getElementById('number').checked;
  const includeSpecial = document.getElementById('special').checked;

  let alphaChars = 'abcdefghijklmnopqrstuvwxyz';
  if (settings.includeUppercase) {
    alphaChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (settings.excludeSimilar) {
    alphaChars = alphaChars.replace(/[ilo]/gi, ''); // g for global, i for case-insensitive
  }
  let numChars = settings.excludeSimilar ? '23456789' : '0123456789';
  const specialChars = '!@#$%^&*()_+';

  let availableChars = '';
  let password = [];

  if (includeAlphabet) availableChars += alphaChars;
  if (includeNumber) availableChars += numChars;
  if (includeSpecial) availableChars += specialChars;

  if (availableChars.length === 0) {
    document.getElementById('password').value = '';
    calculateEntropy();
    return;
  }

  // Guarantee minimums
  if (includeAlphabet) {
    for (let i = 0; i < settings.minAlphabet; i++) {
      const rand = crypto.getRandomValues(new Uint32Array(1))[0];
      password.push(alphaChars[rand % alphaChars.length]);
    }
  }
  if (includeNumber) {
    for (let i = 0; i < settings.minNumber; i++) {
      const rand = crypto.getRandomValues(new Uint32Array(1))[0];
      password.push(numChars[rand % numChars.length]);
    }
  }
  if (includeSpecial) {
    for (let i = 0; i < settings.minSpecial; i++) {
      const rand = crypto.getRandomValues(new Uint32Array(1))[0];
      password.push(specialChars[rand % specialChars.length]);
    }
  }

  // Fill the remainder
  const remainingLength = length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    const rand = crypto.getRandomValues(new Uint32Array(1))[0];
    password.push(availableChars[rand % availableChars.length]);
  }

  shuffleArray(password);
  document.getElementById('password').value = password.join('');

  calculateEntropy();

  const generateButton = document.querySelector('.generate-btn');
  generateButton.classList.add('password-generated');
  setTimeout(() => {
    generateButton.classList.remove('password-generated');
  }, 1000);
}

async function copyPassword() {
  const passwordInput = document.getElementById('password');
  if (!passwordInput.value) return;

  try {
    await navigator.clipboard.writeText(passwordInput.value);
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.textContent = 'Password copied to clipboard!';
    setTimeout(() => (copyMessage.textContent = ''), 2000);

    const copyButton = document.querySelector('.copy-btn');
    copyButton.classList.add('password-copied');
    setTimeout(() => copyButton.classList.remove('password-copied'), 1000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

// --- MODAL & SETTINGS LOGIC ---
const settingsModal = document.getElementById('settings-modal');

function openSettingsModal() {
  document.getElementById('excludeSimilar').checked = settings.excludeSimilar;
  document.getElementById('includeUppercase').checked = settings.includeUppercase;
  document.getElementById('minAlphabet').value = settings.minAlphabet;
  document.getElementById('minNumber').value = settings.minNumber;
  document.getElementById('minSpecial').value = settings.minSpecial;
  settingsModal.showModal();
}

function closeSettingsModal() {
  settingsModal.close();
}

function saveSettings() {
  settings.excludeSimilar = document.getElementById('excludeSimilar').checked;
  settings.includeUppercase = document.getElementById('includeUppercase').checked;
  settings.minAlphabet = parseInt(document.getElementById('minAlphabet').value);
  settings.minNumber = parseInt(document.getElementById('minNumber').value);
  settings.minSpecial = parseInt(document.getElementById('minSpecial').value);

  localStorage.setItem('passwordSettings', JSON.stringify(settings));
  closeSettingsModal();
  generatePassword();
}

function loadSettings() {
  const storedSettings = localStorage.getItem('passwordSettings');
  if (storedSettings) {
    settings = JSON.parse(storedSettings);
  }
}

// --- Main execution block ---
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  const lengthSlider = document.getElementById('length');
  const generateBtn = document.querySelector('.generate-btn');
  const copyBtn = document.querySelector('.copy-btn');
  const openSettingsBtn = document.getElementById('open-settings-btn');
  const closeSettingsBtns = document.querySelectorAll('.close, [data-target="settings-modal"]');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const checkboxes = document.querySelectorAll(
    'article input[type="checkbox"]',
  );

  lengthSlider.addEventListener('input', (e) =>
    updateLengthValue(e.target.value),
  );
  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyPassword);
  openSettingsBtn.addEventListener('click', openSettingsModal);
  saveSettingsBtn.addEventListener('click', saveSettings);
  closeSettingsBtns.forEach((btn) =>
    btn.addEventListener('click', closeSettingsModal),
  );
  checkboxes.forEach((box) => box.addEventListener('change', calculateEntropy));

  generatePassword();
});