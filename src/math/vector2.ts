import { clamp } from "./clamp";

export type Vector2Value = Vector2 | number | [number, number];

export class Vector2 {
    public readonly x: number;
    public readonly y: number;

    public static ZERO = new Vector2();
    public static UP = new Vector2(0, -1);
    public static DOWN = new Vector2(0, 1);
    public static LEFT = new Vector2(-1, 0);
    public static RIGHT = new Vector2(1, 0);

    constructor(a: number = 0, b: number = a) {
        this.x = a;
        this.y = b;
    }

    public static extractValue(value: Vector2Value): Vector2 {
        if (typeof value === "number") {
            return new Vector2(value);
        }
        return this._extractArray(value);
    }

    private static _extractArray(v: Vector2 | [number, number]): Vector2 {
        if (Array.isArray(v)) {
            return new Vector2(v[0], v[1]);
        }
        return v;
    }

    public plus(v: Vector2Value): Vector2 {
        if (typeof v === "number") {
            return new Vector2(this.x + v, this.y + v);
        }
        const vector = Vector2._extractArray(v);
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public minus(v: Vector2Value): Vector2 {
        if (typeof v === "number") {
            return new Vector2(this.x - v, this.y - v);
        }
        const vector = Vector2._extractArray(v);
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public times(v: Vector2Value): Vector2 {
        if (typeof v === "number") {
            return new Vector2(this.x * v, this.y * v);
        }
        const vector = Vector2._extractArray(v);
        return new Vector2(this.x * vector.x, this.y * vector.y);
    }

    public div(v: Vector2Value): Vector2 {
        if (typeof v === "number") {
            return v === 0 ? Vector2.ZERO : new Vector2(this.x / v, this.y / v);
        }
        const vector = Vector2._extractArray(v);
        return new Vector2(
            vector.x === 0 ? 0 : this.x / vector.x,
            vector.y === 0 ? 0 : this.y / vector.y
        );
    }

    public equals(v: Vector2Value): boolean {
        if (typeof v === "number") {
            return this.x === v && this.y === v;
        }
        const vector = Vector2._extractArray(v);
        return this.x === vector.x && this.y === vector.y;
    }

    public clamp(min: Vector2Value, max: Vector2Value): Vector2 {
        let minX: number, maxX: number, minY: number, maxY: number;
        if (typeof min === "number") {
            minX = min;
            minY = min;
        } else {
            const minVector = Vector2._extractArray(min);
            minX = minVector.x;
            minY = minVector.y;
        }
        if (typeof max === "number") {
            maxX = max;
            maxY = max;
        } else {
            const maxVector = Vector2._extractArray(max);
            maxX = maxVector.x;
            maxY = maxVector.y;
        }
        return new Vector2(clamp(this.x, minX, maxX), clamp(this.y, minY, maxY));
    }

    public clampX(min: number, max: number): Vector2 {
        if (this.x < min) {
            return new Vector2(min, this.y);
        }
        return this.x > max ? new Vector2(max, this.y) : this;
    }

    public clampY(min: number, max: number): Vector2 {
        if (this.y < min) {
            return new Vector2(this.x, min);
        }
        return this.y > max ? new Vector2(this.x, max) : this;
    }

    public distanceTo(v: Vector2): number {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    public cross(v: Vector2): number {
        return this.x * v.y - this.y * v.x;
    }

    public rotate(rotation: number, point: Vector2): Vector2 {
        const rad = (rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const translatedX = this.x - point.x;
        const translatedY = this.y - point.y;
        const rotatedX = translatedX * cos - translatedY * sin;
        const rotatedY = translatedX * sin + translatedY * cos;
        return new Vector2(rotatedX + point.x, rotatedY + point.y);
    }

    public angleBetween(v: Vector2): number {
        const lengths = this.length() * v.length();
        if (lengths === 0) {
            return 0;
        }
        return Math.acos(this.dot(v) / lengths);
    }

    public reflect(v: Vector2): Vector2 {
        const dot = this.dot(v);
        return new Vector2(this.x - 2 * dot * v.x, this.y - 2 * dot * v.y);
    }

    public lerp(end: Vector2, t: number): Vector2 {
        const result = Math.max(0, Math.min(1, t));
        return new Vector2(this.x + (end.x - this.x) * result, this.y + (end.y - this.y) * result);
    }

    public slerp(end: Vector2, t: number): Vector2 {
        const angle = this.angleBetween(end);
        const cosT = Math.cos(angle * t);
        const sinT = Math.sin(angle * t);
        return new Vector2(this.x * cosT + end.x * sinT, this.y * cosT + end.y * sinT);
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public round(): Vector2 {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    public abs(): Vector2 {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    public normalize(): Vector2 {
        const length = this.length();
        return length === 0 ? Vector2.ZERO : new Vector2(this.x / length, this.y / length);
    }
}
