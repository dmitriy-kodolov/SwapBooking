/* eslint-disable max-len */
export const isMainCategoryInList = (allCategoriesList, mainCategoryName) => allCategoriesList.some((category) => mainCategoryName === category);

export const findSourceCategory = (categories, targetCategoryName) => {
  const res = categories.find((category) => {
    if (category.Subcategories) {
      const subCategory = category.Subcategories.find(
        (subcategory) => subcategory.Name === targetCategoryName,
      );
      if (subCategory) {
        return true;
      }
    }
    return category.Name === targetCategoryName;
  });
  return res.Name;
};

export const getNamesListFromSubcategories = (targetCategory) => {
  if (!targetCategory?.Subcategories) {
    return false;
  }
  return targetCategory.Subcategories.reduce((acc, category) => [...acc, category.Name], []);
};

export const isSourceCategoryInListWithAllChildren = (allCategories, sourceCategory) => {
  const categoriesListFromSource = getNamesListFromSubcategories(sourceCategory);
  if (!categoriesListFromSource) {
    return false;
  }
  const allCategoriesNamesWithParent = [...categoriesListFromSource, sourceCategory.Name];
  return allCategoriesNamesWithParent.every((category) => allCategories.includes(category));
};
