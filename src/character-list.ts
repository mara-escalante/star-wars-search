import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Character } from "./types";

@customElement("character-list")
export class CharacterList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ul {
      list-style: none;
      padding: 20px 0 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    li {
      margin: 0;
    }

    button {
      width: 100%;
      text-align: left;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--text);
      cursor: pointer;
    }

    button:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--accent), transparent 55%);
      outline-offset: 2px;
    }
  `;

  @property()
  characters: Character[] = [];

  render() {
    return !this.characters.length
      ? null
      : html`<ul>
          ${this.characters.map(
            character =>
              html`<li>
                <button @click=${() => this._onSelectCharacter(character)}>
                  ${character.name}
                  ${character.birth_year !== "unknown"
                    ? html`(${character.birth_year})`
                    : null}
                </button>
              </li>`
          )}
        </ul>`;
  }

  private _onSelectCharacter(character: Character) {
    this.dispatchEvent(
      new CustomEvent("select-character", {
        detail: { character },
        bubbles: true,
        composed: true
      })
    );
  }
}
