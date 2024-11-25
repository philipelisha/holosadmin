import * as React from "react";
import {crudUpdateMany} from 'react-admin';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {CalendarTodayOutlined} from "@material-ui/icons"; // theme css file
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Grid from "@material-ui/core/Grid";
import {connect} from 'react-redux';

const SimpleDialog = (props) => {
  const {onClose, open, handleClick, value, onChange} = props;

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
        <div style={{overflow: "hidden", height: "100%", width: "100%"}}>
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
                <DatePicker onChange={onChange} value={value}/>
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
      </div>
    </Modal>
  );
}

const AddRepeatEndBulkAction = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, onChange] = React.useState(new Date());

  const handleClick = async () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = props;
    await crudUpdateMany(resource, selectedIds, {repeatFinishes: value}, basePath);
    setOpen(!open)
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)}><CalendarTodayOutlined/> Add repeat
        Finishes</Button>
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
})(AddRepeatEndBulkAction);
