import { hydrateRoot } from 'react-dom/client';

import { App } from 'app/app';

document.addEventListener('DOMContentLoaded', () => {
    const domContainer = document.querySelector('#main');

    hydrateRoot(domContainer!, <App />);
});
