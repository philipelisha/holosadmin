import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  Filter,
  List,
  ReferenceInput,
  SaveButton, SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const CityFilter = (props) => (
  <Filter {...props}>
    <TextInput label="City" source="name" alwaysOn/>
  </Filter>
);

const CityEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const CityCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <ReferenceInput label="Country" source="country" reference="countries"
                      perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const CityEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<CityEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <ReferenceInput label="Country" source="country" reference="countries"
                      perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const CityList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<CityFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="country.name"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);
