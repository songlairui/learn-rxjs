const { genPromise } = require('./factory')
const { parallel } = require('./parallel.tool')

let pool = []
pool.length = 10
pool = pool
  .fill(0)
  .map((__, i) => `task-${i}`)
  .map(payload => genPromise.bind(null, payload))

async function test() {
  const end = await parallel(pool, 600)
  console.warn('test -end', end)
}

test()
