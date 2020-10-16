import * as path from 'path';
import { exist, isDir } from './fs-utils';
import { DownloadOptions } from './types';

/**
 * Gets the filename of the file to save to disk
 *
 * @param {string} [url] - The url of the GitHub repository (add #<branch> at the end to specify the branch).
 * @param {DownloadOptions} [options] - The options for the download command.
 * @returns {string} Returns the filename.
 */
export const getFilename = async (url: string, options?: DownloadOptions): Promise<string> => {

    // url format: https://codeload.github.com/username/repo/zip/branch where branch name may have slashes
    const file = url.split('/zip/').pop()?.replace(/\//g, '-') + '.zip';
    const repo = url.split('/zip/').shift()?.split('/').pop();

    let filename = `${repo}-${file}`;

    if (!options?.zip) {
        filename = filename.slice(0, -4); // remove the .zip end
    }

    if (options?.output) {

        const out = path.resolve(options.output);

        if (await exist(out)) {
            if (await isDir(out)) {
                filename = path.resolve(out, filename);
            } else {
                filename = out;
            }
        } else {
            if (!path.extname(out)) {
                filename = path.resolve(out, filename);
            } else {
                filename = out;
            }
        }
    }

    return filename;
}