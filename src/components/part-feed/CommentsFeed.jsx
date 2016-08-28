import { React, PropTypes, CSSModules, cx, PureComponent, observer } from 'utils';
import { computed, observable } from 'mobx';
import Flex from '~/layout/Flex';
import Comment from './Comment';
import Filter from './Filter';
import * as server from 'services/server';
import commentsActions from 'stores/CommentsActions';
import styles from './CommentsFeed.scss';

const { string } = PropTypes;

@observer(['commentsStore'])
@CSSModules(styles)
class CommentsFeed extends PureComponent {

    static propTypes = {
        className: string
    }

    render() {
        const className = cx(this.props.className);
        const { comments } = this.props.commentsStore;
        return (
            <Flex styleName='main' column className={className} >
                {comments.length ? <Filter styleName='filter' onSearch={this.onSearch} /> : null}
                {this.generateCommentsList()}
            </Flex>
        );
    }

    generateCommentsList() {
        if(this.filteredComments.length) {
            return (
                <div styleName='list' className='heightContainer'>
                    <ul styleName='feed'>
                        {this.filteredComments.map(comment => <Comment comment={comment} key={comment.id} />)}
                    </ul>
                    <div styleName='clear' onClick={this.clear}>Clear feed</div>
                </div>
            );
        } else if (this.filter) {
            return <Flex styleName='noResults' center>No comments were found</Flex>;
        } else {
            return <Flex styleName='noComments' auto center>Hey, this feed is empty...<br />Write something :)</Flex>;
        }
    }

    onSearch = (filter) => {
        this.filter = filter ? new RegExp(`\\b${filter.toLowerCase()}`) : '';
    }

    clear = () => {
        commentsActions.clear();
        server.clearComments();
    }

    @computed
    get filteredComments() {
        const { comments } = this.props.commentsStore;
        const filter = this.filter;
        return filter ? comments.filter(({ lcaseEmail, lcaseMessage }) => filter.test(lcaseEmail) || filter.test(lcaseMessage)) : comments;
    }

    @observable
    filter = ''

    componentDidMount() {
        server.getAllComments().then(({ data: comments }) => commentsActions.initComments(comments));
    }
}

export default CommentsFeed;