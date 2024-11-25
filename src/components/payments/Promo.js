import React from 'react';
import {
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  Filter,
  List,
  NumberField,
  NumberInput,
  Pagination,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';

const PromoFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Code" source="promoCode" alwaysOn/>
  </Filter>
);

const optionRenderer = option => `${option.name} - ${option.cycleDuration} Month Duration`;

export const PromoCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="promoCode"/>
      <div style={{fontWeight: 'bold'}}>Enter a positive number between 1 and 100 - correlates to 1% - 100% off the
        price of a plan
      </div>
      <div style={{color: '#09DAE5'}}>To give a 'free trial' enter 100 in the below input then the length of the benefit
        in months.
      </div>
      <NumberInput label="Percentage Off" source="percentage" min="1" max="100" inputProps={{
        step: 1,
        min: 1,
        max: 100
      }}/>
      <NumberInput label="Promo Benefit Length" source="benefitLength" min="1" max="7" inputProps={{
        step: 1,
        min: 1,
        max: 7
      }}/>

      <BooleanInput label="Benefit Length is Days" source="isBenefitLengthDays"/>

      <SelectInput label="Promo code affiliation" source="promoCodeType" optionText="name" choices={[
        {id: 'rimac', name: 'Rimac'}
      ]}/>
      <NumberInput label="Amount available" source="remaining"/>
      <ReferenceArrayInput
        label="Excluded Plans"
        source="excludedPlans"
        reference="plans"
      >
        <SelectArrayInput optionText={optionRenderer}/>
      </ReferenceArrayInput>
      <BooleanInput source="firstTimeUsersOnly"/>
    </SimpleForm>
  </Create>
);

export const PromoEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextField label="Id" source="id" inputProps={{
        readOnly: true,
      }}/>
      <TextField source="promoCode" inputProps={{
        readOnly: true,
      }}/>
      <TextField label="Percentage Off" source="percentage" inputProps={{
        readOnly: true,
      }}/>
      <SelectInput label="Promo code affiliation" source="promoCodeType" optionText="name" choices={[
        {id: 'rimac', name: 'Rimac'}
      ]}/>
      <TextField label="Amount available" source="remaining" inputProps={{
        readOnly: true,
      }}/>
      <ReferenceArrayInput
        label="Excluded Plans"
        source="excludedPlans"
        reference="plans"
      >
        <SelectArrayInput optionText={optionRenderer}/>
      </ReferenceArrayInput>
      <BooleanInput source="firstTimeUsersOnly"/>
    </SimpleForm>
  </Edit>
);

export const PromoList = props => (
  <List
    {...props}
    filters={<PromoFilter/>}
    pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100, 500]} {...props} />}>
    <Datagrid rowClick="edit">
      <TextField source="promoCode"/>
      <NumberField label="Percentage Off" source="percentage"/>
      <NumberField source="benefitLength"/>
      <NumberField source="excludedPlanNumber"/>
      <TextField label="Promo code affiliation" source="promoCodeType"/>
      <NumberField source="remaining"/>
    </Datagrid>
  </List>
);
