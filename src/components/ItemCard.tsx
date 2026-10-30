import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Hive } from '../types';

interface ItemCardProps {
  item: Hive;
  onPress: (item: Hive) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.location}</Text>
        <View style={styles.footer}>
          <Text style={styles.technician}>{item.technician}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: '#FFF3C4',
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3E2A00',
  },
  subtitle: {
    fontSize: 13,
    color: '#7A6A4F',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  technician: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555555',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B87300',
  },
});

export default ItemCard;
