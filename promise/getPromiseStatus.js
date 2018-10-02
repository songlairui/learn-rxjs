let a = new Promise(() => {})
let b = Promise.resolve()
let c = Promise.reject()

console.warn(a, Object.keys(a))
console.warn(b, Object.keys(b))
console.warn(c, Object.keys(c))
