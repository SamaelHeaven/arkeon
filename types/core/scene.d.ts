export declare abstract class Scene {
    private _initialized;
    private _initialize;
    abstract initialize(): void | Promise<void>;
    abstract update(): void;
}
