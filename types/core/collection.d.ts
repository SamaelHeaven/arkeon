export declare namespace Collection {
    function addAll<E, D extends Array<E> | Set<E>>(destination: D, elements: Iterable<E>): D;
    function removeAll<E, D extends Array<E> | Set<E>>(destination: D, elements: Iterable<E>): D;
}
