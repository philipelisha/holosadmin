import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {ReferenceInput, SelectInput} from 'react-admin'

export const DistrictFilter = props => (
  <FormControl>
    <ReferenceInput label="District" source="districts" reference="districts" perPage={1000}
                    sort={{field: 'name', order: 'ASC'}}>
      <SelectInput optionText="name" resettable/>
    </ReferenceInput>
  </FormControl>
);
