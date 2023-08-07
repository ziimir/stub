import express from 'express';
import path from 'path';

import nativeRequire from './lib/native-require/native-require';
import { Renderer } from './renderer';

const app = express();
const port = 8080;

const rootPath = path.resolve(__dirname, '../../');

interface AppAssets {
    js: string[];
    css: string[];
}

function getAssets(): AppAssets {
    const manifest = nativeRequire<Record<string, string>>(path.resolve(rootPath, 'build/manifest.json'));

    const JS_ASSET_NAME_REGEXP = /\.js$/;
    const CSS_ASSET_NAME_REGEXP = /\.css$/;
    const css: string[] = [];
    const js: string[] = [];

    for (const [name, path] of Object.entries(manifest)) {
        if (JS_ASSET_NAME_REGEXP.test(name)) {
            js.push(path);
        }

        if (CSS_ASSET_NAME_REGEXP.test(name)) {
            css.push(path);
        }
    }

    return { js, css };
}

app.set('views', path.resolve(rootPath, 'build/views'));
app.set('view engine', 'pug');

app.use('/assets', express.static(path.resolve(rootPath, 'build/assets')));
app.get('/', (_req, res) => {
    const { js, css } = getAssets();

    res.render('main', {
        js,
        css,
        reactApp: Renderer.render(),
    });
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
