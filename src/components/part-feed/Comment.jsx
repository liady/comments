import { React, PropTypes, CSSModules, cx, PureComponent, observer } from 'utils';
import md5 from 'md5';
import Flex from '~/layout/Flex';
import styles from './Comment.scss';

const { string, any } = PropTypes;

@observer()
@CSSModules(styles)
class Comment extends PureComponent {

    static propTypes = {
        className: string,
        comment: any
    }

    render() {
        const { comment, className } = this.props;
        const { pending } = comment;
        return (
            <li>
                <Flex styleName={cx('main', { pending })} className={cx(className)} >
                    <Flex styleName='imageContainer'>
                        <img styleName='image' src={`http://www.gravatar.com/avatar/${md5(comment.email)}`} />
                    </Flex>
                    <Flex styleName='details' column justify='flex-start' auto>
                        <span styleName='email'>{comment.email}</span>
                        <span styleName='message'>{comment.message}</span>
                    </Flex>
                </Flex>
            </li>
        );
    }
}

export default Comment;