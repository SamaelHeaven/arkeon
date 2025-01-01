import { Texture } from "../rendering";
export declare class Asset {
    private static readonly _textures;
    static loadTexture(name: string, url: string): void | Promise<void>;
    static unloadTexture(name: string): void;
    static getTexture(name: string): Texture | undefined;
}
