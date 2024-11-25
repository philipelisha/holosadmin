import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import {BooleanInput, DateInput, FormDataConsumer, ReferenceInput, SelectInput, TextInput,} from 'react-admin';

const optionRenderer = option => `${option.name} - ${option.cycleDuration} Month Duration`;
export const UserUpdatePlan = () => (
  <div style={{marginTop: '20px'}}>
    <FormDataConsumer>
      {({formData, ...rest}) => formData && <div>
        <br/>
        <h4>You can only do one of the following options.</h4>
        <hr/>
        <br/>
        <BooleanInput options={{disabled: formData.freezing || formData.extending}} label="Updating user's plan?"
                      source="updatingPlan"/>
        {formData.updatingPlan && <div style={{padding: '15px', background: '#ededed'}}>
          <ReferenceInput
            label="Plan"
            name="plan"
            source="plan"
            reference="plans"
          >
            <SelectInput optionText={optionRenderer}/>
          </ReferenceInput>
          <FormGroup row>
            <BooleanInput label="Light User" source="lightUser"/>
          </FormGroup>
          <FormGroup row>
            <BooleanInput label="Send Email" source="sendEmail"/>
          </FormGroup>
          <FormGroup row>
            <BooleanInput label="Manual Payment" source="isManualPayment"/>
          </FormGroup>
          <FormGroup row>
            <TextInput multiline={true} label="Promo Price or Shared Pass User" source="promoPrice"/>
          </FormGroup>
          {formData.sendEmail && <SelectInput source="emailType" optionText="name" choices={[
            {id: 'free', name: 'Regular Plan Email'},
            {id: 'shared', name: 'Shared Pass Email'},
            {id: 'trial', name: 'Three Plan Trial Email'},
            {id: 'rimac', name: 'Rimac Three Plan Trial Email'},
            {id: 'valentine', name: 'Valentine Single Pass Email'},
            {id: 'pacifico', name: 'Pacifico Email'},
          ]}/>}
        </div>}
        <br/>
        <hr/>
        <br/>
        <BooleanInput options={{disabled: formData.updatingPlan || formData.extending}} label="Freezing user?"
                      source="freezing"/>
        {!formData.updatingPlan && formData.freezing && !formData.extending &&
        <div style={{padding: '15px', background: '#ededed'}}>
          <div>
            <small>This will give the user a freeze for these dates and send an email to the user. Only for users with
              an active plan (kushki or manual).
            </small>
          </div>
          <DateInput
            source="start"
            label="Start"
            options={{format: 'dd/MM/YYYY'}}
          />
          <DateInput
            source="end"
            label="End"
            options={{format: 'dd/MM/YYYY'}}
          />
        </div>}
        <br/>
        <hr/>
        <br/>
        <BooleanInput options={{disabled: formData.updatingPlan || formData.freezing}} label="Extending user?"
                      source="extending"/>
        {!formData.updatingPlan && !formData.freezing && formData.extending &&
        <div style={{padding: '15px', background: '#ededed'}}>
          <div>
            <small>This will extend a user, no matter if they are a manual user, cancelled user or kushki user.</small>
          </div>
          <DateInput
            source="cycleEnd"
            label="Cycle End Date"
            options={{format: 'dd/MM/YYYY'}}
          />
        </div>}
      </div>}
    </FormDataConsumer>
  </div>
);
