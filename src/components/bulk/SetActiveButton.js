import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {Visibility} from '@material-ui/icons';

class SetInactiveButton extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {active: true}, basePath);
  };

  render() {
    return (
      <Button label={this.props.label || "Make Classes Active"} onClick={this.handleClick}><Visibility/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(SetInactiveButton);
