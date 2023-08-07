import { FC, memo } from 'react';
import { createCn } from 'bem-react-classname';

import { LikeButton } from 'components/like-button/like-button';
import { BookMap } from 'components/book-map/book-map';

import './app.css';

export const App: FC = memo(() => {
    const cn = createCn('app');

    return (
        <div className={cn()}>
            <div>react app</div>
            <LikeButton onClick={() => {}} />
            <BookMap />
        </div>
    );
});

App.displayName = 'App';
