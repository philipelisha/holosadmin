import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {Check} from '@material-ui/icons';

class MarkAsVerifiedButton extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {attended: true}, basePath);
  };

  render() {
    return (
      <Button label="Mark User Class As Attended" onClick={this.handleClick}><Check/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(MarkAsVerifiedButton);
