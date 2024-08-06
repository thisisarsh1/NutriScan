"use client";

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { ThemeProvider, createTheme } from '@mui/material';
import { TextField } from '@mui/material';

export default function Time({ onChange }) {
  const [selectedTime, setSelectedTime] = useState(dayjs('2022-04-17T15:30'));

  const handleTimeChange = (value) => {
    const timeString = value ? value.format('HH:mm') : '';
    setSelectedTime(value || dayjs());
    onChange(timeString); // Call onChange with the formatted time
    console.log('New time value:', timeString);
  };

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#000000', // Set background color to black
            color: '#FFFFFF', // Set text color to white
          },
        },
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DemoContainer components={['MobileTimePicker']}>
          <DemoItem label="Mobile variant">
            <MobileTimePicker
              value={selectedTime}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoItem>
        </DemoContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
