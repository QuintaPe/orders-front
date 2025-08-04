export const preparePath = (path, params = {}) => {
    let preparedPath = path;

    Object.keys(params).forEach(key => {
        const placeholder = `:${key}`;
        if (preparedPath.includes(placeholder)) {
            preparedPath = preparedPath.replace(placeholder, params[key]);
        }
    });

    return preparedPath;
}; 