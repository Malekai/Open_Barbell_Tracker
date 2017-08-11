import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, Confirm, Button, CardSection } from './common';
import { addDay, dayFetch, getCurrentWeek, deleteWeek } from '../actions';
import DayItem from './DayItem';

class DayList extends Component {
  state = { modalVisible: false, deleteModalVisible: false, text: '' }

  componentWillMount() {
    const { uid, name } = this.props;

    Actions.refresh({ title: name })
    
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
    this.setState({ modalVisible: false, deleteModalVisible: false, text: '' });
  }

  onAcceptDelete() {
    const { uid, name } = this.props;

    this.props.deleteWeek(uid, name);

    this.setState({ deleteModalVisible: false })

    Actions.pop();

  }  

  render() {
    const { textStyle, modalTextStyle, buttonStyle } = styles;

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
            placeholder="Day name"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </Confirm>

        <Confirm
          animationType={"slide"}
          buttonName="Delete"
          visible={this.state.deleteModalVisible}
          onAccept={this.onAcceptDelete.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          <Text style={modalTextStyle}>
            Are you sure you want to delete {this.props.name} ?
          </Text>
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

        <CardSection>
          <Button 
            onPress={() => this.setState({ deleteModalVisible: !this.state.modalVisible })} 
            altTextStyle={textStyle} 
            altButtonStyle={buttonStyle}
          >
            Delete {this.props.name}
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

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  modalTextStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },  
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 5,
    marginRight: 5
  }  
}

export default connect(mapStateToProps, { addDay, dayFetch, getCurrentWeek, deleteWeek })(DayList);
