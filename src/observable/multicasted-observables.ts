/**
 * Created by 720718 on 2016/9/29.
 */

import * as Rx from 'rxjs/Rx';

const sourceObservable = Rx.Observable.from([1, 2, 3]);
const subject = new Rx.Subject() as Rx.Subject<number>;
const multicastedObservable = sourceObservable.multicast(subject);

multicastedObservable.subscribe({
    next: (v) => console.log('observerA', v)
});
multicastedObservable.subscribe(v => console.log('observerB', v));

multicastedObservable.connect();
