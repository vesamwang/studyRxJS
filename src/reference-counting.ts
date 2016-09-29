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
const source = Rx.Observable.interval(500);
const subject = new Rx.Subject() as Rx.Subject<number>;
// 创建'多路广播'
const multicasted = source.multicast(subject);
