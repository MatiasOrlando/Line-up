let count = 0;

function randomNum() {
  const staticNums = "114147279";
  let dynamicNums = count.toString().padStart(4, "0");
  count++;
  const number = staticNums + dynamicNums;
  return number;
}

module.exports = randomNum;
