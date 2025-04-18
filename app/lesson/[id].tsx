import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

// Sample lesson data - in a real app, this would come from a database or API
const lessons = {
  basics: [
    {
      id: 1,
      type: 'word',
      question: 'Hello',
      answer: 'Привет',
      options: ['Привет', 'Пока', 'Спасибо', 'Да'],
    },
    {
      id: 2,
      type: 'translation',
      question: 'How are you?',
      answer: 'Как дела?',
      options: ['Как дела?', 'Что делаешь?', 'Где ты?', 'Кто ты?'],
    },
  ],
  greetings: [
    {
      id: 1,
      type: 'word',
      question: 'Good morning',
      answer: 'Доброе утро',
      options: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
    },
  ],
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const lessonData = lessons[id as keyof typeof lessons] || [];
  const currentExercise = lessonData[currentQuestion];

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === currentExercise.answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < lessonData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lesson: {id}</Text>
        <Text style={styles.progress}>Question {currentQuestion + 1} of {lessonData.length}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentExercise.question}</Text>
        
        {currentExercise.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              showAnswer && option === currentExercise.answer && styles.correctAnswer,
              showAnswer && option !== currentExercise.answer && styles.wrongAnswer,
            ]}
            onPress={() => handleAnswer(option)}
            disabled={showAnswer}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {showAnswer && (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progress: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  questionContainer: {
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
  },
  wrongAnswer: {
    backgroundColor: '#FF5252',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 