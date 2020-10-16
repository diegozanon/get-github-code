import * as path from 'path';
import { Options } from '../lib/types';
import { getFilename } from '../lib/output';

describe('test if the output is set correctly', () => {

    const url = 'https://codeload.github.com/username/repo/zip/branch';

    it('checks if filename is returned correctly for web', async () => {

        const isWeb = true;
        const expectedFilename = 'repo-branch.zip';
        const actualFilename = await getFilename(isWeb, url);
        const actualFilenameWithOptions = await getFilename(isWeb, url, { output: process.cwd() } as Options);
        const actualFilenameWithoutZip = await getFilename(isWeb, url, { zip: false } as Options);

        expect(actualFilename).toBe(expectedFilename);
        expect(actualFilenameWithOptions).toBe(expectedFilename); // output option should be ignored
        expect(actualFilenameWithoutZip).toBe(expectedFilename); // zip option should be ignored
    });

    it('checks if filename is returned correctly for node', async () => {

        const isWeb = false;

        // local without zip
        expect(await getFilename(isWeb, url)).toBe('repo-branch');
        expect(await getFilename(isWeb, url, { zip: false } as Options)).toBe('repo-branch');

        // local zip
        expect(await getFilename(isWeb, url, { zip: true } as Options)).toBe('repo-branch.zip');

        // directory
        const dirWithoutZip = await getFilename(isWeb, url, { output: process.cwd() } as Options);
        const dirWithZip = await getFilename(isWeb, url, { output: process.cwd(), zip: true } as Options);
        expect(dirWithoutZip).toBe(path.resolve(process.cwd(), 'repo-branch'));
        expect(dirWithZip).toBe(path.resolve(process.cwd(), 'repo-branch.zip'));

        // filename was given
        const filename = path.resolve(process.cwd(), 'repo-branch.zip');
        expect(await getFilename(isWeb, url, { output: filename } as Options)).toBe(filename);
        expect(await getFilename(isWeb, url, { zip: false, output: filename } as Options)).toBe(filename); // zip option should be ignored
    });
});