import { Game } from "../core";
import { Key } from "./key";

export class Keyboard {
    private static _instance: Keyboard | null = null;
    private readonly _newPressedKeys = new Set<Key>();
    private readonly _newReleasedKeys = new Set<Key>();
    private readonly _keys = Object.values(Key);
    private _newTypedString = "";
    private _downKeys = new Set<Key>();
    private _upKeys = new Set<Key>();
    private _pressedKeys = new Set<Key>();
    private _releasedKeys = new Set<Key>();
    private _typedString = "";

    private constructor() {
        Game["_ensureLaunched"]();
        const root = Game.root;
        root.addEventListener("keydown", e => this._onKeyDown(e));
        root.addEventListener("keyup", e => this._onKeyUp(e));
    }

    public static get typedString(): string {
        return Keyboard._self._typedString;
    }

    public static get downKeys(): ReadonlySet<Key> {
        return Keyboard._self._downKeys;
    }

    public static get upKeys(): ReadonlySet<Key> {
        return Keyboard._self._upKeys;
    }

    public static get pressedKeys(): ReadonlySet<Key> {
        return Keyboard._self._pressedKeys;
    }

    public static get releasedKeys(): ReadonlySet<Key> {
        return Keyboard._self._releasedKeys;
    }

    public static isKeyDown(key: Key): boolean {
        return this._self._downKeys.has(key);
    }

    public static isKeyUp(key: Key): boolean {
        return this._self._upKeys.has(key);
    }

    public static isKeyPressed(key: Key): boolean {
        return this._self._pressedKeys.has(key);
    }

    public static isKeyReleased(key: Key): boolean {
        return this._self._releasedKeys.has(key);
    }

    private static get _self() {
        return (this._instance ??= new Keyboard());
    }

    private _update() {
        if (!Game.focused) {
            this._reset();
            return;
        }
        this._updateTypedString();
        this._updatePressedKeys();
        this._updateDownKeys();
        this._updateReleasedKeys();
        this._updateUpKeys();
    }

    private _onKeyDown(event: KeyboardEvent) {
        this._keys.includes(event.code as Key) && this._newPressedKeys.add(event.code as Key);
        event.key.length === 1 && (this._newTypedString += event.key);
    }

    private _onKeyUp(event: KeyboardEvent) {
        this._keys.includes(event.code as Key) && this._newReleasedKeys.add(event.code as Key);
    }

    private _updateTypedString() {
        this._typedString = this._newTypedString;
        this._newTypedString = "";
    }

    private _updateDownKeys() {
        this._downKeys.addAll(this._newPressedKeys);
        this._newPressedKeys.clear();
    }

    private _updateUpKeys() {
        this._upKeys.clear();
        this._upKeys.addAll(this._keys);
        this._upKeys.deleteAll(this._downKeys);
    }

    private _updatePressedKeys() {
        this._pressedKeys.clear();
        this._pressedKeys.addAll(this._newPressedKeys);
        this._pressedKeys.deleteAll(this._downKeys);
    }

    private _updateReleasedKeys() {
        this._releasedKeys.clear();
        this._releasedKeys.addAll(this._newReleasedKeys);
        this._newReleasedKeys.clear();
        this._downKeys.deleteAll(this._releasedKeys);
    }

    private _reset() {
        this._newTypedString = "";
        this._typedString = "";
        this._newPressedKeys.clear();
        this._downKeys.clear();
        this._newReleasedKeys.clear();
        this._releasedKeys.clear();
        this._updateUpKeys();
    }
}
