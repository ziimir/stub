import { FC, memo } from 'react';
import { createCn } from 'bem-react-classname';

import mapImg from './images/map.jpg';

interface Props {
    className?: string;
}

export const BookMap: FC<Props> = memo((props) => {
    const cn = createCn('book-map', props.className);

    return (
        <div className={cn()}>
            <img width="100%" src={mapImg} />
        </div>
    );
});

BookMap.displayName = 'BookMap';
