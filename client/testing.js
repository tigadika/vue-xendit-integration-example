let arr = [
  {
    total: 500
  },
  {
    total: 400
  },
  {
    total: 300
  },
]

const total = arr.reduce((acc, val) => {
  console.log(acc, val);
  return acc + val.total
}, 0)

console.log(total);