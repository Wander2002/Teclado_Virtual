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
      const combination = numbers[index].join(' ou ');
      button.textContent = combination;
      button.addEventListener('click', () => {
        if (numbers[index].includes(Number(senha.charAt(0))) ||
            numbers[index].includes(Number(senha.charAt(1))) ||
            numbers[index].includes(Number(senha.charAt(2))) ||
            numbers[index].includes(Number(senha.charAt(3)))) {
          display.textContent += senha + ' ';
        } else {
          display.textContent += combination + ' ';
        }
      });
    });
  
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => {
      display.textContent = '';
    });
  
    const okButton = document.getElementById('okButton');
    okButton.addEventListener('click', () => {
      // Adicione a lógica de validação da senha aqui
      console.log('Senha válida:', display.textContent.trim());
    });
  }
  
  window.addEventListener('load', generateNewCombinations);
  