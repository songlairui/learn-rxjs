import { interval, Subject } from 'rxjs'
import { multicast, refCount } from 'rxjs/operators'

const source = interval(500)
const subject = new Subject()
const refCounted = source.pipe(
  multicast(subject),
  refCount()
)
let subscription1, subscription2
console.log('observerA subscribed')

subscription1 = refCounted.subscribe({
  next: console.log.bind(null, 'observerA:')
})

setTimeout(() => {
  console.log('observerB subscribed')
  subscription2 = refCounted.subscribe({
    next: console.log.bind(null, 'observerB:')
  })
}, 600)
setTimeout(() => {
  console.log('observerA unsubscribed')
  subscription1.unsubscribe()
}, 1200)
setTimeout(() => {
  console.log('observerB unsubscribed')
  subscription2.unsubscribe()
}, 2000)
