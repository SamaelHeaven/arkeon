import { KeyOfMouseButton, MouseButton } from "./mouse-button";
export declare class Mouse {
    private static _instance;
    private readonly _newPressedButtons;
    private readonly _newReleasedButtons;
    private readonly _buttons;
    private readonly _downButtons;
    private readonly _upButtons;
    private readonly _pressedButtons;
    private readonly _releasedButtons;
    private constructor();
    static get downButtons(): ReadonlySet<MouseButton>;
    static get upButtons(): ReadonlySet<MouseButton>;
    static get pressedButtons(): ReadonlySet<MouseButton>;
    static get releasedButtons(): ReadonlySet<MouseButton>;
    static isButtonDown(button: KeyOfMouseButton): boolean;
    static isButtonUp(button: KeyOfMouseButton): boolean;
    static isButtonPressed(button: KeyOfMouseButton): boolean;
    static isButtonReleased(button: KeyOfMouseButton): boolean;
    private static get _self();
    private _update;
    private _onMouseDown;
    private _onMouseUp;
    private _updateDownButtons;
    private _updateUpButtons;
    private _updatePressedButtons;
    private _updateReleasedButtons;
    private _reset;
}
