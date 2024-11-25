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
import ExportCoporateCSVButton from "../bulk/ExportCorporateCSVButton";

const PaginationInstance = props => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000, 10000]} {...props} />
);

const Filters = props => (
  <Filter {...props}>
    <TextInput source="code" alwaysOn/>
  </Filter>
);


const Actions = ({currentSort, exporter, filterValues, resource, total}) => {
  const {permissions} = usePermissions();
  return (
    <TopToolbar>
      {permissions === 'admin' && <ExportCoporateCSVButton filterValues={filterValues}/>}
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

export const BbvaList = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<div/>}
    pagination={<PaginationInstance/>}
    filters={<Filters/>}
  >
    <Datagrid rowClick="edit">
      <TextField source="email"/>
      <TextField source="name"/>
      <TextField source="lastName"/>
      <TextField source="code"/>
      <TextField source="phoneNumber"/>
    </Datagrid>
  </List>
);
