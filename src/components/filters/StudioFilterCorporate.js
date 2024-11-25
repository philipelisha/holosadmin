import FormControl from "@material-ui/core/FormControl";
import {ReferenceInput, SelectArrayInput} from "react-admin";
import React from "react";

export const StudioFilterCorporate = props => (
  <FormControl>
    <div style={{marginBottom: '-20px'}}>
      <ReferenceInput label="Corporate Studio" source="corporateStudios" reference="studioslist" perPage={1000}
                      filter={{partnerType: 'corporate'}} sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name" resettable="true"/>
      </ReferenceInput>
    </div>
  </FormControl>
);
