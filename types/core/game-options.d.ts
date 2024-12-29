import { Scene } from "./scene";
export type GameOptions = {
    readonly rootEl: HTMLElement;
    readonly scene: Scene;
    readonly width?: number;
    readonly height?: number;
};
