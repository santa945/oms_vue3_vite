export const flatten = (value: any[], result = []) => {
    value.forEach(item => {
        result.push(item);
        if (item.children) {
            flatten(item.children, result);
        }
    });
    return result;
};