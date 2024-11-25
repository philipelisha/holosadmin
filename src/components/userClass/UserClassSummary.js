import React from 'react';
import {
  BooleanInput,
  Datagrid,
  DateInput,
  ExportButton,
  Filter,
  List,
  Pagination,
  ReferenceInput,
  RefreshButton,
  SelectArrayInput,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions,
} from 'react-admin';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';

const StudioFilterCorporate = props => (
  <FormControl>
    <div style={{marginBottom: '-20px'}}>
      <ReferenceInput label="Corporate Studio" source="studios"
                      reference="studios" perPage={1000}
                      filter={{partnerType: 'corporate'}}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name" resettable/>
      </ReferenceInput>
    </div>
  </FormControl>
);

const UserClassSummaryFilter = (props) => (
  <Filter {...props}>
    <DateInput
      source="startDate"
      label="User Classes After:"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="endDate"
      label="User Classes Before:"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <StudioFilterCorporate alwaysOn/>
    <TextInput label="Email" source="email" alwaysOn/>
    <BooleanInput label="Active Plan" source="activePlan" alwaysOn/>
    <BooleanInput label="B2C Users" source="b2cUsers" alwaysOn/>
    <BooleanInput source="attended" alwaysOn/>
  </Filter>
);

const UserClassesPagination = props => <Pagination
  rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />;

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

export const UserClassSummary = props => (
  <List
    {...props}
    pagination={<UserClassesPagination/>}
    bulkActionButtons={<div/>}
    filters={<UserClassSummaryFilter/>}
    actions={<Actions/>}
    filterDefaultValues={{
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD')
    }}>
    <Datagrid>
      <TextField source="firstname"/>
      <TextField source="lastname"/>
      <TextField source="email"/>
      <TextField source="corporateStudio"/>
      <TextField source="fitPoints"/>
      <TextField source="level"/>
      <TextField label="In Person - TOTAL" source="inPersonClassTotal"/>
      <TextField label="In Person - move" source="inPersonClassCount.move"/>
      <TextField label="In Person - prosper"
                 source="inPersonClassCount.prosper"/>
      <TextField label="In Person - eat" source="inPersonClassCount.eat"/>
      <TextField label="In Person - play" source="inPersonClassCount.play"/>
      <TextField label="In Person - relax" source="inPersonClassCount.relax"/>
      <TextField label="In Person - other" source="inPersonClassCount.other"/>
      <TextField label="En Vivo - TOTAL" source="enVivoClassTotal"/>
      <TextField label="En Vivo - move" source="enVivoClassCount.move"/>
      <TextField label="En Vivo - prosper" source="enVivoClassCount.prosper"/>
      <TextField label="En Vivo - eat" source="enVivoClassCount.eat"/>
      <TextField label="En Vivo - play" source="enVivoClassCount.play"/>
      <TextField label="En Vivo - relax" source="enVivoClassCount.relax"/>
      <TextField label="En Vivo - other" source="enVivoClassCount.other"/>
      <TextField label="On Demand - TOTAL" source="onDemandClassTotal"/>
      <TextField label="On Demand - move" source="onDemandClassCount.move"/>
      <TextField label="On Demand - prosper"
                 source="onDemandClassCount.prosper"/>
      <TextField label="On Demand - eat" source="onDemandClassCount.eat"/>
      <TextField label="On Demand - play" source="onDemandClassCount.play"/>
      <TextField label="On Demand - relax" source="onDemandClassCount.relax"/>
      <TextField label="On Demand - other" source="onDemandClassCount.other"/>
      <TextField label="Custom count" source="customClassTotal"/>
      <TextField label="Custom minutes" source="customClassMinutes"/>
      <TextField source="totalClasses"/>
    </Datagrid>
  </List>
);
