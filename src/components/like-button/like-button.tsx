import { FC, memo, useState } from 'react';
import { createCn } from 'bem-react-classname';

import './like-button.css';

interface Props {
    className?: string;
    onClick?: () => void;
}

export const LikeButton: FC<Props> = memo((props) => {
    const cn = createCn('like-button', props.className);

    const [liked, setLiked] = useState(false);

    const handleButtonClick = () => {
        setLiked(true);

        props.onClick?.();
    };

    if (liked) {
        return 'liked';
    }

    return (
        <div className={cn()}>
            <div className={cn('icon')} />
            <button onClick={handleButtonClick}>L_I_K_E</button>
        </div>
    );
});

LikeButton.displayName = 'LikeButton';
