import { renderToString } from 'react-dom/server';

import { App } from '../app/app';

export const Renderer = {
    render: () => renderToString(<App />),
};
