/**
 * Created by 720718 on 2016/9/29.
 */

import * as Rx from 'rxjs/Rx';

/**
 * observable 与 subject 的区别是
 * - unicast vs. multicast (单路广播 vs. 多路广播)
 *
 * 举例: 发送 1 2 3 订阅者3个 s1 s2 s3
 * - observable 的接收顺序:
 *  1. s1 接收 1 2 3
 *  2. s2 接收 1 2 3
 *  3. s3 接收 1 2 3
 * - subject 接收顺序
 *  1. s1 s2 s3 接收 1
 *  2. s1 s2 s3 接收 2
 *  3. s1 s2 s3 接收 3
 *
 */

const observable = Rx.Observable.create((observer: Rx.Observer<number>) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
});

observable.subscribe((x: number) => console.log('observable 1st subscribe', x));
observable.subscribe((x: number) => console.log('observable 2nd subscribe', x));
observable.subscribe((x: number) => setTimeout(() => console.log('observable async 1st subscribe', x), 0));
observable.subscribe((x: number) => setTimeout(() => console.log('observable async 2nd subscribe', x), 1000));
observable.subscribe((x: number) => setTimeout(() => console.log('observable async 3th subscribe', x), 1100));

///////////////////////////////////////////////////////
console.log('='.repeat(80));

const subject = new Rx.Subject();

subject.subscribe((x: number) => console.log('subject 1st subscribe', x));
subject.subscribe((x: number) => console.log('subject 2nd subscribe', x));
subject.subscribe((x: number) => setTimeout(() => console.log('subject async 1st subscribe', x), 0));
subject.subscribe((x: number) => setTimeout(() => console.log('subject async 2nd subscribe', x), 1000));
subject.subscribe((x: number) => setTimeout(() => console.log('subject async 3th subscribe', x), 1100));

subject.next(1);
subject.next(2);
subject.next(3);