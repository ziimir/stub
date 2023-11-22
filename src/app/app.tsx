import { FC, memo } from 'react';
import { createCn } from 'bem-react-classname';

import { BookMap } from 'entities/book-map';
import { LikeButton } from 'features/like';

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
