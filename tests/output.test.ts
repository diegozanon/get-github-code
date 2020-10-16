import * as path from 'path';
import { Options } from '../lib/types';
import { getFilename } from '../lib/output';

describe('test if the output is set correctly', () => {

    const url = 'https://codeload.github.com/username/repo/zip/branch';

    it('checks if the filename is returned correctly', async () => {

        // local without zip
        expect(await getFilename(url)).toBe('repo-branch');
        expect(await getFilename(url, { zip: false } as Options)).toBe('repo-branch');

        // local zip
        expect(await getFilename(url, { zip: true } as Options)).toBe('repo-branch.zip');

        // directory
        const dirWithoutZip = await getFilename(url, { output: process.cwd() } as Options);
        const dirWithZip = await getFilename(url, { output: process.cwd(), zip: true } as Options);
        expect(dirWithoutZip).toBe(path.resolve(process.cwd(), 'repo-branch'));
        expect(dirWithZip).toBe(path.resolve(process.cwd(), 'repo-branch.zip'));

        // filename was given
        const filename = path.resolve(process.cwd(), 'repo-branch.zip');
        expect(await getFilename(url, { output: filename } as Options)).toBe(filename);
        expect(await getFilename(url, { zip: false, output: filename } as Options)).toBe(filename); // zip option should be ignored
    });
});