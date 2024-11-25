import React, {Component, Fragment} from 'react';
import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  Edit,
  FormDataConsumer,
  FormTab,
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
  SimpleFormIterator,
  SingleFieldList,
  TabbedForm,
  TextField,
  TextInput,
  Toolbar,
  usePermissions,
  CreateButton,
  TopToolbar,
  ExportButton
} from 'react-admin';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {useForm} from 'react-final-form';

const css = `.SortableList {
    position: relative;
    z-index: 0;
    background-color: #F3F3F3;
    border: 1px solid #EFEFEF;
    border-radius: 3px;
    outline: none;
    width: 400px;
    height: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #E0E0E0;
    list-style: none;
    padding: 0;
    margin-bottom:30px;
}
.SortableItem {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: #FFF;
    border-bottom: 1px solid #EFEFEF;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #333;
    font-weight: 500;
}
.SortableHelper {
    z-index:10;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2), 0 -5px 5px -5px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.8);
    cursor: row-resize;
}`;
const SortableItem = SortableElement(({value}) => <li className="SortableItem">{value}</li>);

const SortableList = SortableContainer(({items, lookUpValue}) => {
  return (
    <ul className="SortableList">
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={lookUpValue(value)}/>
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: this.props.list,
    videos: []
  };

  componentDidMount() {
    let head = document.head;
    let style = document.createElement('style');

    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    this.getVideos();
  }

  getVideos = async () => {
    const response = await fetch('/admin/videos?_end=1000&_order=ASC&_sort=title&_start=0', {credentials: 'include'});
    const data = await response.json();
    this.setState({videos: data});
  };

  componentDidUpdate = () => {
    if (this.props.list.length !== this.state.items.length) {
      this.setState({items: this.props.list});
    }
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }), () => this.props.saveSort(this.state.items));
  };

  lookUpValue = (value) => {
    if (this.state.videos && this.state.videos.length > 0) {
      return (this.state.videos.find(video => video.id === value)).title || value
    }

    return value;
  };

  render() {
    return <SortableList lookUpValue={this.lookUpValue} items={this.state.items} onSortEnd={this.onSortEnd}
                         helperClass="SortableHelper"/>;
  }
}

const ProgramEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton/>
  </Toolbar>
);

const AddVideoSort = ({formData, scopedFormData, ...rest}) => {
  const form = useForm();

  return (
    <Fragment>
      {scopedFormData && scopedFormData.video &&
      <div>
        <h4>Sort your videos below by dragging the names</h4>
        <SortableComponent {...rest} list={scopedFormData.video} saveSort={(sort) => {
          scopedFormData.sort = sort.toString();
          form.change('sort', '');
        }}/>
      </div>}
    </Fragment>
  );
};


export const ProgramCreate = (props) => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="name" validate={[required()]}/>
        <TextInput source="slug"/>
        <TextInput multiline={true} source="description" validate={[required()]}/>
        <TextInput source="shortDescription" validate={[required()]}/>
        <TextInput source="classLength" validate={[required()]}/>
        <TextInput source="classLengthShort"/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="bannerImage"/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="cardImage"/>
        <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
          {id: 0, name: 'Athlete'},
          {id: 1, name: 'High'},
          {id: 2, name: 'Medium'},
          {id: 3, name: 'Low'}
        ]}/>
        <ReferenceArrayInput label="Categories" source="categories" reference="videocategories" perPage={1000}
                             sort={{field: 'name', order: 'ASC'}} validate={[required()]}>
          <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <ReferenceInput label="SaasCategories" source="saasCategory" reference="saas-categories" perPage={1000}
                        sort={{field: 'name', order: 'ASC'}}>
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceArrayInput label="Equipment" source="equipment" reference="equipment" perPage={1000}
                             sort={{field: 'name', order: 'ASC'}} allowEmpty>
          <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <ReferenceInput label="Corporate Affiliated Program" source="corporateStudio" reference="studios" perPage={1000}
                        sort={{field: 'name', order: 'ASC'}}>
          <SelectInput optionText="name" options={{resettable: true}}/>
        </ReferenceInput>
        <NumberInput source="days"/>
        <BooleanInput source="free"/>
        <BooleanInput source="active"/>
      </FormTab>
      <FormTab label="Program Instructor">
        <TextInput source="instructor" validate={[required()]}/>
        <TextInput multiline={true} source="instructorDescription" validate={[required()]}/>
        <TextInput source="instructorEmail" validate={[required()]}/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="instructorImage" validate={[required()]}/>
      </FormTab>
      <FormTab label="Program Materials">
        <h4>Upload Materials to S3 or other file sharing service and enter full URL.</h4>
        <ArrayInput label="Add Program Materials"
                    source="materials">
          <SimpleFormIterator>
            <TextInput source="name" label="Name"/>
            <TextInput multiline={true} source="description" label="Description"/>
            <TextInput source="url" label="URL"/>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="Define Program">
        <h4>Select the below to add a day count to the videos. e.g. Día 1, Día 2...</h4>
        <BooleanInput source="dayCount"/>
        <ArrayInput label="Add Training weeks"
                    source="weeks">
          <SimpleFormIterator>
            <ReferenceArrayInput validate={[required()]} label="Videos" source="video" reference="videos"
                                 perPage={1000}
                                 sort={{field: 'title', order: 'ASC'}}>
              <SelectArrayInput optionText="title"/>
            </ReferenceArrayInput>
            <div style={{visibility: 'hidden', height: 0}}>
              <TextInput source="sort"/>
            </div>
            <FormDataConsumer>
              {formDataProps => (
                <AddVideoSort {...formDataProps} />
              )}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Create>
);

export const ProgramEdit = (props) => (
  <Edit {...props}>
    <TabbedForm toolbar={<ProgramEditToolbar/>}>
      <FormTab label="General">
        <TextInput source="name" validate={[required()]}/>
        <TextInput source="slug"/>
        <TextInput multiline={true} source="description" validate={[required()]}/>
        <TextInput source="shortDescription" validate={[required()]}/>
        <TextInput source="classLength" validate={[required()]}/>
        <TextInput source="classLengthShort"/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="bannerImage"/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="cardImage"/>
        <SelectInput label="Intensity" source="intensity" optionText="name" choices={[
          {id: 0, name: 'Athlete'},
          {id: 1, name: 'High'},
          {id: 2, name: 'Medium'},
          {id: 3, name: 'Low'}
        ]}/>
        <ReferenceArrayInput label="Categories" source="categories" reference="videocategories" perPage={1000}
                             sort={{field: 'name', order: 'ASC'}} validate={[required()]}>
          <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <ReferenceInput label="SaasCategories" source="saasCategory" reference="saas-categories" perPage={1000}
                        sort={{field: 'name', order: 'ASC'}}>
          <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceArrayInput label="Equipment" source="equipment" reference="equipment" perPage={1000}
                             sort={{field: 'name', order: 'ASC'}} allowEmpty>
          <SelectArrayInput optionText="name"/>
        </ReferenceArrayInput>
        <ReferenceInput label="Corporate Affiliated Program" source="corporateStudio" reference="studios" perPage={1000}
                        sort={{field: 'name', order: 'ASC'}}>
          <SelectInput optionText="name" options={{resettable: true}}/>
        </ReferenceInput>
        <NumberInput source="days"/>
        <BooleanInput source="free"/>
        <BooleanInput source="active"/>
      </FormTab>
      <FormTab label="Program Instructor">
        <TextInput source="instructor" validate={[required()]}/>
        <TextInput multiline={true} source="instructorDescription" validate={[required()]}/>
        <TextInput source="instructorEmail" validate={[required()]}/>
        <h4>Upload image to S3 and enter THE PATH ex. /img/path/to/file.jpg.</h4>
        <TextInput source="instructorImage" validate={[required()]}/>
      </FormTab>
      <FormTab label="Program Materials">
        <h4>Upload Materials to S3 or other file sharing service and enter full URL.</h4>
        <ArrayInput label="Add Program Materials"
                    source="materials">
          <SimpleFormIterator>
            <TextInput source="name" label="Name"/>
            <TextInput multiline={true} source="description" label="Description"/>
            <TextInput source="url" label="URL"/>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
      <FormTab label="Define Program">
        <h4>Select the below to add a day count to the videos. e.g. Día 1, Día 2...</h4>
        <BooleanInput source="dayCount"/>
        <ArrayInput label="Add Training weeks"
                    source="weeks">
          <SimpleFormIterator>
            <ReferenceArrayInput validate={[required()]} label="Videos" source="video" reference="videos"
                                 perPage={1000}
                                 sort={{field: 'title', order: 'ASC'}}>
              <SelectArrayInput optionText="title"/>
            </ReferenceArrayInput>
            <div style={{visibility: 'hidden', height: 0}}>
              <TextInput source="sort"/>
            </div>
            <FormDataConsumer>
              {formDataProps => (
                <AddVideoSort {...formDataProps} />
              )}
            </FormDataConsumer>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
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

export const ProgramList = props => (
  <List
    {...props}
    actions={<Actions/>}
    bulkActionButtons={<div/>}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid rowClick="edit">
      <BooleanField source="active"/>
      <BooleanField source="free"/>
      <TextField source="name"/>
      <TextField source="instructor"/>
      <NumberField label="Intensity (0-3)" source="intensity"/>
      <NumberField label="Amount of weeks" source="trainingWeeks"/>
      <NumberField label="Amount of videos" source="totalVideos"/>
      <NumberField label="Amount of materials" source="totalMaterials"/>
      <NumberField source="classLength"/>
      <ArrayField source="categories">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="equipment">
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

