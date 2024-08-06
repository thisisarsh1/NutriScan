

"use client"

import * as React from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Time from "@/app/components/time_picker"; // Adjust the import path as needed
import { cn } from "@/app/libs/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  appointment: z.date({
    required_error: "A  date is required to make an appointment.",
  }),
})

export function CalenderComp() {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You Booked an appointment at :",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {`Date: ${selectedDate}\nTime: ${selectedTime}`}
          </code>
        </pre>
      ),
    });
    
  }
  function handleDateChange(date: Date | undefined) {
        if (date) {
          const formattedDate = format(date, 'dd-MM-yyyy');
          setSelectedDate(formattedDate);
        
        } else {
          setSelectedDate(undefined);
        }
      }
    
      useEffect(() => {
        console.log('Selected date updated:', selectedDate);
      }, [selectedDate]);
    
      function handleTimeChange(time: string) {
        setSelectedTime(time);
        
      }
    
      useEffect(() => {
        console.log('Selected time updated:', selectedTime);
      }, [selectedTime]);
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-neutral-400 border rounded-2xl p-10 my-[5vh] bg-neutral-600">
            <FormField
              control={form.control}
              name="appointment"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MMM dd yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          handleDateChange(date);
                          field.onChange(date); // Update the form field value
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This date is used to make an appointment!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Time onChange={handleTimeChange} /> 
    
            <div className="flex items-center justify-center">
              <Button type="submit" className="p-2 rounded">Submit</Button>
            </div>
          </form>
        </Form>
  )
}






