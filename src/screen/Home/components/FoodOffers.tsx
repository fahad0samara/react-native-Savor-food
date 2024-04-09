import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";

const foodOffers = [
  {
    id: 1,
    title: "Special Combo Meal",
    description: "Enjoy our delicious combo meal at a discounted price!",
    image: require("../../../../assets/heder1.png"),
  },
  {
    id: 2,
    title: "Family Feast Deal",
    description: "Treat your family to a hearty feast with our special offer!",
    image: require("../../../../assets/heder0.png"),
  },
];

const FoodOffers = () => {
  const renderFoodOffer = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.foodOfferCard}>
      <Image source={item.image} style={styles.foodOfferImage} />
      <View style={styles.cardContent}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <View style={styles.descriptionContainer}>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={foodOffers}
      renderItem={renderFoodOffer}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  foodOfferCard: {
    width: 290,
    height: 160,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodOfferImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    zIndex: 1,
    padding: 10,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
  },
  offerDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default FoodOffers;
