import { html, LitElement } from '//unpkg.com/lit-element@2.2.1?module';
import { unsafeHTML } from '//unpkg.com/lit-html/directives/unsafe-html.js';
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
    // const { diffHtml } = this;
    const htmlString = '<p><i>Hello World</i></p>'; // what I would like to get working
    const htmlTagged = html`<p><i>Hello World</i></p>`;
    const htmlStringVariableTagged = html`${ htmlString }`;
   
    return html`
      
      <main>

        <section>
          <h1>Hello Git Explorer!<h1>

          <p>htmlString</p>
          <div>${ htmlString } </div>  <!-- renders the html, tags and all -->
          <hr/>

          <p>htmlTagged</p>
          <div>${ htmlTagged } </div>  <!-- works fine -->
          <hr/>

          <p>htmlStringVariableTagged</p>
          <div>${ htmlStringVariableTagged } </div>  <!-- renders the html, tags and all -->
          <hr/>

          <p>htmlStringVariableTaggedUnsafe</p>
          <div>${ unsafeHTML(htmlTagged) } </div> <!--unsafeHTML can only be used in text bindings -->
          <hr/>

          <p>htmlStringVariableTaggedUnsafe</p>
          <div>${ unsafeHTML(htmlStringVariableTagged) } </div> <!--unsafeHTML can only be used in text bindings -->
          <hr/>

        </section>
      
      </main>
    `;
  }
}

customElements.define('app-root', AppComponent);