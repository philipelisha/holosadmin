import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  List,
  required,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const CountryEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const CountryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={[required()]}/>
      <h4>Enter url as a "relative" path like this: /img/fitness-pass-v2/countries/example.jpg</h4>
      <div>
        <small>Upload image to Amazon AWS S3 to a new folder here /img/fitness-pass-v2/countries/example.jpg</small>
      </div>
      <TextInput source="image" validate={[required()]}/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const CountryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<CountryEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name" validate={[required()]}/>
      <h4>Enter url as a "relative" path like this: /img/fitness-pass-v2/countries/example.jpg</h4>
      <div>
        <small>Upload image to Amazon AWS S3 to a new folder here /img/fitness-pass-v2/countries/example.jpg</small>
      </div>
      <TextInput source="image" validate={[required()]}/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const CountryList = props => (
  <List {...props} bulkActionButtons={<div/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);
