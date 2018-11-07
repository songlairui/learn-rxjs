import { Observable } from 'rxjs'

const observable = Observable.create(function(observer) {
  observer.next(1)
  observer.next(2)
  observer.next(3)
  setTimeout(() => {
    observer.next(4)
    observer.complete()
  }, 1234)
})
console.log('just before subscribe')

observable.subscribe({
  next: x => console.log('got value', x),
  error: err => console.error('sth. err', err),
  complete: () => console.info('done')
})

console.log('just after subscribe')
