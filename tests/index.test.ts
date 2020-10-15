import * as fs from 'fs';
import * as path from 'path';
import { exist } from '../lib/fs-utils';
import { download, Options } from '../index';

describe('test this package', () => {

    const url = 'https://github.com/diegozanon/download-github-code';

    it('downloads unzipped', async () => {
        await download(url);
        expect(exist(path.resolve('./download-github-code-main/README.md'))).toBeTruthy();
    });

    it('downloads a zip', async () => {
        await download(url, { zip: true } as Options);
        expect(exist(path.resolve('./download-github-code-main.zip'))).toBeTruthy();
    });

    it('downloads to a given directory', async () => {
        await download(url, { output: './download' } as Options);
        expect(exist(path.resolve('./download/download-github-code-main/README.md'))).toBeTruthy();
    });

    it('downloads using a given filename', async () => {
        await download(url, { output: './my-download.zip' } as Options);
        expect(exist(path.resolve('./my-download.zip'))).toBeTruthy();
    });
});

afterAll(async () => {
    // clear downloaded files
    await fs.promises.unlink('./download-github-code-main');
    await fs.promises.unlink('./download-github-code-main.zip');
    await fs.promises.unlink('./download');
    await fs.promises.unlink('./my-download.zip');
});