/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  test: {
    margin: '5px',
    marginTop: '10px',
  },
});
const DataPicker = ({ yearOfDataPicker, setYearOfDataPicker }) => {
  const styles = useStyle();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3} className={styles.test}>
        <DatePicker
          maxDate={new Date()}
          views={['year']}
          label="Год издания"
          value={yearOfDataPicker}
          onChange={(newValue) => {
            setYearOfDataPicker(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="standard" required />}
        />
      </Stack>
    </LocalizationProvider>
  );
};
export default DataPicker;
