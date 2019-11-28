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
      }
    };
  }

  constructor() {
    super();
    this.service = new GitService();
    this.branches = [];
    this.diffHtml = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    let diff = await this.service.getDiff();

    this.branches = await this.service.getBranches();
    this.diffHtml = Diff2Html.getPrettyHtml(diff, {
      inputFormat: 'diff', 
      showFiles: true, 
      matching: 'lines', 
      outputFormat: 'side-by-side'
    });
  }

  render() {
    const { diffHtml } = this;
    const htmlString = diffHtml;
   
    return html`
      
      <main>

        <section>
          
          <p>Hello Git Explorer!</p>
          <div>${unsafeHTML(htmlString)} </div>
          <hr/>

        </section>
      
      </main>
    `;
  }
}

customElements.define('app-root', AppComponent);