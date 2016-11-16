/**
 * Created by levin on 11/10/16.
 */

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/from';

console.log('let\'s go!');

// implement zip of Observable
const obs = Observable.interval(1000).take(7);
const obs2 = Observable.interval(2000).take(6);

const source = Observable.zip(
  obs,
  obs2,
  (o1, o2) => ({o1: o1, o2: o2})
);

source.subscribe(
  (x) => console.log('zip of Observable ->', JSON.stringify(x)),
  (error) => console.log('error:', error),
  () => console.log('source completed')
);

// implement zip of Promise
const p1 = new Promise(resolve => {
    setTimeout(() => resolve('p1-01'), 1000)
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve('p2-01'), 2000)
});

const source2 = Observable.zip(
    Observable.from(p1),
    Observable.from(p2),
    (p1, p2) => ({p1: p1, p2: p2})
);

source2.subscribe(
    x => console.log('zip of Promise ->', JSON.stringify(x)),
    e => console.log('error:', e),
    () => console.log('source2 completed')
);

console.log('game over!');