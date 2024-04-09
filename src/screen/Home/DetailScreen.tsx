import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../../context/CartContext";
import { Product } from "../../Type";
import { useToast } from "../../utils/ToastContext";




const DetailScreen: React.FC<{ route: { params: { product: Product } }, navigation: any }> = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { showToast } = useToast();



  const handleAddToCart = () => {
    addToCart(product);
    showToast("Product added to cart");


  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {product.discountPercentage > 0 && (
        <Text style={styles.discount}>Save {product.discountPercentage}%</Text>
      )}
      {product.isNewProduct && <Text style={styles.newProduct}>New!</Text>}
    </View>
    <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.detailsContainer}>
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemName}>{product.name}</Text>
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.priceContainer}>
        {product.originalPrice > 0 && (
          <Text style={styles.discountedPrice}>Was ${product.originalPrice}</Text>
        )}
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <Text style={styles.stock}>In stock: {product.stockQuantity}</Text>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.title}>Ingredients:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ingredientsContainer}>
          {product.ingredients.map((ingredient, index) => (
            <TouchableOpacity key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.title}>Serving Size:</Text>
        <Text style={styles.content}>{product.servingSize}</Text>
        <Text style={styles.title}>Calories:</Text>
        <Text style={styles.content}>{product.calories}</Text>
        <Text style={styles.title}>Cooking Instructions:</Text>
        <Text style={styles.content}>{product.cookingInstructions}</Text>
        <Text style={styles.title}>Dietary Restrictions:</Text>
        <Text style={styles.content}>{product.dietaryRestrictions.join(', ')}</Text>
      </View>
      <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  discount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  newProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 100, // Making the image circular
  },
  detailsContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F9FAFB', // Background color for each item
    borderRadius: 10, // Adding border radius
    padding: 20,
  },
  itemNameContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Border color for item name container
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  discountedPrice: {
    textDecorationLine: 'line-through',
    marginRight: 10,
    color: '#999999',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  stock: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  additionalInfoContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  ingredientItem: {
    backgroundColor: '#E5E7EB', // Background color for each ingredient item
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
});

export default DetailScreen;
