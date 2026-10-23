import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  HivesList: undefined;
  HiveDetail: { hiveId: string };
};

export type RootTabParamList = {
  HivesTab: NavigatorScreenParams<RootStackParamList>;
  TechniciansTab: undefined;
};