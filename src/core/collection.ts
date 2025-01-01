export namespace CollectionUtilities {
    export namespace Array {
        export function addAll<T>(destination: Array<T>, elements: Iterable<T>): Array<T> {
            for (const element of elements) {
                destination.push(element);
            }
            return destination;
        }

        export function removeAll<T>(destination: Array<T>, elements: Iterable<T>): Array<T> {
            const set = new globalThis.Set(elements);
            if (!set.size) {
                return destination;
            }
            for (let i = destination.length - 1; i >= 0; i--) {
                if (set.has(destination[i])) {
                    destination.splice(i, 1);
                }
            }
            return destination;
        }
    }

    export namespace Set {
        export function addAll<T>(destination: Set<T>, elements: Iterable<T>): Set<T> {
            for (const element of elements) {
                destination.add(element);
            }
            return destination;
        }

        export function removeAll<T>(destination: Set<T>, elements: Iterable<T>): Set<T> {
            for (const element of elements) {
                destination.delete(element);
            }
            return destination;
        }
    }
}
