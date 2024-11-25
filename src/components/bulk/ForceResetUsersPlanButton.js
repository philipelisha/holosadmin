import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {RemoveCircle} from '@material-ui/icons';

class ForceResetUsersPlanButton extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {updatingPlan: true, removePlan: true, resetPlan: true}, basePath);
  };

  render() {
    return (
      <Button label="FORCE Reset Users' Plans - (for payment rejected - USE WITH CAUTION)"
              onClick={this.handleClick}><RemoveCircle/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(ForceResetUsersPlanButton);
