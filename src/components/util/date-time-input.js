import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker
} from "@material-ui/pickers";
import PropTypes from "prop-types";
import {addField, FieldTitle, useTranslate} from "ra-core";
import React from "react";

const makePicker = PickerComponent => {
  const _makePicker = React.forwardRef((props, ref) => {
    const translate = useTranslate();

    const onChange = date => {
      props.input.onChange(date);
      props.input.onBlur();
    };

    const {
      input,
      options,
      label,
      source,
      resource,
      isRequired,
      className,
      meta,
      providerOptions
    } = props;

    const {touched, error} = meta;

    return (
      <div className="picker">
        <MuiPickersUtilsProvider {...providerOptions}>
          <PickerComponent
            {...options}
            label={
              <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />
            }
            error={!!(touched && error)}
            helperText={touched && translate(error)}
            ref={ref}
            className={className}
            value={input.value ? input.value : null}
            onChange={date => onChange(date)}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  });
  _makePicker.propTypes = {
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    labelTime: PropTypes.string,
    className: PropTypes.string,
    providerOptions: PropTypes.shape({
      utils: PropTypes.func,
      locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    })
  };

  _makePicker.defaultProps = {
    input: {},
    isRequired: "false",
    label: "",
    meta: {touched: false, error: false},
    options: {},
    resource: "",
    source: "",
    labelTime: "",
    className: "",
    providerOptions: {
      utils: MomentUtils,
      locale: undefined
    }
  };
  return _makePicker;
};

export const DateInput = addField(makePicker(DatePicker));
export const KeyboardDateInput = addField(makePicker(KeyboardDatePicker));
export const TimeInput = addField(makePicker(TimePicker));
export const DateTimeInput = addField(makePicker(DateTimePicker));
