import { Observable } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

let observer, timer
let i = 0
const observable = Observable.create(o => {
  console.info('set observer')

  observer = o

  console.info('execute creator')
  creator()
})

function creator() {
  if (!observer) return
  timer = setTimeout(() => {
    observer.next(++i)
    creator()
  }, Math.random() * 500 + 50)
}

observable.pipe(throttleTime(1000)).subscribe({
  next: console.info.bind(null, 'oA:')
})

setTimeout(() => {
  timer && clearTimeout(timer)
}, 10000)
