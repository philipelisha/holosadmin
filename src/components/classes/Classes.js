import React, {Fragment} from 'react';
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  BulkDeleteButton,
  ChipField,
  CloneButton,
  Create,
  Datagrid,
  Edit,
  EditButton,
  Filter,
  List,
  NumberField,
  NumberInput,
  Pagination,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
  CreateButton,
  usePermissions,
  ExportButton,
  TopToolbar
} from 'react-admin';
import {CategoryFilter} from '../filters/CategoryFilter';
import {StudioFilter} from '../filters/StudioFilter';
import SetInactiveButton from '../bulk/SetInactiveButton';
import SetActiveButton from '../bulk/SetActiveButton';
import {SelectClassTime} from "../util/SelectClassTime";
import MarkdownInput from 'ra-input-markdown';
import AddRepeatEndBulkAction from "../bulk/AddRepeatEndBulkAction";

const ClassesBulkActions = props => (
  <Fragment>
    <AddRepeatEndBulkAction {...props}/>
    <SetActiveButton {...props} />
    <SetInactiveButton {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);

const ClassesFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Class Name" source="classTitle" alwaysOn/>
    <StudioFilter alwaysOn/>
    <CategoryFilter alwaysOn/>
    <BooleanInput source="active" alwaysOn/>
  </Filter>
);

const ClassesEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const ClassesCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={[required()]}/>
      <TextInput source="slug"/>
      <TextInput source="teachers"/>
      <MarkdownInput source="description" validate={[required()]}/>
      <ReferenceInput validate={[required()]} label="Studio" source="studio.id" reference="studios" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <NumberInput label="Available Spaces" validate={[required()]} source="remainingClasses"/>
      <SelectInput
        validate={[required()]}
        source="passes"
        label="Passes Cost"
        optionText="name"
        defaultValue={1}
        choices={[
          {id: 0, name: '0'},
          {id: 1, name: '1'},
          {id: 2, name: '2'},
          {id: 3, name: '3'},
          {id: 4, name: '4'},
          {id: 5, name: '5'},
          {id: 6, name: '6'},
          {id: 7, name: '7'},
          {id: 8, name: '8'},
          {id: 9, name: '9'},
          {id: 10, name: '10'},
          {id: 11, name: '11'},
          {id: 12, name: '12'},
          {id: 13, name: '13'},
          {id: 14, name: '14'},
          {id: 15, name: '15'},
          {id: 16, name: '16'},
          {id: 17, name: '17'},
          {id: 18, name: '18'},
          {id: 19, name: '19'},
          {id: 20, name: '20'},
        ]}
      />
      <ReferenceArrayInput validate={[required()]} label="Categories" source="category" reference="categories"
                           perPage={1000}
                           sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      <ReferenceInput label="SaasCategories" source="saasCategory" reference="saas-categories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <SelectClassTime/>
      <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
        {id: 0, name: 'Athlete'},
        {id: 1, name: 'High'},
        {id: 2, name: 'Medium'},
        {id: 3, name: 'Low'}
      ]}/>
      <SelectInput label="Enrollment Restriction" source="enrollTimeRestriction" optionText="name" choices={[
        {id: .5, name: '30 Minutes'},
        {id: 1, name: '1 Hour'},
        {id: 2, name: '2 Hours'},
        {id: 3, name: '3 Hours'},
        {id: 4, name: '4 Hours'},
        {id: 5, name: '5 Hours'},
        {id: 6, name: '6 Hours'},
        {id: 7, name: '7 Hours'},
        {id: 8, name: '8 Hours'},
        {id: 12, name: '12 Hours'},
        {id: 24, name: '24 Hours'},
        {id: 48, name: '48 Hours'},
        {id: 72, name: '72 Hours'},
        {id: 168, name: '7 Days'}
      ]}/>
      <SelectInput
        validate={[required()]}
        source="cancelTimeRestriction"
        label="Cancel Restriction (default 4)"
        optionText="name"
        choices={[
          {id: 0, name: '0 Hours'},
          {id: 1, name: '1 Hours'},
          {id: 2, name: '2 Hours'},
          {id: 3, name: '3 Hours'},
          {id: 4, name: '4 Hours'},
          {id: 5, name: '5 Hours'},
          {id: 6, name: '6 Hours'},
          {id: 7, name: '7 Hours'},
          {id: 8, name: '8 Hours'},
          {id: 9, name: '9 Hours'},
          {id: 10, name: '10 Hours'},
          {id: 11, name: '11 Hours'},
          {id: 12, name: '12 Hours'},
          {id: 13, name: '13 Hours'},
          {id: 14, name: '14 Hours'},
          {id: 15, name: '15 Hours'},
          {id: 16, name: '16 Hours'},
          {id: 17, name: '17 Hours'},
          {id: 18, name: '18 Hours'},
          {id: 19, name: '19 Hours'},
          {id: 20, name: '20 Hours'},
          {id: 21, name: '21 Hours'},
          {id: 22, name: '22 Hours'},
          {id: 23, name: '23 Hours'},
          {id: 24, name: '24 Hours'},
          {id: 48, name: '48 Hours'},
        ]}
      />
      <BooleanInput source="liveStreamClass"/>
      <h2>Urls should always begin with https://</h2>
      <TextInput source="liveStreamUrl"/>
      <TextInput source="liveStreamPassword"/>
      <BooleanInput source="corporate" label="Corporate Class (Universal Schedule)"/>
      <ReferenceInput label="Corporate Affiliated Class" source="corporateStudio" reference="studios" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);


export const ClassesEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<ClassesEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="title" validate={[required()]}/>
      <TextInput source="slug" validate={[required()]}/>
      <TextInput source="teachers"/>
      <MarkdownInput source="description" validate={[required()]}/>
      <ReferenceInput validate={[required()]} label="Studio" source="studio.id" reference="studios" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <NumberInput label="Available Spaces" validate={[required()]} source="remainingClasses"/>
      <SelectInput
        validate={[required()]}
        source="passes"
        label="Passes Cost"
        optionText="name"
        choices={[
          {id: 0, name: '0'},
          {id: 1, name: '1'},
          {id: 2, name: '2'},
          {id: 3, name: '3'},
          {id: 4, name: '4'},
          {id: 5, name: '5'},
          {id: 6, name: '6'},
          {id: 7, name: '7'},
          {id: 8, name: '8'},
          {id: 9, name: '9'},
          {id: 10, name: '10'},
          {id: 11, name: '11'},
          {id: 12, name: '12'},
          {id: 13, name: '13'},
          {id: 14, name: '14'},
          {id: 15, name: '15'},
          {id: 16, name: '16'},
          {id: 17, name: '17'},
          {id: 18, name: '18'},
          {id: 19, name: '19'},
          {id: 20, name: '20'},
        ]}
      />
      <ReferenceArrayInput validate={[required()]} label="Categories" source="category" reference="categories"
                           perPage={1000}
                           sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      <ReferenceInput label="SaasCategories" source="saasCategory" reference="saas-categories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <SelectClassTime/>
      <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
        {id: 0, name: 'Athlete'},
        {id: 1, name: 'High'},
        {id: 2, name: 'Medium'},
        {id: 3, name: 'Low'}
      ]}/>
      <SelectInput label="Enrollment Restriction" source="enrollTimeRestriction" optionText="name" choices={[
        {id: .5, name: '30 Minutes'},
        {id: 1, name: '1 Hour'},
        {id: 2, name: '2 Hours'},
        {id: 3, name: '3 Hours'},
        {id: 4, name: '4 Hours'},
        {id: 5, name: '5 Hours'},
        {id: 6, name: '6 Hours'},
        {id: 7, name: '7 Hours'},
        {id: 8, name: '8 Hours'},
        {id: 12, name: '12 Hours'},
        {id: 24, name: '24 Hours'},
        {id: 48, name: '48 Hours'},
        {id: 72, name: '72 Hours'},
        {id: 168, name: '7 Days'}
      ]}/>
      <SelectInput
        validate={[required()]}
        source="cancelTimeRestriction"
        label="Cancel Restriction (default 4)"
        optionText="name"
        choices={[
          {id: 0, name: '0 Hours'},
          {id: 1, name: '1 Hours'},
          {id: 2, name: '2 Hours'},
          {id: 3, name: '3 Hours'},
          {id: 4, name: '4 Hours'},
          {id: 5, name: '5 Hours'},
          {id: 6, name: '6 Hours'},
          {id: 7, name: '7 Hours'},
          {id: 8, name: '8 Hours'},
          {id: 9, name: '9 Hours'},
          {id: 10, name: '10 Hours'},
          {id: 11, name: '11 Hours'},
          {id: 12, name: '12 Hours'},
          {id: 13, name: '13 Hours'},
          {id: 14, name: '14 Hours'},
          {id: 15, name: '15 Hours'},
          {id: 16, name: '16 Hours'},
          {id: 17, name: '17 Hours'},
          {id: 18, name: '18 Hours'},
          {id: 19, name: '19 Hours'},
          {id: 20, name: '20 Hours'},
          {id: 21, name: '21 Hours'},
          {id: 22, name: '22 Hours'},
          {id: 23, name: '23 Hours'},
          {id: 24, name: '24 Hours'},
          {id: 48, name: '48 Hours'},
        ]}
      />
      <BooleanInput source="liveStreamClass"/>
      <h2>Urls should always begin with https://</h2>
      <TextInput source="liveStreamUrl"/>
      <TextInput source="liveStreamPassword"/>
      <BooleanInput source="corporate" label="Corporate Class (Universal Schedule)"/>
      <ReferenceInput label="Corporate Affiliated Class" source="corporateStudio" reference="studios" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <BooleanInput source="active"/>
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
      <CreateButton/>
    </TopToolbar>
  )
};

export const ClassesList = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<ClassesBulkActions/>}
    filters={<ClassesFilter/>}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid>
      <BooleanField source="active"/>
      <TextField source="title"/>
      <ArrayField source="category">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <ChipField source="saasCategory.name"/>
      <TextField label="Start Date" source="startDate"/>
      <TextField label="End Date" source="endDate"/>
      <TextField label="Start" source="repeat.start"/>
      <TextField label="End" source="repeat.end"/>
      <TextField label="Days" source="repeat.days"/>
      <TextField label="Repeat Finishes" source="repeat.finishes"/>
      <NumberField label="Available Spaces" source="remainingClasses"/>
      <NumberField label="Passes Cost" source="passes"/>
      <TextField source="studio"/>
      <NumberField label="Intensity (0-3)" source="intensity"/>
      <NumberField label="Enroll Restriction (hrs)" source="enrollTimeRestriction"/>
      <NumberField label="Cancel Restriction (hrs)" source="cancelTimeRestriction"/>
      <BooleanField source="liveStreamClass"/>
      <CloneButton/>
      <EditButton/>
    </Datagrid>
  </List>
);
