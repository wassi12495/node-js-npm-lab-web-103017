/**
 * Import required libraries just below this comment block.
 * Make sure that they're assigned to the variables expected below!
 */

function greet(greeting, greetee) {
  return `${greeting}, ${greetee}!`;
}

const curriedGreet = _.curry(greet);
