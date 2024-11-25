import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';

const SimpleDialog = (props) => {
  const isNotSendDate = new Date().getDate() !== '20';
  const {onClose, open} = props;
  const [acceptWarning, setAcceptWarning] = React.useState(!isNotSendDate);
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const sendEmails = async () => {
    setLoading(true)
    const response = await fetch('/admin/studioBilling', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setResponse(json);
    setLoading(false)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Partner Billing Emails</DialogTitle>
      <DialogContent>
        {isNotSendDate && <div>
          <FormControlLabel
            control={<Checkbox
              style={{
                maxWidth: '30px',
                maxHeight: '30px',
                minWidth: '30px',
                minHeight: '30px',
                marginTop: '0px',
                marginBottom: '0px'
              }}
              checked={acceptWarning}
              onChange={() => setAcceptWarning(!acceptWarning)}
              disabled={loading}
              inputProps={{'aria-label': 'controlled'}}
            />}
            label="The date is not the 20th of the month are you sure you want to procede?"
          />
        </div>}
        <div style={{margin: '20px auto', textAlign: 'center'}}>
          <Button color="primary" variant="contained" onClick={sendEmails}
                  disabled={loading || !acceptWarning}>Confirm Send The
            Emails</Button>
        </div>
        {loading && <div style={{margin: '20px auto', textAlign: 'center'}}>
          <CircularProgress/></div>}
        <h4>Response:</h4>
        {!loading && response &&
          <div><code>{JSON.stringify(response)}</code></div>}
      </DialogContent>
    </Dialog>
  );
}

const SimpleDialogResetUserPlans = (props) => {
  const {onClose, open} = props;
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const send = async () => {
    setLoading(true)
    const response = await fetch('/admin/resetUserPlans', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setResponse(json);
    setLoading(false)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Reset User Plans</DialogTitle>
      <DialogContent>
        <div style={{margin: '20px auto', textAlign: 'center'}}>
          <Button color="primary" variant="contained" onClick={send}
                  disabled={loading}>Confirm</Button>
        </div>
        {loading && <div style={{margin: '20px auto', textAlign: 'center'}}>
          <CircularProgress/></div>}
        <h4>Response:</h4>
        {!loading && response &&
          <div><code>{JSON.stringify(response)}</code></div>}
      </DialogContent>
    </Dialog>
  );
}

const SimpleDialogResetMultiMonthUsers = (props) => {
  const {onClose, open} = props;
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const send = async () => {
    setLoading(true)
    const response = await fetch('/admin/resetMultiMonthUserPlans', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setResponse(json);
    setLoading(false)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Reset Multi Month User Plans</DialogTitle>
      <DialogContent>
        <div style={{margin: '20px auto', textAlign: 'center'}}>
          <Button color="primary" variant="contained" onClick={send}
                  disabled={loading}>Confirm</Button>
        </div>
        {loading && <div style={{margin: '20px auto', textAlign: 'center'}}>
          <CircularProgress/></div>}
        <h4>Response:</h4>
        {!loading && response &&
          <div><code>{JSON.stringify(response)}</code></div>}
      </DialogContent>
    </Dialog>
  );
}

const SimpleDialogYearEndReview = (props) => {
  const {onClose, open, yearEndReviewSingle} = props;
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [response, setResponse] = React.useState({});

  const sendEmails = async () => {
    setLoading(true)
    if (yearEndReviewSingle && !email) {
      return alert('Email required');
    }
    const response = await fetch('/admin/yearEndReview', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });
    const json = await response.json();
    setResponse(json);
    setLoading(false)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Year End Review Emails</DialogTitle>
      <DialogContent>
        <div style={{margin: '20px auto', textAlign: 'center'}}>
          {yearEndReviewSingle && <div style={{paddding: '20px 0'}}>
            <input
            type="text"
            style={{
              margin: "20px 0",
              border: "1px solid #999999",
              font: "inherit",
              width: "100%",
              height: "1.1876em",
              display: "block",
              padding: "10px",
              minWidth: "0",
              background: "none",
              boxSizing: "content-box",
              animationName: "mui-auto-fill-cancel",
              letterSpacing: "inherit",
              animationDuration: "10ms"
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <h3>This will send even if the user has already received this years review</h3>
          </div>}
          <Button color="primary" variant="contained" onClick={sendEmails}
                  disabled={loading}>Confirm Send The
            Emails</Button>
        </div>
        {loading && <div style={{margin: '20px auto', textAlign: 'center'}}>
          <CircularProgress/></div>}
        <h4>Response:</h4>
        {!loading && response &&
          <div><code>{JSON.stringify(response)}</code></div>}
      </DialogContent>
    </Dialog>
  );
}

const BasicTable = ({selectionRange, handleSelect, loading, rows}) => {
  return (
    <div>
      <DateRangePicker
        ranges={selectionRange}
        onChange={handleSelect}
      />
      {loading && <div style={{margin: '20px auto', textAlign: 'center'}}>
        <CircularProgress/></div>}
      {!loading && <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Number of Activities</TableCell>
              <TableCell align="right">Number of Minutes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.minutes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  );
}

function createData(
  name,
  count,
  minutes,
) {
  return {name, count, minutes};
}

export default () => {
  const today = new Date();
  const startOfMonth = new Date();
  const [open, setOpen] = React.useState(false);
  const [openYearEnd, setOpenYearEnd] = React.useState(false);
  const [openResetUserPlans, setOpenResetUserPlans] = React.useState(false);
  const [openResetMultiMonthUsers, setOpenResetMultiMonthUsers] = React.useState(false);
  const [yearEndReviewSingle, setYearEndReviewSingle] = React.useState(false);
  const [state, setState] = React.useState([
    {
      startDate: new Date(startOfMonth.setDate(1)),
      endDate: today,
      key: 'selection'
    }
  ]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchDate = () => {
    const filters = state[0];
    const {startDate, endDate} = filters;
    if ( !endDate || startDate.getTime() === endDate.getTime()) return;

    setLoading(true);
    setTimeout(() => {
      const selection = state[0];
      console.log(selection);
      // TODO run fetch call to retrieve the data and then set it
      setRows([
        createData('On Demand', 159, 24),
        createData('In Person', 237, 37),
        createData('Online', 262, 24),
        createData('Specialists', 305, 67),
        createData('Other', 356, 49),
        createData('Total', 356, 49),
      ])
      setLoading(false);
    }, 3000)
  };

  React.useEffect(() => {
    fetchDate();
  }, [state]);

  return (
    <Card>
      <Title title="Welocome Holer Admin"/>
      <CardContent>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Executive Summary
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <BasicTable
              loading={loading}
              handleSelect={(item) => {
                setState([item.selection]);
              }}
              rows={rows}
              selectionRange={state}
            />
          </div>
        </div>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Send the partner billing emails
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <Button variant="contained"
                    onClick={() => setOpen(!open)}>Send</Button>
          </div>
        </div>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Send the year end review emails
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <Button variant="contained"
                    onClick={() => {
                      setOpenYearEnd(!openYearEnd)
                      setYearEndReviewSingle(false)
                    }}>Send</Button>
          </div>
        </div>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Send the year end review email to ONE user
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <Button variant="contained"
                    onClick={() => {
                      setOpenYearEnd(!openYearEnd)
                      setYearEndReviewSingle(true)
                    }}>Send</Button>
          </div>
        </div>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Reset the user plans
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <Button variant="contained"
                    onClick={() => {
                      setOpenResetUserPlans(true)
                    }}>Send</Button>
          </div>
        </div>
        <div>
          <Typography variant="h5" component="h5" textAlign="center">
            Reset the Multi Month User Plans
          </Typography>
          <div style={{marginTop: '1.5em'}}>
            <Button variant="contained"
                    onClick={() => {
                      setOpenResetMultiMonthUsers(true)
                    }}>Send</Button>
          </div>
        </div>
        <SimpleDialog
          open={open}
          onClose={() => setOpen(!open)}
        />
        <SimpleDialogYearEndReview
          open={openYearEnd}
          yearEndReviewSingle={yearEndReviewSingle}
          onClose={() => setOpenYearEnd(!openYearEnd)}
        />
        <SimpleDialogResetUserPlans
          open={openResetUserPlans}
          onClose={() => setOpenResetUserPlans(!openResetUserPlans)}
        />
        <SimpleDialogResetMultiMonthUsers
          open={openResetMultiMonthUsers}
          onClose={() => setOpenResetMultiMonthUsers(!openResetMultiMonthUsers)}
        />
      </CardContent>
    </Card>
  )
};
