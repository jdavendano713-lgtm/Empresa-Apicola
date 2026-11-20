import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import { MainTabParamList, RootStackParamList } from './types';
import { useSavedStore, SavedState } from '../stores/savedStore';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const headerStyle = { backgroundColor: COLORS.primary };

const MainTabsNavigator: React.FC = () => {
  const savedCount = useSavedStore((state: SavedState) => state.savedItems.length);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.textSecondary,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Colmenas',
          tabBarLabel: 'Colmenas',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>🐝</Text>,
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          title: 'Guardados',
          tabBarLabel: 'Guardados',
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 16 }}>⭐</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTintColor: COLORS.textPrimary,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.itemName })}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nueva colmena' }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={({ route }) => ({ title: `Editar · ${route.params.itemName}` })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;