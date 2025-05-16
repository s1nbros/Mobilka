import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

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
  }
};

export default function LearningScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [currentView, setCurrentView] = useState<'categories' | 'levels' | 'lessons' | 'tasks'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Initialize view based on URL params
  useEffect(() => {
    if (category) {
      setSelectedCategory(category as string);
      setCurrentView('levels');
    }
  }, [category]);

  // Get current data based on view
  const currentCategory = selectedCategory ? learningData[selectedCategory as keyof typeof learningData] : null;
  const currentTasks = selectedLesson?.tasks || [];
  const currentTask = currentTasks[currentTaskIndex];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('levels');
    router.setParams({ category: categoryId });
  };

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
    
    setTimeout(() => {
      if (currentTaskIndex < currentTasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setSelectedOption(null);
      } else {
        setCurrentView('lessons');
      }
    }, 1000);
  };

  const goBack = () => {
    if (currentView === 'tasks') {
      setCurrentView('lessons');
    } else if (currentView === 'lessons') {
      setCurrentView('levels');
    } else if (currentView === 'levels') {
      setCurrentView('categories');
      router.setParams({ category: undefined });
    }
  };

  // Categories View
  if (currentView === 'categories') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Category</Text>
          <Text style={styles.subtitle}>Select a category to begin</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {Object.entries(learningData).map(([id, category]) => (
            <TouchableOpacity
              key={id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategorySelect(id)}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Levels View
  if (currentView === 'levels' && currentCategory) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200ee" />
          <Text style={styles.backText}>Back to Categories</Text>
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
    paddingTop: 20,
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
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
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
});