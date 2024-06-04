
function updateLengthValue(value) {
  document.getElementById("length-value").textContent = value;
  calculateEntropy();
}

function calculateEntropy() {
  const length = parseInt(document.getElementById("length").value);
  let charsetSize = 0;

  if (document.getElementById("alphabet").checked) {
    charsetSize += 52; // 26 uppercase + 26 lowercase letters
  }
  if (document.getElementById("number").checked) {
    charsetSize += 10; // 10 digits
  }
  if (document.getElementById("special").checked) {
    charsetSize += 12; // 12 special characters
  }

  const entropy = Math.log2(Math.pow(charsetSize, length));
  document.getElementById("entropy").textContent = `Entropy: ${entropy.toFixed(2)} bits`;
  
  // Determine password strength based on entropy
  let strength = "";
  let strengthClass = "";
  if (entropy < 50) {
    strength = "Weak";
    strengthClass = "weak";
  } else if (entropy < 80) {
    strength = "Medium";
    strengthClass = "medium";
  } else {
    strength = "Strong";
    strengthClass = "strong";
  }
  
  document.getElementById("strength").textContent = `Strength: ${strength}`;
  document.getElementById("strength").className = strengthClass;
}

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeAlphabet = document.getElementById("alphabet").checked;
  const includeNumber = document.getElementById("number").checked;
  const includeSpecial = document.getElementById("special").checked;

  let charset = "";
  let password = "";

  if (includeAlphabet) {
    charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (includeNumber) {
    charset += "0123456789";
  }
  if (includeSpecial) {
    charset += "!@#$%^&*()_+";
  }

  if (charset.length === 0) {
    alert("Please select at least one character set.");
    return;
  }

  const charsetLength = charset.length;
  const charsetArray = charset.split("");

  for (let i = 0; i < length; i++) {
    if (includeAlphabet && i < length) {
      const randomIndex = Math.floor(Math.random() * 52);
      password += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[randomIndex];
      i++;
    }
    if (includeNumber && i < length) {
      const randomIndex = Math.floor(Math.random() * 10);
      password += "0123456789"[randomIndex];
      i++;
    }
    if (includeSpecial && i < length) {
      const randomIndex = Math.floor(Math.random() * 12);
      password += "!@#$%^&*()_+"[randomIndex];
      i++;
    }

    if (i < length) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      password += charsetArray[randomIndex];
    }
  }

  // Shuffle the generated password
  password = password.split("").sort(() => Math.random() - 0.5).join("");

  document.getElementById("password").value = password;
  calculateEntropy();
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
}

// Generate password on page load
window.onload = function() {
  generatePassword();
};