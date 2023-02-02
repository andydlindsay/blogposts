// const memoizeMyFunc = require('./test');

const timeMyFunc = (cb) => {
  const wrapper = (arg) => {
    const startTime = new Date().getTime();
    const result = cb(arg);
    const endTime = new Date().getTime();
    console.log(`fib(${arg}) = time elapsed: ${endTime - startTime}ms`);
    return result;
  };

  return wrapper;
};

let fib = (num) => {
  if (num <= 2) {
    return 1;
  }

  return fib(num - 1) + fib(num - 2);
};

const memoFib = (num, previousResults = {}) => {
  if (previousResults[num]) {
    return previousResults[num];
  }

  let returnVal;
  if (num <= 2) {
    returnVal = 1;
  } else {
    returnVal = memoFib(num - 1, previousResults) + memoFib(num - 2, previousResults);
  }

  previousResults[num] = returnVal;
  return returnVal;
};

// const fibTime = timeMyFunc(fib);

// fib = memoizeMyFunc(fib);
const fibMemoTime = timeMyFunc(fib);

// const memoFibTime = timeMyFunc(memoFib);

for (let i = 5; i < 100; i += 5) {
  // memoFibTime(i);
  fibMemoTime(i);
  // fib(i);
}
