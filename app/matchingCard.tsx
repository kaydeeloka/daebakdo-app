import {Button, Pressable, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

interface Match{
  country: string;
  capital: string;
}

const preMatchedData = [
  {country: "Malaysia", capital: "Kuala Lumpur"},
  {country: "Indonesia", capital: "Jakarta"},
  {country: "Singapore", capital: "Singapore"},
  {country: "Thailand", capital: "Bangkok"},
];

const shuffleArray = (matchingData: Match[]) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};


const matchCard = () => {
  const [shuffledMatchData, setShuffledMatchData] = useState<Match[]>(preMatchedData);
  const [pairedData, setPairedData] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  
  useEffect(() => {
    setShuffledMatchData(shuffleArray(preMatchedData));
  }, []);


  //compare the chosen country with newly selected capital
  //triggered on the onPress() function of the capital button
  const handleCapitalClick = (match: Match) =>{
    if(match === selectedMatch){
      const newPairedMatch = [...pairedData, match];
      setPairedData(newPairedMatch);
      console.log("BERJAYAAAA");
    }
    setSelectedMatch(null);
  }

  const isMatched = (match: Match) => pairedData.some((pairedMatch) => pairedMatch === match);


  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
      <View style={{flexDirection: 'column', margin: 10}}>
        {preMatchedData.map((match, index) => (
          
          <View style={{ borderRadius: 8, padding: 8, marginBottom: 10}}>
            <TouchableOpacity style={isMatched(match) ? styles.matchingCardSuccess : styles.matchingCard}
            key={index} onPressOut={() => setSelectedMatch(match)}>
              <Text>{match.country}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{flexDirection: 'column', margin: 10}}>
        {shuffledMatchData?.map((match, index) => (
          <View style={{borderRadius: 8, padding: 8, marginBottom: 10}}>
            <TouchableOpacity style={isMatched(match)? styles.matchingCardSuccess: styles.matchingCard}
                key={index} onPressOut={() => handleCapitalClick(match)}>
              <Text>{match.capital}</Text>
            </TouchableOpacity>
          </View>
          
        ))}
      </View>
    </View>
  )
}

export default matchCard;


const styles = StyleSheet.create({
  matchingCard: {
    backgroundColor: '#7c7373',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  matchingCardSuccess: {
    backgroundColor: '#5ce265',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});