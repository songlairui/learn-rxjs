import { ReplaySubject } from 'rxjs'
const subject = new ReplaySubject()

subject.subscribe({ next: console.info.bind(null, 'observerA:') })

subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)

subject.subscribe({ next: console.warn.bind(null, 'observerB:') })

subject.next(5)
