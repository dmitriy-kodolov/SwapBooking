/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/jsx-props-no-spreading
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
const Category = ({
  control, name, setCategorFromRecive = undefined, setCategorFromExchange = undefined,
  categorFromRecive, categorFromExchange,
}) => {
  const style = useStyle();
  const categories = useSelector((store) => store.category);
  const dispatch = useDispatch();
  // const [checkValues, setCheckedValues] = useState([]);
  const handleSelect = (nameOfCateg) => {
    if (setCategorFromRecive) {
      const newCategorFromReceive = [...categorFromRecive];
      if (categorFromRecive?.includes(nameOfCateg)) {
        const index = newCategorFromReceive.indexOf(nameOfCateg);
        newCategorFromReceive.splice(index, 1);
      } else {
        newCategorFromReceive.push(nameOfCateg);
      }
      setCategorFromRecive((prev) => [...prev, newCategorFromReceive]);
    } else {
      if (categorFromExchange.includes(nameOfCateg)) {
        const index = categorFromExchange.indexOf(nameOfCateg);
        setCategorFromExchange((prev) => [...prev, ...prev.splice(index, 1)]);
      } else {
        setCategorFromExchange((prev) => [...prev, nameOfCateg]);
      }
      console.log(categorFromExchange);
    }
  };

  const mockCategor = {
    Categories: {
      ID: 1,
      Name: 'Все книги',
      Multiselect: true,
      Subcategories: [
        {
          ID: 2,
          Name: 'Детектив',
          Multiselect: true,
          Subcategories: [
            {
              ID: 5,
              Name: 'Русский детектив',
              Multiselect: true,
            },
            {
              ID: 6,
              Name: 'Зарубежный детектив',
              Multiselect: true,
            },
          ],
        },
        {
          ID: 3,
          Name: 'Фантастика',
          Multiselect: true,
        },
        {
          ID: 4,
          Name: 'Фэнтези',
          Multiselect: true,
        },
      ],
    },
  };
  // console.log(checkValues);

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
      {/*
      <ul className={style.root}>
        { mockCategor.Categories.Subcategories.map((item) => (
          <li>
            {item.Name}
            {item.Subcategories
            && (
            <ul className={style.root}>
              {item.Subcategories.map((test) => (<li>{test.Name}</li>))}
            </ul>
            )}
          </li>
        ))}
      </ul> */}
      {categories.categories
      && (
        <div>
          <h4>Категории</h4>
          <ul className={style.root}>
            {categories.categories.map((item) => (
              <li key={item.id}>
                <Controller
                  control={control}
                  name={name}
                  render={(props) => (
                    <>
                      <Checkbox
                        checked={props.value}
                        onChange={(e) => {
                          props.field.onChange(e.target.checked);
                          handleSelect(item.title);
                        }}
                      />
                      {item.title}
                    </>
                  )}
                  rules={{ required: true, message: 'Поле обязательно' }}
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
