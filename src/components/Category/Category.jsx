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
  setCategory,
  initialCategories,
  isLoading = false,
  isErrorLoading = false
}) => {
  const style = useStyle();
  const [categories, setCategories] = useState([]);
  console.log(categories);
  useEffect(() => {
    setCategories(initialCategories);
  }, []);

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

  return (
    <div className={style.container}>
      <Paper className={style.paper} elevation={4}>
        <ul className={style.root}>
          { mockCategor.Categories.Subcategories.map((item) => (
            <li>
              <Checkbox
                //* checked={categories?.find((itemCateory) => item === itemCateory)}
                // onChange={(e) => {
                  // toggle(item.title);
                //* }}
              // eslint-disable-next-line react/jsx-closing-bracket-location
              />
              {item.Name}
              {item.Subcategories
            && (
            <ul className={style.root}>
              {item.Subcategories.map((test) => (
                <li>
                  <Checkbox />
                  {test.Name}
                </li>
              ))}
            </ul>
            )}
            </li>
          ))}
        </ul>
        {/* категории который были в лишках от jsonPlaceholder
      {categories.categories */}
        {/* // && ( */}
        {/* // <div> */}
        {/* <h4>Категории</h4> */}
        {/* <ul className={style.root}> */}
        {/* {categories.categories.map((item) => ( */}
        {/* // <li key={item.id}> */}
        {/* <Checkbox */}
        {/* // checked={categories?.find((itemCateory) => item === itemCateory)} */}
        {/* // onChange={(e) => { */}
        {/* // toggle(item.title); */}
        {/* // }} */}
        {/* // /> */}
        {/* {item.title} */}
        {/* </li> */}
        {/* // ))} */}
        {/* </ul> */}
        {/* </div> */}
        {/* // )} */}
      </Paper>
    </div>

  );
};
export default Category;
