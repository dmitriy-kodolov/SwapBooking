/* eslint-disable max-len */
const hasCategoryInSubcategory = (categoriesList, categoryWithSubcategories) => {
  if (!categoryWithSubcategories?.Subcategories) {
    return false;
  }
  const result = categoriesList.some((item) => categoryWithSubcategories.Name === item);
  return result;
};
export default hasCategoryInSubcategory;
