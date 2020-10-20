import {firsNotNullOrUndefined, trueIfUndefined} from './object-utils';

describe('object-utils', () => {

    describe('firsNotNullOrUndefined', () => {

        it('should return first not null or not undefined item', () => {

            const items = [null, undefined, 'hello', 'world'];

            expect(firsNotNullOrUndefined(...items)).toBe('hello');
            expect(firsNotNullOrUndefined(null, undefined, 'hello', 'world')).toBe('hello');
            expect(firsNotNullOrUndefined(undefined)).toBeUndefined();
            expect(firsNotNullOrUndefined()).toBeUndefined();
        });
    });

    describe('trueIfUndefined', () => {

        it('should return true if input is undefined', () => {

            expect(trueIfUndefined(undefined)).toBeTrue();

        });

        it('should return given value if it is not undefined', () => {

            expect(trueIfUndefined('hello')).toBe('hello');

        });

    });

});
