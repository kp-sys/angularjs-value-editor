function firstMatchingPredicate(predicate: (item?: any) => boolean, strict?: boolean): (items: any[]) => any {
    return (items: any[]): any => {

        for (const item of items) {
            if (predicate(item)) {
                return item;
            }
        }

        if (strict) {
            throw new TypeError('All items are undefined');
        }

        return undefined;
    }
}

const notNullAndUndefinedPredicate = (item) => (item !== null && typeof item !== 'undefined');

export function firsNotNullOrUndefined(...items: any[]): any {
    return firstMatchingPredicate(notNullAndUndefinedPredicate)(items);
}

export function trueIfUndefined<T>(value: T): T | true {
    if (typeof value === 'undefined') {
        return true;
    }

    return value;
}
