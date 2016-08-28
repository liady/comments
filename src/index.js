import Root from '~/Root';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import commentsStore from 'stores/CommentsStore';
import './styles/general.scss';

function init() {
    const container = document.getElementById('app');
    ReactDOM.render(
        <Provider commentsStore={commentsStore}>
            <Root />
        </Provider>,
    container);

    const rotateIcon = document.getElementById('rotate');
    rotateIcon.addEventListener('click', () => {
        container.classList.toggle('wide');
    });
}

init();