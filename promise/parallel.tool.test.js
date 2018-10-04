const { genPromise } = require('./factory')
const { parallel } = require('./parallel.tool')

let pool = []
pool.length = 10

async function test() {
  const tasks = pool
    .fill(0)
    .map((__, i) => `task-${i}`)
    .map(payload => genPromise.bind(null, payload))

  const end = await parallel(tasks, 600)
  console.warn('test -end', end)
}

test()
