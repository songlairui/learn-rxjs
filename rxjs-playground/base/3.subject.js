import { Subject, from } from 'rxjs'

const subject = new Subject()

subject.subscribe({
  next: console.log.bind(null, 'observerA:')
})

subject.subscribe({
  next: console.warn.bind(null, 'observerB:')
})

subject.next(1)
subject.next(2)

setTimeout(() => {
  const observable = from([1, 2, 3])
  observable.subscribe(subject)
  observable.subscribe(console.info.bind(null, 'more'))
  observable.subscribe(console.info.bind(null, 'more1'))
}, 1000)
