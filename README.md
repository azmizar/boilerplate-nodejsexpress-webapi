# NodeJS + Express WebAPI Project Template

## Common Plugins

### Runtime

Plugin Name | npm i --save | Description | Links
---------|----------|---------|---------
 DotEnv | dotenv | Loads `.env` into `process.env` | [NPM](https://www.npmjs.com/package/dotenv)
 ModuleAlias | module-alias | Register aliases of directories and custom module paths in Node | [NPM](https://www.npmjs.com/package/module-alias)
 UUID | uuid | Generation of RFC4122 UUIDS | [NPM](https://www.npmjs.com/package/uuid)
 Winston | winston | Universal logging | [NPM](https://www.npmjs.com/package/winston)
 MomentJS | moment | Date and time library | [NPM](https://www.npmjs.com/package/moment) \| [WebSite](https://momentjs.com/)
 MomentJS Timezone | moment-timezone | Timezone library | [NPM](https://www.npmjs.com/package/moment-timezone) \| [WebSite](https://momentjs.com/)
 CryptoJS | crypto-js | Crypto library | [NPM](https://www.npmjs.com/package/crypto-js)
 Object Mapper | object-mapper | JSON object mapper | [NPM](https://www.npmjs.com/package/object-mapper)
 Request | request | HTTP request library | [NPM](https://www.npmjs.com/package/request)
 Request Promise | request-promise | Promise add-on to Request | [NPM](https://www.npmjs.com/package/request-promise)
 Joi | joi | JSON schema validator | [NPM](https://www.npmjs.com/package/joi)
 Schema Object | schema-object | JSON schema definition | [NPM](https://www.npmjs.com/package/schema-object)
 Loadash | loadash | Miscs JS library | [NPM](https://www.npmjs.com/package/loadash) \| [WebSite](https://lodash.com/)
 Split | split | String split library | [NPM](https://www.npmjs.com/package/split)
 ExpressJS | express | WebAPI library | [NPM](https://www.npmjs.com/package/express) \| [WebSite](https://expressjs.com/)
 CORS | cors | Cross-origin resource sharing library | [NPM](https://www.npmjs.com/package/cors)
 Morgan | morgan | ExpressJS logging facility | [NPM](https://www.npmjs.com/package/morgan)
 Cookie Parser | cookie-parser | Cookie parser | [NPM](https://www.npmjs.com/package/cookie-parser)
 JWT | jsonwebtoken | JWT library | [NPM](https://www.npmjs.com/package/jsonwebtoken)
 EJS | ejs | JS template library | [NPM](https://www.npmjs.com/package/ejs)

### Development

Plugin Name | npm i --savedev | Description | Links
---------|----------|---------|---------
 Nodemon | nodemon | NodeJS - watch and auto-restart node app | [NPM](https://www.npmjs.com/package/nodemon) \| [WebSite](http://nodemon.io/)
 MochaJS | mocha | JS test framework | [NPM](https://www.npmjs.com/package/mocha) \| [WebSite](https://mochajs.org)
 Expect.JS | expect.js | Minimalistic BDD assertion toolkit based on should.js | [NPM](https://www.npmjs.com/package/expect.js)
 SuperAgent | superagent | SuperAgent is a small progressive client-side and Node.js HTTP request librar | [NPM](https://www.npmjs.com/package/superagent)

## Standard Operating Procedures (SOP)

### Using Boilerplate

* Get MASTER archive `https://github.com/azmizar/boilerplate-nodejsexpress-webapi/archive/master.zip`
* Unzip to a new project folder
* If project folder is not yet set to a GIT repo
  * Go into the project folder using CMD, GIT BASH, or Powershell
  * `git init` to initialize GIT local repo
  * `git add .` to stage all files
  * `git commit -m "Initialized from boilerplate"` to commit all files
  * `git remote add origin $remote_repo$` to set the PUSH and FETCH remote repo
  * `git pull` to get remote repo branch (will see error with tracking information)
  * `git branch --set-upstream-to=origin/master master` to track current branch to remote
  * `git push -f` to force update remote repo
* If project folder is already a GIT repo, then just commit the changes

### Standard Practices

* [Comments](./docs/comments.md)
* [File content structure](./docs/file-content-structure.md)
* [Import variable name format](import-variable-names.md)
* [Error messages service](error-messages.md)
* [Error handling](error-handling.md)

### Project Structure

* `common` contains shared scripts, modules, classes, services, etc for the entire app to use
* `common-models` contains shared models for entire app to use
* `common-error-messages` contains error message definitions for entire app
* `common-examples` contains simple examples
* `config` contains configuration files and services
* `docs` contains documentation
* `logs` is the default logs folder (can be modified in .ENV)
* `middlewares` contains shared Express middlewares
* `public` contains static files

### App Modules

* Endpoints should be bundled as modules
* Take an example of API to manipulate file systems
  * 2 modules, paths and files to work on paths and files respectively
  * Folder name for app module is recommended to be prefix with `app-`
    * Ex: `app-paths` and `app-files`
* All module related files should be contained within the module folder
* Anything that need to be shared should be in `common-` folder or in `common` folder if it is shared for entire app