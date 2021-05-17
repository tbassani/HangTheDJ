import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const RankingScreen = props => {
  //Show Mix Title on screen header
  //Add dhare button to top right corner

  return (
    <View style={styles.mainContainer}>
      <Text>RANKING</Text>
      {/* 

        //If there is no Mix, direct the user to se main screen
        
        //Check if it is owner to display player controls
        //Ranking
          //Search input
          //Tracks

        //Suggestion, Vote and Add tracks Buttons
      */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
});
export default RankingScreen;
