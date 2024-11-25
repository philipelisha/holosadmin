import React from 'react';
import {BooleanInput, DateTimeInput, FormDataConsumer, SelectArrayInput,} from 'react-admin';
import {TimeInput} from './date-time-input';

export const SelectClassTime = () => (
  <div style={{marginTop: '20px'}}>
    <BooleanInput label="Repeating Class" source="isRepeat"/>
    <FormDataConsumer>
      {({formData, ...rest}) => formData && formData.isRepeat ? <div style={{padding: '15px', background: '#d9d7d7'}}>
        <TimeInput label="Start" source="repeat.start" options={{format: 'HH:mm'}}/>
        <TimeInput label="End" source="repeat.end" options={{format: 'HH:mm'}}/>
        <SelectArrayInput source="repeat.days" label="Repeat days" style={{width: '200px'}} optionText="name" choices={[
          {id: 'M', name: 'Monday'},
          {id: 'Tues', name: 'Tuesday'},
          {id: 'W', name: 'Wednesday'},
          {id: 'Thurs', name: 'Thursday'},
          {id: 'F', name: 'Friday'},
          {id: 'Sat', name: 'Saturday'},
          {id: 'Sun', name: 'Sunday'}
        ]}/>
        <div>
          <DateTimeInput label="Repeat Finishes" source="repeat.finishes"/>
        </div>
      </div> : <div style={{padding: '15px', background: '#d9d7d7'}}>
        <DateTimeInput label="Start" source="startDate"/>
        <DateTimeInput label="End" source="endDate"/>
      </div>}
    </FormDataConsumer>
  </div>
);
