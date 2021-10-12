const matchCategory = (categories, name) => {
  const res = categories.find((category) => {
    if (category.Subcategories) {
      const subCategory = category.Subcategories.find(
        (subcategory) => subcategory.Name === name,
      );
      if (subCategory) {
        return true;
      }
    }
    return category.Name === name;
  });
  return res.Name;
};
export default matchCategory;
