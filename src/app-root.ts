import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchCharacters } from "./fetch-characters.ts";
import "./character-list.ts";
import "./character-detail.ts";
import "./loading-spinner.ts";
import type { Character } from "./types.ts";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: grid;
      place-items: start center;
      min-height: 100vh;
      padding: 48px 20px;
      box-sizing: border-box;
    }
    .search-bar {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .card {
      width: min(620px, 100%);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 22px;
    }

    h1 {
      margin: 0 0 16px;
      font-size: 24px;
      letter-spacing: 0.2px;
    }

    input {
      width: min(620px, 100%);
      padding: 14px;
      font-size: 16px;
      color: var(--text);
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 12px;
      outline: none;
    }
    p {
      margin: 12px 0 0;
      color: var(--muted);
      font-size: 14px;
    }
  `;

  @state() private _query = "";
  @state() private _results: Character[] = [];
  @state() private _loading = false;
  @state() private _error = "";
  @state() private _selectedCharacter: Character | null = null;
  @state() private _showNoResults = false;

  private _searchDebounceId?: number;

  private _onSelectCharacter(e: CustomEvent) {
    this._selectedCharacter = e.detail.character;
  }

  private _onSearch(e: InputEvent) {
    this._query = (e.currentTarget as HTMLInputElement).value.trim();

    clearTimeout(this._searchDebounceId);

    this._searchDebounceId = setTimeout(() => {
      if (!this._query) {
        this._results = [];
        this._showNoResults = false;
        this._error = "";
        return;
      }
      this._fetchCharacters();
    }, 500);
  }

  private async _fetchCharacters() {
    const q = this._query;
    this._showNoResults = false;
    this._error = "";
    this._loading = true;
    try {
      const res = await fetchCharacters(q);
      this._results = res.results ?? [];
    } catch (error) {
      this._error = error instanceof Error ? error.message : "Unknown error";
      this._results = [];
    } finally {
      setTimeout(() => {
        this._loading = false;
        this._showNoResults = this._results.length === 0;
      }, 250);
    }
  }

  render() {
    return html`<div class="card">
      <h1>Star Wars character search</h1>
      <div class="search-bar">
        <input
          type="text"
          .value=${this._query}
          @input=${this._onSearch}
          placeholder="Enter a character name"
        />
      </div>
      ${this._error ? html`<p>${this._error}</p>` : null}
      ${this._selectedCharacter
        ? html`<character-detail
            @select-character=${this._onSelectCharacter}
            .character=${this._selectedCharacter}
          ></character-detail>`
        : null}
      ${this._loading
        ? html`<loading-spinner />`
        : html`<character-list
            @select-character=${this._onSelectCharacter}
            .characters=${this._results}
          ></character-list>`}
      ${this._showNoResults ? html`<p>No results</p>` : null}
    </div>`;
  }
}
