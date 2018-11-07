import { BehaviorSubject } from 'rxjs'

const subject = new BehaviorSubject(0)

subject.subscribe({ next: console.log.bind(null, 'observerA:') })

subject.next(1)
subject.next(2)
subject.subscribe({ next: console.warn.bind(null, 'observerB:') })

subject.next(3)
subject.next(4)
