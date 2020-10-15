import * as fs from 'fs';

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