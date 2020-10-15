import * as path from 'path';
import { exist, isDir } from './fs-utils';
import { Options } from './types';

/**
 * Downloads a GitHub project source code, but only the code without the .git data.
 *
 * @param {boolean} isWeb - `true` if running in the browser and `false` if running with Node.js.
 * @param {string} [url] - The url of the GitHub repository (add #<branch> at the end to specify the branch).
 * @param {Options} [options] - The options for the download command.
 * @returns {string} Returns the filename. Includes the path if isWeb is false.
 */
export const getFilename = async (isWeb: boolean, url: string, options?: Options): Promise<string> => {

    // url format: https://github.com/username/repo/archive/branch.zip
    const file = url.split('/').pop();
    const repo = url.split('/').slice(-3).shift();

    let filename = `${repo}-${file}`;

    if (isWeb)
        return filename;

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