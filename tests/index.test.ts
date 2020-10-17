import * as fs from 'fs';
import * as path from 'path';
import { exist, rmdirRecursive } from '../lib/fs-utils';
import { download, DownloadOptions } from '../index';

describe('test this package', () => {

    const url = 'https://github.com/diegozanon/get-github-code';

    it('downloads unzipped', async () => {
        await download(url);
        await expect(exist(path.resolve('./get-github-code-main/README.md'))).resolves.toBeTruthy();
    });

    it('downloads another branch and is a zip file', async () => {
        await download(url + '#develop', { zip: true } as DownloadOptions);
        await expect(exist(path.resolve('./get-github-code-develop.zip'))).resolves.toBeTruthy();
    });

    it('downloads to a given directory', async () => {
        await download(url, { output: './download' } as DownloadOptions);
        await expect(exist(path.resolve('./download/get-github-code-main/README.md'))).resolves.toBeTruthy();
    });

    it('downloads using a given filename', async () => {
        await download(url, { output: './my-download.zip' } as DownloadOptions);
        await expect(exist(path.resolve('./my-download.zip'))).resolves.toBeTruthy();
    });
});

afterAll(async () => {
    // clear downloaded files
    await rmdirRecursive('./get-github-code-main');
    await fs.promises.unlink('./get-github-code-develop.zip');
    await rmdirRecursive('./download');
    await fs.promises.unlink('./my-download.zip');
});