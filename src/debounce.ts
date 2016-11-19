/**
 * Created by levin on 11/19/16.
 */

import * as Rx from 'rxjs';

const source = Rx.Observable.create(
  (obs: Rx.Subscriber<string>) => {
    setTimeout(() => {
      obs.next('after 450ms');
    }, 4500);
    setTimeout(() => {
      obs.next('after 600ms');
    }, 6000);
    setTimeout(() => {
      obs.next('after 700ms');
    }, 7410);
  }
);

source.debounceTime(1400).subscribe((data: string) => console.log('debounce 400 --->', data));
