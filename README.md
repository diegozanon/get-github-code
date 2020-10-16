# download-github-code
Downloads a GitHub project source code, but only the code without the .git data.

## Install  

```
$ npm install download-github-code
```

**Note**: it requires Node.js 10.x or greater.

## Usage  

Example using CommonJS:

```javascript
const downloadGithubCode = require('download-github-code');

const url = 'https://github.com/diegozanon/download-github-code';

downloadGithubCode(url)
    .then(() => {
        console.log('success');
    })
    .catch(console.error);
```

Example using ES Modules:

```javascript
import { download } = from 'download-github-code';

const downloadMyRepo = async () => {
    const url = 'https://github.com/diegozanon/download-github-code';

    await download(url);
}
```

## API  

### download(url, [options])

or

### download(options) 

Both of them return `Promise<void>`

#### url  

In the format: `https://github.com/<username>/<repo>#<branch or tag>`

If there is no `#<branch>` or `#<tag>` at the end, the request will use the repository default branch.

#### options  

If you are using TypeScript: 

```javascript
import { download, DownloadOptions } from 'download-github-code';

const options: DownloadOptions = {
    username: 'the-username',
    repo: 'the-repository',
    branch: 'the-branch-or-tag',
    output: './my-folder', // default is the current repository, under the 'repo-branch' folder name
    zip: false // default is false
}
```

**Note**: all options are optional. If a `url` is given, the `username`, `repo` and `branch` will be ignored.

CommonJS:

```javascript
const downloadGithubCode = require('download-github-code');

const options = {
    username: 'the-username',
    repo: 'the-repository',
    branch: 'the-branch-or-tag',
    output: './my-folder', // default is the current repository, under the 'repo-branch' folder name
    zip: false // default is false
}
```

## License

MIT