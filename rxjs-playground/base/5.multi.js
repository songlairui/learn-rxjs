import { interval, Subject } from 'rxjs'
import { multicast } from 'rxjs/operators'

const source = interval(500)

const subject = new Subject()
const multicasted = source.pipe(multicast(subject))

let subscription1, subscription2, subscriptionConnect

console.info('- ---> observerA')
subscription1 = multicasted.subscribe({
  next: console.info.bind(null, 'observerA:')
})

subscriptionConnect = multicasted.connect()

setTimeout(() => {
  console.info('- ---> observerB')
  subscription2 = multicasted.subscribe({
    next: console.warn.bind(null, 'observerB:')
  })
}, 600)

setTimeout(() => {
  subscription1.unsubscribe()
  console.info('x ----> observerA')
}, 1200)

setTimeout(() => {
  subscription2.unsubscribe()
  console.info('x ----> observerB')
}, 2000)

setTimeout(() => {
  subscriptionConnect.unsubscribe()
  console.info('x ----> observerConnect')
}, 3000)
