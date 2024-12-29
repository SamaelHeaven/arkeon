declare global {
    interface Set<T> {
        addAll(elements: Iterable<T>): void;

        deleteAll(elements: Iterable<T>): void;
    }
}

Set.prototype.addAll = function (elements) {
    for (const element of elements) {
        this.add(element);
    }
};

Set.prototype.deleteAll = function (elements) {
    for (const element of elements) {
        this.delete(element);
    }
};

export {};
