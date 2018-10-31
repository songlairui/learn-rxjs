async function main() {
  const src = ['a', 'b', 'c']
  for (let j of src) {
    console.info(j)
    await new Promise(r => setTimeout(r, 1234))
  }
  for (let i = 0; i < src.length; i++) {
    console.info(src[i])
    await new Promise(r => setTimeout(r, 1234))
  }
}

main()
