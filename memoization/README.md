# Intro to Memoization

Problem:  
We have a function that we are going to call multiple times. Our function takes a long time to run (eg. half a second or more) and we find that we're often calling it with the same arguments. What if our function could remember previous times it's been called with certain arguments? Then, if it ever gets called again with those arguments, we can return the value we calculated previously instead of calculating it again. This is where memoization comes in.

Memoization refers to a function _remembering_ the results of previous executions. Our function will store the arguments it was called with and the return value.

Let's see an example. We have a `getUserById` function that takes in a user id and returns the user object associated with that id.

```js
const getUserById = (userId) => {
  // ---------- some longrunning code to lookup the user here ----------
  return user;
};
```

Our function gets called several times.

```js
const resultOne = getUserById(2);
const resultTwo = getUserById(42);
const resultThree = getUserById(2); // we have a repeat!
```

When our function gets called again with the same argument, it'd be great if we returned the user object we retrieved previously instead of spending time going to the database to get the user again. 

But how can we give our function memory? We could use a closure.

```js
// create a variable that will hold the results of previous function calls
// the argument will be the key
// and the return value will be the value
const previousResults = {};

const getUserWithId = (userId) => {
  // before we do any work, check if we've seen this argument before
  if (previousResults[userId]) {
    // we have seen this argument before, let's return the stored value
    return previousResults[userId];
  }

  // else this is the first time we've seen this argument
  // ---------- some longrunning code to lookup the user here ----------

  // before returning the user, we need to store the argument and return value in the previousResults object
  previousResults[userId] = user;
  
  return user;
};
```

Now our function has memory; `previousResults` holds the results (argument and return value) of any previous invocations of the function.

We could also use a higher order function (HOF) to create a memoized "wrapper" for our function:

```js
// this HOF takes in a function and returns a "memoized" version of it
const memoizeMyFunc = (func) => {
  // create a variable that will hold the results of previous function calls
  const previousResults = {};

  // create a wrapper function
  const wrapper = (argument) => {
    // have we seen this argument before?
    if (previousResults[argument]) {
      return previousResults[argument];
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
```

Now we can memoize any function by passing it `memoizeMyFunc`.

```js
// create a function to be memoized
const sayHello = (name) => {
  return `hello there ${name}`;
};

// pass the function to memoizeMyFunc which will return a memoized version
const sayHelloMemo = memoizeMyFunc(sayHello);

// now any calls to sayHelloMemo will be remembered
sayHelloMemo('Alice');
sayHelloMemo('Alice'); // this return value would come from the `previousResults` object instead of being calculated
```

This seems like a lot of work. When is memoization useful? When the function takes a long time to run. Being able to lookup a previous return value can save hours of execution time.
