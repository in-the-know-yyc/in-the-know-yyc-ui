import { useState } from 'react';
import React from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/select";
import SearchEventInput from './SearchEventInput'
import "../app/styles/components/eventsFilter.css";

const EventsFilter = ({filters}) => {

  // PARSING DATE FROM FILTERS (IF EXISTS)
  const filteredDate = (filters && filters.startDate) ? filters.startDate.substring(0, 10) : null; 
  // PARSING DATE FOR DATEPICKER VALUE
  const initialDate = (filteredDate) ? parseDate(filteredDate) : null;
  // SETTING DATEPICKER DESCRIPTION TO SHOW A DATE OR A PLACEHOLDER "DATE"
  const [dateDescription, setDateDescription] = useState(filteredDate || 'Date')
  
  
  
  return (
    <section className="eventsFilter">
      <form action='/events' method='get' id="eventListSearchForm">
        <input type="hidden" id="dateValue" name="date" value={initialDate || ''} />
        <div className='searchContainer'>
          <SearchEventInput inputId={'inputSearchEventsFilter'} formId={'eventListSearchForm'} searchText={filters.searchText} />
        </div>
        <div className='filtersContainer'>
          <DatePicker 
            label=''
            placeholder='Date'
            id='eventFilter-date' 
            className='dateEventFilter'
            aria-label="Date"
            showMonthAndYearPickers
            description={dateDescription}
            defaultValue={initialDate}
            onChange={
              // this hides the "Date" placeholder to show the selected date
              (e) => {
                const dateValue = `${e.year}-${e.month}-${e.day}`;
                document.getElementById('dateValue').value = dateValue;
                document.getElementById('eventListSearchForm').submit();
                setDateDescription('') 
              }
            }
            onKeyDown={
              // this prevents user input to avoid format errors
              (e) => { e.preventDefault(); }
            }
            classNames={{
              selectorIcon: "dateEventFilter-selectorIcon",
              selectorButton: "dateEventFilter-selectorButton",
              inputField: "dateEventFilter-inputField",
            }}
            dateInputClassNames={{
              inputWrapper: "dateEventFilter-inputWrapper",
              innerWrapper: "dateEventFilter-innerWrapper",
              helperWrapper: "dateEventFilter-helperWrapper",
              description: "dateEventFilter-descriptionMessage",
            }}
          />
          <Select 
            label="" 
            placeholder="Distance" 
            id='eventFilter-distance'
            className='dropdownEventFilter'
            aria-label='Distance'
            classNames={{
              mainWrapper: "dropdownEventFilter-mainWrapper",
              innerWrapper:"dropdownEventFilter-innerWrapper",
              inputWrapper: "dropdownEventFilter-inputWrapper",
              helperWrapper: "dropdownEventFilter-helperWrapper",
              description: "dropdownEventFilter-descriptionMessage",
              selectorIcon: "dropdownEventFilter-selectorIcon"
            }}
          >
              <SelectItem key={'distance_opt_1'}>Distance 1</SelectItem>
              <SelectItem key={'distance_opt_2'}>Distance 2</SelectItem>
              <SelectItem key={'distance_opt_3'}>Distance 3</SelectItem>
              <SelectItem key={'distance_opt_4'}>Distance 4</SelectItem>
              <SelectItem key={'distance_opt_5'}>Distance 5</SelectItem>
              <SelectItem key={'distance_opt_6'}>Distance 6</SelectItem>
              <SelectItem key={'distance_opt_7'}>Distance 7</SelectItem>
          </Select>
          <Select 
            label="" 
            placeholder="Industry" 
            id='eventFilter-industry'
            className='dropdownEventFilter'
            aria-label='Industry'
            classNames={{
              mainWrapper: "dropdownEventFilter-mainWrapper",
              innerWrapper:"dropdownEventFilter-innerWrapper",
              inputWrapper: "dropdownEventFilter-inputWrapper",
              helperWrapper: "dropdownEventFilter-helperWrapper",
              description: "dropdownEventFilter-descriptionMessage",
              selectorIcon: "dropdownEventFilter-selectorIcon"
            }}
          >
              <SelectItem key={'industry_opt_1'}>Industry 1</SelectItem>
              <SelectItem key={'industry_opt_2'}>Industry 2</SelectItem>
              <SelectItem key={'industry_opt_3'}>Industry 3</SelectItem>
              <SelectItem key={'industry_opt_4'}>Industry 4</SelectItem>
              <SelectItem key={'industry_opt_5'}>Industry 5</SelectItem>
              <SelectItem key={'industry_opt_6'}>Industry 6</SelectItem>
              <SelectItem key={'industry_opt_7'}>Industry 7</SelectItem>
          </Select>
        </div>
      </form>
    </section>
  );
};

export default EventsFilter;