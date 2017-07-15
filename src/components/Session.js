import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button } from './common';
import { sessionUpdate, saveSession } from '../actions';

class Session extends Component {
  componentWillMount() {
    _.each(this.props.session, (value, prop) => {
      this.props.sessionUpdate({ prop, value });
    });
  }

  onButtonSave() {
    const { movement1, movement2, movement3, movement4, movement5, movement6, notes, uid, currentWeek, name } = this.props;

    this.props.saveSession( movement1, movement2, movement3, movement4, movement5, movement6, notes, uid, currentWeek, name, notes);
  }

	render() {	
    return (
			<View>
        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 1"
          value={this.props.movement1}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement1', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 2"
          value={this.props.movement2}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement2', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 3"
          value={this.props.movement3}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement3', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 4"
          value={this.props.movement4}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement4', value })}
          />
        </CardSection>      

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 5"
          value={this.props.movement5}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement5', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          placeholder="Movement 6"
          value={this.props.movement6}
          onChangeText={value => this.props.sessionUpdate( { prop: 'movement6', value })}
          />
        </CardSection>

        <CardSection>
          <Input
          entryStyle={{ flex: 25 }}
          noteStyle={{ height: 150, paddingTop: 5 }}
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


export default connect(mapStateToProps, { sessionUpdate, saveSession })(Session);

