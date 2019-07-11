function pushPop() {
    return function(target: object, key: string, propertyDescriptor: PropertyDescriptor) {
        const originalMethod = propertyDescriptor.value;
        propertyDescriptor.value = function(...args: any[]) {
            push();
            const result = originalMethod.apply(this, args);
            pop();
            return result;
        }
        return propertyDescriptor;
    }
}
