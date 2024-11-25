import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  ImageField,
  List,
  NumberField,
  NumberInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
} from 'react-admin';
import {ColorField, ColorInput} from 'react-admin-color-input';

const LevelEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton/>
  </Toolbar>
);

export const LevelCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validation={{required: true}}/>
      <NumberInput source="points" validation={{required: true}}/>
      <h3 style={{marginTop: '20px'}}>Max. 1 MB. Allowed types: png, jpg and jpeg. Max Size: 520x520.</h3>
      <TextInput
        source="image"
      />
      <TextInput
        source="inactiveImage"
      />
      <ColorInput source="color" validation={{required: true}}/>
      <SelectInput
        label="Partnership"
        optionText="name"
        source="partnership"
        choices={[{id: 'FITNESSPASS', name: 'FITNESSPASS'}, {id: 'BEDERR', name: 'BEDERR'}]}
      />
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const LevelEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<LevelEditToolbar/>}>
      <TextField label="Id" source="id"/>
      <TextInput source="title" validation={{required: true}}/>
      <NumberInput source="points" validation={{required: true}}/>
      <h3 style={{marginTop: '20px'}}>Max. 1 MB. Allowed types: png, jpg and jpeg. Max Size: 520x520.</h3>
      <TextInput
        source="image"
      />
      <TextInput
        source="inactiveImage"
      />
      <ColorInput source="color" validation={{required: true}}/>
      <SelectInput
        label="Partnership"
        optionText="name"
        source="partnership.id"
        choices={[{id: 'FITNESSPASS', name: 'FITNESSPASS'}, {id: 'BEDERR', name: 'BEDERR'}]}
      />
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const LevelsList = props => (
  <List {...props} bulkActionButtons={<div/>}>
    <Datagrid>
      <TextField source="title"/>
      <NumberField source="points"/>
      <ColorField source="color"/>
      <ImageField source="image" title="Picture"/>
      <ImageField source="inactiveImage" title="Picture"/>
      <TextField source="partnership.name"/>
      <BooleanField source="active"/>
      <EditButton/>
    </Datagrid>
  </List>
);
