import { Key, KeyOfKey } from "./key";
export declare class Keyboard {
    private static _instance;
    private readonly _newPressedKeys;
    private readonly _newReleasedKeys;
    private readonly _keys;
    private readonly _downKeys;
    private readonly _upKeys;
    private readonly _pressedKeys;
    private readonly _releasedKeys;
    private _newTypedString;
    private _typedString;
    private constructor();
    static get typedString(): string;
    static get downKeys(): ReadonlySet<Key>;
    static get upKeys(): ReadonlySet<Key>;
    static get pressedKeys(): ReadonlySet<Key>;
    static get releasedKeys(): ReadonlySet<Key>;
    static isKeyDown(key: KeyOfKey): boolean;
    static isKeyUp(key: KeyOfKey): boolean;
    static isKeyPressed(key: KeyOfKey): boolean;
    static isKeyReleased(key: KeyOfKey): boolean;
    private static get _self();
    private _update;
    private _onKeyDown;
    private _onKeyUp;
    private _updateTypedString;
    private _updateDownKeys;
    private _updateUpKeys;
    private _updatePressedKeys;
    private _updateReleasedKeys;
    private _reset;
}
