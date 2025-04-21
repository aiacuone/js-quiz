interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'What is event bubbling in JavaScript?',
    options: [
      'When an event triggers on a child element and propagates up through parents',
      'When an event triggers multiple times',
      'When an event is cancelled',
      'When an event triggers on parent and moves to children',
    ],
    correctAnswer:
      'When an event triggers on a child element and propagates up through parents',
    explanation:
      'Event bubbling is when an event starts from the target element and bubbles up through its ancestors',
  },
  {
    id: 2,
    question: 'What is a closure in JavaScript?',
    options: [
      'A function that has access to variables in its outer scope',
      'A way to close browser windows',
      'A method to end loops',
      'A type of error handling',
    ],
    correctAnswer: 'A function that has access to variables in its outer scope',
    explanation:
      'A closure is a function that can access variables from its outer scope even after the outer function has returned',
  },
  {
    id: 3,
    question: "What does the 'this' keyword refer to in an arrow function?",
    options: [
      "The surrounding code's context",
      'The function itself',
      'The global object',
      'The object that called the function',
    ],
    correctAnswer: "The surrounding code's context",
    explanation:
      "Arrow functions don't have their own 'this'. They inherit 'this' from the enclosing scope",
  },
  {
    id: 4,
    question: 'What is the purpose of Promise.all()?',
    options: [
      'Waits for all promises to resolve or any to reject',
      'Executes promises in sequence',
      'Cancels all running promises',
      'Creates a new promise',
    ],
    correctAnswer: 'Waits for all promises to resolve or any to reject',
    explanation:
      'Promise.all() takes an array of promises and returns a new promise that resolves when all input promises resolve',
  },
  {
    id: 5,
    question: 'What does Object.freeze() do?',
    options: [
      'Makes an object immutable',
      'Deletes the object',
      'Copies the object',
      'Converts object to string',
    ],
    correctAnswer: 'Makes an object immutable',
    explanation:
      'Object.freeze() prevents new properties from being added and existing properties from being modified or deleted',
  },
  {
    id: 6,
    question: 'What is event delegation?',
    options: [
      'Handling events at a higher level than the target element',
      'Removing event listeners',
      'Creating custom events',
      'Stopping event propagation',
    ],
    correctAnswer: 'Handling events at a higher level than the target element',
    explanation:
      'Event delegation is a technique of handling events on parent elements to affect children, utilizing event bubbling',
  },
  {
    id: 7,
    question: "What is the output of: ['1', '2', '3'].map(parseInt)?",
    options: ['[1, NaN, NaN]', '[1, 2, 3]', "['1', '2', '3']", 'Error'],
    correctAnswer: '[1, NaN, NaN]',
    explanation:
      'map passes both value and index to parseInt, causing unexpected results for indices 1 and 2',
  },
  {
    id: 8,
    question: 'What is the purpose of the async/await keywords?',
    options: [
      'To handle asynchronous operations more clearly',
      'To make code run faster',
      'To create new functions',
      'To handle errors',
    ],
    correctAnswer: 'To handle asynchronous operations more clearly',
    explanation:
      'async/await provides a more synchronous-looking way to work with Promises',
  },
  {
    id: 9,
    question: 'What is the purpose of the reduce() method?',
    options: [
      'To reduce an array to a single value',
      'To remove elements from an array',
      'To filter array elements',
      'To sort array elements',
    ],
    correctAnswer: 'To reduce an array to a single value',
    explanation:
      'reduce() executes a reducer function on each element, resulting in a single output value',
  },
  {
    id: 10,
    question:
      'What is the output of this generator function?\n```\nfunction* gen() {\n  yield 1;\n  yield* [2, 3];\n  yield 4;\n}\nconst g = gen();\nconsole.log([...g]);```',
    options: ['[1, 2, 3, 4]', '[1, [2, 3], 4]', 'Error', '[1, undefined, 4]'],
    correctAnswer: '[1, 2, 3, 4]',
    explanation:
      'The yield* delegates iteration to the array [2, 3], spreading all values into the sequence. The spread operator [...g] collects all yielded values into an array.',
  },
  {
    id: 11,
    question:
      'What will be logged in this async code?\n```\nasync function test() {\n  console.log(1);\n  await Promise.resolve();\n  console.log(2);\n}\ntest();\nconsole.log(3);```',
    options: ['1, 2, 3', '1, 3, 2', '3, 1, 2', '2, 1, 3'],
    correctAnswer: '1, 3, 2',
    explanation:
      'First 1 is logged, then await causes the function to pause execution. This allows 3 to be logged, and finally 2 is logged after the Promise resolves.',
  },
  {
    id: 12,
    question:
      'What is the result of this recursive function call?\n```\nfunction sumRange(n) {\n  if (n === 1) return 1;\n  return n + sumRange(n - 1);\n}\nconsole.log(sumRange(5));```',
    options: ['15', '5', '120', '10'],
    correctAnswer: '15',
    explanation:
      'The function recursively adds numbers from n down to 1. For n=5: 5 + 4 + 3 + 2 + 1 = 15',
  },
  {
    id: 13,
    question:
      'What will be the state of this Promise.race()?\n```\nPromise.race([\n  new Promise(r => setTimeout(() => r("fast"), 100)),\n  new Promise(r => setTimeout(() => r("slow"), 200)),\n  Promise.reject("error")\n])```',
    options: [
      'Resolves with "fast"',
      'Resolves with "slow"',
      'Rejects with "error"',
      'Resolves with undefined',
    ],
    correctAnswer: 'Rejects with "error"',
    explanation:
      'Promise.race() settles as soon as any promise settles. The rejection is synchronous and happens before the timeouts, so it rejects immediately.',
  },
  {
    id: 14,
    question: 'What is the correct way to handle errors in an async function?',
    options: [
      'try/catch block with await',
      '.catch() method only',
      'window.onerror handler',
      'process.on("error")',
    ],
    correctAnswer: 'try/catch block with await',
    explanation:
      'try/catch blocks with await can catch both synchronous and asynchronous errors in async functions, making it the most comprehensive approach.',
  },
  {
    id: 15,
    question:
      'What happens when you yield inside a generator multiple times?\n```\nfunction* counter() {\n  let count = 0;\n  while (true) {\n    const reset = yield count++;\n    if (reset) count = 0;\n  }\n}```',
    options: [
      'The generator pauses at each yield and can receive values from next()',
      'The generator throws an error',
      'The generator only yields once',
      'The while loop causes an infinite loop error',
    ],
    correctAnswer:
      'The generator pauses at each yield and can receive values from next()',
    explanation:
      'The generator pauses at each yield, and the value passed to next() is assigned to reset. This allows two-way communication with the generator.',
  },
  {
    id: 16,
    question: 'What is the purpose of the AbortController in fetch requests?',
    options: [
      'To cancel ongoing fetch requests',
      'To handle fetch errors',
      'To modify fetch responses',
      'To cache fetch results',
    ],
    correctAnswer: 'To cancel ongoing fetch requests',
    explanation:
      'AbortController allows you to cancel one or multiple fetch requests before they complete, which is useful for cleanup or user-initiated cancellations.',
  },
  {
    id: 17,
    question:
      'What will this custom hook return?\n```\nfunction useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}```',
    options: [
      'The value after the specified delay has passed',
      'The immediate value without delay',
      'undefined',
      'A Promise',
    ],
    correctAnswer: 'The value after the specified delay has passed',
    explanation:
      'This custom hook implements debouncing, returning an updated value only after the specified delay has passed without new updates.',
  },
  {
    id: 18,
    question:
      'What is the output of this recursive Promise chain?\n```\nasync function chainPromises(n) {\n  if (n === 0) return 0;\n  return Promise.resolve(1 + await chainPromises(n - 1));\n}\nchainPromises(3).then(console.log);```',
    options: ['3', '6', '2', '1'],
    correctAnswer: '3',
    explanation:
      'The function recursively chains promises, adding 1 each time until n reaches 0. With n=3, it resolves to 1+1+1+0=3.',
  },
  {
    id: 19,
    question:
      'What is the main difference between Promise.all() and Promise.allSettled()?',
    options: [
      'Promise.allSettled() waits for all promises regardless of rejection',
      'Promise.allSettled() is faster than Promise.all()',
      'Promise.all() handles more promises',
      'There is no difference',
    ],
    correctAnswer:
      'Promise.allSettled() waits for all promises regardless of rejection',
    explanation:
      'Promise.all() rejects immediately if any promise rejects, while Promise.allSettled() waits for all promises to either resolve or reject.',
  },
  {
    id: 20,
    question: 'What is the temporal dead zone (TDZ) in JavaScript?',
    options: [
      'The period between a variable being declared and initialized',
      'A special memory allocation space',
      'A type of garbage collection',
      'A way to handle time-based operations',
    ],
    correctAnswer:
      'The period between a variable being declared and initialized',
    explanation:
      'The TDZ is the period between entering a scope where a variable is declared using let/const and its actual declaration. Accessing the variable during this period results in a ReferenceError.',
  },
  {
    id: 21,
    question: 'What is the output of: console.log(typeof typeof 1)?',
    options: ['string', 'number', 'undefined', 'object'],
    correctAnswer: 'string',
    explanation:
      'typeof 1 returns "number" (as a string), so typeof "number" returns "string".',
  },
  {
    id: 22,
    question: 'What is the purpose of the WeakMap object?',
    options: [
      'To hold weak references to key-value pairs allowing garbage collection',
      'To create a map with weak encryption',
      'To store only weak types like null and undefined',
      'To create a map with limited functionality',
    ],
    correctAnswer:
      'To hold weak references to key-value pairs allowing garbage collection',
    explanation:
      'WeakMap holds weak references to objects used as keys, allowing them to be garbage collected if there are no other references to them.',
  },
  {
    id: 23,
    question:
      'What is the difference between Object.seal() and Object.freeze()?',
    options: [
      'Object.seal() allows modifying existing properties while Object.freeze() makes the object completely immutable',
      'Object.seal() creates a copy while Object.freeze() modifies the original',
      'Object.seal() is temporary while Object.freeze() is permanent',
      'There is no difference',
    ],
    correctAnswer:
      'Object.seal() allows modifying existing properties while Object.freeze() makes the object completely immutable',
    explanation:
      'Object.seal() prevents adding/deleting properties but allows modifying existing ones, while Object.freeze() prevents any changes to the object.',
  },
  {
    id: 24,
    question: 'What is the purpose of Symbol.iterator?',
    options: [
      'To define how an object should be iterated',
      'To create unique identifiers',
      'To mark private properties',
      'To implement inheritance',
    ],
    correctAnswer: 'To define how an object should be iterated',
    explanation:
      'Symbol.iterator is a well-known symbol that specifies the default iterator for an object, making it iterable with for...of loops.',
  },
  {
    id: 25,
    question: 'What is the result of: [1, 2, 3].reduce((a, b) => a + b, "") ?',
    options: ['"123"', '6', '"6"', 'Error'],
    correctAnswer: '"123"',
    explanation:
      'The initial value is an empty string, so the numbers are concatenated as strings instead of being added as numbers.',
  },
];
