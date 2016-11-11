/**
 * Created by 720718 on 2016/11/11.
 */

import * as Rx from 'rxjs/Rx';

const source = Rx.Observable.from([1, 2, 3]);

source.subscribe((data) => console.log('1st observer', data));
source.subscribe((data) => console.log('2nd observer', data));
source.subscribe((data) => {
    setTimeout(() => console.log('3rd observer', data), 1000);
});
setTimeout(() => {
    source.subscribe((data) => console.log('4th observer', data));
}, 5000);

const subject = new Rx.Subject();
subject.next(1);
subject.next(2);
subject.next(3);
subject.subscribe((data) => console.log('1st subject', data));
subject.subscribe((data) => console.log('2st subject', data));
subject.subscribe((data) => {
    setTimeout(() => console.log('3rd subject', data), 1000);
});
setTimeout(() => {
    subject.subscribe((data) => console.log('4th subject', data));
}, 5000);
subject.next(4);
subject.next(5);
subject.next(6);

