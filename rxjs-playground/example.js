const Rx = require('rxjs/Rx')

// const { Observable } = require('rxjs/Observable')
// require('rxjs/add/observable/of')
// require('rxjs/add/operator/map')

// console.warn(Object.keys(Rx))
// const { Observeable } = Rx

Rx.Observable.of(1, 2, 3)
  // .throttleTime(100)
  .take(2)
  .delay(200)
  .map(x => `${x}!!!`)
  .subscribe(console.warn.bind(null, ' ---state--- '))
