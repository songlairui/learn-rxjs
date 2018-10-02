const { genPromise } = require('./factory')

let pool = []

pool.length = 10

pool = pool.fill(0).map((__, i) => `task-${i}`)

let poolb = [...pool]

function wrapSpoon(spoon) {
  return spoon.map((payload, i) => {
    // return a promise that marked i
    return genPromise(payload).then(() => {
      console.warn(`payload ${payload} finished at channel ${i}`)
      return i
    })
  })
}

function starter(spoon) {
  if (spoon.length === 0) {
    return Promise.resolve('任务队列为空')
  }
  const oriSpoon = [...spoon]
  return Promise.race(spoon)
    .then(oldIdx => {
      // 完成之前，可能会被更改？
      const i = spoon.indexOf(oriSpoon[oldIdx])
      console.warn(`finished msg received with Promise.race ${i}`)
      // replace this resolved promise with next payload
      const nextPayload = poolb.shift()
      console.warn('nextPayload', nextPayload)
      if (nextPayload === undefined) {
        // 不续了，等旁边两个结束
        console.warn('删除了一个')
        spoon.splice(i, 1)
      } else {
        console.warn(`replace channel ${i} with next payload ${nextPayload}`)
        spoon.splice(
          i,
          1,
          genPromise(nextPayload).then(() => {
            console.warn(
              `payload ${nextPayload} finished at replaced channel ${i}`
            )
            return i
          })
        )
      }
    })
    .then(() => {
      console.warn('续了一波 race')
      return starter(spoon)
    })
}

async function main() {
  let spoon = wrapSpoon(poolb.splice(0, 3))
  const end = await starter(spoon)
  console.warn('===finished in main', end)
}

main()
