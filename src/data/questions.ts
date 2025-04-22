interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'Generators',
    question: 'What will be the output of this generator function?',
    code: `function* numberGenerator() {
  yield 1;
  yield* [2, 3];
  yield 4;
}
const gen = numberGenerator();
console.log([...gen]);`,
    options: [
      '[1, 2, 3, 4]',
      '[1, [2, 3], 4]',
      'Error: Cannot spread generator',
      '[1, undefined, 4]',
    ],
    correctAnswer: 0,
    explanation:
      'The yield* delegates to the iterable [2, 3], yielding each value in sequence. The spread operator [...gen] collects all yielded values into an array.',
  },
  {
    id: 2,
    category: 'this keyword',
    question: 'What will be logged to the console?',
    code: `const obj = {
  name: 'example',
  getName() {
    return this.name;
  },
  getArrowName: () => this.name,
  regularFunction: function() {
    const arrow = () => this.name;
    return arrow();
  }
};

console.log(obj.getName());
console.log(obj.getArrowName());
console.log(obj.regularFunction());`,
    options: [
      'example, undefined, example',
      'example, example, undefined',
      'undefined, undefined, example',
      'example, undefined, undefined',
    ],
    correctAnswer: 0,
    explanation:
      "Regular methods have their own 'this' binding (example). Arrow functions inherit 'this' from their enclosing scope (global/undefined in getArrowName, but obj in regularFunction's arrow function).",
  },
  {
    id: 3,
    category: 'Promises',
    question: 'What will be the execution order of the console.logs?',
    code: `async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
  await Promise.resolve();
  console.log('3');
}

test();
console.log('4');
Promise.resolve().then(() => console.log('5'));`,
    options: [
      '1, 4, 5, 2, 3',
      '1, 4, 2, 3, 5',
      '1, 2, 3, 4, 5',
      '1, 4, 2, 5, 3',
    ],
    correctAnswer: 0,
    explanation:
      'The execution order demonstrates the event loop and microtask queue: synchronous code first (1, 4), then microtasks from Promise.resolve() (5), then the continuation of the async function (2, 3).',
  },
  {
    id: 4,
    category: 'Classes',
    question: "What's wrong with this class implementation?",
    code: `class Counter {
  #count = 0;
  
  increment() {
    this.#count++;
  }
}

class DoubleCounter extends Counter {
  increment() {
    super.#count += 2;
  }
}`,
    options: [
      'Private fields are not accessible in child classes',
      'The extends keyword is used incorrectly',
      'The increment method needs to be marked as override',
      'Nothing is wrong with this implementation',
    ],
    correctAnswer: 0,
    explanation:
      'Private fields (denoted by #) are only accessible within the declaring class. Child classes cannot access private fields of their parent class, even with super.',
  },
  {
    id: 5,
    category: 'Scope',
    question: 'What will be logged?',
    code: `let x = 1;
{
  let x = 2;
  {
    const tmp = x;
    x = 3;
    console.log(tmp);
  }
  console.log(x);
}
console.log(x);`,
    options: ['2, 3, 1', '1, 2, 3', '2, 2, 1', '3, 3, 3'],
    correctAnswer: 0,
    explanation:
      'This demonstrates block scoping. Each block creates a new scope for x. The tmp variable captures the x from its closest scope (2), then x is changed to 3 in that same scope, while the outer x remains 1.',
  },
  {
    id: 6,
    category: 'Memoization',
    question:
      'Which implementation of the fibonacci function with memoization is correct?',
    code: `// Implementation A
const fib1 = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fib1(n - 1, memo) + fib1(n - 2, memo);
};

// Implementation B
const fib2 = (() => {
  const memo = {};
  return (n) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    return memo[n] = fib2(n - 1) + fib2(n - 2);
  };
})();`,
    options: [
      'Only Implementation A is correct',
      'Only Implementation B is correct',
      'Both implementations are correct',
      'Neither implementation is correct',
    ],
    correctAnswer: 2,
    explanation:
      'Both implementations correctly implement memoization. A uses a parameter-based memo object that persists through recursion. B uses closure to maintain the memo object across calls. Both will prevent redundant calculations.',
  },
  {
    id: 7,
    category: 'Closures',
    question: 'What will be logged to the console?',
    code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => count = 0,
    get: () => count
  };
}

const counter1 = createCounter();
const counter2 = createCounter();
counter1.increment();
counter2.decrement();
counter1.increment();
console.log(counter1.get(), counter2.get());`,
    options: ['2, -1', '2, 2', '1, -1', '1, 1'],
    correctAnswer: 0,
    explanation:
      'Each call to createCounter creates a new closure with its own count variable. counter1 and counter2 maintain their own separate states, demonstrating the power of closures for data privacy and state management.',
  },
  {
    id: 8,
    category: 'Async/Await',
    question: 'What will this code output?',
    code: `async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  return 3;
}

async function run() {
  const gen = asyncGenerator();
  console.log(await gen.next());
  console.log(await gen.next());
  console.log(await gen.next());
}

run();`,
    options: [
      '{value: 1, done: false}, {value: 2, done: false}, {value: 3, done: true}',
      '{value: 1, done: false}, {value: 2, done: false}, {value: undefined, done: true}',
      '1, 2, 3',
      'Promise {1}, Promise {2}, Promise {3}',
    ],
    correctAnswer: 0,
    explanation:
      'Async generators combine generator and async/await functionality. Each next() call returns a promise that resolves to an iterator result object. The return value becomes the value property of the final iteration with done: true.',
  },
  {
    id: 9,
    category: 'Prototypes',
    question: "What's the output of this code?",
    code: `function Animal() {}
Animal.prototype.speak = function() {
  return "Animal speaks";
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
  return super.speak() + " and Dog barks";
};

const dog = new Dog();
console.log(dog.speak());`,
    options: [
      "Error: 'super' keyword unexpected here",
      'Animal speaks and Dog barks',
      'undefined and Dog barks',
      'Dog barks',
    ],
    correctAnswer: 0,
    explanation:
      "The super keyword can't be used in this context with regular function prototypes. It only works in class methods. To call the parent prototype's method, you would need to use Animal.prototype.speak.call(this).",
  },
  {
    id: 10,
    category: 'Event Loop',
    question: 'What is the order of the console logs?',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve()
  .then(() => {
    console.log('3');
    return Promise.resolve();
  })
  .then(() => console.log('4'));
queueMicrotask(() => console.log('5'));
console.log('6');`,
    options: [
      '1, 6, 3, 4, 5, 2',
      '1, 6, 5, 3, 4, 2',
      '1, 6, 3, 5, 4, 2',
      '1, 2, 3, 4, 5, 6',
    ],
    correctAnswer: 1,
    explanation:
      'The event loop processes tasks in order: synchronous code first (1, 6), then microtasks (queueMicrotask and Promise callbacks: 5, 3, 4), and finally macrotasks (setTimeout: 2). Promise chains create separate microtasks for each .then().',
  },
  {
    id: 11,
    category: 'Proxy',
    question: 'What will be logged?',
    code: `const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return target.default;
  }
};

const obj = new Proxy(
  { default: 'default', foo: 'foo' },
  handler
);

console.log(obj.foo);
console.log(obj.bar);
console.log(obj.default);`,
    options: [
      'foo, default, default',
      'foo, undefined, default',
      'foo, default, undefined',
      'undefined, default, default',
    ],
    correctAnswer: 0,
    explanation:
      "The Proxy's get trap intercepts property access. When accessing an existing property (foo), it returns the actual value. For non-existent properties (bar), it returns the default value. Accessing default property works the same as any existing property.",
  },
  {
    id: 12,
    category: 'Decorators',
    question: "What's wrong with this decorator implementation?",
    code: `function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Example {
  @readonly
  pi = 3.14159;
}

const obj = new Example();
obj.pi = 3;
console.log(obj.pi);`,
    options: [
      "Property decorators can't modify writability",
      'Decorator syntax is invalid',
      "Class fields can't be decorated",
      'Nothing is wrong, pi will be readonly',
    ],
    correctAnswer: 2,
    explanation:
      'In the current JavaScript decorator proposal, decorators for class fields (instance properties) work differently than method decorators. Field decorators receive different parameters and must return an object with initialize or initializer methods to modify the property.',
  },
  {
    id: 13,
    category: 'WeakRef',
    question: "What's the purpose of this code pattern?",
    code: `let cache = new Map();

function cached(obj) {
  const ref = new WeakRef(obj);
  cache.set(obj.id, {
    ref,
    finalizationRegistry: new FinalizationRegistry(
      (id) => cache.delete(id)
    )
  });
  return ref;
}`,
    options: [
      'Creating a memory-leak-free cache system',
      'Making objects immutable',
      'Implementing a reference counting system',
      'Creating deep object copies',
    ],
    correctAnswer: 0,
    explanation:
      'This pattern uses WeakRef and FinalizationRegistry to create a cache that automatically cleans up entries when their referenced objects are garbage collected, preventing memory leaks. The FinalizationRegistry callback removes cache entries for collected objects.',
  },
  {
    id: 14,
    category: 'Iterators',
    question: 'What will this code output?',
    code: `const obj = {
  *[Symbol.iterator]() {
    yield* Object.keys(this);
    yield* Object.values(this);
  },
  a: 1,
  b: 2
};

console.log([...obj]);`,
    options: [
      "['a', 'b', 1, 2]",
      "['a', 1, 'b', 2]",
      'TypeError: obj is not iterable',
      "[['a', 1], ['b', 2]]",
    ],
    correctAnswer: 0,
    explanation:
      'The object implements a custom iterator using Symbol.iterator. The generator yields all keys first (using yield*) followed by all values. The spread operator [...obj] collects all yielded values into an array.',
  },
  {
    id: 15,
    category: 'Performance',
    question: 'Which code is more memory efficient?',
    code: `// Implementation A
function processItems(items) {
  return items.map(x => x * 2)
              .filter(x => x > 10)
              .reduce((a, b) => a + b, 0);
}

// Implementation B
function processItems(items) {
  let sum = 0;
  for (const item of items) {
    const doubled = item * 2;
    if (doubled > 10) {
      sum += doubled;
    }
  }
  return sum;
}`,
    options: [
      'Implementation B',
      'Implementation A',
      'Both are equally efficient',
      'Depends on the JavaScript engine',
    ],
    correctAnswer: 0,
    explanation:
      'Implementation B is more memory efficient because it processes items one at a time without creating intermediate arrays. Implementation A creates new arrays for map and filter operations, which can be memory-intensive for large datasets. This demonstrates the trade-off between functional programming style and memory efficiency.',
  },
  {
    id: 16,
    category: 'Async Patterns',
    question: "What's the issue with this error handling?",
    code: `async function fetchData() {
  const promises = urls.map(url => 
    fetch(url).catch(err => {
      console.error(\`Failed to fetch \${url}\`);
      return null;
    })
  );
  
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}`,
    options: [
      'Failed requests are silently converted to successes',
      'The error handler is too verbose',
      'Promise.all should be Promise.allSettled',
      'async/await is unnecessary here',
    ],
    correctAnswer: 0,
    explanation:
      'The catch block converts failures into null values, which means Promise.all will never reject. This can mask serious errors and make debugging difficult. A better pattern would be to use Promise.allSettled or let Promise.all reject to handle errors at a higher level.',
  },
];
