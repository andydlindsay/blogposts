// this HOF takes in a function and returns a "memoized" version of it
const memoizeMyFunc = (func) => {
  // create a variable that will hold the results of previous function calls
  const previousResults = {};

  // create a wrapper function
  const wrapper = (argument) => {
    console.log(argument);
    // have we seen this argument before?
    if (previousResults[String(argument)]) {
      return previousResults[String(argument)];
    }

    // must be a new argument so we need to call the function and store the return value
    const returnVal = func(argument);

    // update the previousResults object
    previousResults[argument] = returnVal;

    // return the value
    return returnVal;
  };

  // return the wrapper function
  return wrapper;
};

const sayHello = (name) => {
  return `hello there ${name}`;
};

const sayHelloMemo = memoizeMyFunc(sayHello);

let returnVal;

returnVal = sayHelloMemo('Alice');
console.log(returnVal);
returnVal = sayHelloMemo('Bob');
console.log(returnVal);
returnVal = sayHelloMemo('Carol');
console.log(returnVal);
returnVal = sayHelloMemo('Dean');
console.log(returnVal);
returnVal = sayHelloMemo('Alice');
console.log(returnVal);
returnVal = sayHelloMemo('Elise');
console.log(returnVal);

module.exports = memoizeMyFunc;
