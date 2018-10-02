let arr = []

arr.length = 5

arr = arr.fill(0).map((__, i) => `task-${i}`)

async function main() {
  arr = arr.map((payload, i) => {
    const self = arr[i]
    console.warn('self shoulde be a promise', self, 'a')
    return new Promise(r => {
      return [self]
    })
  })
  const result = await Promise.all(arr)
  console.warn('result', result)
  console.warn('result [0]', result.map(a => a[0]))
}

main()
