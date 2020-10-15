import * as fs from 'fs';
import * as path from 'path';

export const exist = async (file: string): Promise<boolean> => {
    try {
        await fs.promises.lstat(file);
        return true;
    } catch (_) {
        return false;
    }
}

export const isDir = async (file: string): Promise<boolean> => {
    try {
        (await fs.promises.lstat(file)).isDirectory;
        return true;
    } catch (_) {
        return false;
    }
}

export const rmdirRecursive = async (folder: string): Promise<void> => {
    if (await exist(folder)) {
        const files = await fs.promises.readdir(folder);
        for (const file of files) {
            const currPath = path.join(folder, file);
            if (fs.lstatSync(currPath).isDirectory()) {
                await rmdirRecursive(currPath);
            } else {
                await fs.promises.unlink(currPath);
            }
        }

        await fs.promises.rmdir(folder);
    }
}