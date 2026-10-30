import React from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ItemCard from '../components/ItemCard';
import { hives } from '../data/mockData';
import { Hive } from '../types';

const HomeScreen: React.FC = () => {
  const handlePress = (item: Hive): void => {
    Alert.alert(item.name, `${item.location}\nEstado: ${item.status}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐝 Empresa Apícola</Text>
        <Text style={styles.headerSubtitle}>Colmenas registradas</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {hives.map((hive) => (
          <ItemCard key={hive.id} item={hive} onPress={handlePress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    backgroundColor: '#F5B700',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2A00',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#5C4300',
  },
  list: {
    padding: 16,
  },
});

export default HomeScreen;
