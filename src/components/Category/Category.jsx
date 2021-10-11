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
  console.log('начальные категории', initialCategories);

  // console.log('test', testKla);
  // здесь поднятие всех вложеных жанров
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
  // TODO сделать чтобы вложенные категории тоже записывались в состояние формы
  // TODO сделать если у категории есть вложенная категория и она проставлена,
  // то чекбокс у родителя = true
  const toggle = (nameOfCateg) => {
    const hasCategory = categories.find((item) => item === nameOfCateg) || false;
    if (hasCategory) {
      setCategories(
        [...categories.filter((item) => item !== nameOfCateg)],
      );
    } else {
      setCategories([...categories, nameOfCateg]);
    }
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
                        checked={categories?.find((nameOfCateory) => item.Name === nameOfCateory)}
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
                          // checked={categories?.find((nameOfCateory) => item.Name === nameOfCateory)}
                          onChange={(e) => {
                            toggle(item.Name);
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
