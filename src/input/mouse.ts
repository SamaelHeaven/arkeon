import { Collection, Game } from "../core";
import { KeyOfMouseButton, MouseButton } from "./mouse-button";

export class Mouse {
    private static _instance: Mouse | null = null;
    private readonly _newPressedButtons = new Set<MouseButton>();
    private readonly _newReleasedButtons = new Set<MouseButton>();
    private readonly _buttons = Object.values(MouseButton);
    private readonly _downButtons = new Set<MouseButton>();
    private readonly _upButtons = new Set<MouseButton>();
    private readonly _pressedButtons = new Set<MouseButton>();
    private readonly _releasedButtons = new Set<MouseButton>();

    private constructor() {
        Game["_ensureLaunched"]();
        const root = Game.root;
        root.addEventListener("mousedown", e => this._onMouseDown(e));
        root.addEventListener("mouseup", e => this._onMouseUp(e));
    }

    public static get downButtons(): ReadonlySet<MouseButton> {
        return this._self._downButtons;
    }

    public static get upButtons(): ReadonlySet<MouseButton> {
        return this._self._upButtons;
    }

    public static get pressedButtons(): ReadonlySet<MouseButton> {
        return this._self._pressedButtons;
    }

    public static get releasedButtons(): ReadonlySet<MouseButton> {
        return this._self._releasedButtons;
    }

    public static isButtonDown(button: KeyOfMouseButton): boolean {
        return this._self._downButtons.has(MouseButton[button]);
    }

    public static isButtonUp(button: KeyOfMouseButton): boolean {
        return this._self._upButtons.has(MouseButton[button]);
    }

    public static isButtonPressed(button: KeyOfMouseButton): boolean {
        return this._self._pressedButtons.has(MouseButton[button]);
    }

    public static isButtonReleased(button: KeyOfMouseButton): boolean {
        return this._self._releasedButtons.has(MouseButton[button]);
    }

    private static get _self() {
        return (this._instance ??= new this());
    }

    private _update() {
        if (!Game.focused) {
            this._reset();
            return;
        }
        this._updatePressedButtons();
        this._updateDownButtons();
        this._updateReleasedButtons();
        this._updateUpButtons();
    }

    private _onMouseDown(event: MouseEvent) {
        const button = event.button as MouseButton;
        this._buttons.includes(button) && this._newPressedButtons.add(button);
    }

    private _onMouseUp(event: MouseEvent) {
        const button = event.button as MouseButton;
        this._buttons.includes(button) && this._newReleasedButtons.add(button);
    }

    private _updateDownButtons() {
        Collection.addAll(this._downButtons, this._newPressedButtons);
        this._newPressedButtons.clear();
    }

    private _updateUpButtons() {
        this._upButtons.clear();
        Collection.addAll(this._upButtons, this._buttons);
        Collection.removeAll(this._upButtons, this._downButtons);
    }

    private _updatePressedButtons() {
        this._pressedButtons.clear();
        Collection.addAll(this._pressedButtons, this._newPressedButtons);
        Collection.removeAll(this._pressedButtons, this._downButtons);
    }

    private _updateReleasedButtons() {
        this._releasedButtons.clear();
        Collection.addAll(this._releasedButtons, this._newReleasedButtons);
        this._newReleasedButtons.clear();
        Collection.removeAll(this._downButtons, this._releasedButtons);
    }

    private _reset() {
        this._newPressedButtons.clear();
        this._downButtons.clear();
        this._newReleasedButtons.clear();
        this._releasedButtons.clear();
        this._updateUpButtons();
    }
}
