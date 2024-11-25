import React from "react";
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  Edit,
  Filter,
  List,
  NumberField,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const BillingFilter = (props) => (
  <Filter {...props}>
    <TextInput label="User Email" source="user" alwaysOn/>
  </Filter>
);


const BillEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const BillingList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<BillingFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="user"/>
      <TextField source="className"/>
      <TextField source="studio"/>
      <DateField source="startTime"/>
      <TextField source="type"/>
      <NumberField source="amount"/>
      <BooleanField source="paid"/>
    </Datagrid>
  </List>
);


export const BillEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<BillEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <BooleanInput source="paid"/>
    </SimpleForm>
  </Edit>
);
