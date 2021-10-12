/* eslint-disable no-console */
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
import matchCategory from 'components/utils/matchCategory';
import hasCategoryInSubcategory from '../utils/hasCategoryInSubcategory';

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

});
const Category = ({
  setError,
  clearErrors,
  setCategoriesForm,
  initialCategories,
  selectedCategories,
  isLoading = false,
  isErrorLoading = false
}) => {
  // console.log('начальные категории', initialCategories);
  // const flatten = (array) => array.reduce((acc, categor) => {
  // acc.push(categor.Name);
  // if (categor.Subcategories) {
  // acc = acc.concat(flatten(categor.Subcategories));
  // }
  // return acc;
  // }, []);
  // const flattenCategor = flatten(initialCategories);
  // console.log('все уровни вложеннсоти', flattenCategor);
  const style = useStyle();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(selectedCategories);
  }, []);
  // DONE сделать чтобы вложенные категории тоже записывались в состояние формы \done
  // DONE сделать если у категории есть вложенная категория и она проставлена,
  // то чекбокс у родителя = true \ done
  // Новая пробьлема: проставили чекбоксы у родителя и у всех его детей
  // сняли чекбокс у одного из ребенка, то чекбокс у родителя тоже снимается,
  // хотя должен оставаться, так как у одного из его детей есть чекбокс
  const toggle = (nameOfCateg) => {
    const hasParent = matchCategory(initialCategories, nameOfCateg) !== nameOfCateg;
    const hasCategory = categories.find((item) => item === nameOfCateg);
    const targetCategory = initialCategories.find((category) => category.Name === nameOfCateg);
    const targetSubcategories = targetCategory && targetCategory.Subcategories?.reduce((acc, item) => [...acc, item.Name], []);
    const listWithParent = hasParent
      ? [matchCategory(initialCategories, nameOfCateg), nameOfCateg]
      : [nameOfCateg];
    const mainCategory = hasParent
      ? initialCategories.find((item) => item.Name === matchCategory(initialCategories, nameOfCateg))
      : initialCategories.find((item) => item.Name === nameOfCateg);
    const isCategorysParentInList = hasCategoryInSubcategory(categories, mainCategory);
    const withDefined = isCategorysParentInList
      ? [nameOfCateg]
      : listWithParent;
    const listToCategories = targetSubcategories
      ? [...targetSubcategories, nameOfCateg]
      : listWithParent;
    const result = hasCategory
      ? [...categories.filter((item) => (!listToCategories.includes(item)))]
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
  console.log('в компоненте categories ', categories);

  return (
    <div className={style.container}>
      <Paper className={style.paper} elevation={4}>
        {isLoading && <p>Загрузка...</p>}
        {isErrorLoading && <p>Ошибка сервера</p>}
        {initialCategories
                && (
                <ul className={style.root}>
                  { initialCategories.map((item) => (
                    <li>
                      <Checkbox
                        checked={!!categories?.find((nameOfCateory) => item.Name === nameOfCateory)}
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
                          checked={!!categories?.find((nameOfCateory) => test.Name === nameOfCateory)}
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
        {!categories?.length
                && <p className={style.required}>Выберите хотябы один жанр</p>}
      </Paper>
    </div>
  );
};
export default Category;
