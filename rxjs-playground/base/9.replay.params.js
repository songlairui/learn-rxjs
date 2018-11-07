import { ReplaySubject } from 'rxjs'

const subject = new ReplaySubject(100, 500)

subject.subscribe({ next: console.info.bind(null, 'observerA:') })

let i = 1

setInterval(() => subject.next(i++), 200)

setTimeout(() => {
  subject.subscribe({
    next: console.warn.bind(null, '  observerB:')
  })
}, 1000)
