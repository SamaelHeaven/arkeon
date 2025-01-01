export declare abstract class Scene {
    private _initialized;
    private _initialize;
    abstract initialize(): void | Promise<void>;
    abstract load(): void | Promise<void>;
    abstract unload(): void;
    abstract update(): void;
}
