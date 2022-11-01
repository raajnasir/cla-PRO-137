import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listData: [],
        url: "http://localhost:5000/"
      };
    }

    componentDidMount(){
        this.getplanets();
        
    }
    
    getplanets = () => {
        const { url } = this.state;
        axios
          .get(url)
          .then(response => {
            return this.setState({
              listData: response.data.data
            });
          })
          .catch(error => {
            Alert.alert(error.message);
          });
  
};
renderItem = ({Item, index }) =>{
    <ListItem
    key = {index}
    title = {`planet : ${item.name}`}
    
    
    ></ListItem>
}