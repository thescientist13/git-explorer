import { html, LitElement } from '//unpkg.com/lit-element?module';
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

  async connectedCallback() {
    super.connectedCallback();

    this.branches = await this.gitService.getBranches();
  }

  async getDiff() {
    let rawDiff = await this.service.getDiff(this.selectedDestinationBranch, this.selectedSourceBranch);
    
    this.diffHtml = Diff2Html.getPrettyHtml(rawDiff, {
      inputFormat: 'diff', 
      showFiles: true, 
      matching: 'lines', 
      outputFormat: 'side-by-side'
    });
  }
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

  handleDestinationBranchSelected(event) {
    event.preventDefault();
    event.stopPropagation();

    this.selectedDestinationBranch = this.branches.filter((branchName) => {
      const selectedOption = this.shadowRoot.querySelector(`.optionDest${event.target.selectedIndex}`);
      
      return branchName === selectedOption.textContent;
    })[0];
  }

  handleSourceBranchSelected(event) {
    event.preventDefault();
    event.stopPropagation();

    this.selectedSourceBranch = this.branches.filter((branchName) => {
      const selectedOption = this.shadowRoot.querySelector(`.optionSource${event.target.selectedIndex}`);
      
      return branchName === selectedOption.textContent;
    })[0];
  }

  render() {
    const { diffHtml } = this;
   
    return html`
      
      <main>

        <section>
          
          <h1>Hello, Git Explorer!</h1>
          <hr/>

          <h3>Destination Branch</h3>
          ${ this.getDestinationBranchesDropdown() }

          <h3>Source Branch</h3>
          ${ this.getSourceBranchesDropdown() }

          <hr/>

          <div>${unsafeHTML(diffHtml)} </div>

          <hr/>

        </section>
      
      </main>
    `;
  }
}

customElements.define('app-root', AppComponent);