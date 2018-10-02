let result = []
let payloads, operatingPayloads

const wrapPromise = (payload, i) =>
  payload()
    .then(data => data, err => err)
    .then(data => {
      const idx = payloads.indexOf(payload)
      result[idx] = data
      return i
    })

function starter(spoon) {
  if (spoon.length === 0) {
    return Promise.resolve('任务队列为空')
  }
  const oriSpoon = [...spoon]
  return Promise.race(spoon)
    .then(oldIdx => {
      const i = spoon.indexOf(oriSpoon[oldIdx]) // find the operating promise
      const nextPayload = operatingPayloads.shift()

      if (nextPayload === undefined) {
        console.warn('删除了一个 channel')
        spoon.splice(i, 1)
      } else {
        spoon.splice(i, 1, wrapPromise(nextPayload, i))
      }
    })
    .then(() => starter(spoon))
}

async function parallel(promiseFns, limit = 3) {
  if (!limit > 0) limit = 1
  if (limit >= promiseFns.length) return Promise.all(promiseFns.map(fn => fn()))
  payloads = [...promiseFns]
  operatingPayloads = [...payloads]
  const spoon = operatingPayloads.splice(0, limit).map(wrapPromise)
  const end = await starter(spoon)

  payloads = null
  operatingPayloads = null

  return result.splice(0, Infinity)
  // console.warn('===finished in main', end, '\n', result)
}

module.exports = {
  parallel
}

// 期望的形式

// parellel([]<Promise>, limit, options:{break})
