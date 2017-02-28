import React from 'react';
import { bindAll } from 'lodash';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.__autoBind();
  }

  __autoBind() {
    const blacklist = ['constructor', 'render'];

    const methods = Object.getOwnPropertyNames(this.constructor.prototype)
      .filter(prop => typeof this[prop] === 'function')
      .filter(prop => blacklist.indexOf(prop) === -1);

    if (methods.length > 0) {
      bindAll(this, ...methods);
    }
  }
}

export default Component;
