const genPromise = a =>
  new Promise(r => {
    console.warn('<-- ', a)
    setTimeout(() => {
      console.warn('--> ', a)
      r(`resolved, ${a}`)
    }, 400 + Math.random() * 200)
  })

const genPromiseArray = undefined

module.exports = {
  genPromise,
  genPromiseArray
}
