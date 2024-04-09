import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
let selectedRadio;

const ServiceSelectbox = ({ onUserTypeSelect }) => {
  const [selectedRadio, setSelectedRadio] = useState(null); // Initial selection

  const handleRadioPress = (value) => {
    setSelectedRadio(value);
  };

  const radioOptions = [
    { value: 'donor', label: 'Donor' },
    { value: 'receiver', label: 'Receiver' },
    { value: 'both', label: 'Both' },
  ];

  return (
    <View style={styles.maincontainer}>
      <View style={styles.radiobox}>
        {radioOptions.map((option) => (
          <Pressable
            key={option.value}
            style={styles.radioItem}
            onPress={() => {
              handleRadioPress(option.value);
              onUserTypeSelect(option.value); // Pass selected value to parent
            }}
          >
            <Text style={styles.radioLabel}>{option.label}</Text>
            <View style={styles.radioIndicatorContainer}>
              <View style={selectedRadio === option.value ? styles.radioIndicatorSelected : styles.radioIndicator} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiobox: {
    width: 310,
    height: 110,
    backgroundColor: '#DDEEEB',
    borderRadius: 11,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  radioItem: {
    flex: 1, // Equal width distribution
    alignItems: 'center',
    padding: 10, // Optional padding for better spacing
  },
  radioLabel: {
    fontSize: 16,
    fontWeight:"700",
    color:"#575757"
  },
  radioIndicatorContainer: {
    width: 17, 
    height: 17, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: '#02BF9D', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    backgroundColor:"#DDEEEB",
    marginTop:8,
  },
  radioIndicator: {
    width: 11, 
    height: 11, 
    borderRadius: 4, 
    backgroundColor: 'transparent', 
  },
  radioIndicatorSelected: {
    width: 11, 
    height: 11, 
    borderRadius: (11/2), 
    backgroundColor: '#02BF9D', 
  },
});

export default ServiceSelectbox;
export {selectedRadio};
