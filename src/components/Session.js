import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button } from './common';
import { sessionFetch, saveSession } from '../actions';

class Session extends Component {
  componentWillMount() {
    const { uid, name, currentWeek } = this.props;
    // Get the session from the action creator by passing the prop day and week in
    this.props.sessionFetch(uid, currentWeek, name)
    
    console.log(this.props.movements);
  }

  onButtonSave() {
    const { movement1, movement2, movement3, movement4, movement5, movement6 } = this.props.movements;
    const { uid, name, currentWeek } = this.props;  
    
    this.props.saveSession(
      movement1, 
      movement2, 
      movement3, 
      movement4, 
      movement5, 
      movement6, uid, currentWeek, name)
  }

	render() {	
    const { movement1, movement2, movement3, movement4, movement5, movement6 } = this.props.movements;
    return (
			<View>
        <CardSection>
          <Input
          placeholder="Movement 1"
          value={movement1}
          />
        </CardSection>

        <CardSection>
          <Input
          placeholder="Movement 2"
          value={movement2}
          />
        </CardSection>

        <CardSection>
          <Input
          placeholder="Movement 3"
          value={movement3}
          />
        </CardSection>

        <CardSection>
          <Input
          placeholder="Movement 4"
          value={movement4}
          />
        </CardSection>      

        <CardSection>
          <Input
          placeholder="Movement 5"
          value={movement5}
          />
        </CardSection>

        <CardSection>
          <Input
          placeholder="Movement 6"
          value={movement6}
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
  const movements = _.map(state.session, (movement) => {
    return { movement }
  });

  return { movements };
}  

export default connect(mapStateToProps, { sessionFetch, saveSession })(Session);

