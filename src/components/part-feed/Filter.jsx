import { React, PropTypes, CSSModules, cx, PureComponent } from 'utils';
import Flex from '~/layout/Flex';
import Icon from '~/layout/Icon';
import styles from './Filter.scss';

const { string } = PropTypes;

@CSSModules(styles)
class Filter extends PureComponent {

    static propTypes = {
        className: string
    }

    render() {
        const className = cx(this.props.className);
        return (
            <Flex styleName='main' column className={className} >
                <Icon styleName='searchIcon' name='search' size={14} onClick={this.focus} />
                <input ref='input' styleName='textbox' onChange={this.onChange} onKeyUp={this.onKeyUp}
                    placeholder='Search by email or message'
                />
                {this.state.value ?
                    <Icon name='times' styleName='clearIcon' size={14} onClick={this.clear} /> :
                    null
                }
            </Flex>
        );
    }

    onChange = ({ target: { value }}) => this.onSearch(value, true)
    onKeyUp = ({ target: { value }, keyCode }) => {
        if(keyCode === 27) {
            this.clear();
        } else {
            this.onSearch(value, false);
        }
    }

    state = {}

    onSearch = (value, done) => {
        this.setState({ value });
        this.props.onSearch && this.props.onSearch(value, done);
    }

    focus = () => {
        this.refs.input.focus();
    }

    clear = () => {
        this.refs.input.value = '';
        this.onChange({ target: { value: '' }});
        this.focus();
    }

    checkFocus = (event) => {
        if (event.keyCode === 114 || ((event.ctrlKey || event.metaKey) && event.keyCode === 70)) {
            this.focus();
            event.preventDefault();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.checkFocus);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.checkFocus);
    }
}

export default Filter;