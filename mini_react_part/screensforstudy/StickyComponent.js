import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StickyComponent = () => {
  return (
    <View style={styles.stickyContainer}>
      <Text>This component stays at the top!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyContainer: {
    position: 'sticky',
    top: 100, // Adjust top position as needed
    zIndex: 10, // Ensure it stays on top of other elements
    backgroundColor: 'red', // Optional background color
    padding: 10,
  },
});

export default StickyComponent;
