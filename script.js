class PasswordValidator {
  constructor(expectedPassword = [1, 2, 3, 4, 5]) {
    this.expectedPassword = expectedPassword;
    this.selectedButtons = [];
    this.display = document.getElementById("display");
    this.errorMessage = document.getElementById("error-message");
    this.loginForm = document.getElementById("login-form");
    this.passwordField = document.getElementById("password");
    this.createButtons();
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll(".key").forEach((key) => {
      key.addEventListener("click", () => {
        const value = key.getAttribute("data-value").split("").map(Number);
        this.selectedButtons.push(value);
        this.updateDisplay("*");

        if (this.selectedButtons.length > 4) {
          this.toggleButton(false);
        } else {
          this.toggleButton(true);
        }
      });
    });

    this.loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = this.validatePassword(this.selectedButtons);
      if (isValid) {
        this.errorMessage.textContent = "Senha Correta!";
      } else {
        this.errorMessage.textContent = "Senha incorreta. Tente novamente!";
      }
      this.passwordField.value = "";
      this.selectedButtons = [];
      this.clearDisplay();
      this.toggleButton(true);
    });
  }

  validatePassword(pairsArray) {
    let isValid = true;
    for (const digit of this.expectedPassword) {
      const index = this.expectedPassword.indexOf(digit);
      if (index !== -1 && pairsArray[index]) {
        if (!pairsArray[index].includes(digit)) {
          isValid = false;
          break;
        }
      } else {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  updateDisplay(value) {
    this.display.textContent += value;
  }

  clearDisplay() {
    this.display.textContent = "";
  }

  createButtons() {
    let pairsArray = this.createNumberPairsArray();
    const keypad = document.getElementById("keypad");
    for (const pairArray of pairsArray) {
      const button = document.createElement("button");
      button.classList.add("key");
      button.setAttribute("data-value", pairArray.join(""));
      button.textContent = `${pairArray[0]} ou ${pairArray[1]}`;
      keypad.appendChild(button);
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createNumberPairsArray() {
    let numbers = [...Array(10).keys()];
    this.shuffle(numbers);
    let pairsArray = [];
    for (let i = 0; i < 5; i++) {
      let pair = [numbers[i], numbers[i + 5]];
      pairsArray.push(pair);
    }
    return pairsArray;
  }
  toggleButton(status) {
    const submit = document.getElementById("submit");
    if (status) {
      submit.disabled = true;
      return;
    }
    submit.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PasswordValidator([1, 2, 3, 4, 9]);
});

const firebaseConfig = {
  apiKey: "AIzaSyAz3bx4u7yQc4enSoYUo7UFHC6etGwr8Yg",
  authDomain: "teclado-virtual-d446e.firebaseapp.com",
  databaseURL: "https://teclado-virtual-d446e-default-rtdb.firebaseio.com",
  projectId: "teclado-virtual-d446e",
  storageBucket: "teclado-virtual-d446e.appspot.com",
  messagingSenderId: "925020548911",
  appId: "1:925020548911:web:5daa46ddfe44f910a1bbda",
  measurementId: "G-VE3STW0MZY"
};