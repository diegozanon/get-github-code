import * as fs from 'fs';
import * as path from 'path';
import { exist, rmdirRecursive } from '../lib/fs-utils';
import { download, Options } from '../index';

describe('test this package', () => {

    const url = 'https://github.com/diegozanon/download-github-code';

    it('downloads unzipped', async () => {
        await download(url);
        await expect(exist(path.resolve('./download-github-code-main/README.md'))).resolves.toBeTruthy();
    });

    it('downloads a zip', async () => {
        await download(url, { zip: true } as Options);
        await expect(exist(path.resolve('./download-github-code-main.zip'))).resolves.toBeTruthy();
    });

    it('downloads to a given directory', async () => {
        await download(url, { output: './download' } as Options);
        await expect(exist(path.resolve('./download/download-github-code-main/README.md'))).resolves.toBeTruthy();
    });

    it('downloads using a given filename', async () => {
        await download(url, { output: './my-download.zip' } as Options);
        await expect(exist(path.resolve('./my-download.zip'))).resolves.toBeTruthy();
    });
});

afterAll(async () => {
    // clear downloaded files
    await rmdirRecursive('./download-github-code-main');
    await fs.promises.unlink('./download-github-code-main.zip');
    await rmdirRecursive('./download');
    await fs.promises.unlink('./my-download.zip');
});