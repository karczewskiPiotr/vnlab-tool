import axios, {AxiosResponse} from "axios";
import {BranchNames, Repository, WEB_PUB_REPO_NAME} from "./gitTypes";
import {File} from "./gitTypes";

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')

/**
 * return array of objects with name of repository, author of repository and url to repository
 * @param accessToken - accessToken
 */
export function getUserRepositories(accessToken: string): Repository[] {
    const repositories: Repository[] = []
    axios({
        method: 'GET',
        headers: {
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
    }).then(data => {
        console.log(data)
        data.data.forEach((repo: any) => {
            if(repo.name.indexOf(WEB_PUB_REPO_NAME) !== -1) {
                repositories.push({name: repo.name, author: repo.owner.login, url: repo.url} as Repository)
            }
        })
        console.log(repositories)
    });
    return repositories;
}

/**
 * creates new repository on authorized user account
 * @param accessToken - accessToken
 * @param repoName - name of the repository
 * @param description - description of repository(optional)
 */
export function createNewRepository(accessToken: string, repoName: string, description?: string ) : any {
    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
        data: {
            "name": WEB_PUB_REPO_NAME + repoName,
            "description": description,
            "homepage": "https://github.com",
            "private": true,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
        }
    }).then(data => {
        return data;
    });
}

/**
 * clone repository to given folder
 * @param dir - path to directory
 * @param url - url to repository
 */
export function clone(dir: string, url: string): void {
    git.clone({
        fs,
        http,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url,
        ref: 'master',
        singleBranch: true,
        depth: 10
    });
}

/**
 * Get list of local branches
 *
 */
export async function getLocalBranches(dir: string) {
    return await git.listBranches({fs, dir: dir })
}

/**
 * Get list of remote branches
 */
export async function getRemoteBranches(dir: string) {
    return await git.listBranches({fs, dir: dir, remote: 'origin'})
}

/**
 * creates new branch
 * @param dir - path to directory with project
 * @param name - name of the branch
 * @param accessToken
 */
export async function createBranch(dir: string, name: string, accessToken: string) {
    await git.branch({ fs, dir: dir, ref: name, checkout: true })
    let pushResult = await git.push({
        fs,
        http,
        dir: dir,
        onAuth: () => ({ username: accessToken}),
    })
    console.log(pushResult)
}

/**
 *
 * @param accessToken
 * @param repoName
 * @param dir
 * @param description
 */
export function createNewProject(accessToken: string, repoName: string, dir: string, description?: string): void {
    createNewRepository(accessToken, repoName, description)
    createBranch(dir, BranchNames.PROGRAMISTA, accessToken)
    createBranch(dir, BranchNames.REDAKTOR_MAIN, accessToken)
    createBranch(dir, BranchNames.REDAKTOR_SLAVE + "1", accessToken)
}

//Checkout

function checkout(branchDir: string, branchName: string) {
    git.checkout({
        fs,
        dir: branchDir,
        ref: branchName
    })
}

//Adding file(s)

function addFile(file: File): void {
    fs.promises.writeFile(file.path + '/' + file.filename).then(() => {
        git.add({
            fs,
            dir: file.path,
            filepath: file.filename
        })
        console.log('done');
    });
}

function addFiles(files: File[]): void {
    files.forEach(file => {
        addFile(file);
    });
}

//Removing file(s)

function removeFile(file: File): void {
    git.remove({
        fs,
        dir: file.path,
        filepath: file.filename
    });
    console.log('done');
}

function removeFiles(files: File[]): void {
    files.forEach(file => {
        removeFile(file);
    });
}

//Commit

function commit(branchName: string, file: File, author: string, message: string): void {
    git.commit({
        fs,
        ref: branchName,
        dir: file.path,
        author: {
            name: author,
        },
        message: message
    });
    console.log('done');
}

//Push

export function push(dir: string, branchName: string, accessToken: string): void {
    git.push({
        fs,
        http,
        dir: dir,
        ref: branchName,
        onAuth: () => ({username: accessToken})
    })
        .then(() => console.log('Push successfully performed'))
        .catch(() => console.log('Error occurred while performing push on ' + branchName));
}

export function publish(): void {
    addFile({path: '', filename: ''})
}