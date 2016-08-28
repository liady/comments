export function addComment(comment) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

export function getAllComments() {
    return Promise.resolve({data: [
        { email: 'first@test.com', message: 'New Comment' },
        { email: 'second@test.com', message: 'My Comment' },
        { email: 'we@nowhere.com', message: '3rd Comment' }
    ]});
}

export function clearComments() {
    return Promise.resolve();
}