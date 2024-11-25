import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  Filter,
  List, ReferenceInput,
  SaveButton, SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const DistrictFilter = (props) => (
  <Filter {...props}>
    <TextInput label="District" source="name" alwaysOn/>
  </Filter>
);

const DistrictEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const DistrictCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <ReferenceInput label="City" source="city" reference="cities" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const DistrictEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<DistrictEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <ReferenceInput label="City" source="city" reference="cities" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const DistrictList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<DistrictFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="city.name"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);
