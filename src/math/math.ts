export namespace MathUtilities {
    export function clamp(value: number, min: number, max: number): number {
        return globalThis.Math.min(globalThis.Math.max(value, min), max);
    }

    export function degreesToRadians(value: number): number {
        return value * (globalThis.Math.PI / 180);
    }
}
