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
  let currentButtonIndex = 0; // Índice do botão atual a ser validado
  let senhaValida = true; // Define se a senha está correta ou não

  buttons.forEach((button, index) => {
    const combination = numbers[index].map(num => num.toString()).join(' ');
    button.textContent = combination;
    button.addEventListener('click', () => {
      const numeroSenha = parseInt(senha[currentButtonIndex]);
      if (parseInt(combination.split(' ')[0]) === numeroSenha) {
        // Número do botão válido para a senha
        display.textContent += combination + ' ';
        currentButtonIndex++;
        if (currentButtonIndex === senha.length) {
          // Senha digitada corretamente
          console.log('Autenticação efetuada com sucesso');
          display.textContent = 'Autenticação efetuada com sucesso';
          currentButtonIndex = 0; // Reinicia a validação da senha
        }
      } else {
        // Número do botão inválido para a senha
        console.log('Senha incorreta');
        display.textContent = 'Senha incorreta';
        currentButtonIndex = 0; // Reinicia a validação da senha
      }
    });
  });

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', () => {
    display.textContent = '';
    currentButtonIndex = 0; // Reinicia a validação da senha
  });
}

window.addEventListener('load', generateNewCombinations);
