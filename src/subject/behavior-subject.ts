/**
 * Created by 720718 on 2016/9/30.
 */

import * as Rx from 'rxjs/Rx';

const subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
    next: (v) => console.log('behaviorSubject observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
    next: (v) => console.log('behaviorSubject observerB: ' + v)
});

subject.next(3);

setTimeout(() => { // plain subject
    console.log('='.repeat(80));
    const subject = new Rx.Subject();

    subject.subscribe({
        next: (v) => console.log('subject observerA: ' + v)
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe({
        next: (v) => console.log('subject observerB: ' + v)
    });

    subject.next(3);

}, 0);

setTimeout(() => {
    console.log(`
    subject 与 behavior subject 最大的区别就是 subject 会丢失当期值
    比如此列中 subject observerB 少了获取到当前值2`
    );
}, 1);
