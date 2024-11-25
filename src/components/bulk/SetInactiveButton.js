import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {VisibilityOff} from '@material-ui/icons';

class SetInactiveButton extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {active: false}, basePath);
  };

  render() {
    return (
      <Button label={this.props.label || "Make Classes Inactive"} onClick={this.handleClick}><VisibilityOff/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(SetInactiveButton);
