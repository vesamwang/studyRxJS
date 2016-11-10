/**
 * Created by levin on 9/30/16.
 */

import * as Rx from 'rxjs/Rx';

const subject = new Rx.Subject();

subject.subscribe(x => console.log('A--->', x));
subject.subscribe(x => console.log('B----->', x));
subject.subscribe(x => console.log('C-------->', x));

subject.next(1);
subject.next(2);
subject.next(3);

