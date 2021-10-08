/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';
import { fetchCategories } from '../../store/slices/categoriesSlice';

const useStyle = makeStyles({
  root: {
    listStyle: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const Category = ({ control }) => {
  const style = useStyle();
  const categories = useSelector((store) => store.category);
  const dispatch = useDispatch();
  const [checkedValues, setCheckedValues] = useState([]);
  const handleSelect = (name) => {
    const newNames = checkedValues?.includes(name)
      ? checkedValues?.filter((item) => item !== name)
      : [...(checkedValues ?? []), name];
    setCheckedValues(newNames);
    return newNames;
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  if (categories.isLoading) {
    return (
      <div className={style.container}>
        <p>Загрузка...</p>
      </div>
    );
  }
  if (categories.error) {
    return (
      <div className={style.container}>
        <p>Ошибка заругзких</p>
      </div>
    );
  }
  return (
    <div className={style.container}>
      {categories.categories
      && (
        <div>
          <h4>Категории</h4>
          <ul className={style.root}>
            {categories.categories.map((item) => (
              <li key={item.id}>
                <Controller
                  control={control}
                  name="genres"
                  render={({ field: { onChange: onCheckChange } }) => (
                    <>
                      <Checkbox
                        checked={checkedValues?.includes(item.title)}
                        onChange={() => onCheckChange(handleSelect(item.title))}
                      />
                      {item.title}
                    </>
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Category;
