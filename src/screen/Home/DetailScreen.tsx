import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../../context/CartContext';
import { Product } from '../../Type';
import { useToast } from '../../utils/ToastContext';

const DetailScreen: React.FC<{ route: { params: { product: Product } }; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Product added to cart');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
  
      <View style={styles.detailsContainer}>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName}>{product.name}</Text>
          <View style={styles.header}>
  
        <Text style={styles.stock}>In stock: {product.stockQuantity}</Text>
        {product.discountPercentage > 0 && (
          <Text style={styles.discount}>Save {product.discountPercentage}%</Text>
        )}
        {product.isNewProduct && <Text style={styles.newProduct}>New!</Text>}
      </View>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceContainer}>
          
          {product.originalPrice > 0 && (
            <Text style={styles.discountedPrice}>Was ${product.originalPrice}</Text>
          )}
          <Text style={styles.price}>
          
            ${product.price}{' '}
            {product.discountPercentage > 0 && (
              <Text style={styles.discount}>({product.discountPercentage}% off)</Text>
            )}

          </Text>
        </View>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.title}>Ingredients:</Text>
          <View style={styles.ingredientsContainer}>
            {product.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailTitle}>Serving Size:</Text>
            <Text style={styles.detailContent}>{product.servingSize}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailTitle}>Calories:</Text>
            <Text style={styles.detailContent}>{product.calories}</Text>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#8A2BE2',
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,

  },
  stock: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: '#8A2BE2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  discount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  newProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -20,
    marginHorizontal: 10,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  itemNameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
    
  },
  ingredientItem: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    color: '#FFFFFF',

  },
  ingredientText: {
    color: '#FFFFFF',
    marginRight: 5,
    fontSize: 16,



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
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  detailContent: {
    fontSize: 16,
    color: '#666666',
  },
});

export default DetailScreen;
