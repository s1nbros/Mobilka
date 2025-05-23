import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressContextType {
  xp: number;
  streak: number;
  completedLessons: string[];
  lastCompletedDate: string | null;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getCompletedLessonsForCategory: (categoryId: string) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedXP = await AsyncStorage.getItem('xp');
      const savedStreak = await AsyncStorage.getItem('streak');
      const savedLessons = await AsyncStorage.getItem('completedLessons');
      const savedLastDate = await AsyncStorage.getItem('lastCompletedDate');

      if (savedXP) setXP(parseInt(savedXP));
      if (savedStreak) setStreak(parseInt(savedStreak));
      if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
      if (savedLastDate) setLastCompletedDate(savedLastDate);

      // Check streak
      checkStreak(savedLastDate);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const checkStreak = (lastDate: string | null) => {
    if (!lastDate) return;

    const today = new Date().toISOString().split('T')[0];
    const lastCompleted = new Date(lastDate).toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastCompleted !== today && lastCompleted !== yesterdayStr) {
      setStreak(0);
      AsyncStorage.setItem('streak', '0');
    }
  };

  const addXP = async (amount: number) => {
    const newXP = xp + amount;
    setXP(newXP);
    try {
      await AsyncStorage.setItem('xp', newXP.toString());
    } catch (error) {
      console.error('Error saving XP:', error);
    }
  };

  const completeLesson = async (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);
      
      const today = new Date().toISOString();
      setLastCompletedDate(today);

      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);

      try {
        await AsyncStorage.setItem('completedLessons', JSON.stringify(newCompletedLessons));
        await AsyncStorage.setItem('lastCompletedDate', today);
        await AsyncStorage.setItem('streak', newStreak.toString());
      } catch (error) {
        console.error('Error saving lesson completion:', error);
      }
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const getCompletedLessonsForCategory = (categoryId: string) => {
    return completedLessons.filter(lessonId => lessonId.startsWith(categoryId)).length;
  };

  return (
    <ProgressContext.Provider
      value={{
        xp,
        streak,
        completedLessons,
        lastCompletedDate,
        addXP,
        completeLesson,
        isLessonCompleted,
        getCompletedLessonsForCategory,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
