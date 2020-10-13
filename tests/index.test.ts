import axios from 'axios';
import { download, Options } from '../index';

jest.mock('axios');

const axiosGet = axios.get as jest.Mock;

beforeEach(() => {
    axiosGet.mockReset();
});

describe('test this lib', () => {

    it('checks if urls are validated correctly', async () => {

        axiosGet.mockResolvedValue({
            data: {
                default_branch: 'main'
            }
        });

        const valids = [
            { url: 'https://github.com/diegozanon/download-github-code', options: undefined },
            { url: 'https://github.com/diegozanon/download-github-code#main', options: undefined },
            { url: 'http://github.com/diegozanon/download-github-code', options: undefined },
            { url: 'github.com/diegozanon/download-github-code', options: undefined },
            { url: 'git@github.com:diegozanon/download-github-code.git', options: undefined },
            { url: 'git@github.com:diegozanon/download-github-code.git#main', options: undefined },
            { url: 'https://github.com/diegozanon/download-github-code', options: { username: 'other-user', repo: 'other-repo' } as Options },
            { url: undefined, options: { username: 'diegozanon', repo: 'download-github-code' } as Options },
            { url: undefined, options: { username: 'diegozanon', repo: 'download-github-code', branch: 'main' } as Options }
        ];

        const invalids = [
            { url: undefined, options: undefined },
            { url: 'https://example.com', options: undefined },
            { url: 'https://github.com/diegozanon', options: undefined },
            { url: 'https://github.com/download-github-code', options: undefined },
            { url: undefined, options: { username: 'diegozanon' } as Options },
            { url: undefined, options: { repo: 'download-github-code' } as Options }
        ];

        for (const valid of valids) {
            const { url, options } = { ...valid };
            expect(download(url, options)).resolves.toEqual(undefined);
        }

        for (const invalid of invalids) {
            const { url, options } = { ...invalid };
            expect(download(url, options)).rejects.toBeTruthy();
        }
    });
});