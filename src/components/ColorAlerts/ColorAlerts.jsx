import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { Snackbar, Stack } from '@mui/material';
import { clearAlert } from '../../store/slices/alertSlice';

const ColorAlerts = () => {
  const dispatch = useDispatch();
  const { text, severity } = useSelector((state) => state.alert);

  const handleClose = useCallback(() => {
    dispatch(clearAlert());
  }, [dispatch]);

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      <Snackbar open={text} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ColorAlerts;
