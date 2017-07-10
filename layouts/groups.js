import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';

import Card from '../components/card';
import CardData from '../data/card.json';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.groupCards = this.getGroupCards(CardData);
    this.state = {
      gridSize: this.props.gridSize
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      gridSize: newProps.gridSize
    });
  }

  getGroupCards(cardData){
    return cardData.filter(c => c.type === 'group');
  }

  changeGroup(toSlugString){
    this.props.changeGroup(toSlugString);
  }

  render() {
    let { height, width } = Dimensions.get('window');

    return (
      <View style={[styles.groupCarrier, { width: width / this.state.gridSize }]}>
        <ScrollView style={styles.groupScrollView}>
          {
            this.groupCards.map((card, i) => (
              <Card data={card} key={i} onPressFunc={this.changeGroup.bind(this)}/>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  groupCarrier: {
    height: "100%",
    backgroundColor: "#fafafa",
    borderLeftWidth: 1,
    borderLeftColor: "#f1f1f1"
  },
  groupScrollView: {
    flex: 1
  }
});
