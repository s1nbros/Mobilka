import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '@/components/ProgressBar';
import { useProgress } from '@/contexts/LessonProgressContext';

const categories = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Learn basic Russian words and phrases',
    icon: 'book-outline',
    color: '#4CAF50',
    totalLessons: 4,
  },
  {
    id: 'greetings',
    title: 'Greetings',
    description: 'Common greetings and introductions',
    icon: 'chatbubble-outline',
    color: '#2196F3',
    totalLessons: 1,
  },
  {
    id: 'food',
    title: 'Food & Drinks',
    description: 'Food vocabulary and restaurant phrases',
    icon: 'restaurant-outline',
    color: '#FF9800',
    totalLessons: 1,
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Essential travel phrases and vocabulary',
    icon: 'airplane-outline',
    color: '#9C27B0',
    totalLessons: 4,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { xp, streak, getCompletedLessonsForCategory } = useProgress();

  const handleCategoryPress = (categoryId: string) => {
    console.log('Navigating to lesson:', categoryId);
    router.push({
      pathname: '/lesson/[id]',
      params: { id: categoryId }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn Russian</Text>
        <Text style={styles.subtitle}>Start your journey to fluency</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{streak}</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{xp}</Text>
            <Text style={styles.statLabel}>XP Earned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {Math.round((xp / 1000) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Mastery</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => {
          const completedLessons = getCompletedLessonsForCategory(category.id);
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Ionicons name={category.icon as any} size={32} color="white" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <ProgressBar 
                progress={completedLessons} 
                total={category.totalLessons} 
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  categoryDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
  },
});
