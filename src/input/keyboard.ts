import { Collection, Game } from "../core";
import { Key } from "./key";

export class Keyboard {
    private static _instance: Keyboard | null = null;
    private readonly _newPressedKeys = new Set<Key>();
    private readonly _newReleasedKeys = new Set<Key>();
    private readonly _keys = Object.values(Key);
    private readonly _downKeys = new Set<Key>();
    private readonly _upKeys = new Set<Key>();
    private readonly _pressedKeys = new Set<Key>();
    private readonly _releasedKeys = new Set<Key>();
    private _newTypedString = "";
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

    public static isKeyDown(key: Key | keyof typeof Key): boolean {
        const self = this._self;
        return self._downKeys.has(self._keys.includes(key as Key) ? key : Key[key]);
    }

    public static isKeyUp(key: Key | keyof typeof Key): boolean {
        const self = this._self;
        return self._upKeys.has(self._keys.includes(key as Key) ? key : Key[key]);
    }

    public static isKeyPressed(key: Key | keyof typeof Key): boolean {
        const self = this._self;
        return self._pressedKeys.has(self._keys.includes(key as Key) ? key : Key[key]);
    }

    public static isKeyReleased(key: Key | keyof typeof Key): boolean {
        const self = this._self;
        return self._releasedKeys.has(self._keys.includes(key as Key) ? key : Key[key]);
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
        const key = event.code as Key;
        this._keys.includes(key) && this._newPressedKeys.add(key);
        event.key.length === 1 && (this._newTypedString += event.key);
    }

    private _onKeyUp(event: KeyboardEvent) {
        const key = event.code as Key;
        this._keys.includes(key) && this._newReleasedKeys.add(key);
    }

    private _updateTypedString() {
        this._typedString = this._newTypedString;
        this._newTypedString = "";
    }

    private _updateDownKeys() {
        Collection.addAll(this._downKeys, this._newPressedKeys);
        this._newPressedKeys.clear();
    }

    private _updateUpKeys() {
        this._upKeys.clear();
        Collection.addAll(this._upKeys, this._keys);
        Collection.removeAll(this._upKeys, this._downKeys);
    }

    private _updatePressedKeys() {
        this._pressedKeys.clear();
        Collection.addAll(this._pressedKeys, this._newPressedKeys);
        Collection.removeAll(this._pressedKeys, this._downKeys);
    }

    private _updateReleasedKeys() {
        this._releasedKeys.clear();
        Collection.addAll(this._releasedKeys, this._newReleasedKeys);
        this._newReleasedKeys.clear();
        Collection.removeAll(this._downKeys, this._releasedKeys);
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
