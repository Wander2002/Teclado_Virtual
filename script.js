function generateNewCombinations() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.key');
    const numbers = generateUniqueNumbers();
    buttons.forEach((button, index) => {
      const combination = numbers[index].join(' ou ');
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
      // Adicione a lógica de validação da senha aqui
      console.log('Senha válida:', display.textContent.trim());
    });
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
  
  window.addEventListener('load', generateNewCombinations);