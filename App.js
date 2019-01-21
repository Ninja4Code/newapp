import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Input, Card, Avatar } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class App extends Component {
  render() {
    return (
      <Card title="Stuff">
        <Text>Open up App.js to start working on your app!</Text>
        <Input 
            placeholder='BASIC INPUT'
            leftIcon={
              <FontAwesome name="heart-o" size={32} color="red" />
            }>
        </Input>
        <Avatar
          size="small"
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Ionicons 
          name="md-checkmark-circle" 
          size={32} 
          color="green" 
        />
        <FontAwesome 
          name="heart-o" 
          size={32} 
          color="red" 
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
