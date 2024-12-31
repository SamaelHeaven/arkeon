export declare namespace Collection {
    namespace Array {
        function addAll<T>(destination: Array<T>, elements: Iterable<T>): Array<T>;
        function removeAll<T>(destination: Array<T>, elements: Iterable<T>): Array<T>;
    }
    namespace Set {
        function addAll<T>(destination: Set<T>, elements: Iterable<T>): Set<T>;
        function removeAll<T>(destination: Set<T>, elements: Iterable<T>): Set<T>;
    }
}
