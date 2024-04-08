import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

interface CategoryProps {
  item: { name: string };
  onPress: (title: string) => void;
  selected: string;
}

const Category: React.FC<CategoryProps> = ({ item, onPress, selected }) => {
  // Animated value for scaling animation
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  // Function to handle press
  const handlePress = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 50, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 50, useNativeDriver: true }),
    ]).start();
    
    // Execute onPress function
    onPress(item.name);
  };

  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        { backgroundColor: item.name === selected ? "#8A2BE2" : "#F5F5F5" },
        { borderWidth: item.name === selected ? 0 : 2, borderColor: "#8A2BE2" },
      ]}
      onPress={handlePress}
    >
      <Animated.Text
        style={[
          styles.categoryText,
          { color: item.name === selected ? "#FFFFFF" : "#333333" },
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        {item.name}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
 marginHorizontal: 3,
    borderRadius: 5,

   
    
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Category;
