/**
 * Created by 720718 on 2016/9/28.
 */

import * as Rx from 'rxjs/Rx';

Rx.Observable.create(function subscribe(observer: any) {
    observer.next(10);
})
    .subscribe(function observer(x: any) {
        console.log(x);
    });

////////////////////////////////////////////////////////////////
// 上面的Rx代码可以用下面的plain js代码进行阐释
function subscribe(observer: any) {
    observer.next(10);
}

function observer(x: any) {
    console.log(x);
}

subscribe({next: observer});
