import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Confirm, Button, CardSection } from './common';
import { addWeek, weekFetch, getUID } from '../actions';
import WeekItem from './WeekItem';

class WeekList extends Component {
  state = { modalVisible: false, text: '' }

  componentWillMount() {
    const { uid } = this.props.program;

    this.props.weekFetch(uid);

    this.props.getUID(uid);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ weeks }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(weeks);
  }

  renderRow(week) {
    return <WeekItem weekItem={week} />;
  }  

  onAccept(text) {
    const { uid } = this.props.program;

    this.props.addWeek(uid, this.state.text);

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
          visible={this.state.modalVisible}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          <TextInput
            style={{ flex: 1, height: 50 }}
            placeholder="Week name"
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
            Add Week
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const weeks = _.map(state.weeks, (week) => {
    return { week }
  });

  return { weeks };
}

export default connect(mapStateToProps, { addWeek, weekFetch, getUID })(WeekList);
