function updateLengthValue(value) {
  document.getElementById("length-value").textContent = value;
  calculateEntropy();
}

document.getElementById("length").oninput = function() {
  updateLengthValue(this.value);
};

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
  let charset = "";

  if (document.getElementById("alphabet").checked) {
    charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (document.getElementById("number").checked) {
    charset += "0123456789";
  }
  if (document.getElementById("special").checked) {
    charset += "!@#$%^&*()_+";
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  document.getElementById("password").textContent = password;
  calculateEntropy();
}