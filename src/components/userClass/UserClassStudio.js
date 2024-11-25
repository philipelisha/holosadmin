import React from 'react';
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  ChipField,
  Datagrid,
  DateInput,
  ExportButton,
  Filter,
  List,
  NumberField,
  Pagination,
  RefreshButton,
  SelectInput,
  SingleFieldList,
  TextField,
  TopToolbar,
  usePermissions,
} from 'react-admin';
import moment from 'moment';
import {StudioFilter} from '../filters/StudioFilter';

const UserClassStudioFilter = (props) => (
  <Filter {...props}>
    <DateInput source="startTime" label="Start" options={{format: 'dd/MM/YYYY', clearable: true}} isRequired={false}
               alwaysOn/>
    <DateInput source="endTime" label="End" options={{format: 'dd/MM/YYYY', clearable: true}} isRequired={false}
               alwaysOn/>
    <StudioFilter alwaysOn/>
    <SelectInput source="partnerType" optionText="name" defaultValue={"studio"} choices={[
      {id: 'studio', name: 'Studio'},
      {id: 'nutritionist', name: 'Nutritionist'},
      {id: 'healthCoach', name: 'Health Coach'}
    ]}/>
    <BooleanInput source="active" alwaysOn/>
    <BooleanInput source="hasLiveStream" alwaysOn/>
  </Filter>
);

const UserClassesPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />;

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

export const UserClassStudioList = props => (
  <List
    {...props}
    pagination={<UserClassesPagination/>}
    actions={<Actions/>}
    bulkActionButtons={<div/>}
    filters={<UserClassStudioFilter/>}
    filterDefaultValues={{
      startTime: moment().startOf('month').toDate(),
      endTime: moment().endOf('month').toDate()
    }}>
    <Datagrid>
      <TextField source="studioName"/>
      <NumberField source="confirmedNumber"/>
      <NumberField source="noShowNumber"/>
      <NumberField source="amountPerStudioClassInSoles" label="Amount Per Studio Class"/>
      <NumberField source="amountPerStudioClassNoShowInSoles" label="Amount Per Studio Class No Show"/>
      <NumberField source="totalAmountConfirmedOwed"/>
      <NumberField source="totalAmountNoShowOwed"/>
      <NumberField source="totalAmountOwed"/>
      <ChipField label="Studio Currency" source="studioCurrency"/>
      <TextField source="studioCurrency"/>
      <TextField source="billingEmail"/>
      <TextField source="businessName"/>
      <TextField source="bankName"/>
      <TextField source="accountNumber"/>
      <TextField label="Tax Number (RUC number)" source="taxNumber"/>
      <TextField label="Tax Number Type (RUC)" source="taxNumberType"/>
      <ChipField label="District" source="district.name"/>
      <ArrayField source="categories">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <BooleanField label="Studio Active" source="active"/>
    </Datagrid>
  </List>
);
