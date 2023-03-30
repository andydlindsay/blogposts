# Understanding React's `useState` hook

First, what is a hook? Hooks are JavaScript functions that allow our functional components to "hook" into React itself. This gives us a way to manage data, safely handle side effects, and take advantage of other cool React features. Some hooks are built into React such as `useState` (the subject of this article) and some have been written by the community and these are known as _custom hooks_.

React has had functional components since the beginning. It wasn't functional components that were added to React in 2019, it was `hooks`.

Prior to the introduction of hooks, functional components were for _presentation_. They had no internal state and acted only on `props` being passed in. This is because functions have no memory.

When a function is called, it has no idea if it has ever been called before or if it will ever be called again. Any variables the function creates, are destroyed (garbage collected) when the function finishes running.

```js
const increment = () => {
  let count = 0;
  count += 1;
  console.log(count);
};

increment(); // 1
increment(); // 1
increment(); // 1
increment(); // 1
```

In the above `increment` function, when we log the value, we see the output never changes. This because a new `count` variable is created each time the function gets called. The value of `count` is incremented (add one) and then logged. That ends the function call and the `count` variable gets destroyed.

How can we update our `increment` function to have "memory"? We can move the `count` variable to the parent scope (ie. move it _outside_ the function declaration). When we do this, instead of a new `count` being created on each function call, the value of `count` in the parent scope will be used/updated.

```js
// move the declaration of count to the parent scope
let count = 0;

const increment = () => {
  count += 1; // we are now updating the parent's variable
  console.log(count);
};

increment(); // 1
increment(); // 2
increment(); // 3
increment(); // 4
```

Hooray! Our function has memory! The value of `count` is _remembered_ from one call to the next. What we've done is create a `closure`. We would say that `increment` has a _closure_ over the `count` variable. A _closure_ means a function will "remember" the variables that were in scope when the function was declared. The function will even "remember" these values if it is exported to another file.

If our React components are functions, can we give them "memory" in the same way? Yes... and no. Let's take a look at an example.

```jsx
// declare a variable outside the scope of our component
let count = 0;

const Counter = () => {
  // use the same increment function we used before
  const increment = () => {
    count += 1;
    console.log(count);
  }

  // show the user the value of count and a button that calls the increment function on click
  return (
    <>
      <h2>The count is: {count}</h2>
      <button onClick={increment}>Increment!</button>
    </>
  );
};
```

If you run the above code, you'll notice that our closure worked perfectly! The value of `count` in the console increments just like it did before. But what the user sees (ie. what is displayed on the webpage) never changes... This is because React is in charge of updating the DOM. If our data changes and React doesn't know about the change, the webpage won't be updated.

The solution to our function's "memory" problem is still a closure; the only difference is _who_ creates the closure. If we want React to know about our data, we have to give it to React. That's what the `useState` hook is for. It will create a closure for us and give us back a _getter_ and a _setter_ for the value. The updated code might look like this:

```jsx
import {useState} from 'react';

const Counter = () => {
  // give our value to React; React gives back "count" and "setCount" to interact with the value
  const [count, setCount] = useState(0);

  const increment = () => {
    // we never want to change state directly
    // count += 1;

    // instead we'll use the "setCount" function to update the value of count
    setCount(count + 1);

    console.log(count);
  }

  // show the user the value of count and a button that calls the increment function on click
  return (
    <>
      <h2>The count is: {count}</h2>
      <button onClick={increment}>Increment!</button>
    </>
  );
};
```

Fantastic! The webpage will now update because React will be aware of any changes that we make to the `count` value. If React detects a change, it will re-render the component (ie. call the function to see what its _new_ return value would be with updated state).

However, if you check the console, you'll see the _console.log_ of `count` appears to be one step behind. For example, if the webpage shows `count` is 9, the console will show that `count` is 8. What gives?

Any updates to state are for future renders; we're setting the state for the next time the function gets called. For each individual function call, our state is _constant_ (unchanging). We can see this in how we called _useState_ (`count` being declared as a constant):

```js
const [count, setCount] = useState(0);
```

So, if we update state and then log it, we're going to see _old_ state; the state from _this_ render, because our update is for the _next_ render.

```js
console.log(count); // 0
setCount(count + 1); // set count to 1 (0 + 1) for the next render
console.log(count); // 0; count is a constant value
```

We can see that `useState` allows us to create closures so that our functional components have "memory". Importantly, if React creates our closures for us, then React knows about them and knows about any updates to them and can act accordingly (eg. update the DOM).

Hopefully this short reading helped clear up any questions you had about the `useState` hook.

Andy Lindsay is full-time web instructor for Lighthouse Labs’ Web Development Program. Check out Andy’s other work at [GitHub](https://github.com/andydlindsay) or connect on [LinkedIn](https://www.linkedin.com/in/andydlindsay/).
