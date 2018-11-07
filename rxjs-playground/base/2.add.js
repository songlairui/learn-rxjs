import { interval } from 'rxjs'
const observable1 = interval(400)
const observable2 = interval(300)
const now = +new Date()
console.info('begin at', now)
const subscription = observable1.subscribe(x => {
  console.log('first:', x, +new Date() - now)
})
const childSubscription = observable2.subscribe(y => {
  console.log('second:', y, +new Date() - now)
})

subscription.add(childSubscription)

setTimeout(() => {
  subscription.unsubscribe()
}, 3000)
