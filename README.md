# git-explorer

## Overview
Git Explorer is local development tool intended to provide offline-first support for previewing and comparing branches in a local git repository.
![git-explorer](./git-explorer.png)


## Usage
You can use the project locally on your system a couple different ways, depending on your preferences.  After running these commands, you can view the explorer web app in your browser at `localhost:3000`.

### One Time (npx)
Use `npx` to use the project (while online) for any local repository you have.
```shell
$ cd /path/to/your/repo
$ npx git-explorer
```

### Offline (global npm / Yarn)
By installing **git-explorer** locally, you can aceess the tool even if online!  Just use your preferred package manager's global installation command and then run the tool from the directory of your local repository
```shell
# npm
$ npm install -g git-explorer

# or with Yarn
$ yarn add --global git-explorer

# now run git-explorer from your local repo
$ cd path/to/your/repo
$ git-explorer
```


## Contributing
Contributions are welcome either in the form of code or ideas!

### Ideas / Feature Requests
See something you want to have included in Git Explorer?  Feel free to [open an issue](), and if you're feeling ambition, submit a PR!

### Development
To develop for the project, make sure you have [NodeJS](https://nodejs.org/) and [Git](https://git-scm.com/) installed.

Then, you can do the following:
1. Clone the repo
1. Run `npm ci`
1. Run `npm start`

You should now be able to see the project running on `localhost:3000`

> _**Note**: If you make changes to src/server.js, make sure to restart the server by killing the server and re-running `npm start`_