export function mapFieldsToValues(fields) {
    let newArticle = fields;
    for (var key in newArticle) {
        newArticle[key] = fields[key].value
    }
    return newArticle;
};
