import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  DateInput,
  ExportButton,
  Filter,
  FunctionField,
  List,
  NumberField,
  Pagination,
  ReferenceInput,
  RefreshButton,
  SelectArrayInput,
  TextField,
  TopToolbar, usePermissions
} from 'react-admin';
import FormControl from '@material-ui/core/FormControl';

const StudioFilterCorporate = props => (
  <FormControl>
    <div style={{marginBottom: '-20px'}}>
      <ReferenceInput label="Corporate Studio" source="studios" reference="studios" perPage={1000}
                      filter={{partnerType: 'corporate'}} sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name" resettable/>
      </ReferenceInput>
    </div>
  </FormControl>
);

const UserProgramFilter = (props) => (
  <Filter {...props}>
    <DateInput
      source="startTime"
      label="Program Started After"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="endTime"
      label="Program Started Before"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="startTimeCompleted"
      label="Program Completed After"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="endTimeCompleted"
      label="Program Completed Before"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <StudioFilterCorporate alwaysOn/>
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
};

export const UserProgramList = props => (
  <List
    {...props}
    bulkActionButtons={<div/>}
    actions={<Actions/>}
    filters={<UserProgramFilter/>}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid rowClick="edit">
      <TextField label="Program" source="program.name"/>
      <TextField label="User" source="user.email"/>
      <TextField label="Corporate Studio" source="user.corporateStudio.name"/>
      <DateField label="Start Date" source="programStart" locales="es-ES"/>
      <NumberField label="Videos Completed" source="completed.length"/>
      <FunctionField source="programCompleted" label="Completed" render={
        (record, source) => <BooleanField record={{...record, programCompleted: !!record.programCompleted}}
                                          source={source}/>
      }/>
      <DateField label="Completed Date" source="programCompleted" locales="es-ES"/>
      <BooleanField source="programCompleteShown"/>
      <BooleanField source="reviewGiven"/>
    </Datagrid>
  </List>
);
