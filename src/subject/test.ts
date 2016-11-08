/**
 * Created by 720718 on 2016/11/8.
 */

import * as Rx from 'rxjs/Rx';

const subject = new Rx.Subject();

subject.next('A');

console.log('start');
subject.subscribe(d => console.log('data:', d));
subject.next('B');
console.log('end');

subject.next('C');