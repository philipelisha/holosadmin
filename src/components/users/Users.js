import React, {Fragment} from 'react';
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EmailField,
  ExportButton,
  Filter,
  List,
  NumberField,
  Pagination,
  ReferenceInput,
  RefreshButton,
  SaveButton,
  SelectArrayInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  usePermissions,
  EditButton
} from 'react-admin';
import {UserUpdatePlan} from '../util/UserUpdatePlan';
import Summary from "../util/Summary";
import getBMI from "../util/getBMI";
import FormControl from '@material-ui/core/FormControl';
import RemoveUsersPlanButton from "../bulk/RemoveUsersPlanButton";
import ForceResetUsersPlanButton from "../bulk/ForceResetUsersPlanButton";
import MakeUserB2C from "../bulk/MakeUserB2C";
import {StudioFilterCorporate} from "../filters/StudioFilterCorporate";

const UserEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton/>
  </Toolbar>
);


export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<UserEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="passesRemaining"/>
      <TextInput source="perfiladorLink"/>
      <DateInput
        source="lastResetDate"
        options={{format: 'dd/MM/YYYY', clearable: "true"}}
      />
      <DateInput
        source="nextResetDate"
        options={{format: 'dd/MM/YYYY', clearable: "true"}}
      />
      <div>
        <small>
          Upload the perfilador pdf to the following S3 folder: Amazon S3 / beholos.com /
          user-perfilador
        </small>
      </div>
      <div>
        <small>
          Then paste the link to the pdf as follows:
          https://cache.beholos.com/user-perfilador/usersPerfiladorFile.pdf
        </small>
      </div>
      <BooleanInput label="Verified Email" source="active"/>
      <TextInput source="password"/>
      <UserUpdatePlan/>
    </SimpleForm>
  </Edit>
);

const Filters = props => (
  <Filter {...props}>
    <TextInput label="Email" source="email" alwaysOn/>
    <TextInput label="First name" source="firstname" alwaysOn/>
    <TextInput label="Last name" source="lastname" alwaysOn/>
    <TextInput source="phoneNumber" alwaysOn/>
    <StudioFilterCorporate alwaysOn/>
    <BooleanInput label="Active Plan" source="activePlan" alwaysOn/>
    <BooleanInput label="Inactive Plan" source="inActivePlan" alwaysOn/>
    <BooleanInput label="B2C Users" source="b2cUsers" alwaysOn/>
    <BooleanInput label="B2B Users" source="b2bUsers" alwaysOn/>
    <BooleanInput label="Has User Profile" source="hasPerfilador" alwaysOn/>
    <DateInput
      source="lastActiveDate"
      options={{format: 'dd/MM/YYYY', clearable: "true"}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="registeredDateStart"
      label="Registered After:"
      options={{format: 'dd/MM/YYYY', clearable: "true"}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="registeredDateEnd"
      label="Registered Before:"
      options={{format: 'dd/MM/YYYY', clearable: "true"}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="purchaseDateAfter"
      label="Purchased After:"
      options={{format: 'dd/MM/YYYY', clearable: "true"}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="purchaseDateBefore"
      label="Purchased Before:"
      options={{format: 'dd/MM/YYYY', clearable: "true"}}
      isRequired={false}
      alwaysOn
    />
  </Filter>
);

const PaginationInstance = props => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />
);

const UserProfile = ({id, record, resource}) => (
  <div>
    {record.userProfileRecord ? <Summary
      selections={record.userProfileRecord}
      getBMI={() => getBMI(true, record.userProfileRecord, true)}
      hideButton={true}
      hideTitle={true}
    /> : 'No user profile for this user.'}
  </div>
);

const UsersBulkActions = props => (
  <Fragment>
    <MakeUserB2C {...props} />
    <RemoveUsersPlanButton {...props} />
    <ForceResetUsersPlanButton {...props} />
  </Fragment>
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


export const UserList = props => (
  <List
    {...props}
    actions={<Actions/>}
    pagination={<PaginationInstance/>}
    filters={<Filters/>}
    bulkActionButtons={<UsersBulkActions/>}
  >
    <Datagrid
      expand={<UserProfile/>}>
      <EditButton/>
      <TextField source="id"/>
      <TextField source="firstname"/>
      <TextField source="lastname"/>
      <EmailField source="email"/>
      <EmailField source="marketingEmail"/>
      <BooleanField label="Verified Email" source="active"/>
      <TextField source="phoneNumber"/>
      <TextField label="DNI" source="nationalIdentityNumber"/>
      <TextField source="corporateStudio"/>
      <DateField label="Register Date" source="dateCreated" locales="es-ES"/>
      <TextField source="userProfileRecord.gender" label="Gender"/>
      <BooleanField label="Has User Profile" source="userProfile"/>
      <DateField label="Last Login Date" source="lastLoginDate" locales="es-ES"/>
      <DateField source="lastActiveDate" locales="es-ES"/>
      <DateField source="birthDate" locales="es-ES"/>
      <TextField source="fitPoints"/>
      <TextField source="points"/>
      <TextField source="level"/>
      <BooleanField label="Active Plan (stripe/kushki/manual)" source="activePlan"/>
      <TextField label="Active Stripe/Kushki Subscription" source="activeSubscription"/>
      <BooleanField label="Manual Payment" source="isManualPayment"/>
      <BooleanField source="freeTrialUser"/>
      <DateField source="purchaseDate" locales="es-ES"/>
      <TextField source="monthsSincePurchasing"/>
      <NumberField label="Plan" source="plan.name"/>
      <TextField source="cycleInterval"/>
      <NumberField label="Total Passes" source="plan.numberOfPasses"/>
      <NumberField label="Passes" source="passesRemaining"/>
      <NumberField label="Passes Used" source="passesUsed"/>
      <NumberField label="Percent Used" source="percentPassesUsed"/>
      <BooleanField label="User Paid flag" source="payed"/>
      <TextField label="Stripe Subscription ID" source="subscriptionInfo.subscription_id"/>
      <DateField label="Freeze Start" source="planFrozen.start" locales="es-ES"/>
      <DateField label="Freeze End" source="planFrozen.end" locales="es-ES"/>
      <BooleanField label="Has had a plan" source="hadAPlan"/>
      <BooleanField label="Cancelled" source="cancelledDate"/>
      <DateField source="startOfCycle" locales="es-ES"/>
      <DateField source="nextCycle" locales="es-ES"/>
      <DateField source="lastResetDate" locales="es-ES"/>
      <DateField source="nextResetDate" locales="es-ES"/>
    </Datagrid>
  </List>
);
