import { AsyncSubject } from 'rxjs'

const subject = new AsyncSubject()

subject.subscribe({ next: console.info.bind(null, 'observerA:') })

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({
  next: console.info.bind(null, 'observerB:')
})

subject.next(5)
subject.complete()
