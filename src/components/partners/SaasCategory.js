import React from 'react';
import {Create, Datagrid, Edit, Filter, List, SaveButton, SimpleForm, TextField, TextInput, Toolbar} from 'react-admin';

const SaasCategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Category" source="name" alwaysOn/>
  </Filter>
);


const SaasCategoryEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const SaasCategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="image"/>
    </SimpleForm>
  </Create>
);

export const SaasCategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<SaasCategoryEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <TextInput source="image"/>
    </SimpleForm>
  </Edit>
);

export const SaasCategoryList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<SaasCategoryFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
    </Datagrid>
  </List>
);
