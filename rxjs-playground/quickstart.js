const Rx = require('rxjs/Rx')

const Observer = Rx.Observable.interval(300).take(10)
const Observer2 = Rx.Observable.interval(300).take(10)

// Observer.subscribe(console.warn)

// Purity
Observer.scan(count => count + 1, 0).subscribe(count =>
  console.warn(`clicked ${count}`)
)

// Flow

Observer2.throttleTime(1000)
  .takeUntil(Observer)
  .scan(count => count + 1, 0)
  .subscribe(console.log.bind(null, 'throttled'))
