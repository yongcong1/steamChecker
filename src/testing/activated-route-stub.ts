// export for convenience.
export { ActivatedRoute } from '@angular/router';

import { Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<Params>();

  constructor(initialParams?) {
    this.setParams(initialParams);
  }

  /** The mock paramMap observable */
  readonly params = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParams(params) {
    this.subject.next(params);
  };
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
