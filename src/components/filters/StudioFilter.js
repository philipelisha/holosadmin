import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {ReferenceInput, SelectInput} from 'react-admin'

export const StudioFilter = props => (
  <FormControl>
    <div style={{marginBottom: '-20px'}}>
      <ReferenceInput label="Studio" source="studios" reference="studioslist" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name" resettable/>
      </ReferenceInput>
    </div>
  </FormControl>
);
