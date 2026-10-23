import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HiveDetailScreen from '../screens/HiveDetailScreen';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const detailHeaderStyle = { backgroundColor: COLORS.primary };

const HivesStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HivesList"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HiveDetail"
        component={HiveDetailScreen}
        options={{
          title: 'Detalle de colmena',
          headerStyle: detailHeaderStyle,
          headerTintColor: COLORS.textPrimary,
        }}
      />
    </Stack.Navigator>
  );
};

export default HivesStack;