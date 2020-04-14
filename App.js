import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Button, TextInput, ActivityIndicator, Image, FlatList } from 'react-native';
import {Card, CardItem} from 'native-base'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount() {
    this.getAllUsers();
  }

  //API Call to fetch data
  getAllUsers = () => {
    return (
      fetch("https://randomuser.me/api/?results=50") 
        .then(response => response.json()) //Converting response into JSON
        .then(responseJSON => {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseJSON.results) //Adding/merging data into array
          })
          console.log(this.state.dataSource)
        })
      .catch((error) => {console.log(error)})
    )
  }
  
  render() {
    if (this.state.isLoading === true)
    {
      return (
        <View style={ styles.containerView}>
            <ActivityIndicator size="large" color="lightgreen" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.containerView}>
          <Text style={{fontSize: 50, alignSelf:'center', marginBottom:10}}> User API </Text>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={item => item.email}
            renderItem={({ item }) => (
              <Card>
                <CardItem>
                  <View style={{alignItems:'stretch'}}>
                    <Image
                      source={{ uri: item.picture.medium }}
                      style={styles.profilepic}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={{fontSize: 25}}>
                      {item.name.first} {item.name.last}
                    </Text>
                    <Text style={{fontSize: 18, color:'gray'}}>
                      {item.email} {item.phone}
                    </Text>
                  </View>
                </CardItem>
              </Card>
            )}
          />
        </View>
      );
    }}
}
  
const styles = StyleSheet.create(
{
    containerView:
    {
      flex: 1,
      justifyContent: 'center',
      marginTop: 80
    },
    profilepic:
    {
      flex:2,
      height: 100,
      width: 100,
      marginEnd: 10,
      borderRadius: 100
    },
    userInfo:
    {
      flex: 5,
      flexDirection: 'column'
    }
});