import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import axios from "axios";

import API_URL from "../../apiConfig";
import { products } from "../../Type";
import Category from "./components/Category";
import ProductsCard from "./components/ProductsCard";
import FoodOffers from "./components/FoodOffers";

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast")
  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any[]>(`${API_URL}/products/all`);
        setData(response.data);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    


  const handleCategoryPress = (title: string) => {
    setSelectedCategory(title);
  };




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 24, color: "#000000" }}>Hello, Fahad</Text>
            <Text
              style={{
                fontSize: 18,
                color: "#8A2BE2",
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              what are you what to eat today?
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <IonIcon name="notifications-outline" size={25} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Food Offers

          </Text>
          <Text style={styles.sectionSubtitle}>
            Check out the latest food offers
          </Text>

          <FoodOffers />
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <FlatList
            data={
              data
                .map((item) => item.categories.map((category: { name: string }) => category.name))
                .flat()
                .filter((value, index, self) => self.indexOf(value) === index)                  
            
            }
            renderItem={({ item }) => (
              <Category
                item={{ name: item }}
                onPress={handleCategoryPress}
                selected={selectedCategory}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        ) : error ? (
          <Text style={styles.errorText}>
            An error occurred while fetching the data. {error}.
          </Text>
        ) : (
          <View style={styles.bicycleListContainer}>
            <FlatList
                data={data.filter((item) =>
                  item.categories.some(
                    (category: { name: string }) => category.name === selectedCategory
                  )
                )}


              renderItem={({ item }) => <ProductsCard product={item} />}
              keyExtractor={(item) => item._id}
              style={styles.bicycleList}
              numColumns={2}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container1: {
    paddingHorizontal: 15,
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  titleText: {
    color: "#8A2BE2",
    fontSize: 32,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
  },

  categoriesContainer: {
    marginTop: 2,
  },
  categoriesTitle: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  categoriesList: {
    marginTop: 10,
  },
  bicycleListContainer: {
    marginTop: 20,
    flex: 1,
  },
  bicycleList: {
    marginTop: 5,
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
