import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ExerciseType = 'multiple-choice' | 'translation' | 'matching' | 'listening';

interface Exercise {
  type: ExerciseType;
  question: string;
  correctAnswer: string;
  options?: string[];
  audioUrl?: string;
  hint?: string;
}

interface LessonExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export default function LessonExercise({ exercise, onComplete }: LessonExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    const correct = selectedAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
    
    setTimeout(() => {
      onComplete(correct);
      setShowFeedback(false);
      setSelectedAnswer('');
    }, 1500);
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <View style={styles.optionsContainer}>
            {exercise.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'translation':
        return (
          <View style={styles.translationContainer}>
            <TextInput
              style={styles.translationInput}
              value={selectedAnswer}
              onChangeText={setSelectedAnswer}
              placeholder="Type your answer"
              placeholderTextColor="#999"
            />
            {exercise.hint && (
              <Text style={styles.hintText}>Hint: {exercise.hint}</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ translateX: shakeAnimation }] }
      ]}
    >
      <Text style={styles.question}>{exercise.question}</Text>
      
      {renderExerciseContent()}

      <TouchableOpacity
        style={[styles.submitButton, !selectedAnswer && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!selectedAnswer}
      >
        <Text style={styles.submitButtonText}>Check</Text>
      </TouchableOpacity>

      {showFeedback && (
        <View style={[styles.feedback, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
          <Ionicons
            name={isCorrect ? 'checkmark-circle' : 'close-circle'}
            size={24}
            color="white"
          />
          <Text style={styles.feedbackText}>
            {isCorrect ? 'Correct!' : 'Try again!'}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  translationContainer: {
    marginBottom: 20,
  },
  translationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  hintText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  correctFeedback: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  incorrectFeedback: {
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
  },
  feedbackText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default LessonExercise;