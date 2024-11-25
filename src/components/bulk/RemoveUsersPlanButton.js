import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {RemoveCircle} from '@material-ui/icons';

class RemoveUsersPlanButton extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {updatingPlan: true, removePlan: true}, basePath);
  };

  render() {
    return (
      <Button label="Cancel Users' Plans - Will also cancel in stripe (won't do apple pay)"
              onClick={this.handleClick}><RemoveCircle/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(RemoveUsersPlanButton);
