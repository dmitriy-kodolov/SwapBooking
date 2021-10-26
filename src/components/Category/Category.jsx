/* eslint-disable no-lonely-if */
/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/jsx-props-no-spreading
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@mui/material/Checkbox';
import { Paper } from '@mui/material';
import {
  isMainCategoryInList,
  findSourceCategory,
  getNamesListFromSubcategories,
  isSourceCategoryInListWithAllChildren,
  isSourceCategoryInListWithOneChildren,
} from '../utils/categories';

const useStyle = makeStyles({
  required: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '400',
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    color: '#d32f2f'
  },
  root: {
    listStyle: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    overflow: 'auto',
    padding: '15px',
    height: '300px',
    margin: '15px',
    width: '450px',
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    backgroundColor: 'white',
    zIndex: 1,
    top: '-15px',
  },
});
const Category = ({
  setError,
  clearErrors,
  setCategoriesForm,
  initialCategories,
  selectedCategories,
  isLoading = false,
  isError
}) => {
  const style = useStyle();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(selectedCategories);
  }, []);

  const toggle = (targetCategory) => {
    const isCategoryHaveParent = findSourceCategory(initialCategories, targetCategory) !== targetCategory;
    const isCategoryInList = categories.find((category) => category === targetCategory);
    const clickedTargetInMainCategories = initialCategories.find((category) => category.Name === targetCategory);
    const clickedTargetInSubcategories = clickedTargetInMainCategories && getNamesListFromSubcategories(clickedTargetInMainCategories);
    const sourceCategory = isCategoryHaveParent
      ? initialCategories.find((category) => category.Name === findSourceCategory(initialCategories, targetCategory))
      : initialCategories.find((categiry) => categiry.Name === targetCategory);
    const isTargetCategoryParentInList = isCategoryHaveParent && isMainCategoryInList(categories, sourceCategory.Name);
    const isMainCategoryInListWithAllChildren = isCategoryHaveParent && isSourceCategoryInListWithAllChildren(categories, sourceCategory);
    const isMainCategoryInListWithOneChildren = isCategoryHaveParent && isSourceCategoryInListWithOneChildren(categories, sourceCategory);
    const defineListToCategoriesWithParent = isCategoryHaveParent
      ? [...(isTargetCategoryParentInList
        ? [...(isMainCategoryInListWithAllChildren ? [targetCategory] : [!isMainCategoryInListWithOneChildren ? targetCategory : findSourceCategory(initialCategories, targetCategory), targetCategory])]
        : [findSourceCategory(initialCategories, targetCategory), targetCategory])]
      : [targetCategory];
    const listToCategories = clickedTargetInSubcategories
      ? [...clickedTargetInSubcategories, targetCategory]
      : defineListToCategoriesWithParent;
    const result = isCategoryInList
      ? [...categories.filter((category) => (!listToCategories.includes(category)))]
      : [...categories, ...listToCategories];
    setCategories(Array.from(new Set(result)));
  };
  useEffect(() => {
    clearErrors('category');
    setCategoriesForm(categories);
    if (categories?.length < 1) {
      setError('category', { type: 'required' });
    }
  }, [categories]);
  const isChecked = (categoryName) => categories.some((category) => category === categoryName);
  return (
    <div className={style.container}>
      <Paper className={style.paper} elevation={4}>
        {isLoading && <p>Загрузка...</p>}
        <div className={style.error}>
          {isError && <p className={style.required}>Ошибка при загрузки категорий, попробуйте повторить позже</p>}
          {!categories?.length
                && <p className={style.required}>Выберите хотябы один жанр</p>}
        </div>
        {initialCategories
                && (
                <ul className={style.root}>
                  { initialCategories.map((item) => (
                    <li>
                      <Checkbox
                        checked={isChecked(item.Name)}
                        onChange={(e) => {
                          toggle(item.Name);
                        }}
                      />
                      {item.Name}
                      {item.Subcategories
                  && (
                  <ul className={style.root}>
                    {item.Subcategories.map((test) => (
                      <li>
                        <Checkbox
                          checked={isChecked(test.Name)}
                          onChange={() => {
                            toggle(test.Name);
                          }}
                        />
                        {test.Name}
                      </li>
                    ))}
                  </ul>
                  )}
                    </li>
                  ))}
                </ul>
                )}
      </Paper>
    </div>
  );
};
export default Category;
