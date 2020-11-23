import axios, {AxiosResponse} from 'axios'

//For creating new project

const { exec } = require("child_process");
const client_id = "6d941531c2e642fadf62";
const client_secret = "1100c9fb26028bb083b029e84248312a57066b84 ";
const redirect_uri = "http://localhost:3000/main_window"
const authorize_url = "https://github.com/login/oauth/authorize";
const access_token_url = "https://github.com/login/oauth/access_token";

//Create repo
exec("curl -u 'vnlab-test' https://api.github.com/user/repos -d \'{\"name\":\"testRepo\"}\'", (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);

    //Then, paste presonal acces token
});

export function authorizeWithGithub() : void {
    axios.get(buildAuthorizeEndpoint()).then(data => {
        console.log(document.location.href);
        document.location.href = data.config.url;
    });
}

export async function postAccessToken(codeParam : string) : Promise<AxiosResponse> {
    return await axios.post(buildAccessTokenEndpoint(codeParam)).then(data => {
        var search = data.data.substring(0);
        const result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        return result.access_token;
    });
}





function buildAuthorizeEndpoint() : string {
    let clientIdParam = "?client_id=" + client_id;
    let redirectUriParam = "&redirect_uri=" + redirect_uri;
    return authorize_url + clientIdParam + redirectUriParam;
}

function buildAccessTokenEndpoint(codeParam : string) : string {
    let clientIdParam = "&client_id=" + client_id;
    let clientSecretParam = "&client_secret=" + client_secret;
    return access_token_url + codeParam + clientIdParam + clientSecretParam;

}
/*import { GitProcess, GitError, IGitResult } from 'dugite'
// Path to folder with project, user has to choose one
// const pathToRepository = 'C:\\Users\\Admin\\Desktop\\temp_file'
const path = 'C:/path/to/repo/'

const options: IGitExecutionOptions = {
  // enable diagnostics
  env: {
    'GIT_HTTP_USER_AGENT': 'dugite/2.12.0',
    'GIT_TRACE': '1',
    'GIT_CURL_VERBOSE': '1'
  },
  processCallback: (process: ChildProcess) => {
    byline(process.stderr).on('data', (chunk: string) => {
      // read line from progress and convert to percentage
    })
  }
}

const result = await GitProcess.exec([ 'push', 'origin', 'master' ], path, options)*/



export function funkcja(): void {
    console.log('asdasasd')
}
