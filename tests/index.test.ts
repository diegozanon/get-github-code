import axios from 'axios';
import { download, Options } from '../index';
import { buildUrl } from '../lib/url';

jest.mock('axios');
const axiosGet = axios.get as jest.Mock;

jest.mock('../lib/url');
const buildUrlMock = buildUrl as jest.Mock;

beforeEach(() => {
    axiosGet.mockReset();
    buildUrlMock.mockReset();
});

describe('test this lib', () => {

    it('checks if filename is correct', async () => {
        // buildUrlMock.mockResolvedValue('https://github.com/diegozanon/download-github-code/archive/main.zip');

        // download('');
    });

    // it('checks if zip file was downloaded', async () => {
    //     const options: Options = {
    //         username: 'diegozanon',
    //         repo: 'download-github-code',
    //         branch: 'main',
    //         zip: true
    //     };

    //     await download('', options);
    // });
});