import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const lessons = {
  basics: [
    { id: 1, title: 'Alphabet', description: 'Learn the Russian alphabet', completed: false },
    { id: 2, title: 'Numbers', description: 'Learn numbers 1-10', completed: false },
    { id: 3, title: 'Colors', description: 'Basic colors in Russian', completed: false },
  ],
  greetings: [
    { id: 1, title: 'Hello & Goodbye', description: 'Basic greetings', completed: false },
    { id: 2, title: 'Introductions', description: 'How to introduce yourself', completed: false },
    { id: 3, title: 'Polite Phrases', description: 'Common polite expressions', completed: false },
  ],
  food: [
    { id: 1, title: 'Food Vocabulary', description: 'Common food items', completed: false },
    { id: 2, title: 'Ordering Food', description: 'Restaurant phrases', completed: false },
    { id: 3, title: 'Drinks', description: 'Beverages and ordering', completed: false },
  ],
  travel: [
    { id: 1, title: 'Directions', description: 'Asking for directions', completed: false },
    { id: 2, title: 'Transportation', description: 'Public transport phrases', completed: false },
    { id: 3, title: 'Accommodation', description: 'Hotel and booking phrases', completed: false },
  ],
};

const categoryColors = {
  basics: '#4CAF50',
  greetings: '#2196F3',
  food: '#FF9800',
  travel: '#9C27B0',
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const categoryId = id as string;
  const categoryLessons = lessons[categoryId as keyof typeof lessons] || [];
  const categoryColor = categoryColors[categoryId as keyof typeof categoryColors] || '#4CAF50';

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: categoryColor }]}>
        <Text style={styles.title}>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</Text>
        <Text style={styles.subtitle}>Select a lesson to begin</Text>
      </View>

      <View style={styles.lessonsContainer}>
        {categoryLessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={[styles.lessonCard, { borderLeftColor: categoryColor }]}
          >
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              {lesson.completed && (
                <Ionicons name="checkmark-circle" size={24} color={categoryColor} />
              )}
            </View>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
}); 