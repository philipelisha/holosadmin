import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  Filter,
  List,
  Pagination,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const CategoryFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Category" source="name" alwaysOn/>
  </Filter>
);

const PaginationInstance = props => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000, 10000]} {...props} />
);

const CategoryEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput source="image"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<CategoryEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <TextInput source="image"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const CategoryList = props => (
  <List
    {...props}
    bulkActionButtons={<div/>}
    pagination={<PaginationInstance/>}
    filters={<CategoryFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);
