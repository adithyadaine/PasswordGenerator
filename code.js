// Default settings
let settings = {
  excludeSimilar: false,
  includeUppercase: true,
  minAlphabet: 1,
  minNumber: 1,
  minSpecial: 1
};

// Load settings from local storage if available
loadSettings();

function updateLengthValue(value) {
  document.getElementById("length-value").textContent = value;
  calculateEntropy();
}

function calculateEntropy() {
  const length = parseInt(document.getElementById("length").value);
  let charsetSize = 0;

  if (document.getElementById("alphabet").checked) {
    charsetSize += settings.includeUppercase ? 52 : 26;
  }
  if (document.getElementById("number").checked) {
    charsetSize += 10;
  }
  if (document.getElementById("special").checked) {
    charsetSize += 12;
  }

  const entropy = Math.log2(Math.pow(charsetSize, length));
  document.getElementById("entropy").textContent = `Entropy: ${entropy.toFixed(2)} bits`;
  
  // Determine password strength based on entropy
  let strength = "";
  let strengthClass = "";
  let explanation = "";
  let suggestions = "";

  if (entropy < 50) {
    strength = "Weak";
    strengthClass = "weak";
    explanation = "The password is considered weak because it has low entropy. It may be easily guessable or vulnerable to brute-force attacks.";
    suggestions = "To improve the password strength, consider increasing the length, adding more character types, and avoiding common patterns or words.";
  } else if (entropy < 80) {
    strength = "Medium";
    strengthClass = "medium";
    explanation = "The password has moderate entropy and provides a reasonable level of security. However, it can still be improved to enhance its strength.";
    suggestions = "To further strengthen the password, try increasing the length and incorporating a mix of uppercase letters, lowercase letters, numbers, and special characters.";
  } else {
    strength = "Strong";
    strengthClass = "strong";
    explanation = "The password has high entropy and is considered strong. It offers a high level of security and is resistant to common attacks.";
    suggestions = "Maintain the current password length and continue to use a diverse set of characters to ensure a strong password.";
  }
  
  document.getElementById("strength").textContent = `Strength: ${strength}`;
  document.getElementById("strength").className = strengthClass;

  document.getElementById("strengthExplanation").innerHTML = `
    <p>${explanation}</p>
    <p><strong>Suggestions:</strong> ${suggestions}</p>
  `;
}

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeAlphabet = document.getElementById("alphabet").checked;
  const includeNumber = document.getElementById("number").checked;
  const includeSpecial = document.getElementById("special").checked;

  let charset = "";
  let password = "";

  if (includeAlphabet) {
    charset += "abcdefghijklmnopqrstuvwxyz";
    if (settings.includeUppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
  }
  if (includeNumber) {
    charset += "0123456789";
  }
  if (includeSpecial) {
    charset += "!@#$%^&*()_+";
  }

  if (settings.excludeSimilar) {
    charset = charset.replace(/[il]/g, "");
  }

  if (charset.length === 0) {
    alert("Please select at least one character set.");
    return;
  }

  const charsetLength = charset.length;
  const charsetArray = charset.split("");

  // Generate password with minimum character type requirements
  let alphabetCount = 0;
  let numberCount = 0;
  let specialCount = 0;

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    const character = charsetArray[randomIndex];

    if (includeAlphabet && /[a-zA-Z]/.test(character) && alphabetCount < settings.minAlphabet) {
      password += character;
      alphabetCount++;
    } else if (includeNumber && /[0-9]/.test(character) && numberCount < settings.minNumber) {
      password += character;
      numberCount++;
    } else if (includeSpecial && /[!@#$%^&*()_+]/.test(character) && specialCount < settings.minSpecial) {
      password += character;
      specialCount++;
    } else if (alphabetCount >= settings.minAlphabet && numberCount >= settings.minNumber && specialCount >= settings.minSpecial) {
      password += character;
    }
  }

  // Shuffle the generated password
  password = password.split("").sort(() => Math.random() - 0.5).join("");

  document.getElementById("password").value = password;
  calculateEntropy();

  // Add 'password-generated' class to the button for animation
  const generateButton = document.querySelector('.btn-primary');
  generateButton.classList.add('password-generated');
  
  // Remove the 'password-generated' class after the animation is complete
  setTimeout(() => {
    generateButton.classList.remove('password-generated');
  }, 1000);
}

function copyPassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  
  const copyMessage = document.getElementById("copyMessage");
  copyMessage.textContent = "Password copied to clipboard!";
  setTimeout(function() {
    copyMessage.textContent = "";
  }, 2000);

  // Add 'password-copied' class to the copy button for animation
  const copyButton = document.querySelector('.copy-btn');
  copyButton.classList.add('password-copied');
  
  // Remove the 'password-copied' class after the animation is complete
  setTimeout(() => {
    copyButton.classList.remove('password-copied');
  }, 1000);
}

// Generate password on page load
window.onload = function() {
  generatePassword();
};

// Open the settings modal
function openSettingsModal() {
  document.getElementById("excludeSimilar").checked = settings.excludeSimilar;
  document.getElementById("includeUppercase").checked = settings.includeUppercase;
  document.getElementById("minAlphabet").value = settings.minAlphabet;
  document.getElementById("minNumber").value = settings.minNumber;
  document.getElementById("minSpecial").value = settings.minSpecial;

  $('#settingsModal').modal('show');
}

// Save the settings and update the password
function saveSettings() {
  settings.excludeSimilar = document.getElementById("excludeSimilar").checked;
  settings.includeUppercase = document.getElementById("includeUppercase").checked;
  settings.minAlphabet = parseInt(document.getElementById("minAlphabet").value);
  settings.minNumber = parseInt(document.getElementById("minNumber").value);
  settings.minSpecial = parseInt(document.getElementById("minSpecial").value);

  localStorage.setItem('passwordSettings', JSON.stringify(settings));

  $('#settingsModal').modal('hide');
  generatePassword();
}

// Load settings from local storage
function loadSettings() {
  const storedSettings = localStorage.getItem('passwordSettings');
  if (storedSettings) {
    settings = JSON.parse(storedSettings);
  }
}