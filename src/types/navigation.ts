import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HivesList: undefined;
  HiveDetail: { hiveId: string; hiveName: string };
};

export type RootTabParamList = {
  HivesTab: NavigatorScreenParams<HomeStackParamList>;
  SavedTab: undefined;
};