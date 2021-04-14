export function decorateIsDisabledFunctionInController($controller) {
    const original$selectIsDisabled = $controller.isDisabled;

    // tslint:disable-next-line:only-arrow-functions
    $controller.isDisabled = function(itemScope) {

        const item = itemScope[$controller.itemProperty];

        if (item === null) {
            itemScope[$controller.itemProperty] = {};
        }

        const result = original$selectIsDisabled(itemScope);

        if (item === null) {
            itemScope[$controller.itemProperty] = null;
        }

        return result;
    }

}
