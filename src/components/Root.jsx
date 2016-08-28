import { React, PropTypes, CSSModules, cx, PureComponent } from 'utils';
import Flex from '~/layout/Flex';
import * as server from 'services/server';
import commentsActions from 'stores/CommentsActions';
import AddComment from './part-add/AddComment';
import CommentsFeed from './part-feed/CommentsFeed';
import styles from './Root.scss';

const { string } = PropTypes;

@CSSModules(styles)
class Root extends PureComponent {

    static propTypes = {
        className: string
    }

    render() {
        const className = cx(this.props.className);
        return (
            <Flex styleName='main' column className={className} >
                <AddComment onAdd={this.onAdd} />
                <CommentsFeed />
            </Flex>
        );
    }

    onAdd = comment => {
        const id = commentsActions.addComment(comment);
        server.addComment(comment).then(() => commentsActions.markAsAdded(id));
    }
}

export default Root;