import clamp = MathUtilities.clamp;
import { MathUtilities } from "./math";

export class Vec2 {
    public readonly x: number;
    public readonly y: number;

    public static ZERO = new Vec2();
    public static UP = new Vec2(0, -1);
    public static DOWN = new Vec2(0, 1);
    public static LEFT = new Vec2(-1, 0);
    public static RIGHT = new Vec2(1, 0);

    constructor(a: number = 0, b: number = a) {
        this.x = a;
        this.y = b;
    }

    public plus(v: Vec2 | number): Vec2 {
        if (typeof v === "number") {
            return new Vec2(this.x + v, this.y + v);
        }
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    public minus(v: Vec2 | number): Vec2 {
        if (typeof v === "number") {
            return new Vec2(this.x - v, this.y - v);
        }
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    public times(v: Vec2 | number): Vec2 {
        if (typeof v === "number") {
            return new Vec2(this.x * v, this.y * v);
        }
        return new Vec2(this.x * v.x, this.y * v.y);
    }

    public div(v: Vec2 | number): Vec2 {
        if (typeof v === "number") {
            return v === 0 ? Vec2.ZERO : new Vec2(this.x / v, this.y / v);
        }
        return new Vec2(v.x === 0 ? 0 : this.x / v.x, v.y === 0 ? 0 : this.y / v.y);
    }

    public equals(v: Vec2 | number): boolean {
        if (typeof v === "number") {
            return this.x === v && this.y === v;
        }
        return this.x === v.x && this.y === v.y;
    }

    public clamp(min: Vec2 | number, max: Vec2 | number): Vec2 {
        let minX: number, maxX: number, minY: number, maxY: number;
        if (typeof min === "number") {
            minX = min;
            minY = min;
        } else {
            minX = min.x;
            minY = min.y;
        }
        if (typeof max === "number") {
            maxX = max;
            maxY = max;
        } else {
            maxX = max.x;
            maxY = max.y;
        }
        return new Vec2(clamp(this.x, minX, maxX), clamp(this.y, minY, maxY));
    }

    public clampX(min: number, max: number): Vec2 {
        return new Vec2(clamp(this.x, min, max), this.y);
    }

    public clampY(min: number, max: number): Vec2 {
        return new Vec2(this.x, clamp(this.y, min, max));
    }

    public distanceTo(v: Vec2): number {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y;
    }

    public cross(v: Vec2): number {
        return this.x * v.y - this.y * v.x;
    }

    public rotate(rotation: number, point: Vec2): Vec2 {
        const rad = (rotation * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const translatedX = this.x - point.x;
        const translatedY = this.y - point.y;
        const rotatedX = translatedX * cos - translatedY * sin;
        const rotatedY = translatedX * sin + translatedY * cos;
        return new Vec2(rotatedX + point.x, rotatedY + point.y);
    }

    public angleBetween(v: Vec2): number {
        const lengths = this.length() * v.length();
        if (lengths === 0) {
            return 0;
        }
        return Math.acos(this.dot(v) / lengths);
    }

    public reflect(v: Vec2): Vec2 {
        const dot = this.dot(v);
        return new Vec2(this.x - 2 * dot * v.x, this.y - 2 * dot * v.y);
    }

    public lerp(end: Vec2, t: number): Vec2 {
        const result = Math.max(0, Math.min(1, t));
        return new Vec2(this.x + (end.x - this.x) * result, this.y + (end.y - this.y) * result);
    }

    public slerp(end: Vec2, t: number): Vec2 {
        const angle = this.angleBetween(end);
        const cosT = Math.cos(angle * t);
        const sinT = Math.sin(angle * t);
        return new Vec2(this.x * cosT + end.x * sinT, this.y * cosT + end.y * sinT);
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public round(): Vec2 {
        return new Vec2(Math.round(this.x), Math.round(this.y));
    }

    public abs(): Vec2 {
        return new Vec2(Math.abs(this.x), Math.abs(this.y));
    }

    public normalize(): Vec2 {
        const length = this.length();
        return length === 0 ? Vec2.ZERO : new Vec2(this.x / length, this.y / length);
    }
}
