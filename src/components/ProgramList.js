import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ListView } from 'react-native';
import { addProgram, programFetch } from '../actions';
import { Card, Confirm, Button, CardSection } from './common';
import ListItem from './ListItem';

class ProgramList extends Component {
  state = { modalVisible: false, text: '' }

  componentWillMount() {
    this.props.programFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ programs }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(programs);
  }

  renderRow(program) {
    return <ListItem program={program} />;
  }

  onAccept(text) {
    this.props.addProgram(this.state.text);
    this.setState({ modalVisible: false, text: '' });
  }

  onDecline() {
    this.setState({ modalVisible: false, text: '' });
  }

  render() {
    return (
      <Card>    
        <Confirm
          animationType={"slide"}
          buttonName="Add"
          visible={this.state.modalVisible}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          <TextInput
            style={{ flex: 1, height: 50 }}
            placeholder="Program name"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </Confirm>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />

        <CardSection>
          <Button onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
            Add Program
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const programs = _.map(state.programs, (val, uid) => {
    return { ...val, uid }
  });

  return { programs };
}

export default connect(mapStateToProps, { addProgram, programFetch })(ProgramList);
