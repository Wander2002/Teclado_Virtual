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

function getSenhaFromDatabase() {
  // Simulação de uma consulta ao banco de dados
  return '1234'; // Supondo que a senha seja '1234'
}

function generateUniqueNumbers() {
  const numbers = [];
  const usedNumbers = new Set();
  for (let i = 0; i < 5; i++) {
    let combination = [];
    while (combination.length < 2) {
      let number = Math.floor(Math.random() * 10);
      if (!usedNumbers.has(number)) {
        combination.push(number);
        usedNumbers.add(number);
      }
    }
    numbers.push(combination);
  }
  return numbers;
}

function generateNewCombinations() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.key');
  const numbers = generateUniqueNumbers();
  const senha = getSenhaFromDatabase();

  buttons.forEach((button, index) => {
    const combination = numbers[index].map(num => num.toString()).join(' ');
    button.textContent = combination;
    button.addEventListener('click', () => {
      display.textContent += combination + ' ';
    });
  });

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', () => {
    display.textContent = '';
  });

  const okButton = document.getElementById('okButton');
  okButton.addEventListener('click', () => {
    const senhaDigitada = display.textContent.trim().split(' ');
    let senhaValida = false;
    numbers.forEach(combination => {
      let match = true;
      combination.forEach(num => {
        if (!senhaDigitada.includes(num.toString())) {
          match = false;
        }
      });
      if (match) {
        senhaValida = true;
      }
    });

    if (senhaDigitada.length === 4 && senhaDigitada.every((value, index) => value === senha.charAt(index))) {
      console.log('Autenticação efetuada com sucesso');
      display.textContent = 'Autenticação efetuada com sucesso';
    } else {
      console.log('Senha incorreta');
      console.log(senhaDigitada);
      console.log(senhaValida);
      display.textContent = 'Senha incorreta';
    }
  });
}

window.addEventListener('load', generateNewCombinations);