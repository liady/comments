import { action } from 'mobx';
import commentsStore from 'stores/CommentsStore';

class CommentsActions {
    @action('init-comments')
    initComments(commentsList = []) {
        commentsList.forEach(comment => commentsStore.addComment(comment));
    }

    @action('add-comment')
    addComment(newComment) {
        return commentsStore.addComment(newComment, true);
    }

    @action('mark-as-added')
    markAsAdded(commentId) {
        const comment = commentsStore.comments.find(({ id }) => id === commentId);
        if(comment) {
            comment.pending = false;
        }
    }

    @action('clear')
    clear() {
        commentsStore.comments = [];
    }
}

export default new CommentsActions();