import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import LessonExercise from '@/components/LessonExercise';
import {
  getXP, setXP,
  getStreak, setStreak,
  getLastActiveDate, setLastActiveDate
} from '@/utils/progressStorage'; // adjust path if needed


const lessonData = {
  basics: {
    title: 'Basics',
    exercises: [
      {
        type: 'multiple-choice',
        question: 'What is "hello" in Russian?',
        correctAnswer: 'привет',
        options: ['привет', 'пока', 'спасибо', 'пожалуйста'],
      },
      {
        type: 'translation',
        question: 'Translate: "Thank you"',
        correctAnswer: 'спасибо',
        hint: 'It starts with "сп"',
      },
      {
        type: 'multiple-choice',
        question: 'What is "goodbye" in Russian?',
        correctAnswer: 'пока',
        options: ['привет', 'пока', 'спасибо', 'пожалуйста'],
      },
    ],
  },
  greetings: {
    title: 'Greetings',
    exercises: [
      {
        type: 'multiple-choice',
        question: 'How do you say "Good morning"?',
        correctAnswer: 'доброе утро',
        options: ['доброе утро', 'добрый день', 'добрый вечер', 'спокойной ночи'],
      },
      {
        type: 'translation',
        question: 'Translate: "Good evening"',
        correctAnswer: 'добрый вечер',
        hint: 'It starts with "добр"',
      },
    ],
  },
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('Lesson ID:', id);
  }, [id]);

  useEffect(() => {
    if (completed) {
      handleLessonComplete();
    }
  }, [completed]);

  const categoryId = id as string;
  const lesson = lessonData[categoryId as keyof typeof lessonData];
  const totalExercises = lesson?.exercises.length || 0;

  const handleExerciseComplete = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }

    if (currentExercise < totalExercises - 1) {
      setCurrentExercise(currentExercise + 1);
      Animated.timing(progressAnimation, {
        toValue: (currentExercise + 1) / totalExercises,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setCompleted(true);
    }
  };

  const handleContinue = () => {
    router.back();
  };

  const handleLessonComplete = async (): Promise<void> => {
    const currentXP = await getXP();
    await setXP(currentXP + 10);

    const today = new Date().toISOString().slice(0, 10); 
    const lastActive = await getLastActiveDate();

    let streak = await getStreak();
    if (lastActive === today) {
      // already counted today
    } else if (
      lastActive &&
      (new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24) === 1
    ) {
      // consecutive day
      streak += 1;
      await setStreak(streak);
    } else {

      streak = 1;
      await setStreak(streak);
    }
    await setLastActiveDate(today);
  };

  if (!lesson) {
    console.log('Lesson not found for ID:', categoryId);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (completed) {
    return (
      <View style={styles.container}>
        <View style={styles.completionContainer}>
          <Ionicons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.completionTitle}>Lesson Complete!</Text>
          <Text style={styles.completionScore}>
            Score: {score}/{totalExercises}
          </Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentExercise + 1}/{totalExercises}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            {
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <ScrollView style={styles.content}>
        <LessonExercise
          exercise={lesson.exercises[currentExercise]}
          onComplete={handleExerciseComplete}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  completionScore: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 