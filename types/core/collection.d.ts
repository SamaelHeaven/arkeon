export declare class Collection {
    private constructor();
    static addAll<E, D extends Array<E> | Set<E>>(destination: D, elements: Iterable<E>): D;
    static removeAll<E, D extends Array<E> | Set<E>>(destination: D, elements: Iterable<E>): D;
}
