import { React, PropTypes, CSSModules, cx, PureComponent } from 'utils';
import Flex from '~/layout/Flex';
import styles from './AddComment.scss';

const { string, func } = PropTypes;

@CSSModules(styles)
class AddComment extends PureComponent {

    static propTypes = {
        className: string,
        onAdd: func
    }

    render() {
        const className = cx(this.props.className);
        const { email, message, invalidEmail, invalidMessage } = this.state;
        return (
            <Flex styleName='main' column className={className} dom={{ onKeyDown: this.onKeyDown }}>
                <input ref='email' styleName={cx('email', { invalid: invalidEmail })} onChange={this.onEmailChange}
                    value={email} placeholder='Email' autoFocus onKeyDown={this.onEmailKeyDown}
                />
                <textarea ref='message' styleName={cx('message', { invalid: invalidMessage })} onChange={this.onMessageChange}
                    value={message} placeholder='Message'
                />
                <div styleName='submit' onClick={this.submit}>Submit</div>
            </Flex>
        );
    }

    state = {
        email: '',
        message: ''
    }

    onEmailKeyDown = event => {
        if(event.keyCode === 13) { // enter
            if(this.state.message) {
                this.submit();
            } else {
                this.refs.message.focus();
            }
            event.preventDefault();
        }
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13 && (event.ctrlKey || event.metaKey)) { // ctrl + enter
            this.submit();
            event.preventDefault();
        }
    }

    onEmailChange = ({ target: { value }}) => {
        this.setState({ email: value, invalidEmail: false });
    }

    onMessageChange = ({ target: { value }}) => {
        this.setState({ message: value, invalidMessage: false });
    }

    submit = () => {
        const { email, message } = this.state;
        if(!email) { // can add any other check here
            this.setState({ invalidEmail: true });
            this.refs.email.focus();
            return;
        }
        if(!message) {
            this.setState({ invalidMessage: true });
            this.refs.message.focus();
            return;
        }
        this.props.onAdd({ email, message });
        this.setState({ email: '', message: '' });
        this.refs.email.focus();
    }
}

export default AddComment;