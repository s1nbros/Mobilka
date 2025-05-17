import AsyncStorage from '@react-native-async-storage/async-storage';

export const getXP = async (): Promise<number> => {
  const xp = await AsyncStorage.getItem('xp');
  return xp ? parseInt(xp, 10) : 0;
};

export const setXP = async (xp: number): Promise<void> => {
  await AsyncStorage.setItem('xp', xp.toString());
};

export const getStreak = async (): Promise<number> => {
  const streak = await AsyncStorage.getItem('streak');
  return streak ? parseInt(streak, 10) : 0;
};

export const setStreak = async (streak: number): Promise<void> => {
  await AsyncStorage.setItem('streak', streak.toString());
};

export const getLastActiveDate = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('lastActiveDate');
};

export const setLastActiveDate = async (date: string): Promise<void> => {
  await AsyncStorage.setItem('lastActiveDate', date);
};
