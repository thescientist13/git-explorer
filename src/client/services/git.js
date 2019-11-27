class GitService {

  constructor() {
    this.baseUrl = '/api/';
  }

  getBranches() {
    return fetch(`${this.baseUrl}branch`)
      .then((resp) => { 
        return resp.json(); 
      });
  }

  // TODO
  getDiff(source, target) {
    console.log(source);
    console.log(target);
    return fetch(`${this.baseUrl}diff`)
      .then((resp) => { 
        return resp.text(); 
      });
  }
}

export default GitService;