import * as React from "react";
import { crudUpdateMany } from 'react-admin';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CakeOutlined } from "@material-ui/icons";
import DatePicker from "react-date-picker";
import { connect } from 'react-redux';

const SimpleDialog = (props) => {
  const { onClose, open, handleClick, value, onChange } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{
        background: '#ffffff',
        padding: '50px',
        width: '20vw',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div
          style={{
            paddingBottom: 300,
            height: "100%",
            width: "100%",
            boxSizing: "content-box",
            overflow: "scroll"
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <div>Please note that this will automatically cancel any user class for this studio for the holidays entered and notify the user.</div>
            </Grid>
            <Grid item xs={12}>
              <DatePicker onChange={onChange} value={value} />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained"
                onClick={onClose}>Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined"
                color="primary"
                onClick={() => handleClick()}>Update</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
}

const AddHolidaysBulkAction = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, onChange] = React.useState(new Date());

  const handleClick = async () => {
    const { basePath, crudUpdateMany, resource, selectedIds } = props;
    await crudUpdateMany(resource, selectedIds, { holiday: value }, basePath);
    setOpen(!open)
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)}><CakeOutlined /> Add
        holidays</Button>
      <SimpleDialog
        value={value}
        onChange={onChange}
        handleClick={handleClick}
        open={open}
        onClose={() => setOpen(!open)}
      />
    </div>
  )
};

export default connect(null, {
  crudUpdateMany
})(AddHolidaysBulkAction);
