import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  DateInput,
  ExportButton,
  Filter,
  List,
  NumberField,
  Pagination,
  ReferenceInput,
  RefreshButton,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions,
} from 'react-admin';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';

const StudioFilterCorporate = props => (
  <FormControl>
    <ReferenceInput label="Studio" source="studios" reference="studioslist" perPage={1000}
                    filter={{partnerType: 'corporate'}} sort={{field: 'name', order: 'ASC'}}>
      <SelectInput optionText="name" resettable/>
    </ReferenceInput>
  </FormControl>
);

const UserPlanFilter = (props) => (
  <Filter {...props}>
    <DateInput
      source="purchaseDateStart"
      label="Start"
      options={{format: 'dd/MM/YYYY', clearable: true}} isRequired={false} alwaysOn/>
    <DateInput
      source="purchaseDateEnd"
      label="End"
      options={{format: 'dd/MM/YYYY', clearable: true}} isRequired={false} alwaysOn/>
    <TextInput label="Email" source="email" alwaysOn/>
    <TextInput label="Plan Price" source="planAmount" alwaysOn/>
    <TextInput label="Promo Code" source="promoCode" alwaysOn/>
    <StudioFilterCorporate alwaysOn/>
  </Filter>
);

const UserPlanPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />;

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


export const UserPlanList = props => (
  <List {...props}
        bulkActionButtons={<div/>}
        actions={<Actions/>}
        pagination={<UserPlanPagination/>}
        filters={<UserPlanFilter/>}
        filterDefaultValues={{
          purchaseDateStart: moment().startOf('month').toDate(),
          purchaseDateEnd: moment().endOf('month').toDate()
        }}>
    <Datagrid>
      <TextField label="First Name" source="user.firstname"/>
      <TextField label="Last Name" source="user.lastname"/>
      <TextField label="Email" source="emailUsed"/>
      <TextField label="Plan" source="plan.name"/>
      <NumberField source="planAmount"/>
      <TextField label="Promo Code" source="promo.promoCode"/>
      <TextField source="referredBy"/>
      <DateField source="freeTrialEndDate" locales="es-ES"/>
      <TextField label="Order Number" source="order"/>
      <DateField source="purchaseDate" locales="es-ES"/>
      <TextField source="monthsSincePurchasing"/>
      <DateField source="nextCycleDate" locales="es-ES"/>
      <TextField label="Active Kushki Subscription" source="activeSubscription"/>
      <TextField label="Subscription ID" source="subscription_id"/>
      <BooleanField label="Manual Payment" source="isManualPayment"/>
      <BooleanField label="Cancelled" source="cancelledDate"/>
      <TextField label="Cancelled Reason" source="cancellationReason"/>
      <DateField source="deletedDate"/>
    </Datagrid>
  </List>
);
