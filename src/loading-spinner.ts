import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("loading-spinner")
export class Spinner extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
    .spinner {
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 4px solid var(--border);
      border-top: 4px solid var(--accent);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 16px auto;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<div class="spinner" />`;
  }
}
