// unpkg.com/:package@:version/:file
import { html, LitElement } from '//unpkg.com/lit-element@2.2.1?module';

class AppComponent extends LitElement {

  constructor() {
    super();
    fetch('/api/branch');
    fetch('/api/diff');
  }

  render() {
    return html`
      
      <main>

        <section>
          <h1>Hello Git Explorer!<h1>
        </section>
      
      </main>
    `;
  }
}

customElements.define('app-root', AppComponent);