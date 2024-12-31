import { Scene } from "./scene";
export type GameOptions = {
    readonly canvas: HTMLCanvasElement;
    readonly scene: Scene;
    readonly width?: number;
    readonly height?: number;
};
