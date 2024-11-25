import React, { Fragment } from 'react';
import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  DateInput,
  DateTimeInput,
  Edit,
  EmailField,
  ExportButton,
  Filter,
  FormDataConsumer,
  FormTab,
  List,
  NumberField,
  NumberInput,
  Pagination,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  ReferenceInput,
  RefreshButton,
  required,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleFormIterator,
  SingleFieldList,
  TabbedForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  UrlField,
  usePermissions,
} from 'react-admin';
import { CategoryFilter } from '../filters/CategoryFilter';
import { DistrictFilter } from '../filters/DistrictFilter';
import { TimezoneSelect } from '../util/TimezoneSelect';
import { ColorInput } from 'react-admin-color-input';
import SortableArray from "ra-input-array-sortable";
import SetActiveButton from "../bulk/SetActiveButton";
import SetInactiveButton from "../bulk/SetInactiveButton";
import AddHolidayBulkAction from "../bulk/AddHolidaysBulkAction";
import MarkdownInput from 'ra-input-markdown';

const optionRenderer = option => `${option.name} - ${option.cycleDuration} Month Duration`;

const StudiosBulkActions = props => (
  <Fragment>
    <AddHolidayBulkAction {...props} />
    <SetActiveButton {...props} label="Make Partners Active" />
    <SetInactiveButton {...props} label="Make Partners Inactive" />
  </Fragment>
);

const StudioFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Studio Name" source="name" alwaysOn />
    <CategoryFilter alwaysOn />
    <DistrictFilter alwaysOn />
    <BooleanInput source="active" alwaysOn />
    <SelectInput
      source="billingDayOfMonth"
      optionText="name"
      choices={[
        { id: 7, name: 7 },
        { id: 15, name: 15 },
        { id: 30, name: 30 }
      ]}
      alwaysOn
    />
    <RadioButtonGroupInput source="partnerType" choices={[
      { id: 'all', name: 'All' },
      { id: 'studio', name: 'Studio' },
      { id: 'nutritionist', name: 'Nutritionist' },
      { id: 'healthCoach', name: 'Health Coach' },
      { id: 'corporate', name: 'Corporate' },
      { id: 'psychologist', name: 'Psychologist' },
      { id: 'financialAdvisor', name: 'Financial Advisor' },
      { id: 'fitnessCoach', name: 'Fitness Coach' }
    ]} alwaysOn />
  </Filter>
);

const StudioEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

export const StudioCreate = props => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="General">
        <div style={{ display: 'flex' }}>
          <h2 style={{ marginRight: '20px' }}>Partner&nbsp;Type: </h2>
          <SelectInput source="partnerType" optionText="name"
            defaultValue={"studio"} choices={[
              { id: 'studio', name: 'Studio' },
              { id: 'nutritionist', name: 'Nutritionist' },
              { id: 'healthCoach', name: 'Health Coach' },
              { id: 'corporate', name: 'Corporate' },
              { id: 'psychologist', name: 'Psychologist' },
              { id: 'financialAdvisor', name: 'Financial Advisor' },
              { id: 'fitnessCoach', name: 'Fitness Coach' }
            ]} />
        </div>
        <FormDataConsumer>
          {({
            formData,
            ...rest
          }) => formData && formData.partnerType === 'corporate' &&
            <div>
              <ReferenceArrayInput
                label="Plans"
                source="plans"
                reference="plans"
              >
                <SelectArrayInput optionText={optionRenderer} />
              </ReferenceArrayInput>
              <BooleanInput source="corporateCanAddFamilyMembers" />
            </div>}
        </FormDataConsumer>
        <div style={{
          width: '100%',
          borderBottom: '2px solid #000000',
          marginTop: '20px'
        }} />
        <TextInput source="name" validate={[required()]} />
        <MarkdownInput source="description" validate={[required()]} />
        <TextInput source="phoneNumber" />
        <TextInput source="contactPhoneNumber" />
        <TextInput source="website" />
        <TextInput source="websiteDisplay" />
        <TextInput multiline={true} source="businessHours" />
        <NumberInput source="studioVisitLimit" />
        <BooleanInput source="premium" />
        <BooleanInput source="hasLiveStream" />
      </FormTab>
      <FormTab label="Email">
        <TextInput source="email" validate={[required()]} />
        <TextInput source="otherEmails" />
        <BooleanInput source="sendUserPhoneNumbers" />
        <BooleanInput source="sendUserEmails" defaultValue={true} />
      </FormTab>
      <FormTab label="Location">
        <NumberInput label="Latitude" source="address.latitude"
          validate={[required()]} />
        <NumberInput label="Longitude" source="address.longitude"
          validate={[required()]} />
        <TextInput label="Street" source="address.street"
          validate={[required()]} />
        <ReferenceInput label="Country" source="country" reference="countries"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="City" source="city" reference="cities"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="District" source="district" reference="districts"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TimezoneSelect />
      </FormTab>
      <FormTab label="Class information">
        <SelectInput
          source="passes"
          label="Average Passes Cost"
          optionText="name"
          choices={[
            { id: 0, name: '0' },
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
            { id: 5, name: '5' },
            { id: 6, name: '6' },
            { id: 7, name: '7' },
            { id: 8, name: '8' },
            { id: 9, name: '9' },
            { id: 10, name: '10' },
            { id: 11, name: '11' },
            { id: 12, name: '12' },
            { id: 13, name: '13' },
            { id: 14, name: '14' },
            { id: 15, name: '15' },
            { id: 16, name: '16' },
            { id: 17, name: '17' },
            { id: 18, name: '18' },
            { id: 19, name: '19' },
            { id: 20, name: '20' },
          ]}
        />
        <ReferenceArrayInput label="Categories" source="categories"
          reference="categories" perPage={1000}
          sort={{ field: 'name', order: 'ASC' }}>
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Services" source="services"
          reference="services" perPage={1000}
          sort={{ field: 'name', order: 'ASC' }}>
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <SelectInput label="Intensity" source="intensity" optionText="name"
          choices={[
            { id: 0, name: 'Athlete' },
            { id: 1, name: 'High' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'Low' }
          ]} />
        <TextInput multiline={true} source="howToGetThere" />
        <TextInput multiline={true} source="howToPrepare" />
        <TextInput multiline={true} source="cancellationPolicy" />
        <TextInput multiline={true} source="healthAndSafetyPolicy" />
        <BooleanInput source="autoMarkClassesAttended" />
      </FormTab>
      <FormTab label="Social Media">
        <TextInput label="Facebook URL" source="social.facebook" />
        <TextInput label="Facebook Display" source="social.facebookDisplay" />
        <TextInput label="Instagram URL" source="social.instagram" />
        <TextInput label="Instagram Display" source="social.instagramDisplay" />
        <TextInput label="Tiktok URL" source="social.tiktok" />
        <TextInput label="Tiktok Display" source="social.tiktokDisplay" />
        <TextInput label="Twitter URL" source="social.twitter" />
        <TextInput label="Twitter Display" source="social.twitterDisplay" />
      </FormTab>
      <FormTab label="Payment">
        <h4>ONE comma "," ONE space " " in between each email e.g. jose@pa.pe, juan@pa.pe</h4>
        <TextInput source="billingEmail" label="Billing Emails (Comma + space separated: ', ')" />
        <SelectInput
          source="billingDayOfMonth"
          optionText="name"
          choices={[
            { id: 7, name: 7 },
            { id: 15, name: 15 },
            { id: 30, name: 30 }
          ]}
        />
        <TextInput source="businessName" />
        <TextInput source="bankName" />
        <TextInput source="accountNumber" />
        <TextInput label="Tax Number (RUC number)" source="taxNumber" />
        <TextInput label="Tax Number Type (RUC)" source="taxNumberType" />
      </FormTab>
      <FormTab label="Platform Customization">
        <h2>Colors</h2>
        <div style={{ paddingLeft: '30px' }}>
          <ColorInput source="primaryColor" />
        </div>
        <h2>Banners</h2>
        <div style={{ paddingLeft: '30px' }}>
          <BooleanInput source="fullWidthDashboardBanner" />
          <h4>Enter image path e.g. /img/studios/example.jpg</h4>
          <TextInput source="dashboardBannerImage" />
          <ColorInput source="dashboardBannerTextColor" />
        </div>
      </FormTab>
      <FormTab label="Other">
        <TextInput label="Studio Logo Image" source="image" />
        <TextInput source="keyAccountManagerName" />
        <TextInput source="keyAccountManagerNumber" />
        <TextInput source="keyAccountManagerEmail" />
        <SortableArray source="otherImages"
          label="Studio Images (enter image path e.g. /img/studios/example.jpg)">
          <TextInput source="image" label="Image" />
        </SortableArray>
        <SelectInput label="Studio Currency" source="studioCurrency"
          optionText="name" choices={[
            { name: "Argentine Peso (ARS$)", id: "ARS$" },
            { name: "Aruban florin (ƒ)", id: "ƒ" },
            { name: "Bolivian boliviano (Bs)", id: "Bs" },
            { name: "Brazilian real (R$)", id: "R$" },
            { name: "Canadian dollar (CA$)", id: "CA$" },
            { name: "Chilean Peso (CLP$)", id: "CLP$" },
            { name: "Colombian Peso (COP$)", id: "COP$" },
            { name: "Costa Rican colón (₡)", id: "₡" },
            { name: "Cuban peso (CUC$)", id: "CUC$" },
            { name: "Danish krone (kr)", id: "kr" },
            { name: "Dominican peso (RD$)", id: "RD$" },
            { name: "Euro (€)", id: "€" },
            { name: "Falkland Islands pound (£)", id: "£" },
            { name: "Guatemalan quetzal (Q)", id: "Q" },
            { name: "Guyanese dollar (G$)", id: "G$" },
            { name: "Haitian gourde (G)", id: "G" },
            { name: "Honduran lempira (L)", id: "L" },
            { name: "Jamaican dollar (J$)", id: "J$" },
            { name: "Mexican Peso (MXN$)", id: "MXN$" },
            { name: "Netherlands Antillean guilder (ƒ)", id: "ƒ" },
            { name: "Nicaraguan córdoba (C$)", id: "C$" },
            { name: "Panamanian balboa (B/.)", id: "B/." },
            { name: "Paraguayan guaraní (₲)", id: "₲" },
            { name: "Peruvian sol (S/.)", id: "S/." },
            { name: "Trinidad and Tobago dollar (TT$)", id: "TT$" },
            { name: "United Kingdom pound (£)", id: "£" },
            { name: "United States (US$)", id: "US$" },
            { name: "Uruguayan peso ($U)", id: "$U" },
            { name: "Venezuelan bolívar (Bs.)", id: "Bs." }
          ]} />
        <NumberInput source="amountPerStudioClass" />
        <NumberInput source="amountPerStudioClassNoShow" />
        <DateInput source="contractStartDate" label="Contract Start Date"
          options={{ format: 'dd/MM/YYYY' }}
          isRequired={false} />
        <NumberInput source="sortOrder" />
        <TextInput source="contactFirstName" />
        <TextInput source="contactLastName" />
        <ArrayInput
          label="Corporate Domains: include everything after the '@' symbol"
          source="corporateDomains">
          <SimpleFormIterator>
            <TextInput label="ex: @google.com" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="password" validate={[required()]} />
        <TextInput label="Slug (optional)" source="slug" />
        <TextInput multiline={true} source="notes" />
        <BooleanInput source="active" />
      </FormTab>
      <FormTab label="Holidays">
        <SortableArray label="Studio Holidays" source="holidays">
          <DateInput source="date" options={{ format: 'dd/MM/YYYY' }} />
        </SortableArray>
        <SortableArray label="Studio Holiday Ranges" source="holidayRanges">
          <DateTimeInput source="date" options={{ format: 'dd/MM/YYYY HH:mm' }} />
          <NumberInput source="length" label="Number of minutes"
            options={{ format: 'dd/MM/YYYY' }} />
        </SortableArray>
        <h2>Please delete old Studio Holidays</h2>
      </FormTab>
    </TabbedForm>
  </Create>
);

export const StudioEdit = props => (
  <Edit {...props}>
    <TabbedForm toolbar={<StudioEditToolbar />}>
      <FormTab label="General">
        <div style={{ display: 'flex' }}>
          <h2 style={{ marginRight: '20px' }}>Partner&nbsp;Type: </h2>
          <SelectInput source="partnerType" optionText="name"
            defaultValue={"studio"} choices={[
              { id: 'studio', name: 'Studio' },
              { id: 'nutritionist', name: 'Nutritionist' },
              { id: 'healthCoach', name: 'Health Coach' },
              { id: 'corporate', name: 'Corporate' },
              { id: 'psychologist', name: 'Psychologist' },
              { id: 'financialAdvisor', name: 'Financial Advisor' },
              { id: 'fitnessCoach', name: 'Fitness Coach' }
            ]} />
        </div>
        <FormDataConsumer>
          {({
            formData,
            ...rest
          }) => formData && formData.partnerType === 'corporate' &&
            <div>
              <ReferenceArrayInput
                label="Plans"
                source="plans"
                reference="plans"
              >
                <SelectArrayInput optionText={optionRenderer} />
              </ReferenceArrayInput>
              <BooleanInput source="corporateCanAddFamilyMembers" />
            </div>}
        </FormDataConsumer>
        <div style={{
          width: '100%',
          borderBottom: '2px solid #000000',
          marginTop: '20px'
        }} />
        <TextField label="Id" source="id" InputProps={{
          readOnly: true,
        }} />
        <TextInput source="name" validate={[required()]} />
        <MarkdownInput source="description" validate={[required()]} />
        <TextInput source="phoneNumber" />
        <TextInput source="contactPhoneNumber" />
        <TextInput source="website" />
        <TextInput source="websiteDisplay" />
        <TextInput multiline={true} source="businessHours" />
        <NumberInput source="studioVisitLimit" />
        <BooleanInput source="premium" />
        <BooleanInput source="hasLiveStream" />
      </FormTab>
      <FormTab label="Email">
        <TextInput source="email" validate={[required()]} />
        <TextInput source="otherEmails" />
        <BooleanInput source="sendUserPhoneNumbers" />
        <BooleanInput source="sendUserEmails" />
      </FormTab>
      <FormTab label="Location">
        <NumberInput label="Latitude" source="address.latitude"
          validate={[required()]} />
        <NumberInput label="Longitude" source="address.longitude"
          validate={[required()]} />
        <TextInput label="Street" source="address.street"
          validate={[required()]} />
        <ReferenceInput label="Country" source="country" reference="countries"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="City" source="city" reference="cities"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="District" source="district" reference="districts"
          perPage={1000}
          sort={{ field: 'name', order: 'ASC' }} allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>

        <TimezoneSelect />
      </FormTab>
      <FormTab label="Class information">
        <SelectInput
          source="passes"
          label="Average Passes Cost"
          optionText="name"
          choices={[
            { id: 0, name: '0' },
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
            { id: 5, name: '5' },
            { id: 6, name: '6' },
            { id: 7, name: '7' },
            { id: 8, name: '8' },
            { id: 9, name: '9' },
            { id: 10, name: '10' },
            { id: 11, name: '11' },
            { id: 12, name: '12' },
            { id: 13, name: '13' },
            { id: 14, name: '14' },
            { id: 15, name: '15' },
            { id: 16, name: '16' },
            { id: 17, name: '17' },
            { id: 18, name: '18' },
            { id: 19, name: '19' },
            { id: 20, name: '20' },
          ]}
        />
        <ReferenceArrayInput label="Categories" source="categories"
          reference="categories" perPage={1000}
          sort={{ field: 'name', order: 'ASC' }}>
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <ReferenceArrayInput label="Services" source="services"
          reference="services" perPage={1000}
          sort={{ field: 'name', order: 'ASC' }}>
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
        <SelectInput label="Intensity" source="intensity" optionText="name"
          choices={[
            { id: 0, name: 'Athlete' },
            { id: 1, name: 'High' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'Low' }
          ]} />
        <TextInput multiline={true} source="howToGetThere" />
        <TextInput multiline={true} source="howToPrepare" />
        <TextInput multiline={true} source="cancellationPolicy" />
        <TextInput multiline={true} source="healthAndSafetyPolicy" />
        <BooleanInput source="autoMarkClassesAttended" />
      </FormTab>
      <FormTab label="Social Media">
        <TextInput label="Facebook URL" source="social.facebook" />
        <TextInput label="Facebook Display" source="social.facebookDisplay" />
        <TextInput label="Instagram URL" source="social.instagram" />
        <TextInput label="Instagram Display" source="social.instagramDisplay" />
        <TextInput label="Tiktok URL" source="social.tiktok" />
        <TextInput label="Tiktok Display" source="social.tiktokDisplay" />
        <TextInput label="Twitter URL" source="social.twitter" />
        <TextInput label="Twitter Display" source="social.twitterDisplay" />
      </FormTab>
      <FormTab label="Payment">
        <h4>ONE comma "," ONE space " " in between each email e.g. jose@pa.pe, juan@pa.pe</h4>
        <TextInput source="billingEmail" label="Billing Emails (Comma + space separated: ', ')" />
        <SelectInput
          source="billingDayOfMonth"
          optionText="name"
          choices={[
            { id: 7, name: 7 },
            { id: 15, name: 15 },
            { id: 30, name: 30 }
          ]}
        />
        <TextInput source="businessName" />
        <TextInput source="bankName" />
        <TextInput source="accountNumber" />
        <TextInput label="Tax Number (RUC number)" source="taxNumber" />
        <TextInput label="Tax Number Type (RUC)" source="taxNumberType" />
      </FormTab>
      <FormTab label="Platform Customization">
        <h2>Colors</h2>
        <div style={{ paddingLeft: '30px' }}>
          <ColorInput source="primaryColor" />
        </div>
        <h2>Banners</h2>
        <div style={{ paddingLeft: '30px' }}>
          <BooleanInput source="fullWidthDashboardBanner" />
          <h4>Enter image path e.g. /img/studios/example.jpg</h4>
          <TextInput source="dashboardBannerImage" />
          <ColorInput source="dashboardBannerTextColor" />
        </div>
      </FormTab>
      <FormTab label="Other">
        <TextInput source="keyAccountManagerName" />
        <TextInput source="keyAccountManagerNumber" />
        <TextInput source="keyAccountManagerEmail" />
        <TextInput label="Studio Logo Image" source="image" />
        <SortableArray source="otherImages"
          label="Studio Images (enter image path e.g. /img/studios/example.jpg)">
          <TextInput source="image" label="Image" />
        </SortableArray>
        <SelectInput label="Studio Currency" source="studioCurrency"
          optionText="name" choices={[
            { name: "Argentine Peso (ARS$)", id: "ARS$" },
            { name: "Aruban florin (ƒ)", id: "ƒ" },
            { name: "Bolivian boliviano (Bs)", id: "Bs" },
            { name: "Brazilian real (R$)", id: "R$" },
            { name: "Canadian dollar (CA$)", id: "CA$" },
            { name: "Chilean Peso (CLP$)", id: "CLP$" },
            { name: "Colombian Peso (COP$)", id: "COP$" },
            { name: "Costa Rican colón (₡)", id: "₡" },
            { name: "Cuban peso (CUC$)", id: "CUC$" },
            { name: "Danish krone (kr)", id: "kr" },
            { name: "Dominican peso (RD$)", id: "RD$" },
            { name: "Euro (€)", id: "€" },
            { name: "Falkland Islands pound (£)", id: "£" },
            { name: "Guatemalan quetzal (Q)", id: "Q" },
            { name: "Guyanese dollar (G$)", id: "G$" },
            { name: "Haitian gourde (G)", id: "G" },
            { name: "Honduran lempira (L)", id: "L" },
            { name: "Jamaican dollar (J$)", id: "J$" },
            { name: "Mexican Peso (MXN$)", id: "MXN$" },
            { name: "Netherlands Antillean guilder (ƒ)", id: "ƒ" },
            { name: "Nicaraguan córdoba (C$)", id: "C$" },
            { name: "Panamanian balboa (B/.)", id: "B/." },
            { name: "Paraguayan guaraní (₲)", id: "₲" },
            { name: "Peruvian sol (S/.)", id: "S/." },
            { name: "Trinidad and Tobago dollar (TT$)", id: "TT$" },
            { name: "United Kingdom pound (£)", id: "£" },
            { name: "United States (US$)", id: "US$" },
            { name: "Uruguayan peso ($U)", id: "$U" },
            { name: "Venezuelan bolívar (Bs.)", id: "Bs." }
          ]} />
        <NumberInput source="amountPerStudioClass" />
        <NumberInput source="amountPerStudioClassNoShow" />
        <DateInput source="contractStartDate" label="Contract Start Date"
          options={{ format: 'dd/MM/YYYY' }}
          isRequired={false} />

        <NumberInput source="sortOrder" />
        <TextInput source="contactFirstName" />
        <TextInput source="contactLastName" />
        <ArrayInput
          label="Corporate Domains: include everything after the '@' symbol"
          source="corporateDomains">
          <SimpleFormIterator>
            <TextInput label="ex: google.com" />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="password" validate={[required()]} />
        <TextInput label="Slug (optional)" source="slug" />
        <TextInput multiline={true} source="notes" />
        <BooleanInput source="active" />
      </FormTab>
      <FormTab label="Holidays">
        <div>Please note that this will automatically cancel any user class for this studio for the holidays entered and notify the user.</div>
        <SortableArray label="Studio Holidays" source="holidays">
          <DateInput source="date" options={{ format: 'dd/MM/YYYY' }} />
        </SortableArray>
        <div>Please note that this will <strong>NOT</strong> automatically cancel user classes.</div>
        <SortableArray label="Studio Holiday Ranges" source="holidayRanges">
          <DateTimeInput source="date" options={{ format: 'dd/MM/YYYY HH:mm' }} />
          <NumberInput source="length" label="Number of minutes"
            options={{ format: 'dd/MM/YYYY' }} />
        </SortableArray>
        <h2>Please delete old Studio Holidays</h2>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const Actions = ({ currentSort, exporter, filterValues, resource, total }) => {
  const { permissions } = usePermissions();
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
      <CreateButton />
      <RefreshButton />
    </TopToolbar>
  )
};

export const StudioList = props => (
  <List
    {...props}
    bulkActionButtons={<StudiosBulkActions />}
    actions={<Actions />}
    filters={<StudioFilter />}
    pagination={
      <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />
    }>
    <Datagrid rowClick="edit">
      <TextField source="id" label="Corporate ID" />
      <BooleanField source="active" />
      <TextField source="partnerType" />
      <TextField source="name" />
      <ArrayField source="categories">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <ChipField label="District" source="district.name" />
      <ChipField label="Country" source="country.name" />
      <ArrayField source="services">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="studioVisitLimit" />
      <TextField source="studioCurrency" />
      <DateField source="contractStartDate" locale="es-ES" />
      <NumberField source="billingDayOfMonth" />
      <EmailField source="email" />
      <TextField source="phoneNumber" />
      <UrlField label="Facebook" source="social.facebook" />
      <UrlField label="Instagram" source="social.instagram" />
      <UrlField source="website" />
      <NumberField label="Intensity (0-3)" source="intensity" />
      <NumberField source="sortOrder" />
      <BooleanField source="premium" />
      <BooleanField source="hasLiveStream" />
      <TextField source="keyAccountManagerEmail" label="Assigned KAM" />
      <NumberField source="numberOfUsers" />
      <NumberField source="numberOfActiveUsers" label="Total Licenses Used" />
    </Datagrid>
  </List>
);
