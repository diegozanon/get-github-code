# download-github-code
Downloads a GitHub project source code, but only the code without the .git data

# Browser support

Usage example:

```html
<script src="./download-github-code.min.js"></script>
<script>
    var url = 'https://github.com/diegozanon/download-github-code#main';
    window.downloadGithubCode.download(url)
        .then(() => { console.log('ok') })
        .catch(alert);
</script>
```

Code is available under the `./dist` folder, but it is not working in the browser because the download address, `https://codeload.github.com/<user>/<repo>/zip/<branch>`, sets the CORS header to allow only origin `https://render.githubusercontent.com`.
