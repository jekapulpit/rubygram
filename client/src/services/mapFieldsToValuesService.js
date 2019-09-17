export function mapFieldsToValues(fields) {
  const newArticle = fields;
  for (const key in newArticle) {
    newArticle[key] = fields[key].value;
  }
  return newArticle;
}
