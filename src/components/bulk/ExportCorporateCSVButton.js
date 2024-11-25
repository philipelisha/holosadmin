import React, {Component} from 'react';
import {Button} from 'react-admin';
import {CloudDownload} from '@material-ui/icons';

class ExportCoporateCSVButton extends Component {
  handleClick = async () => {
    const {filterValues} = this.props;
    const {code} = filterValues;
    window.open(`/admin/giftCardEntriesToCSV${code ? '?code=' + code : ''}`);
  };

  render() {
    return (
      <Button label={"Export Corporate CSV"} onClick={this.handleClick}>
        <CloudDownload/>
      </Button>
    )
  }
}

export default ExportCoporateCSVButton;
