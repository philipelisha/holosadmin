import React from 'react';
import {Create, Datagrid, Edit, Filter, List, SaveButton, SimpleForm, TextField, TextInput, Toolbar} from 'react-admin';

const ServiceFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Service" source="name" alwaysOn/>
  </Filter>
);

const ServiceEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const ServiceCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="image"/>
    </SimpleForm>
  </Create>
);

export const ServiceEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<ServiceEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <TextInput source="image"/>
    </SimpleForm>
  </Edit>
);

export const ServiceList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<ServiceFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
    </Datagrid>
  </List>
);
