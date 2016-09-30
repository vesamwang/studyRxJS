/**
 * Created by 720718 on 2016/9/29.
 */

/**
 * Reference counting
 *
 * Calling connect() manually and handling the Subscription is often cumbersome.
 * Usually, we want to automatically connect when the first Observer arrives,
 * and automatically cancel the shared execution when the last Observer unsubscribes.

 * Consider the following example where subscriptions occur as outlined by this list:

 * 1. First Observer subscribes to the multicasted Observable
 * 2. The multicasted Observable is connected
 * 3. The next value 0 is delivered to the first Observer
 * 4. Second Observer subscribes to the multicasted Observable
 * 5. The next value 1 is delivered to the first Observer
 * 6. The next value 1 is delivered to the second Observer
 * 7. First Observer unsubscribes from the multicasted Observable
 * 8. The next value 2 is delivered to the second Observer
 * 9. Second Observer unsubscribes from the multicasted Observable
 * 10. The connection to the multicasted Observable is unsubscribed

 * To achieve that with explicit calls to connect(), we write the following code:
 */

import * as Rx from 'rxjs/Rx';

// 创建`observable` 每500ms发送一个递进数字 1, 2, 3,  ...
const source = Rx.Observable.interval(500); // 1)
const subject = new Rx.Subject() as Rx.Subject<number>; // 2)
// 创建'多路广播'
const multicasted = source.multicast(subject); // 3)

const subscription1 = multicasted.subscribe({ // 4)
    next: (v) => console.log('observerA:', v)
});
const subscriptionConnect = multicasted.connect(); //5)

let subscription2: Rx.Subscription;
setTimeout(() => { // 6)
    subscription2 = multicasted.subscribe({
        next: (v) => console.log('observerB:', v)
    });
}, 600);

setTimeout(() => { // 7)
    subscription1.unsubscribe();
}, 1200);

setTimeout(() => { //8)
    subscription2.unsubscribe();
    subscriptionConnect.unsubscribe();
}, 2000);

/**
 * 上面的代码做了下面的事情:
 * 1) 创建'可观察流' source
 * 2) 创建'主题' subject
 * 3) 将'可观察'流 source 与 '主题' subject 结合生成'多路广播-可观察流'
 * 4) 创建第一个'订阅者' subscription1
 * 5) 连接'多路广播-可观察流'使其开始发布数据
 * 6) 600ms后创建第二个'订阅者' subscription2
 * 7) 1200ms后第一个'订阅者' subscription1 取消订阅
 * 8) 2000ms后第一个'订阅者' subscription1 取消订阅, 并且使'多路广播-可观察流'停止发布
 *
 * 这么多动作是期望实现如下的逻辑:
 * 1. 创建多路广播
 * 2. 第一个订阅者订阅后立即开始发布数据
 * 3. 最后一个订阅者取消订阅后立即停止发布数据
 *
 * RxJS提供了一种便利的方法去实现上面的逻辑
 * refCount makes the multicasted Observable automatically start executing when the first subscriber arrives,
 * and stop executing when the last subscriber leaves.
 */

setTimeout(() => { // 避免与上面的异步代码输出内容冲突
    console.log('='.repeat(80));
    const source = Rx.Observable.interval(500);
    const subject = new Rx.Subject() as Rx.Subject<number>;
    const refCounted = source.multicast(subject).refCount();

    console.log('observerA subscribed');
    const subscription1 = refCounted.subscribe({
        next: (v) => console.log('observeA:', v)
    });

    let subscription2: Rx.Subscription;
    setTimeout(() => {
        console.log('observerB subscribed');
        subscription2 = refCounted.subscribe({
            next: (v) => console.log('observeB:', v)
        });
    }, 600);

    setTimeout(() => {
        console.log('observerA unsubscribed');
        subscription1.unsubscribe();
    }, 1200);

    setTimeout(() => {
        console.log('observerB unsubscribed');
        subscription2.unsubscribe();
    }, 2000);

}, 2500);



