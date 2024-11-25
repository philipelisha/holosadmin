import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  Edit,
  Filter,
  List,
  NumberField,
  NumberInput,
  RadioButtonGroupInput,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar
} from 'react-admin';

const PlanEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

const Filters = (props) => (
  <Filter {...props}>
    <TextInput label="Name" source="name" alwaysOn/>
    <RadioButtonGroupInput source="cycleDuration" choices={[
      {id: '', name: 'All'},
      {id: '1', name: 'Mensual'},
      {id: '3', name: 'Trimestral'},
      {id: '6', name: 'Semestral'},
    ]} alwaysOn/>
  </Filter>
);

export const PlansEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<PlanEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <NumberInput source="numberOfPasses"/>
      <NumberInput label="Duration in Months" source="cycleDuration"/>
      <NumberInput source="price"/>
      <TextInput source="currencySymbol"/>
      <TextInput source="stripeId"/>
      <BooleanInput source="premium"/>
    </SimpleForm>
  </Edit>
);


export const PlansList = props => (
  <List
    {...props}
    filters={<Filters/>}
    bulkActionButtons={<div/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="numberOfPasses"/>
      <TextField label="Duration in Months" source="cycleDuration"/>
      <NumberField source="price"/>
      <NumberField source="stripeId"/>
      <BooleanField source="premium"/>
    </Datagrid>
  </List>
);
