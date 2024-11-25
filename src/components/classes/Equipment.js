import React from 'react';
import {
  Create,
  Datagrid,
  Edit,
  Filter,
  List,
  required,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const EquipmentFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Equipment" source="name" alwaysOn/>
  </Filter>
);

const EquipmentEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const EquipmentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={[required()]}/>
      <TextInput multiline={true} source="description"/>
      <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
      <TextInput source="image"/>
      <TextInput source="link"/>
    </SimpleForm>
  </Create>
);

export const EquipmentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<EquipmentEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name" validate={[required()]}/>
      <TextInput multiline={true} source="description"/>
      <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
      <TextInput source="image"/>
      <TextInput source="link"/>
    </SimpleForm>
  </Edit>
);

export const EquipmentList = props => (
  <List {...props} bulkActionButtons={<div/>} filters={<EquipmentFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
      <TextField source="link"/>
    </Datagrid>
  </List>
);
