import * as browserify from 'browserify';
import * as fse from 'fs-extra';
import * as gulp from 'gulp';
import * as sourcemaps from 'gulp-sourcemaps';
import * as replace from 'replace-in-file';
import * as buffer from 'vinyl-buffer';
import * as source from 'vinyl-source-stream';

// @ts-ignore: tsify doesn't have a @types definition
import * as tinyify from 'tinyify';

gulp.task('clean-dist', (done: () => void) => {
    fse.emptyDirSync('./dist');
    done();
});

// decompress is not used in web mode
const unusedImport = `import * as decompress from 'decompress';`;
const voidFn = 'const decompress = (x: string, y: string) => {};';
const substitute = `${voidFn} //${unusedImport}`;
gulp.task('force-tree-shaking-before', (done: () => void) => {
    replace.replaceInFile({
        files: './lib/write.ts',
        from: unusedImport,
        to: substitute
    }, done);
});

gulp.task('build-ts', async () => {
    await new Promise((resolve, _) => {
        browserify({
            entries: ['./index.ts'],
            debug: true,
            standalone: 'downloadGithubCode'
        })
            .plugin('tsify')
            .plugin(tinyify)
            .transform('babelify', {
                presets:
                    [[
                        '@babel/preset-env',
                        {
                            'targets': '> 0.25%, not dead'
                        }
                    ]],
                extensions: ['.ts']
            })
            .bundle()
            .pipe(source('download-github-code.min.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist'))
            .on('end', resolve);
    });
});

gulp.task('force-tree-shaking-after', (done: () => void) => {
    replace.replaceInFile({
        files: './lib/write.ts',
        from: substitute,
        to: unusedImport
    }, done);
});

gulp.task('copy-deploy-to-test', (done: () => void) => {
    fse.copyFileSync('./dist/download-github-code.min.js', './tests/web/download-github-code.min.js');
    done();
});

gulp.task('default', gulp.series(['clean-dist', 'force-tree-shaking-before', 'build-ts', 'force-tree-shaking-after', 'copy-deploy-to-test']));