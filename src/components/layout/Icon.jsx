import { React, PropTypes, CSSModules, cx } from 'utils';
import styles from './Flex.scss';
const { string, func, number } = PropTypes;

function Icon({ name, size, onClick, className }) {
    return (
        <span styleName='main' className={cx(className)} onClick={onClick} style={size ? { 'fontSize': `${size}px` } : null}>
            <i className={cx('fa', `fa-${name}`)} />
        </span>
    );
}

Icon.propTypes = {
    name: string,
    size: number,
    onClick: func,
    className: string
};

export default CSSModules(Icon, styles);