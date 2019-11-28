import { css, html, LitElement } from '//unpkg.com/lit-element?module';
import { unsafeHTML } from '//unpkg.com/lit-html/directives/unsafe-html.js?module';
import GitService from './services/git.js';

class AppComponent extends LitElement {

  static get properties() {
    return {
      branches: {
        type: Array
      },
      diffHtml: {
        type: String
      },
      selectedDestinationBranch: {
        type: String
      },
      selectedSourceBranch: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.gitService = new GitService();

    this.branches = [];
    this.diffHtml = '';
    this.selectedDestinationBranch = '';
    this.selectedSourceBranch = '';
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    this.branches = await this.gitService.getBranches();
  }

  async getDiff() {
    if (this.selectedDestinationBranch !== '' && this.selectedSourceBranch !== '') {
      const rawDiff = await this.gitService.getDiff(this.selectedDestinationBranch, this.selectedSourceBranch);
      
      this.diffHtml = Diff2Html.getPrettyHtml(rawDiff, {
        inputFormat: 'diff', 
        showFiles: true, 
        matching: 'lines', 
        outputFormat: 'side-by-side'
      });
    }
  }

  /* eslint-disable indent */
  getDestinationBranchesDropdown() {
    return html`
      <select @change="${this.handleDestinationBranchSelected}">
        ${this.branches
          .map((branch, index) => {
            return html`
                <option class="optionDest${index}" value="${branch}">${branch}</option>
              `;
            })
        }
      </select>
    `;
  }
  /* eslint-enable */

  /* eslint-disable indent */
  getSourceBranchesDropdown() {
    return html`
      <select @change="${this.handleSourceBranchSelected}">
        ${this.branches
          .map((branch, index) => {
            return html`
              <option class="optionSource${index}" value="${branch}">${branch}</option>
            `;
          })
        }
      </select>
    `;
  }
  /* eslint-enable */

  handleDestinationBranchSelected(event) {
    event.preventDefault();
    event.stopPropagation();

    this.selectedDestinationBranch = this.branches.filter((branchName) => {
      const selectedOption = this.querySelector(`.optionDest${event.target.selectedIndex}`);
      
      return branchName === selectedOption.textContent;
    })[0];

    this.getDiff();
  }

  handleSourceBranchSelected(event) {
    event.preventDefault();
    event.stopPropagation();

    this.selectedSourceBranch = this.branches.filter((branchName) => {
      const selectedOption = this.querySelector(`.optionSource${event.target.selectedIndex}`);
      
      return branchName === selectedOption.textContent;
    })[0];
  
    this.getDiff();
  }

  render() {
    const { diffHtml } = this;
   
    return html`
      <style>
        .container {
          margin: 15px;
        }
        
        .row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
        }
        
        .column {
          display: flex;
          flex-direction: column;
          flex-basis: 100%;
          flex: 1;
          height: 100p;
        }
      </style>
      
      <main>

        <section>
          
          <h1>Hello, Git Explorer!</h1>
          <hr/>

          <div class='some-page-wrapper'>
            <div class='row'>
              <div class='column'>
                <h3>Destination Branch</h3>
                ${ this.getDestinationBranchesDropdown() }
              </div>
              <div class='column'>
                <h3>Source Branch</h3>
                ${ this.getSourceBranchesDropdown() }
              </div>
            </div>
          </div>

          <hr/>

          <div>${unsafeHTML(diffHtml)} </div>

          <hr/>

        </section>
      
      </main>
    `;
  }
}

customElements.define('app-root', AppComponent);