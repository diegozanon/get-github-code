import * as decompress from 'decompress';
import * as fs from 'fs';
import webDownload from 'js-file-download';
import { addErrMsg } from './error';

/**
 * Writes the output to disk (if Node.js) or makes the browser to download it (if Web).
 *
 * @param {any} data - The result of the Ajax request.
 * @param {string} filename - The filename.
 * @param {boolean} isWeb - `true` if running in the browser and `false` if running with Node.js.
 * @returns {Promise<void>} Returns nothing if success, but throws if it fails.
 */
export const writeOutput = async (data: any, filename: string, isWeb: boolean): Promise<void> => {

    if (isWeb) {
        try {
            webDownload(data, filename);
        } catch (err) {
            addErrMsg(err, 'could not send the download command to the browser.');
            throw err;
        }
    } else {
        try {

            let needsUnzip = false;
            if (!filename.endsWith('.zip')) {
                filename += '/file.zip';
                needsUnzip = true;
            }

            const writer = fs.createWriteStream(filename);
            data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', async () => {

                    if (needsUnzip) {
                        await decompress(filename);
                        await fs.promises.unlink(filename);
                    }

                    resolve();
                });

                writer.on('error', reject); // test
            });
        } catch (err) {
            addErrMsg(err, 'could not write the downloaded files to the local disk.');
            throw err;
        }
    }
}