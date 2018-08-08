/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, TextInput, Button, StyleSheet, Text, View, FlatList } from 'react-native';

const Realm = require('realm');

export default class App extends Component {

  constructor(props) {
    super(props);

    // realm = new Realm({
    //   schema: [{
    //     name: 'Dog',
    //     properties:
    //     {
    //       id: { type: 'int', default: 0 },
    //       name: 'string'
    //     }
    //   }],
    //   schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     // only apply this change if upgrading to schemaVersion 1
    //     if (oldRealm.schemaVersion < 1) {
    //       const oldObjects = oldRealm.objects('Dog');
    //       const newObjects = newRealm.objects('Dog');

    //       // loop through all objects and set the name property in the new schema
    //       for (let i = 0; i < oldObjects.length; i++) {
    //         newObjects[i].id = i;
    //       }
    //     }
    //   }
    // });

    realm = new Realm({
      schema: [{
        name: 'Dog',
        properties:
        {
          id: { type: 'int', default: 0 },
          name: 'string',
          name1: 'string',
          name2: 'string',
          name3: 'string',
        }
      }]
    });

    this.state = { realm: null, text: '', rows: [] };
  }

  // componentWillMount() {
  //   // Realm.open({
  //   //   schema: [{ name: 'Dog', properties: { name: 'string' } }]
  //   // }).then(realm => {
  //   //   realm.write(() => {
  //   //     realm.create('Dog', { name: 'Rex' });
  //   //   });
  //   //   this.setState({ realm });
  //   // });

  //   realm.write(() => {
  //     realm.create('Dog', { name: 'Rex', name1: 'Rex1', name2: 'Rex2', name3: 'Rex3' });
  //   });
  // }


  addRow = () => {
    if (this.state.text != null && this.state.text != '') {
      var ID = realm.objects('Dog').length + 1;
      realm.write(() => {
        realm.create('Dog', {
          id: ID, name: this.state.text,
          name1: this.state.text,
          name2: this.state.text,
          name3: this.state.text
        });
      });
      this.setState(realm)
    } else {
      Alert.alert("", "Please enter Text", null, { cancelable: false });
    }
  }

  deleteAll = () => {
    realm.write(() => {
      realm.deleteAll();
    });
    this.setState(realm)
  }

  showAll = () => {
    this.setState({
      rows: realm.objects('Dog')
    })
  }


  render() {

    const info = realm
      ? 'Number of dogs in this Realm: ' + realm.objects('Dog').length
      : 'Loading...';
    // const cars = this.state.realm.objects('Dog');

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
        <TextInput
          style={{
            marginBottom: 10, height: 40, width: '80%',
            backgroundColor: 'gray', color: 'white'
          }}
          placeholder="Type here to Add!"
          onChangeText={(text) => this.setState({ text })}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ margin: 10 }}>
            <Button onPress={this.addRow} title="Add"></Button>
          </View>

          <View style={{ margin: 10 }}>
            <Button onPress={this.deleteAll} title="Delete All"></Button>
          </View>

          <View style={{ margin: 10 }}>
            <Button onPress={this.showAll} title="Show All"></Button>
          </View>

        </View>

        <FlatList
          data={this.state.rows}
          renderItem={({ item }) => <Text style={styles.item}>{item.id + " , " + item.name + " , " + item.name1 + " , " + item.name2 + " , " + item.name3}</Text>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }, item: {
    textAlign: 'left',
    color: '#000000',
    padding: 10,
  },
});
