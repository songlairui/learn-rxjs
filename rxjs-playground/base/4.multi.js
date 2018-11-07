import { from, Subject } from 'rxjs'
import { multicast } from 'rxjs/operators'

const source = from([1, 2, 3])

const subject = new Subject()

const multicasted = source.pipe(multicast(subject))

multicasted.subscribe({
  next: console.info.bind(null, 'observerA:')
})

multicasted.subscribe({
  next: console.warn.bind(null, 'observerB:')
})

multicasted.connect()
