import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {ReferenceInput, SelectInput} from 'react-admin'

export const CategoryFilter = props => (
  <FormControl>
    <ReferenceInput label="Category" source="categories" reference="categories" perPage={1000}
                    sort={{field: 'name', order: 'ASC'}}>
      <SelectInput optionText="name" resettable/>
    </ReferenceInput>
  </FormControl>
);
