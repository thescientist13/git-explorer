class GitService {

  constructor() {
    this.baseUrl = '/api';
  }

  getStatus() {
    return fetch(`${this.baseUrl}/status`)
      .then((resp) => {
        return resp.json();
      });
  }

  getBranches() {
    return fetch(`${this.baseUrl}/branch`)
      .then((resp) => { 
        return resp.json(); 
      });
  }

  getDiff(target = '', source = '') {
    return fetch(`${this.baseUrl}/diff?target=${target}&source=${source}`)
      .then((resp) => { 
        return resp.text(); 
      });
  }
}

export default GitService;