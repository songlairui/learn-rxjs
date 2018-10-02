const { genPromise } = require('./factory')

let pool = []

pool.length = 10

pool.fill(0)

async function main() {
  pool.reduce((p, c, idx) => p.then(() => genPromise(idx)), Promise.resolve())
}

main()
