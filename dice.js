const throwDice = faces => Math.floor(Math.random()*faces + 1);

const max = process.argv.slice(2);
const faces = throwDice(max);
console.log(faces);