/**
 * Created by levin on 11/16/16.
 */

import * as Rx from 'rxjs/Rx';

// 每10秒发送一次数据 共发送11次
const source = Rx.Observable.interval(1).take(11);

// debounce: 触发间隔必须在指定时间以上, 才会触发最新的数据
// Execute this function only if 100 milliseconds have passed without it being called.
source.debounceTime(2)
  .subscribe((data) => console.log('debounce --->', data));

// throttle: 在指定时间内最少触发一次最新的数据
// Execute this function at most once every 100 milliseconds.
source.throttleTime(2)
  .subscribe((data) => console.log('throttle:', data))

/*
            0---1---2---3---4---5---6---7---8---9---10---|
            ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^
            |   |   |   |   |   |   |   |   |   |   |
            0s  1s  2s  3s  4s  5s  6s  7s  8s  9s  10s
debounce:           0
 */