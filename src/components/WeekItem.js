import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class WeekItem extends Component {
  render() {
    const { name } = this.props.weekItem.week;
    const { uid } = this.props;

    return (
        <View>
          <CardSection>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => Actions.DayList({ uid, name })}>
              <Text style={styles.displayStyle}>
                {name}
              </Text>
            </TouchableOpacity>
          </CardSection>
        </View>
    );
  }
}

const styles = {
  displayStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
}

const mapStateToProps = state => {
  const uid = state.uid

  return { uid };
}

export default connect(mapStateToProps, null)(WeekItem);
