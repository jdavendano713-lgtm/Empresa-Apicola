import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HivesStack from './HivesStack';
import TechniciansScreen from '../screens/TechniciansScreen';
import { RootTabParamList } from '../types/navigation';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabBarStyle = { backgroundColor: COLORS.surface, borderTopColor: COLORS.border };
const headerStyle = { backgroundColor: COLORS.primary };

const RootTabs: React.FC = () => {
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