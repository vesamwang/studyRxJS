/**
 * Created by levin on 11/10/16.
 */

import {Observable} from 'rxjs/Observable';
import  'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/zip';

const obs = Observable.interval(1000).take(7);
const obs2 = Observable.interval(2000).take(6);

const source = Observable.zip(
  obs,
  obs2,
  (o1, o2) => ({o1: o1, o2: o2})
);

source.subscribe(
  (x) => console.log(JSON.stringify(x)),
  (error) => console.log('error:', error),
  () => console.log('completed')
);
