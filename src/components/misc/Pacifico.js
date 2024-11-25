import React from 'react';
import {
  Datagrid,
  ExportButton,
  Filter,
  List,
  Pagination,
  RefreshButton,
  TextField,
  TextInput,
  TopToolbar, usePermissions
} from 'react-admin';

const PaginationInstance = props => (
  <Pagination
    rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000, 10000]} {...props} />
);

const Filters = props => (
  <Filter {...props}>
    <TextInput source="email" alwaysOn/>
  </Filter>
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
}

export const PacificoList = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<div/>}
    pagination={<PaginationInstance/>}
    filters={<Filters/>}
  >
    <Datagrid rowClick="edit">
      <TextField source="email"/>
      <TextField source="names" label="First Name"/>
      <TextField source="lastname" label="Last Name"/>
      <TextField source="phoneNumber"/>
    </Datagrid>
  </List>
);
