import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useProgress } from '@/contexts/LessonProgressContext';

const learningData = {
  basics: {
    title: 'Basics',
    color: '#4CAF50',
    description: 'Start with Russian basics',
    levels: [
      {
        id: 'alphabet',
        title: 'Level 1',
        lessons: [
          { 
            id: 1, 
            title: 'Letters A-G', 
            description: 'Learn first letters',
            tasks: [
              {
                id: 1,
                question: 'A',
                answer: 'А',
                options: ['А', 'Б', 'В', 'Г']
              },
              {
                id: 2,
                question: 'B',
                answer: 'Б',
                options: ['А', 'Б', 'В', 'Г']
              },
              {
                id: 3,
                question: 'V',
                answer: 'В',
                options: ['В', 'Г', 'Д', 'Ж']
              }
            ]
          },
          {
            id: 2,
            title: 'Letters D-Z',
            description: 'Next set of letters',
            tasks: [
              {
                id: 1,
                question: 'D',
                answer: 'Д',
                options: ['Д', 'Е', 'Ж', 'З']
              },
              {
                id: 2,
                question: 'Z',
                answer: 'З',
                options: ['Ж', 'З', 'И', 'Й']
              }
            ]
          },
          {
            id: 3,
            title: 'Vowels',
            description: 'Russian vowel letters',
            tasks: [
              {
                id: 1,
                question: 'A',
                answer: 'А',
                options: ['А', 'Б', 'В', 'Г']
              }
            ]
          },
          {
            id: 4,
            title: 'Special Letters',
            description: 'Unique Russian characters',
            tasks: [
              {
                id: 1,
                question: 'Soft sign',
                answer: 'Ь',
                options: ['Ь', 'Ъ', 'Ы', 'Э']
              },
              {
                id: 2,
                question: 'Hard sign',
                answer: 'Ъ',
                options: ['Ъ', 'Ь', 'Ы', 'Э']
              }
            ]
          }
        ]
      }
    ]
  },
  greetings: {
    title: 'Greetings',
    color: '#2196F3',
    description: 'Common greeting phrases',
    levels: [
      {
        id: 'basic-greetings',
        title: 'Greetings Level',
        lessons: [
          {
            id: 1,
            title: 'Basic Greetings',
            description: 'Hello and goodbye phrases',
            tasks: [
              {
                id: 1,
                question: 'Hello',
                answer: 'Привет',
                options: ['Привет', 'Пока', 'Спасибо', 'Пожалуйста']
              },
              {
                id: 2,
                question: 'Good morning',
                answer: 'Доброе утро',
                options: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи']
              }
            ]
          }
        ]
      }
    ]
  },
  food: {
    title: 'Food',
    color: '#FF9800',
    description: 'Food vocabulary',
    levels: [
      {
        id: 'fruits',
        title: 'Fruits Level',
        lessons: [
          { 
            id: 1, 
            title: 'Common Fruits', 
            description: 'Learn fruit names',
            tasks: [
              {
                id: 1,
                question: 'Apple',
                answer: 'Яблоко',
                options: ['Яблоко', 'Апельсин', 'Банан', 'Груша']
              },
              {
                id: 2,
                question: 'Orange',
                answer: 'Апельсин',
                options: ['Апельсин', 'Мандарин', 'Лимон', 'Грейпфрут']
              }
            ]
          }
        ]
      }
    ]
  },
  travel: {
    title: 'Travel',
    color: '#9C27B0',
    description: 'Essential travel phrases and vocabulary',
    levels: [
      {
        id: 'basic-travel',
        title: 'Travel Basics',
        lessons: [
          {
            id: 1,
            title: 'At the Airport',
            description: 'Essential airport phrases',
            tasks: [
              {
                id: 1,
                question: 'Where is the check-in counter?',
                answer: 'Где стойка регистрации?',
                options: ['Где стойка регистрации?', 'Где выход?', 'Где туалет?', 'Где кафе?']
              },
              {
                id: 2,
                question: 'I have a connecting flight',
                answer: 'У меня стыковочный рейс',
                options: ['У меня стыковочный рейс', 'У меня билет', 'У меня багаж', 'У меня паспорт']
              },
              {
                id: 3,
                question: 'Is this the gate for flight 123?',
                answer: 'Это выход на рейс 123?',
                options: ['Это выход на рейс 123?', 'Это мой рейс?', 'Это мой билет?', 'Это мой багаж?']
              }
            ]
          },
          {
            id: 2,
            title: 'Hotel Check-in',
            description: 'Hotel vocabulary and phrases',
            tasks: [
              {
                id: 1,
                question: 'I have a reservation',
                answer: 'У меня есть бронь',
                options: ['У меня есть бронь', 'У меня есть комната', 'У меня есть ключ', 'У меня есть паспорт']
              },
              {
                id: 2,
                question: 'What time is breakfast?',
                answer: 'Во сколько завтрак?',
                options: ['Во сколько завтрак?', 'Где завтрак?', 'Когда завтрак?', 'Какой завтрак?']
              },
              {
                id: 3,
                question: 'Is there WiFi in the room?',
                answer: 'В номере есть WiFi?',
                options: ['В номере есть WiFi?', 'В номере есть телевизор?', 'В номере есть кондиционер?', 'В номере есть ванная?']
              }
            ]
          },
          {
            id: 3,
            title: 'Getting Around',
            description: 'Transportation and directions',
            tasks: [
              {
                id: 1,
                question: 'How do I get to the city center?',
                answer: 'Как добраться до центра?',
                options: ['Как добраться до центра?', 'Где центр?', 'Какой центр?', 'Когда центр?']
              },
              {
                id: 2,
                question: 'Is this the right bus?',
                answer: 'Это правильный автобус?',
                options: ['Это правильный автобус?', 'Это мой автобус?', 'Это автобус?', 'Это метро?']
              },
              {
                id: 3,
                question: 'How much is the taxi to the hotel?',
                answer: 'Сколько стоит такси до отеля?',
                options: ['Сколько стоит такси до отеля?', 'Где такси?', 'Когда такси?', 'Какой такси?']
              }
            ]
          },
          {
            id: 4,
            title: 'Sightseeing',
            description: 'Tourist attractions and activities',
            tasks: [
              {
                id: 1,
                question: 'What time does the museum open?',
                answer: 'Во сколько открывается музей?',
                options: ['Во сколько открывается музей?', 'Где музей?', 'Какой музей?', 'Когда музей?']
              },
              {
                id: 2,
                question: 'Can you take a photo of us?',
                answer: 'Можете сфотографировать нас?',
                options: ['Можете сфотографировать нас?', 'Где фото?', 'Когда фото?', 'Какой фото?']
              },
              {
                id: 3,
                question: 'What is the entrance fee?',
                answer: 'Сколько стоит вход?',
                options: ['Сколько стоит вход?', 'Где вход?', 'Когда вход?', 'Какой вход?']
              }
            ]
          }
        ]
      }
    ]
  }
};

export default function LearningScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addXP, completeLesson, isLessonCompleted } = useProgress();
  const [currentView, setCurrentView] = useState<'levels' | 'lessons' | 'tasks' | 'completion'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Get current data based on view
  const categoryId = params.id as string;
  const currentCategory = categoryId ? learningData[categoryId as keyof typeof learningData] : null;
  const currentTasks = selectedLesson?.tasks || [];
  const currentTask = currentTasks[currentTaskIndex];

  // Initialize view based on URL params
  useEffect(() => {
    console.log('Category ID:', categoryId);
    console.log('Current Category:', currentCategory);
    
    if (!categoryId || !currentCategory) {
      console.error('Invalid category:', categoryId);
      router.back();
      return;
    }
  }, [categoryId, currentCategory]);

  const handleLevelSelect = (level: any) => {
    setSelectedLevel(level);
    setCurrentView('lessons');
  };

  const handleLessonSelect = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentView('tasks');
    setCurrentTaskIndex(0);
    setSelectedOption(null);
  };

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    
    const isCorrect = option === currentTask.answer;
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentTaskIndex < currentTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setSelectedOption(null);
      } else {
        // Calculate XP based on performance
        const earned = Math.round((correctAnswers / currentTasks.length) * 10);
        setXpEarned(earned);
        addXP(earned);
        
        // Complete the lesson
        const lessonId = `${categoryId}-${selectedLevel.id}-${selectedLesson.id}`;
        completeLesson(lessonId);
        
        // Show completion screen
        setShowConfetti(true);
        setCurrentView('completion');
      }
    }, 1000);
  };

  const handleContinue = () => {
    setShowConfetti(false);
    setCurrentView('lessons');
    setCorrectAnswers(0);
  };

  const goBack = () => {
    if (currentView === 'tasks') {
      setCurrentView('lessons');
    } else if (currentView === 'lessons') {
      setCurrentView('levels');
    } else if (currentView === 'levels') {
      router.back();
    }
  };

  if (!currentCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="alert-circle" size={50} color="#FF5252" />
          <Text style={styles.loadingText}>Invalid category</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Levels View
  if (currentView === 'levels') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200ee" />
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
        
        <View style={[styles.header, { backgroundColor: currentCategory.color }]}>
          <Text style={styles.title}>{currentCategory.title}</Text>
          <Text style={styles.subtitle}>{currentCategory.description}</Text>
        </View>

        <View style={styles.levelsContainer}>
          {currentCategory.levels.map((level: any) => (
            <TouchableOpacity
              key={level.id}
              style={[styles.levelCard, { borderLeftColor: currentCategory.color }]}
              onPress={() => handleLevelSelect(level)}
            >
              <View style={styles.levelHeader}>
                <Text style={styles.levelTitle}>{level.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Lessons View
  if (currentView === 'lessons' && selectedLevel) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200ee" />
          <Text style={styles.backText}>Back to Levels</Text>
        </TouchableOpacity>
        
        <View style={[styles.header, { backgroundColor: currentCategory?.color }]}>
          <Text style={styles.title}>{selectedLevel.title}</Text>
          <Text style={styles.subtitle}>{currentCategory?.description}</Text>
        </View>

        <View style={styles.lessonsContainer}>
          {selectedLevel.lessons.map((lesson: any) => (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonCard, { borderLeftColor: currentCategory?.color }]}
              onPress={() => handleLessonSelect(lesson)}
            >
              <View style={styles.lessonHeader}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </View>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Tasks View
  if (currentView === 'tasks' && currentTask) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200ee" />
          <Text style={styles.backText}>Back to Lessons</Text>
        </TouchableOpacity>
        
        <View style={styles.taskContainer}>
          <Text style={styles.taskQuestion}>{currentTask.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentTask.options.map((option: string) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOption && option === currentTask.answer && styles.correctOption,
                  selectedOption && option === selectedOption && option !== currentTask.answer && styles.wrongOption
                ]}
                onPress={() => !selectedOption && handleAnswer(option)}
                disabled={!!selectedOption}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Completion View
  if (currentView === 'completion') {
    return (
      <View style={styles.container}>
        <View style={styles.completionContainer}>
          {showConfetti && (
            <View style={styles.confettiContainer}>
              <Ionicons name="star" size={40} color="#FFD700" style={styles.confetti} />
              <Ionicons name="star" size={30} color="#FFD700" style={[styles.confetti, styles.confetti2]} />
              <Ionicons name="star" size={35} color="#FFD700" style={[styles.confetti, styles.confetti3]} />
            </View>
          )}
          
          <View style={styles.completionHeader}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            <Text style={styles.completionTitle}>Great job!</Text>
            <Text style={styles.completionSubtitle}>You completed the lesson</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
              <Text style={styles.statNumber}>+{xpEarned}</Text>
              <Text style={styles.statLabel}>XP Earned</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color="#FF6B6B" />
              <Text style={styles.statNumber}>+1</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Fallback view
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backText: {
    marginLeft: 5,
    color: '#6200ee',
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  levelsContainer: {
    padding: 16,
  },
  levelCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonsContainer: {
    padding: 16,
  },
  lessonCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  taskContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  taskQuestion: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#F44336',
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  completionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  completionSubtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    width: '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  confetti: {
    position: 'absolute',
    top: '20%',
    left: '20%',
  },
  confetti2: {
    top: '30%',
    left: '60%',
  },
  confetti3: {
    top: '40%',
    left: '40%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});