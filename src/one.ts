/**
 * Created by 720718 on 2016/9/27.
 */


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/scan';

Observable.of(1, 2, 3).map(x => console.log(x + '!!!')).subscribe();

Observable.of(1, 2, 3).subscribe(v => console.log(v));

Observable.of(1, 2, 3).scan((acc, curr) => acc + curr, 0).subscribe(v => console.log(v));
