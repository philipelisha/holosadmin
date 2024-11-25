import React, {Fragment} from 'react';
import {
  ArrayField,
  BooleanField,
  BulkDeleteButton,
  ChipField,
  Create,
  CreateButton,
  Datagrid,
  DateField,
  DateInput,
  DateTimeInput,
  ExportButton,
  Filter,
  FormDataConsumer,
  List,
  NumberField,
  Pagination,
  RadioButtonGroupInput,
  ReferenceInput,
  RefreshButton,
  SelectInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  TopToolbar,
  usePermissions
} from 'react-admin';
import moment from 'moment';
import {StudioFilter} from '../filters/StudioFilter';
import {CategoryFilter} from '../filters/CategoryFilter';
import MarkAsVerifiedButton from '../bulk/MarkAsVerifiedButton';
import MarkAsNoShowButton from '../bulk/MarkAsNoShowButton';
import CancelClassButton from "../bulk/CancelClassButton";
import RemoveReviewButton from "../bulk/RemoveReviewButton";
import {StudioFilterCorporate} from "../filters/StudioFilterCorporate";

const Filters = props => (
  <Filter {...props}>
    <DateInput
      source="startTime"
      label="Start"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="endTime"
      label="End"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="createdDateStart"
      label="Reserved after"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <DateInput
      source="createdDateEnd"
      label="Reserved Before"
      options={{format: 'dd/MM/YYYY', clearable: true}}
      isRequired={false}
      alwaysOn
    />
    <StudioFilter alwaysOn/>
    <StudioFilterCorporate alwaysOn/>
    <CategoryFilter alwaysOn/>
    <TextInput label="Class Name" source="classTitle" alwaysOn/>
    <TextInput label="User Email" source="userEmail" alwaysOn/>
    <TextInput label="User Invite" source="inviteSentBy" alwaysOn/>
    <SelectInput source="classType" optionText="name" choices={[
        {id: 'all', name: 'All'},
        {id: 'class', name: 'Reservas in-person'},
        {id: 'online', name: 'Online Grupales'},
        {id: 'video', name: 'Video (reservation/view)'},
        {id: 'customUserClass', name: 'Manual Activity'},
        {id: 'specialist', name: 'Sesiones con especialistas'},
      ]} alwaysOn/>
    <SelectInput source="classStatus" optionText="name" choices={[
        {id: 'all', name: 'All'},
        {id: 'attended', name: 'Attended'},
        {id: 'cancelled', name: 'Cancelled'},
        {id: 'pending', name: 'Pending'},
      ]} alwaysOn/>
  </Filter>
);

const UserClassBulkActionButtons = props => (
  <Fragment>
    <RemoveReviewButton {...props} />
    <CancelClassButton {...props} />
    <MarkAsNoShowButton {...props} />
    <MarkAsVerifiedButton {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);

const UserClassesPagination = props => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />
);

const Actions = ({currentSort, exporter, filterValues, resource, total}) => {
  const {permissions} = usePermissions();
  return (
    <TopToolbar>
      {permissions === 'admin' && <CreateButton/>}
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

export const UserClassList = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<UserClassBulkActionButtons/>}
    pagination={<UserClassesPagination/>}
    filters={<Filters/>}
    filterDefaultValues={{
      startTime: moment()
      .startOf('month')
      .toDate(),
      endTime: moment()
      .endOf('month')
      .toDate(),
    }}
  >
    <Datagrid>
      <TextField label="First Name" source="user.firstname"/>
      <TextField label="Last Name" source="user.lastname"/>
      <TextField label="Email" source="user.email"/>
      <TextField source="user.corporateStudio"/>
      <DateField label="Date" source="startTime" locales="es-ES"/>
      <TextField label="Start Time" source="formatedStartTime"/>
      <TextField label="End Time" source="formatedEndTime"/>
      <DateField label="Reserved Date" source="createdDate" locales="es-ES" showTime={true}/>
      <NumberField label="Class Length" source="classLength"/>
      <TextField source="class.title" label="Title"/>
      <TextField source="class.studioName" label="Partner Name"/>
      <TextField source="inviteSentBy"/>
      <BooleanField source="class.isVideo" label="Video"/>
      <BooleanField source="class.liveStreamClass" label="Live Stream"/>
      <BooleanField source="class.isInPerson" label="In Person"/>
      <BooleanField source="class.isCustom" label="Manual"/>
      <TextField source="class.partnerType" label="Partner Type"/>
      <ArrayField label="Category" source="class.category">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <ChipField label="Saas Category" source="class.saasCategory.name"/>
      <BooleanField label="Partner Active" source="class.studioActive"/>
      <TextField source="hash" label="Hash Code"/>
      <BooleanField source="attended"/>
      <DateField source="markedAttendedDate" locales="es-ES"/>
      <BooleanField source="cancelled"/>
      <BooleanField source="lateCancelled"/>
      <BooleanField source="noShow"/>
      <BooleanField source="reviewGiven"/>
      <TextField label="Partner Currency" source="class.studioCurrency"/>
      <NumberField label="Amount Per Class"
                   source="amountPerStudioClassInSoles"/>
      <NumberField label="Amount Per No Show"
                   source="amountPerStudioClassNoShowInSoles"/>
      <NumberField source="passes"/>
      <NumberField label="Review" source="review.review"/>
      <TextField label="Rating" source="review.rating"/>
    </Datagrid>
  </List>
);

export const UserClassListNoDelete = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<div/>}
    pagination={<UserClassesPagination/>}
    filters={<Filters/>}
    filterDefaultValues={{
      startTime: moment()
      .startOf('month')
      .toDate(),
      endTime: moment()
      .endOf('month')
      .toDate(),
    }}
  >
    <Datagrid>
      <TextField label="First Name" source="user.firstname"/>
      <TextField label="Last Name" source="user.lastname"/>
      <TextField label="Email" source="user.email"/>
      <TextField source="user.corporateStudio"/>
      <DateField label="Date" source="startTime" locales="es-ES"/>
      <TextField label="Start Time" source="formatedStartTime"/>
      <TextField label="End Time" source="formatedEndTime"/>
      <DateField label="Reserved Date" source="createdDate" locales="es-ES" showTime={true}/>
      <NumberField label="Class Length" source="classLength"/>
      <TextField source="class.title" label="Title"/>
      <TextField source="class.studioName" label="Partner Name"/>
      <TextField source="inviteSentBy"/>
      <BooleanField source="class.isVideo" label="Video"/>
      <BooleanField source="class.liveStreamClass" label="Live Stream"/>
      <BooleanField source="class.isInPerson" label="In Person"/>
      <BooleanField source="class.isCustom" label="Manual"/>
      <TextField source="class.partnerType" label="Partner Type"/>
      <ArrayField label="Category" source="class.category">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <ChipField label="Saas Category" source="class.saasCategory.name"/>
      <BooleanField label="Partner Active" source="class.studioActive"/>
      <TextField source="hash" label="Hash Code"/>
      <BooleanField source="attended"/>
      <DateField source="markedAttendedDate" locales="es-ES"/>
      <BooleanField source="cancelled"/>
      <BooleanField source="lateCancelled"/>
      <BooleanField source="noShow"/>
      <BooleanField source="reviewGiven"/>
      <TextField label="Partner Currency" source="class.studioCurrency"/>
      <NumberField label="Amount Per Class"
                   source="amountPerStudioClassInSoles"/>
      <NumberField label="Amount Per No Show"
                   source="amountPerStudioClassNoShowInSoles"/>
      <NumberField source="passes"/>
      <NumberField label="Review" source="review.review"/>
      <TextField label="Rating" source="review.rating"/>
    </Datagrid>
  </List>
);

const optionRenderer = option => `${option.title} -
  ${option.repeat && option.repeat.days ? option.repeat.start + ' ' + option.repeat.days : ''}
`;

export const UserClassCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email"/>
      <ReferenceInput label="Studio" source="studio" reference="studioslist"
                      perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <FormDataConsumer source="studios">
        {
          ({formData, ...restOfTheProps}) =>
            <ReferenceInput
              label="Class"
              source="classId"
              reference="classes"
              perPage={1000}
              filter={{studios: formData.studio}}
              sort={{field: 'title', order: 'ASC'}}>
              <SelectInput optionText={optionRenderer}/>
            </ReferenceInput>
        }
      </FormDataConsumer>
      <DateTimeInput label="Start" source="start"/>
      <DateTimeInput label="End" source="end"/>
    </SimpleForm>
  </Create>
);
