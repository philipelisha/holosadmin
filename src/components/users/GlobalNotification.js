import React from 'react';
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  Filter,
  ImageField,
  List,
  required,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';

const GlobalNotificationsFilter = (props) => (
  <Filter {...props}>
    <TextInput source="title" alwaysOn/>
  </Filter>
);

export const GlobalNotificationsCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={[required()]}/>
      <TextInput source="image"/>
      <TextInput multiline={true} source="description"/>
      <TextInput source="link"/>
      <TextInput source="linkText"/>
      <DateInput
        source="expiresDate"
        options={{format: 'dd/MM/YYYY', clearable: true}}
        isRequired={true}
        alwaysOn
      />
    </SimpleForm>
  </Create>
);

export const GlobalNotificationsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="title" validate={[required()]}/>
      <TextInput source="image"/>
      <TextInput multiline={true} source="description"/>
      <TextInput source="link"/>
      <TextInput source="linkText"/>
      <DateInput
        source="expiresDate"
        options={{format: 'dd/MM/YYYY'}}
        isRequired={true}
        alwaysOn
      />
    </SimpleForm>
  </Edit>
);

export const GlobalNotificationsList = props => (
  <List {...props} filters={<GlobalNotificationsFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="title"/>
      <ImageField source="image"/>
      <DateField source="expiresDate" locales="es-ES"/>
    </Datagrid>
  </List>
);
