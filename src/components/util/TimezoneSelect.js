import React from 'react';
import {SelectInput,} from 'react-admin';
import {timeZones} from "./timeZoneList";

export const TimezoneSelect = props => (
  <SelectInput label="Select Time Zone" source="timezone" optionText="name" choices={timeZones}/>
);

