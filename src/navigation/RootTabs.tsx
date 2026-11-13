import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HivesStack from './HivesStack';
import TechniciansScreen from '../screens/TechniciansScreen';
import SavedScreen from '../screens/SavedScreen';
import { useSavedStore } from '../stores/savedStore';
import { RootTabParamList } from '../types/navigation';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabBarStyle = { backgroundColor: COLORS.surface, borderTopColor: COLORS.border };
const headerStyle = { backgroundColor: COLORS.primary };
const tabBarBadgeStyle = { backgroundColor: COLORS.primaryDark };

const RootTabs: React.FC = () => {
  const savedCount = useSavedStore((state) => state.savedItems.length);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle,
      }}
    >
      <Tab.Screen
        name="HivesTab"
        component={HivesStack}
        options={{
          title: 'Colmenas',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          title: 'Guardados',
          headerStyle,
          headerTintColor: COLORS.textPrimary,
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TechniciansTab"
        component={TechniciansScreen}
        options={{
          title: 'Técnicos',
          headerStyle,
          headerTintColor: COLORS.textPrimary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;