export function camelCaseToKebabCase(name: string): string {
    return name.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

export function camelCaseToKebabCaseAndRemoveBrackets(name: string): string {
    return camelCaseToKebabCase(name).replace('()', '');
}
