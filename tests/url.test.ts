import axios from 'axios';
import { Options } from '../lib/types';
import { buildUrl } from '../lib/url';

jest.mock('axios');
const axiosGet = axios.get as jest.Mock;

describe('test the url validation', () => {

    it('checks if urls are validated correctly', async () => {

        axiosGet.mockResolvedValue({
            data: {
                default_branch: 'main'
            }
        });

        const valids = [
            { url: 'https://github.com/diegozanon/download-github-code' },
            { url: 'https://github.com/diegozanon/download-github-code#main' },
            { url: 'http://github.com/diegozanon/download-github-code' },
            { url: 'github.com/diegozanon/download-github-code' },
            { url: 'git@github.com:diegozanon/download-github-code.git' },
            { url: 'git@github.com:diegozanon/download-github-code.git#main' },
            { url: 'https://github.com/diegozanon/download-github-code', options: { username: 'other-user', repo: 'other-repo' } as Options },
            { options: { username: 'diegozanon', repo: 'download-github-code' } as Options },
            { options: { username: 'diegozanon', repo: 'download-github-code', branch: 'main' } as Options }
        ];

        const invalids = [
            {},
            { url: 'https://example.com' },
            { url: 'https://github.com/diegozanon' },
            { url: 'https://github.com/download-github-code' },
            { options: { username: 'diegozanon' } as Options },
            { options: { repo: 'download-github-code' } as Options }
        ];

        for (const valid of valids) {
            const { url, options } = { ...valid };
            expect(buildUrl(url, options)).resolves.toBe('https://github.com/diegozanon/download-github-code/archive/main.zip');
        }

        for (const invalid of invalids) {
            const { url, options } = { ...invalid };
            expect(buildUrl(url, options)).rejects.toBeTruthy();
        }
    });
});