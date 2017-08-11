import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Input, Button, Confirm } from './common';
import { sessionUpdate, saveSession, deleteSession } from '../actions';

class Session extends Component {
  state = { deleteModalVisible: false }

  componentWillMount() {
    const { currentWeek, name } = this.props;

    Actions.refresh({ title: `${currentWeek} - ${name}` })

    _.each(this.props.session, (value, prop) => {
      this.props.sessionUpdate({ prop, value });
    });
  }

  onButtonSave() {
    const { movement1, movement2, movement3, movement4, movement5, movement6, notes, uid, currentWeek, name } = this.props;

    this.props.saveSession( movement1, movement2, movement3, movement4, movement5, movement6, notes, uid, currentWeek, name, notes);
  }

  onDecline() {
    this.setState({ modalVisible: false, deleteModalVisible: false, text: '' });
  }  

  onAcceptDelete() {
    const { uid, currentWeek, name } = this.props;

    this.props.deleteSession(uid, currentWeek, name);

    this.setState({ deleteModalVisible: false })

    Actions.pop();

  }    

	render() {	
    const { entryStyle, entryBoxStyle, textStyle, modalTextStyle, buttonStyle } = styles;

    return (
			<View>

        <Confirm
          animationType={"slide"}
          buttonName="Delete"
          visible={this.state.deleteModalVisible}
          onAccept={this.onAcceptDelete.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
          <Text style={modalTextStyle}>
            Are you sure you want to delete {this.props.currentWeek} - {this.props.name} ?
          </Text>
        </Confirm>   

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 1"
          value={this.props.movement1}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement1', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 2"
          value={this.props.movement2}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement2', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 3"
          value={this.props.movement3}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement3', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 4"
          value={this.props.movement4}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement4', value })}
          />
        </CardSection>      

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 5"
          value={this.props.movement5}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement5', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={entryStyle}
          boxStyle={entryBoxStyle}
          placeholder="Movement 6"
          value={this.props.movement6}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement6', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25, fontSize: 15 }}
          boxStyle={{ height: 150, paddingTop: 5 }}
          multiline={true}
          placeholder="Notes"
          value={this.props.notes}
          onChangeText={value => this.props.sessionUpdate( { prop: 'notes', value })}
          />
        </CardSection>

        <CardSection>
          	<Button onPress={this.onButtonSave.bind(this)}>
            	Save
          	</Button>
        </CardSection>		

        <CardSection>
          <Button 
            onPress={() => this.setState({ deleteModalVisible: !this.state.modalVisible })} 
            altTextStyle={textStyle} 
            altButtonStyle={buttonStyle}          
          >
            Delete {this.props.currentWeek} - {this.props.name}
          </Button>
        </CardSection>        

			</View>
		)
	}
}


const mapStateToProps = state => {
  const { 
    movement1, 
    movement2, 
    movement3, 
    movement4, 
    movement5, 
    movement6, 
    notes 
  } = state.session;

  return { 
    movement1, 
    movement2, 
    movement3, 
    movement4, 
    movement5, 
    movement6, 
    notes 
  }
}

const styles = {
  entryStyle: {
    flex: 25
  },
  entryBoxStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#007aff'    
  },
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

export default connect(mapStateToProps, { sessionUpdate, saveSession, deleteSession })(Session);

