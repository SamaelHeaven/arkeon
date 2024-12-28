export abstract class Scene {
    private _initialized: boolean = false;

    private async _initialize() {
        if (!this._initialized) {
            this._initialized = true;
            await this.initialize();
        }
        return this.start();
    }

    public abstract initialize(): void | Promise<void>;

    public abstract start(): void | Promise<void>;

    public abstract stop(): void;

    public abstract update(): void;
}
