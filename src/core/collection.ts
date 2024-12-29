export class Collection {
    private constructor() {}

    public static addAll<E, D extends Array<E> | Set<E>>(destination: D, elements: Iterable<E>): D {
        if (destination instanceof Set) {
            for (const element of elements) {
                destination.add(element);
            }
            return destination;
        }
        for (const element of elements) {
            destination.push(element);
        }
        return destination;
    }

    public static removeAll<E, D extends Array<E> | Set<E>>(
        destination: D,
        elements: Iterable<E>
    ): D {
        if (destination instanceof Set) {
            for (const element of elements) {
                destination.delete(element);
            }
            return destination;
        }
        const set = new Set(elements);
        for (let i = destination.length - 1; i >= 0; i--) {
            if (set.has(destination[i])) {
                destination.splice(i, 1);
            }
        }
        return destination;
    }
}
