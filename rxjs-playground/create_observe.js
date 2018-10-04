const Rx = require('rxjs/Rx')

var myObservable = new Rx.Subject()
myObservable.subscribe(value => console.log(value))
setTimeout(() => {
  myObservable.next('foo')
}, 2222)

var myObservable2 = Rx.Observable.create(observer => {
  //   observer.next('foo2')
  setTimeout(() => observer.next('bar2'), 1000)
})
myObservable2.subscribe(value => console.log(value))

Rx.Observable.of(1, 2, 3)
  .takeUntil(myObservable2)
  //   .take(2)
  //   .delay(200)
  .map(x => `${x}!!!`)
  .subscribe(console.warn.bind(null, ' ---state--- '))
