import { useState } from 'react';
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button"
import "../app/styles/components/searchInputButton.css";

import useHeaderSearchValidation from '../hooks/useHeaderSearchValidation';

const SearchEventInput = ({ inputId, formId, searchText }) => {

  // Data validation in search form
  const [errorMessage, setErrorMessage] = useState('');
  useHeaderSearchValidation(setErrorMessage, formId, inputId);


  return (
    <>
      <div className='searchEventInputContainer'>
        <Input
          id={inputId}
          className='searchEventInput'
          name="search"
          label=""
          labelPlacement={'inside'}
          placeholder="Search Event"
          type="text"
          defaultValue={searchText || ''}
          isRequired={true}
          description={errorMessage}
          classNames={{
              innerWrapper:"inputSearchEvent-innerWrapper",
              inputWrapper: "inputSearchEvent-inputWrapper",
              helperWrapper: "inputSearchEvent-helperWrapper",
              description: "inputSearchEvent-descriptionMessage"
          }}
        />
      </div>
      <Button type="submit" className='searchEventButton'></Button>
    </>
  );
};

export default SearchEventInput;