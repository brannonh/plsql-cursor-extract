const store = require('../store');

function tokenizer(input) {
  let current = 0;
  store.tokens = [];

  while (current < input.length) {
    let char = input[current];

    // Check for whitespace.
    let whitespace = /\s/;
    if (whitespace.test(char)) {
      current++;
      continue;
    }

    // Check for number
    let numbers = /[0-9]/;
    if (numbers.test(char)) {
      let value = '';
      while (numbers.test(char)) {
        value += char;
        char = input[++current];
      }

      store.tokens.push({ type: 'number', value });
      continue;
    }

    // Check for opening single-quote.
    if (char === `'`) {
      let value = '';

      // Skip the opening single-quote for the token.
      char = input[++current];

      while (char !== `'`) {
        value += char;
        char = input[++current];
      }

      // Skip the closing single-quote.
      char = input[++current];

      store.tokens.push({ type: 'string', value });
      continue;
    }

    // Check for word.
    let letters = /[a-z0-9._]/i;
    if (letters.test(char)) {
      let value = '';

      while (letters.test(char)) {
        value += char;
        char = input[++current];
      }

      store.tokens.push({ type: 'word', value });
      continue;
    }

    // Check for symbol.
    let symbols = /[\(\),;\.%=\*\/]/
    if (symbols.test(char)) {
      store.tokens.push({ type: 'symbol', value: char });
      current++;
      continue;
    }

    throw new TypeError(`Unknown character (${char})`);
  }
}

module.exports = { tokenizer };
