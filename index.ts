import axios from 'axios';
import { addErrMsg } from './lib/error';
import { getFilename } from './lib/output';
import { Options } from './lib/types';
import { buildUrl } from './lib/url';
import { writeOutput } from './lib/write';

export { Options };

type Download = {
    (url: string, options?: Options): Promise<void>;
    (options: Options): Promise<void>;
}

/** 
 * Downloads a GitHub project source code, but only the code without the .git data.
 * 
 * @param {string} [url] - The url of the GitHub repository (add #<branch> at the end to specify the branch).
 * @param {Options} [options] - The options for the download command.
 * @returns {Promise<void>} Returns nothing. The files will be saved in the disk or the function will throw an error.
 */
const download: Download = async (url?: any, options?: Options): Promise<void> => {

    url = await buildUrl(url, options);

    const isWeb = typeof window !== undefined;
    const responseType = isWeb ? 'blob' : 'stream';

    const filename = await getFilename(isWeb, url, options);

    let response;
    try {
        response = await axios.get(url, { responseType });
    } catch (err) {
        addErrMsg(err, 'could not download the source code.');
        throw err;
    }

    await writeOutput(response.data, filename, isWeb);
}

export { download };