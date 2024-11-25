import React from 'react';
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  ExportButton,
  Filter,
  List,
  NumberField,
  NumberInput,
  Pagination,
  ReferenceArrayInput,
  ReferenceInput,
  RefreshButton,
  SaveButton,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  CreateButton,
  usePermissions
} from 'react-admin';
import moment from 'moment';

const VideoCategoryEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

export const VideoCategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name"/>
      <TextInput multiline={true} source="description"/>
      <h4>If using the AWS S3 to host the image INSTEAD OF http://cache.beholos.com/ enter the beginning of the URL
        as follows: https://image.beholos.com/fit-in/640x700/</h4>
      <TextInput source="image"/>
      <h4>Make sure this (the url of the category) matches the name e.g. Muay Thai y Box = muay-thai-y-box</h4>
      <TextInput source="slug"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const VideoCategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<VideoCategoryEditToolbar/>}>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="name"/>
      <TextInput multiline={true} source="description"/>
      <h4>If using the AWS S3 to host the image INSTEAD OF http://cache.beholos.com/ enter the beginning of the URL
        as follows: https://image.beholos.com/fit-in/640x700/</h4>
      <TextInput source="image"/>
      <h4>Make sure this (the url of the category) matches the name e.g. Muay Thai y Box = muay-thai-y-box</h4>
      <TextInput source="slug"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

export const VideoCategoryList = props => (
  <List {...props} bulkActionButtons={<div/>}>
    <Datagrid rowClick="edit">
      <TextField source="name"/>
      <TextField source="image"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);

export const VideoCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput multiline={true} source="description"/>
      <TextInput source="teacher"/>
      <NumberInput source="duration" label="Duration (minutes)"/>
      <TextInput source="youTubeUrl"/>
      <TextInput source="videoUrl"/>
      <h4>Enter the HD mp4 url from vimeo for the video following these directions: <a
        href="https://vimeo.zendesk.com/hc/en-us/articles/224823567-Direct-links-to-video-files"
        target="_blank" rel="noopener noreferrer">here.</a> This is for mobile.</h4>
      <TextInput source="mp4Url"/>
      <h4>If using the AWS S3 to host the thumbnail INSTEAD OF http://cache.beholos.com/ enter the beginning of the
        URL as follows: https://image.beholos.com/fit-in/525x240/</h4>
      <TextInput source="videoThumbnail"/>
      <ReferenceInput label="Video Category" source="category.id" reference="videocategories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <ReferenceInput label="Saas Category" source="saasCategory" reference="saas-categories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <ReferenceArrayInput label="Saas Sub Categories" source="genericCategory" reference="categories" perPage={1000}
                           sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      <ReferenceInput label="Equipment" source="equipment" reference="equipment" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectArrayInput optionText="name"/>
      </ReferenceInput>
      <ReferenceInput label="Studio" source="studio.id" reference="studioslist" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name" options={{resettable: true}}/>
      </ReferenceInput>
      <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
        {id: 0, name: 'Athlete'},
        {id: 1, name: 'High'},
        {id: 2, name: 'Medium'},
        {id: 3, name: 'Low'}
      ]}/>
      <TextInput label="Slug (optional)" source="slug"/>
      <BooleanInput source="free"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Create>
);

export const VideoEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField label="Id" source="id" InputProps={{
        readOnly: true,
      }}/>
      <TextInput source="title"/>
      <TextInput multiline={true} source="description"/>
      <TextInput source="teacher"/>
      <NumberInput source="duration" label="Duration (minutes)"/>
      <TextInput source="youTubeUrl"/>
      <TextInput source="videoUrl"/>
      <h4>Enter the HD mp4 url from vimeo for the video following these directions: <a
        href="https://vimeo.zendesk.com/hc/en-us/articles/224823567-Direct-links-to-video-files"
        target="_blank" rel="noopener noreferrer">here.</a> This is for mobile.</h4>
      <TextInput source="mp4Url"/>
      <h4>If using the AWS S3 to host the thumbnail INSTEAD OF http://cache.beholos.com/ enter the beginning of the
        URL as follows: https://image.beholos.com/fit-in/525x240/</h4>
      <TextInput source="videoThumbnail"/>
      <ReferenceInput label="Video Category" source="category.id" reference="videocategories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <ReferenceInput label="Saas Category" source="saasCategory" reference="saas-categories" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
      <ReferenceArrayInput label="Saas Sub Categories" source="genericCategory" reference="categories" perPage={1000}
                           sort={{field: 'name', order: 'ASC'}}>
        <SelectArrayInput optionText="name"/>
      </ReferenceArrayInput>
      <ReferenceInput label="Equipment" source="equipment" reference="equipment" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}} allowEmpty>
        <SelectArrayInput optionText="name"/>
      </ReferenceInput>
      <ReferenceInput label="Studio" source="studio.id" reference="studioslist" perPage={1000}
                      sort={{field: 'name', order: 'ASC'}}>
        <SelectInput optionText="name" options={{resettable: true}}/>
      </ReferenceInput>
      <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
        {id: 0, name: 'Athlete'},
        {id: 1, name: 'High'},
        {id: 2, name: 'Medium'},
        {id: 3, name: 'Low'}
      ]}/>
      <TextInput label="Slug (optional)" source="slug"/>
      <BooleanInput source="free"/>
      <BooleanInput source="active"/>
    </SimpleForm>
  </Edit>
);

const VideoFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Video Name" source="name" alwaysOn/>
  </Filter>
);

const UserVideoFilter = (props) => (
  <Filter {...props}>
    <TextInput label="User Email" source="email" alwaysOn/>
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

const ActionsVideos = ({currentSort, exporter, filterValues, resource, total}) => {
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
      <RefreshButton/>
    </TopToolbar>
  )
};

export const VideoList = props => (
  <List
    {...props}
    actions={<ActionsVideos/>}
    filters={<VideoFilter/>}
    bulkActionButtons={<div/>}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid rowClick="edit">
      <TextField source="title"/>
      <NumberField source="teacher"/>
      <NumberField source="duration"/>
      <TextField source="studio.name"/>
      <TextField source="country"/>
      <TextField source="intensity"/>
      <ChipField source="category.name" label="Video Category"/>
      <ChipField source="saasCategory.name" label="Saas Category"/>
      <ArrayField source="genericCategory" label="Saas Sub Categories">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <BooleanField source="free"/>
      <BooleanField source="active"/>
    </Datagrid>
  </List>
);

export const UserVideoList = props => (
  <List
    {...props}
    actions={<Actions/>}
    filters={<UserVideoFilter/>}
    filterDefaultValues={{
      startTime: moment().startOf('month').format('YYYY-MM-DD'),
      endTime: moment().endOf('day').format('YYYY-MM-DD')
    }}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid>
      <NumberField label="User Email" source="user.email"/>
      <TextField label="Video Title" source="video.title"/>
      <DateField source="date" locales="es-ES" showTime/>
      <NumberField label="Teacher" source="video.teacher"/>
      <TextField label="Studio" source="video.studio.name"/>
    </Datagrid>
  </List>
);
