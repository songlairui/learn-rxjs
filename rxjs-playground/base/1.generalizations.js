import { Observable } from 'rxjs'

const foo = Observable.create(observer => {
  console.info('Hello')
  observer.next(42)
})

foo.subscribe(x => console.log(x))

foo.subscribe(console.warn.bind(null, 'y'))
setTimeout(() => {
  console.log('before')
  foo.call()
  console.log('after')
}, 4321)
