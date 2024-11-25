import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import {RemoveCircle} from '@material-ui/icons';

class MakeUserB2C extends Component {
  handleClick = () => {
    const {basePath, crudUpdateMany, resource, selectedIds} = this.props;
    crudUpdateMany(resource, selectedIds, {makeUserB2C: true}, basePath);
  };

  render() {
    return (
      <Button label="Make User B2C" onClick={this.handleClick}><RemoveCircle/></Button>
    )
  }
}

export default connect(null, {
  crudUpdateMany
})(MakeUserB2C);
