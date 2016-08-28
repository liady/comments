import { observer as mobxObserver, inject } from 'mobx-react';
import originalCSSModules from 'react-css-modules';

export React, {PropTypes, PureComponent} from 'react';
export cx from 'classnames';

/**
 * Observer + inject decorator
 * @param {Array} stores The stores to observe
 * @return {function} the decorator
 */
export function observer(stores = []) {
    return function(Component) {
        let component = Component;
        component = mobxObserver(Component);
        if(stores.length) {
            component = inject(...stores)(component);
        }
        return component;
    };
}

/**
 * CSSModules fix
 * @param {Component} Component The component
 * @param {object} styles The styles
 * @return {Component} the react-css-styles component
 */
export function CSSModules(...args) {
    if(typeof args[0] === 'function') { // eslint-disable-line lodash/prefer-lodash-typecheck
        const Component = args[0];
        const styles = args[1];
        return originalCSSModules(Component, styles, { allowMultiple: true, errorWhenNotFound: false });
    } else {
        const styles = args[0];
        return function(Component) {
            return originalCSSModules(Component, styles, { allowMultiple: true, errorWhenNotFound: false });
        };
    }
}