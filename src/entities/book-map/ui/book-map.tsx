import { FC } from 'react';
import { createCn } from 'bem-react-classname';

import mapImg from './images/map.jpg';

interface Props {
    className?: string;
}

export const BookMap: FC<Props> = (props) => {
    const cn = createCn('book-map', props.className);

    return (
        <div className={cn()}>
            <img width="100%" src={mapImg} />
        </div>
    );
};
