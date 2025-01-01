export abstract class Scene {
    private _initialized: boolean = false;

    private async _initialize() {
        await this.load();
        if (!this._initialized) {
            this._initialized = true;
            return this.initialize();
        }
    }

    public abstract initialize(): void | Promise<void>;

    public abstract load(): void | Promise<void>;

    public abstract unload(): void;

    public abstract update(): void;
}
