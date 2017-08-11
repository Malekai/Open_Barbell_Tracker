import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, Confirm, Button, CardSection } from './common';
import { addWeek, weekFetch, getUID, deleteProgram } from '../actions';
import WeekItem from './WeekItem';

class WeekList extends Component {
  state = { modalVisible: false, deleteModalVisible: false, text: '' }

  componentWillMount() {
    const { uid, name } = this.props.program;

    Actions.refresh({ title: name })

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
    this.setState({ modalVisible: false, deleteModalVisible: false, text: '' });
  }

  onAcceptDelete() {
    const { uid } = this.props.program;

    this.props.deleteProgram(uid);

    this.setState({ deleteModalVisible: false })

    Actions.ProgramList();
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
            placeholder="Week name"
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
            Are you sure you want to delete {this.props.program.name} ?
          </Text>
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

        <CardSection>
          <Button 
            onPress={() => this.setState({ deleteModalVisible: !this.state.modalVisible })} 
            altTextStyle={textStyle} 
            altButtonStyle={buttonStyle}
          >
            Delete {this.props.program.name}
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

export default connect(mapStateToProps, { addWeek, weekFetch, getUID, deleteProgram })(WeekList);
