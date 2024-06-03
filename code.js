function updateLengthValue(value) {
    document.getElementById("length-value").textContent = value;
  }

  document.getElementById("length").oninput = function() {
    updateLengthValue(this.value);
  };

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
  }