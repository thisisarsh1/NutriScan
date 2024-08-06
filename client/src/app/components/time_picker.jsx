"use client";

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { createTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

export default function Time({ onChange }) {
  const [selectedTime, setSelectedTime] = useState(dayjs('2022-04-17T15:30'));

  const handleTimeChange = (value) => {
    const timeString = value ? value.format('HH:mm') : '';
    setSelectedTime(value || dayjs());
    onChange(timeString); // Call onChange with the formatted time

  };

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ADADAD', // Change to your desired background color
          },
        },
      },
    },
  });

  return (<ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DemoContainer components={['MobileTimePicker']}>
          <DemoItem label="Mobile variant">
            
            <MobileTimePicker
              value={selectedTime}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
            
          </DemoItem>
        </DemoContainer>

    </LocalizationProvider></ThemeProvider>
  );
}
