/**
 * Those are the options to download a github project code.
 *
 * @field {string} [username] is the GitHub username (should be undefined if URL was given).
 * @field {string} [repo] is the GitHub project name (should be undefined if URL was given).
 * @field {string} [branch] is the project name (if none, default branch name will be retrieved).
 * @field {string} [output] is where the files will be written in disk.
 * @field {boolean} [zip] is whether a zip file should be written instead of writing all files.
 */
export interface Options {
    username?: string,
    repo?: string,
    branch?: string,
    output?: string,
    zip?: boolean
}