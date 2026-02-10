import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Character } from "./types";

@customElement("character-detail")
export class CharacterDetail extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 20;
    }

    dialog {
      max-width: 420px;
      width: 100%;
      pointer-events: auto;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 20px 18px;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .name {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    p {
      margin: 0;
    }

    button {
      padding: 8px 14px;
      font-size: 13px;
      cursor: pointer;
      border: none;
      background: transparent;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: color-mix(in srgb, black, transparent 65%);
      pointer-events: auto;
    }
  `;

  @property()
  character: Character | null = null;

  private _onClose() {
    this.dispatchEvent(
      new CustomEvent("select-character", {
        detail: { character: null },
        bubbles: true,
        composed: true
      })
    );
  }
  render() {
    return html`
      <div class="backdrop" @click=${this._onClose}></div>
      <dialog open class="panel">
        <div class="header">
          <p class="name">${this.character?.name}</p>
          <button @click=${this._onClose}>Close</button>
        </div>
        <div class="body">
          <p>Birth Year: ${this.character?.birth_year}</p>
          <p>Gender: ${this.character?.gender}</p>
        </div>
      </dialog>
    `;
  }
}
