import { React, PropTypes, CSSModules, cx } from 'utils';
import styles from './Flex.scss';
const { string, bool, oneOf, object } = PropTypes;

/**
 * Renders the component markup
 * @return {JSX}
 */
const Flex = ({ wrap, column, align, justify, auto, style, styleName, className, center, noFlex, dom, ...props }) => {
    /** Build dynamic style */
    const sx = Object.assign({}, style, {
        display: noFlex ? null : 'flex',
        flexWrap: wrap ? 'wrap' : null,
        flexDirection: column ? 'column' : null,
        flex: auto ? '1 1 auto' : null,
        alignItems: align || (center ? 'center' : null),
        justifyContent: justify || (center ? 'center' : null)
    });

    /** Return markup */
    return <div styleName={cx('main', column ? 'column' : 'row')} className={cx(className)} style={sx} {...dom}>
        {props.children}
    </div>;
};

/**
 * Expected prop types
 * @type {Object}
 */
Flex.propTypes = {
    /** Sets flex-wrap: wrap */
    wrap: bool,
    /** Sets flex-direction: column */
    column: bool,
    /** Sets align-item */
    align: oneOf(['stretch', 'center', 'baseline', 'flex-start', 'flex-end']),
    /** Sets justify-content */
    justify: oneOf(['center', 'space-around', 'space-between', 'flex-start', 'flex-end']),
    /** Sets flex: 1 1 auto */
    auto: bool,
    center: bool,
    className: string,
    style: object,
    noFlex: bool,
    dom: object // DOM props
};

export default CSSModules(Flex, styles);