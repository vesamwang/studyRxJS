/**
 * Created by 720718 on 2016/11/1.
 */

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


class C {
    getData(): Observable<string> {
        return Observable.of('1');
    }
}

const c = new C();
c.getData().subscribe(data => console.log(data));
