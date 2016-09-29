/**
 * Created by 720718 on 2016/9/29.
 */

import * as Rx from 'rxjs/Rx';

const observable = Rx.Observable.create((observer: Rx.Observer<number>) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
});

observable.subscribe((x: number) => console.log('observable first subscribe', x));
observable.subscribe((x: number) => console.log('observable second subscribe', x));

///////////////////////////////////////////////////////
console.log('='.repeat(80));

const subject = new Rx.Subject();

subject.subscribe((x: number) => console.log('subject first subscribe', x));
subject.subscribe((x: number) => console.log('subject second subscribe', x));

subject.next(1);
subject.next(2);
subject.next(3);