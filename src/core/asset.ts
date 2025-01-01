import { Texture } from "../rendering";

export class Asset {
    private static readonly _textures = new Map<string, Texture>();

    public static loadTexture(name: string, url: string): void | Promise<void> {
        if (this._textures.has(name)) {
            return;
        }
        const image = new Image();
        image.src = url;
        const texture = new Texture(image);
        this._textures.set(name, texture);
        return new Promise(resolve => (image.onload = () => resolve()));
    }

    public static unloadTexture(name: string) {
        this._textures.delete(name);
    }

    public static getTexture(name: string): Texture | undefined {
        return this._textures.get(name);
    }
}
