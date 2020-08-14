export interface LoggingSettings {
    output?: boolean;
    arguments?: boolean;
    metadata?: boolean;
}

export function log(loggingSettings: LoggingSettings): MethodDecorator {
    return function logFunction(target, propertyKey, descriptor: PropertyDescriptor) {
        const fn = descriptor.value;

        descriptor.value = function fun(...args) {
            const result = fn.apply(this, args);

            const itemsToLog: any[] = [];

            if (loggingSettings.metadata) {
                itemsToLog.push(propertyKey);
            }

            if (loggingSettings.arguments) {
                itemsToLog.push('Arguments:');
                itemsToLog.concat(args);
            }

            if (loggingSettings.output) {
                itemsToLog.push('Returns:');
                itemsToLog.push(result);
            }

            console.log.apply(this, itemsToLog);

            return result;
        }

    }
}
