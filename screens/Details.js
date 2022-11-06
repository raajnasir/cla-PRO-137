import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details : {},
            imagePath : "",
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
        "planet_name"
      )}`
     };
   }

    componentDidMount() {
        this.getDetails();
    }
    getDtails = () => {
        const { url } = this.state;
        axios
        .get(url)
        .then(response => {
            this.setDetails(response.data.data);
        })
        .catch(error =>{
            Alert.alert(error.message);
        });
    };

    setDetails = starDetails => {
        const starType = starDetails.star_type;
        let imagePath = "";

        this.setState({
            details : starDetails,
            imagePath : imagePath 
        });
    };

    render(){
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={StyleSheet.container}>
                    <Card
                        title={details.name}
                        image={imagePath}
                        imageProps={{ resizeMode: "contain", width: "100%" }}>
                            <View>
                                <Text style={StyleSheet.cardItem}>
                                    {`Distance : ${details.distance}`} </Text>
                                <Text style={StyleSheet.cardItem}>
                                    {`Mass : ${details.mass}`}</Text>
                                <Text style={StyleSheet.cardItem}>
                                    {`Radius : ${details.radius}`}</Text>
                                <Text style={StyleSheet.cardItem}>
                                    {`Luminosity : ${details.luminosity}`}</Text>            
                            </View>
                            <View style={[styles.cardItem, { flexDirection: "column" }]}>
                                <Text>
                                    {details.specifications ? `Specifications : ` : ""}</Text>
                                    {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}</Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});