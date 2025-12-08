const x = 10;
const y = 'Octávio';
const z = [1, 2];

console.log(x, y, z);

console.count(`The value of x is: ${x}, count`);
console.count(`The value of x is: ${x}, count`);
console.count(`The value of x is: ${x}, count`);
console.count(`The value of x is: ${x}, count`);

console.log("His name is %s, he's a developer", y);

// clear console
setTimeout(() => {
    console.clear();
}, 2000);