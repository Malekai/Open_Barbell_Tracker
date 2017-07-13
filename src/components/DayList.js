import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Confirm, Button, CardSection } from './common';
import { addDay, dayFetch, getCurrentWeek } from '../actions';
import DayItem from './DayItem';

class DayList extends Component {
  state = { modalVisible: false, text: '' }

  componentWillMount() {
    const { uid, name } = this.props;

    this.props.dayFetch(uid, name);

    this.props.getCurrentWeek(name);

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ days }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(days);
  }

  renderRow(day) {
    return <DayItem dayItem={day} />;
  }  

  onAccept(text) {
    const { uid, name } = this.props;

    this.props.addDay(uid, name, this.state.text);

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
            placeholder="Day name"
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
            Add Session
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const days = _.map(state.days, (day) => {
    return { day }
  });

  return { days };
}

export default connect(mapStateToProps, { addDay, dayFetch, getCurrentWeek })(DayList);
