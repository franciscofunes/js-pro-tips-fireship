/*
 *
 * Console log:  debugging tips
 *
 */

const foo = { name: "tom", age: 20, nervous: true };
const bar = { name: "dick", age: 30, nervous: false };
const baz = { name: "harry", age: 25, nervous: true };

// custom css style using %c for outstanding the console log
console.log(
  "%c My Friends",
  "color: purple; font-weight: bold; font-size: 20px;"
);
// Computed Property Names
console.log({ foo, bar, baz }); // { foo: { name: "tom", age: 20, nervous: true }, bar: { name: "dick", age: 30, nervous: false }, baz: { name: "harry", age: 25, nervous: true } }

// display result as a table
console.table([foo, bar, baz]);

//Benchmarking performance
//you can use console.time() and console.timeEnd() to time the performance of a function
console.time("looper");

let i = 0;
while (i < 1000000) {
  i++;
}

console.timeEnd("looper");

// You need to know where a console log originated from
// console.trace will show you the stack trace

const deleteMe = () => console.trace("bye bye database");

deleteMe();
deleteMe();

/*
 *
 * Destructuring
 *
 */

const turtle = {
  name: "Bob the turtle",
  legs: 4,
  shell: true,
  type: "amphibian",
  meal: 10,
  diet: "berries",
};

// Imagine we need a function that tells us how to feed the turtle
// We can use destructuring to pull out the properties we need

// Bad Code ❌
function feed(animal) {
  return `Feed ${animal.name} ${animal.meal} grams of ${animal.diet}`;
}

// Good code ☑️
// We eliminate the need to pass in the whole object and repetitively pull out the properties we need
function feed({ name, meal, diet }) {
  return `Feed ${name} ${meal} grams of ${diet}`;
}

// We can make the destructuring using a variable inside the function

function feed(animal) {
  //better way to go if we have a lot of objects that we need to destruct inside the function
  const { name, meal, diet } = animal;
  return `Feed ${name} ${meal} grams of ${diet}`;
}

/*
 *
 * Template Literals
 *
 */

const horse = {
  nickName: "Tyson",
  size: "large",
  skills: ["jousting", "racing"],
  age: 5,
};

// Bad string code 💩
let bio =
  horse.nickName +
  " is a " +
  horse.size +
  " horse skilled in " +
  horse.skills.join(" & ");

// Good string code ✅

const { nickName, size, skills } = horse;

bio = `${nickName} is a ${size} horse skilled in ${skills.join(" & ")}`;

console.log(bio);

//Build String in a purely functional way

function horseAge(str, age) {
  const ageStr = age > 5 ? "old" : "young";
  return `${str[0]}${ageStr} at ${age} years old`;
}

const bio2 = horseAge`This horse is ${horse.age}`;

//conclusion: in other words you can take multiple values an use it to compose multiple values in the return statement

/*
 *
 * Spread Syntax
 *
 */

const pikachu = { name: "Pikachu", type: "electric" };
const stats = { hp: 40, attack: 55, defense: 55 };

// Let's say we want to assign the stats values to the Pikachu object

// Bad code example
// Verbose way
// We are mutating the original object when we want to create a new inmutable object
pikachu["hp"] = stats.hp;
pikachu["attack"] = stats.attack;
pikachu["defense"] = stats.defense;

//1rst way to do it

//we want to represent each level up of the pokemon as it own object
// we could use object assign and take the pikachu object and merge it with the stats
// This will merge togeather from the left to the right
const lv10 = Object.assign(pikachu, stats);

// If you want to update a property we can do it in this way with object assign
const lv11 = Object.assign(pikachu, { hp: 45 });

// More concise way to do this with the spread syntax
// by creating a new object an placing the existing object with three dots in front of it
const lv12 = { ...pikachu, ...stats };
const lv13 = { ...pikachu, hp: 45 };

// You can also use the spread operator with Arrays
// Imagine you have an array of strings and want to push objects into it
let pokemon = ["Pikachu", "Bulbasaur", "Charmander"];

// Bad code example
pokemon.push("Squirtle");
pokemon.push("Pidgey");
pokemon.push("Rattata");

// Good code example

// Push
pokemon = [...pokemon, "Squirtle", "Pidgey", "Rattata"];

// Unshift
pokemon = ["Squirtle", "Pidgey", "Rattata", ...pokemon];

pokemon = ["Squirtle", "Pidgey", "Rattata", ...pokemon, "Pikachu"];

/*
 *
 * Loop: how to implement built-in array methods
 *
 */

//Imagine we have an array of numbers that represent the order totals we have in our application

const orders = [100, 200, 300, 400, 500];

//Bad code example

const total = 0;
const withTax = [];
const highValue = [];

for (i = 0; i < orders.length; i++) {
  // Reduce
  total += orders[i];

  // Map
  withTax.push(orders[i] * 1.1);

  // Filter
  if (order[i] > 100) {
    highValue.push(orders[i]);
  }
}

// This code is mutating values and this make it unpredictable

// Good code example
// Reduce built-in method for calculating the total
const totalGoogCode = orders.reduce((acc, curr) => acc + curr, 0);

// Map built-in method for adding tax to the orders
const withTaxGoogCode = orders.map((order) => order * 1.1);

// Filter built-in method for filtering out orders over 100
const highValueGoogCode = orders.filter((order) => order > 100);

/*
 *
 * async/await
 *
 */

const random = () => {
  return Promise.resolve(Math.random());
};

// Now lets imagine we want to retrieve three different asynchronous numbers and the add them all together at the end

// Bad code example
const sumRandomAsyncNums = () => {
  let first;
  let second;
  let third;

  return random()
    .then((v) => {
      first = v;
      return random();
    })
    .then((v) => {
      second = v;
      return random();
    })
    .then((v) => {
      third = v;
      return first + second + third;
    })
    .then((v) => {
      console.log(`The sum of the three random numbers is ${v}`);
    });
};

// Good code example

const sumRandomAsyncNumsGoodWay = async () => {
  const first = await random();
  const second = await random();
  const third = await random();

  const sum = first + second + third;
  console.log(`The sum of the three random numbers is ${sum}`);
}
