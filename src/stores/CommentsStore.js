import { observable, computed } from 'mobx';
import uuid from 'uuid';

class Comment {
    @observable email = '';
    @observable message = '';
    @observable pending;

    constructor(id, comment, pending) {
        this.id = comment.id || id;
        this.email = comment.email;
        this.message = comment.message;
        this.pending = pending;
    }

    @computed get lcaseEmail() {
        return this.email.toLowerCase();
    }

    @computed get lcaseMessage() {
        return this.message.toLowerCase();
    }
}

class CommentsStore {
    @observable comments = [];

    addComment(comment, pending) {
        const id = comment.id || uuid();
        this.comments.unshift(new Comment(id, comment, pending));
        return id;
    }
}

export default new CommentsStore();