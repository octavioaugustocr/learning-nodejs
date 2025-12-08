const x = 10;

if (!Number.isInteger(x)) {
    throw new Error("The value of x is not an integer.")
}

console.log('Continuing the code..')