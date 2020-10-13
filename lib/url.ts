import axios from 'axios';
import { Options } from './types';

export const buildUrl = async (url?: string, options?: Options): Promise<string> => {
    const modifiedUrl = await buildWithString(url) || await buildWithOptions(options);

    if (!isValid(modifiedUrl))
        throw `The URL was modified to "${modifiedUrl}", but it is not valid.`

    return modifiedUrl;
}

const buildWithString = async (url?: string): Promise<string> => {

    if (!url) {
        return '';
    }

    url = url.replace('http://', 'https://');

    if (url.endsWith('.git')) {
        url = url.slice(0, -4);
        url = url.replace('git@github.com:', 'https://github.com/');
    }

    if (url.startsWith('github.com')) {
        url = url.replace('github.com', 'https://github.com');
    }

    let branch;
    [url, branch] = url.split('#');

    branch = branch || await getDefaultBranch(url);

    return `${url}/archive/${branch}.zip`;
}

const buildWithOptions = async (options?: Options): Promise<string> => {

    if (!options) {
        throw 'Error: invalid input parameters. You need to inform the URL with a string or using the options object';
    }

    const url = `https://github.com/${options.username}/${options.repo}`;

    const branch = options.branch || await getDefaultBranch(url);
    return `${url}/archive/${branch}.zip`;
}

const getDefaultBranch = async (url: string): Promise<string> => {

    url = url.replace('://github.com', '://api.github.com');

    const headers = {
        Accept: 'application/vnd.github.v3+json'
    }

    try {
        const response = await axios.get(url, { headers });
        return response.data.default_branch;
    } catch (error) {
        throw 'Error trying to get the default branch. Try again passing the branch name: https://github.com/<user>/<repo>#<branch>'
    }
}

const isValid = (url: string): boolean => {
    // This regex "[^/]*" means "any character, except slash"
    const regex = new RegExp('https:\/\/github\.com\/[^/]*\/[^/]*#[^/]*', 'i')
    return regex.test(url);
}