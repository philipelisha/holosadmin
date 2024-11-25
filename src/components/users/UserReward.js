import React from 'react';
import {
  BooleanField,
  Datagrid,
  Edit,
  ExportButton,
  Filter,
  List,
  NumberField,
  NumberInput,
  Pagination,
  RefreshButton,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar, usePermissions,
} from 'react-admin';

const UserRewardFilter = (props) => (
  <Filter {...props}>
    <TextInput source="email" alwaysOn/>
  </Filter>
);

const UserRewardPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />;


const UserRewardEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const UserRewardEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<UserRewardEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextField source="name"/>
      <TextField source="user.email"/>
      <NumberField source="points"/>
      <BooleanField source="accepted"/>
      <TextField source="level.title"/>
      <NumberInput source="fitPoints"/>
    </SimpleForm>
  </Edit>
);


const Actions = ({currentSort, exporter, filterValues, resource, total}) => {
  const {permissions} = usePermissions();
  return (
    <TopToolbar>
      {permissions === 'admin' && <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={filterValues}
        exporter={exporter}
        maxResults={100000}
      />}
      <RefreshButton/>
    </TopToolbar>
  )
};

export const UserRewardList = props => (
  <List
    {...props}
    actions={<Actions/>}
    pagination={<UserRewardPagination/>}
    bulkActionButtons={<div/>}
    filters={<UserRewardFilter/>}>
    <Datagrid rowClick="edit">
      <TextField source="user.email"/>
      <NumberField source="points"/>
      <NumberField source="fitPoints"/>
      <BooleanField source="accepted"/>
      <TextField source="level.title"/>
    </Datagrid>
  </List>
);
