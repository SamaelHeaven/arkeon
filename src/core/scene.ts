export abstract class Scene {
    private _initialized: boolean = false;

    private _initialize() {
        if (!this._initialized) {
            this._initialized = true;
            this.initialize();
        }
        this.start();
    }

    public abstract initialize(): void;

    public abstract start(): void;

    public abstract stop(): void;

    public abstract update(): void;
}
