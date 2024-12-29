declare global {
    interface Set<T> {
        addAll(elements: Iterable<T>): void;
        deleteAll(elements: Iterable<T>): void;
    }
}
export {};
