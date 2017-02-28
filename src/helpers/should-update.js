/* eslint-disable no-console, no-restricted-syntax */

import _ from 'lodash';
import React from 'react';

/*
 * Drop this HOC into a component that wastes time according to
 * Perf.getWastedTime() to find out what state/props should be preserved.
 */
function isRequiredUpdateObject(o) {
  return Array.isArray(o) || (o && o.constructor === Object.prototype.constructor);
}

function deepDiff(old, next, displayName) {
  const notify = (status) => {
    console.warn('Update %s', status);
    console.log('%cbefore', 'font-weight: bold', old);
    console.log('%cafter ', 'font-weight: bold', next);
  };

  if (!_.isEqual(old, next)) {
    console.group(displayName);

    if ([old, next].every(_.isFunction)) {
      notify('avoidable?');
    } else if (![old, next].every(isRequiredUpdateObject)) {
      notify('required.');
    } else {
      const keys = _.union(_.keys(old), _.keys(next));

      for (const key of keys) {
        deepDiff(old[key], next[key], key);
      }
    }

    console.groupEnd();
  } else if (old !== next) {
    console.group(displayName);

    notify('avoidable!');

    if (_.isObject(old) && _.isObject(next)) {
      const keys = _.union(_.keys(old), _.keys(next));

      for (const key of keys) {
        deepDiff(old[key], next[key], key);
      }
    }

    console.groupEnd();
  }
}

const shouldUpdate = (Composed) => {
  class ShouldYouUpdate extends React.PureComponent {
    static displayName = `WhyDidYouUpdate(${Composed.displayName || Composed.name})`;

    componentDidUpdate(nextProps, nextState) {
      deepDiff(
        { props: this.props, state: this.state },
        { props: nextProps, state: nextState },
        ShouldYouUpdate.displayName,
      );
    }

    render() {
      return <Composed {...this.props} />;
    }
  }

  return ShouldYouUpdate;
};

export default shouldUpdate;
