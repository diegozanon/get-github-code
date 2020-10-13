import { Options } from './lib/types';
import { buildUrl } from './lib/url';

/**
 * 
 */
export { Options };

/** 
 * Downloads a GitHub project source code, but only the code without the .git data
 * 
 * @param {string} [url] - The url of the GitHub repository (add #<branch>) at the end to specify the branch
 * @param {Options} [options] - The options for the download command
 * @returns {Promise<void>} Returns nothing. The files will be saved in the disk or the function will throw an error
 */
export const download = async (url?: string, options?: Options): Promise<void> => {

    url = await buildUrl(url, options);
    const output = options?.output || process.cwd();
    const zip = options?.zip;
}
