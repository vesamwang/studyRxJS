/**
 * Created by 720718 on 2016/11/16.
 */

import * as Rx from 'rxjs';

const sj = new Rx.Subject();

const subscription1 = sj.subscribe((data) => console.log('first:', data));

sj.next(1);
subscription1.unsubscribe();

sj.subscribe((data) => console.log('second:', data));

sj.next(2);

sj.next(3);
