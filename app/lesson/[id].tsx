import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

const learningData = {
basics: {
  title: 'Basics',
  color: '#4CAF50',
  description: 'Start with Russian basics',
  levels: [
    {
      id: 'alphabet',
      title: 'Level 1: Alphabet',
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
            },
            {
              id: 4,
              question: 'G',
              answer: 'Г',
              options: ['Г', 'Д', 'Е', 'Ж']
            },
            {
              id: 5,
              question: 'D',
              answer: 'Д',
              options: ['Д', 'Г', 'Ж', 'З']
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
            },
            {
              id: 3,
              question: 'I',
              answer: 'И',
              options: ['И', 'Й', 'К', 'Л']
            },
            {
              id: 4,
              question: 'K',
              answer: 'К',
              options: ['К', 'Л', 'М', 'Н']
            },
            {
              id: 5,
              question: 'L',
              answer: 'Л',
              options: ['Л', 'М', 'Н', 'П']
            }
          ]
        },
        {
          id: 3,
          title: 'Letters M-Ya',
          description: 'Final set of letters',
          tasks: [
            {
              id: 1,
              question: 'Ya',
              answer: 'Я',
              options: ['Я', 'Ю', 'Э', 'Ь']
            },
            {
              id: 2,
              question: 'Sh',
              answer: 'Ш',
              options: ['Ш', 'Щ', 'Ч', 'Ц']
            }
          ]
        }
      ]
    },
    {
      id: 'vowels-consonants',
      title: 'Level 2: Vowels & Consonants',
      lessons: [
        {
          id: 1,
          title: 'Vowels',
          description: 'Russian vowel letters',
          tasks: [
            {
              id: 1,
              question: 'A',
              answer: 'А',
              options: ['А', 'Б', 'В', 'Г']
            },
            {
              id: 2,
              question: 'Ye',
              answer: 'Е',
              options: ['Е', 'Ё', 'Ж', 'З']
            },
            {
              id: 3,
              question: 'Yo',
              answer: 'Ё',
              options: ['Ё', 'Ж', 'З', 'И']
            },
            {
              id: 4,
              question: 'I',
              answer: 'И',
              options: ['И', 'Й', 'К', 'Л']
            },
            {
              id: 5,
              question: 'U',
              answer: 'У',
              options: ['У', 'Ф', 'Х', 'Ц']
            }
          ]
        },
        {
          id: 2,
          title: 'Consonants',
          description: 'Russian consonant letters',
          tasks: [
            {
              id: 1,
              question: 'K',
              answer: 'К',
              options: ['К', 'Л', 'М', 'Н']
            },
            {
              id: 2,
              question: 'M',
              answer: 'М',
              options: ['М', 'Н', 'П', 'Р']
            },
            {
              id: 3,
              question: 'R',
              answer: 'Р',
              options: ['Р', 'С', 'Т', 'У']
            },
            {
              id: 4,
              question: 'S',
              answer: 'С',
              options: ['С', 'Т', 'У', 'Ф']
            },
            {
              id: 5,
              question: 'T',
              answer: 'Т',
              options: ['Т', 'У', 'Ф', 'Х']
            }
          ]
        }
      ]
    },
    {
      id: 'special-letters',
      title: 'Level 3: Special Characters',
      lessons: [
        {
          id: 1,
          title: 'Signs',
          description: 'Hard and soft signs',
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
            },
            {
              id: 3,
              question: 'Yery',
              answer: 'Ы',
              options: ['Ы', 'Э', 'Ю', 'Я']
            }
          ]
        }
      ]
    },
    {
      id: 'letter-combinations',
      title: 'Level 4: Letter Combinations',
      lessons: [
        {
          id: 1,
          title: 'Common Combinations',
          description: 'Frequent letter pairs',
          tasks: [
            {
              id: 1,
              question: 'Zh',
              answer: 'Ж',
              options: ['Ж', 'Ш', 'Щ', 'Ч']
            },
            {
              id: 2,
              question: 'Ts',
              answer: 'Ц',
              options: ['Ц', 'Ч', 'Ш', 'Щ']
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
      title: 'Level 1: Basic Greetings',
      lessons: [
        {
          id: 1,
          title: 'Everyday Phrases',
          description: 'Hello and goodbye phrases',
          tasks: [
            {
              id: 1,
              question: 'Hello (informal)',
              answer: 'Привет',
              options: ['Привет', 'Здравствуйте', 'До свидания', 'Спасибо']
            },
            {
              id: 2,
              question: 'Good morning',
              answer: 'Доброе утро',
              options: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи']
            },
            {
              id: 3,
              question: 'Goodbye',
              answer: 'До свидания',
              options: ['До свидания', 'Пока', 'Привет', 'Спасибо']
            },
            {
              id: 4,
              question: 'Good night',
              answer: 'Спокойной ночи',
              options: ['Спокойной ночи', 'Добрый вечер', 'Доброе утро', 'До свидания']
            },
            {
              id: 5,
              question: 'See you later',
              answer: 'До скорого',
              options: ['До скорого', 'До свидания', 'Пока', 'Увидимся']
            }
          ]
        }
      ]
    },
    {
      id: 'formal-greetings',
      title: 'Level 2: Formal Greetings',
      lessons: [
        {
          id: 1,
          title: 'Formal Situations',
          description: 'Polite greetings',
          tasks: [
            {
              id: 1,
              question: 'Hello (formal)',
              answer: 'Здравствуйте',
              options: ['Здравствуйте', 'Привет', 'Пока', 'Добрый день']
            },
            {
              id: 2,
              question: 'How are you? (formal)',
              answer: 'Как вы поживаете?',
              options: ['Как вы поживаете?', 'Как дела?', 'Что нового?', 'Всё хорошо?']
            },
            {
              id: 3,
              question: 'Good evening (formal)',
              answer: 'Добрый вечер',
              options: ['Добрый вечер', 'Доброе утро', 'Добрый день', 'Спокойной ночи']
            },
            {
              id: 4,
              question: 'Pleased to meet you',
              answer: 'Очень приятно',
              options: ['Очень приятно', 'Добрый день', 'Как дела?', 'Спасибо']
            },
            {
              id: 5,
              question: 'How do you do?',
              answer: 'Как поживаете?',
              options: ['Как поживаете?', 'Как дела?', 'Что нового?', 'Всё хорошо?']
            }
          ]
        }
      ]
    },
    {
      id: 'responses',
      title: 'Level 3: Responses',
      lessons: [
        {
          id: 1,
          title: 'Common Replies',
          description: 'How to respond to greetings',
          tasks: [
            {
              id: 1,
              question: 'Thank you',
              answer: 'Спасибо',
              options: ['Спасибо', 'Пожалуйста', 'Извините', 'До свидания']
            },
            {
              id: 2,
              question: "You're welcome",
              answer: 'Пожалуйста',
              options: ['Пожалуйста', 'Спасибо', 'Извините', 'Хорошо']
            },
            {
              id: 3,
              question: "I'm fine",
              answer: 'Хорошо',
              options: ['Хорошо', 'Нормально', 'Отлично', 'Спасибо']
            },
            {
              id: 4,
              question: "Not bad",
              answer: 'Неплохо',
              options: ['Неплохо', 'Плохо', 'Хорошо', 'Отлично']
            },
            {
              id: 5,
              question: "And you?",
              answer: 'А у вас?',
              options: ['А у вас?', 'А ты?', 'Как дела?', 'Что нового?']
            }
          ]
        }
      ]
    },
    {
      id: 'holiday-greetings',
      title: 'Level 4: Holiday Greetings',
      lessons: [
        {
          id: 1,
          title: 'Special Occasions',
          description: 'Holiday greetings',
          tasks: [
            {
              id: 1,
              question: 'Happy Birthday',
              answer: 'С днём рождения',
              options: ['С днём рождения', 'С праздником', 'С Новым годом', 'С рождеством']
            },
            {
              id: 2,
              question: 'Happy New Year',
              answer: 'С Новым годом',
              options: ['С Новым годом', 'С рождеством', 'С днём рождения', 'С праздником']
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
      id: 'fruits-vegetables',
      title: 'Level 1: Fruits & Vegetables',
      lessons: [
        { 
          id: 1, 
          title: 'Fruits', 
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
            },
            {
              id: 3,
              question: 'Banana',
              answer: 'Банан',
              options: ['Банан', 'Яблоко', 'Груша', 'Апельсин']
            },
            {
              id: 4,
              question: 'Grapes',
              answer: 'Виноград',
              options: ['Виноград', 'Вишня', 'Слива', 'Персик']
            },
            {
              id: 5,
              question: 'Watermelon',
              answer: 'Арбуз',
              options: ['Арбуз', 'Дыня', 'Тыква', 'Огурец']
            }
          ]
        },
        {
          id: 2,
          title: 'Vegetables',
          description: 'Learn vegetable names',
          tasks: [
            {
              id: 1,
              question: 'Potato',
              answer: 'Картофель',
              options: ['Картофель', 'Морковь', 'Лук', 'Помидор']
            },
            {
              id: 2,
              question: 'Tomato',
              answer: 'Помидор',
              options: ['Помидор', 'Огурец', 'Перец', 'Капуста']
            },
            {
              id: 3,
              question: 'Carrot',
              answer: 'Морковь',
              options: ['Морковь', 'Лук', 'Чеснок', 'Свекла']
            },
            {
              id: 4,
              question: 'Cabbage',
              answer: 'Капуста',
              options: ['Капуста', 'Салат', 'Шпинат', 'Укроп']
            },
            {
              id: 5,
              question: 'Cucumber',
              answer: 'Огурец',
              options: ['Огурец', 'Кабачок', 'Баклажан', 'Тыква']
            }
          ]
        },
        {
          id: 3,
          title: 'Berries',
          description: 'Learn berry names',
          tasks: [
            {
              id: 1,
              question: 'Strawberry',
              answer: 'Клубника',
              options: ['Клубника', 'Малина', 'Смородина', 'Черника']
            },
            {
              id: 2,
              question: 'Cherry',
              answer: 'Вишня',
              options: ['Вишня', 'Черешня', 'Слива', 'Абрикос']
            }
          ]
        }
      ]
    },
    {
      id: 'meals-dishes',
      title: 'Level 2: Meals & Dishes',
      lessons: [
        {
          id: 1,
          title: 'Common Dishes',
          description: 'Popular Russian dishes',
          tasks: [
            {
              id: 1,
              question: 'Borscht',
              answer: 'Борщ',
              options: ['Борщ', 'Щи', 'Солянка', 'Окрошка']
            },
            {
              id: 2,
              question: 'Pancakes',
              answer: 'Блины',
              options: ['Блины', 'Оладьи', 'Пироги', 'Ватрушки']
            },
            {
              id: 3,
              question: 'Pelmeni',
              answer: 'Пельмени',
              options: ['Пельмени', 'Вареники', 'Блины', 'Оладьи']
            },
            {
              id: 4,
              question: 'Beef Stroganoff',
              answer: 'Бефстроганов',
              options: ['Бефстроганов', 'Гуляш', 'Жаркое', 'Рагу']
            },
            {
              id: 5,
              question: 'Olivier salad',
              answer: 'Оливье',
              options: ['Оливье', 'Винегрет', 'Сельдь под шубой', 'Мимоза']
            }
          ]
        },
        {
          id: 2,
          title: 'Breakfast',
          description: 'Common breakfast foods',
          tasks: [
            {
              id: 1,
              question: 'Porridge',
              answer: 'Каша',
              options: ['Каша', 'Суп', 'Пюре', 'Рагу']
            },
            {
              id: 2,
              question: 'Omelet',
              answer: 'Омлет',
              options: ['Омлет', 'Яичница', 'Сырники', 'Блины']
            }
          ]
        }
      ]
    },
    {
      id: 'drinks',
      title: 'Level 3: Drinks',
      lessons: [
        {
          id: 1,
          title: 'Beverages',
          description: 'Common Russian drinks',
          tasks: [
            {
              id: 1,
              question: 'Tea',
              answer: 'Чай',
              options: ['Чай', 'Кофе', 'Сок', 'Молоко']
            },
            {
              id: 2,
              question: 'Kvass',
              answer: 'Квас',
              options: ['Квас', 'Компот', 'Морс', 'Сок']
            },
            {
              id: 3,
              question: 'Compote',
              answer: 'Компот',
              options: ['Компот', 'Кисель', 'Морс', 'Лимонад']
            },
            {
              id: 4,
              question: 'Mors',
              answer: 'Морс',
              options: ['Морс', 'Компот', 'Квас', 'Сок']
            }
          ]
        },
        {
          id: 2,
          title: 'Alcoholic Drinks',
          description: 'Traditional alcoholic beverages',
          tasks: [
            {
              id: 1,
              question: 'Vodka',
              answer: 'Водка',
              options: ['Водка', 'Коньяк', 'Вино', 'Пиво']
            },
            {
              id: 2,
              question: 'Medovukha',
              answer: 'Медовуха',
              options: ['Медовуха', 'Квас', 'Сбитень', 'Брага']
            }
          ]
        }
      ]
    },
    {
      id: 'dairy-products',
      title: 'Level 4: Dairy Products',
      lessons: [
        {
          id: 1,
          title: 'Milk Products',
          description: 'Common dairy foods',
          tasks: [
            {
              id: 1,
              question: 'Milk',
              answer: 'Молоко',
              options: ['Молоко', 'Кефир', 'Сметана', 'Творог']
            },
            {
              id: 2,
              question: 'Sour cream',
              answer: 'Сметана',
              options: ['Сметана', 'Творог', 'Йогурт', 'Сливки']
            },
            {
              id: 3,
              question: 'Cottage cheese',
              answer: 'Творог',
              options: ['Творог', 'Сыр', 'Брынза', 'Йогурт']
            }
          ]
        }
      ]
    },
    {
      id: 'sweets',
      title: 'Level 5: Sweets & Desserts',
      lessons: [
        {
          id: 1,
          title: 'Russian Desserts',
          description: 'Traditional sweets',
          tasks: [
            {
              id: 1,
              question: 'Honey',
              answer: 'Мёд',
              options: ['Мёд', 'Варенье', 'Сахар', 'Сироп']
            },
            {
              id: 2,
              question: 'Jam',
              answer: 'Варенье',
              options: ['Варенье', 'Джем', 'Мармелад', 'Повидло']
            },
            {
              id: 3,
              question: 'Pastila',
              answer: 'Пастила',
              options: ['Пастила', 'Зефир', 'Мармелад', 'Халва']
            }
          ]
        }
      ]
    }
  ]
},
  numbers: {
    title: 'Numbers',
    color: '#9C27B0',
    description: 'Learn Russian numbers',
    levels: [
      {
        id: 'basic-numbers',
        title: 'Level 1',
        lessons: [
          {
            id: 1,
            title: 'Numbers 1-10',
            description: 'Basic counting',
            tasks: [
              {
                id: 1,
                question: '1',
                answer: 'Один',
                options: ['Один', 'Два', 'Три', 'Четыре']
              },
              {
                id: 2,
                question: '5',
                answer: 'Пять',
                options: ['Три', 'Четыре', 'Пять', 'Шесть']
              },
              {
                id: 3,
                question: '7',
                answer: 'Семь',
                options: ['Семь', 'Восемь', 'Девять', 'Десять']
              }
            ]
          },
          {
            id: 2,
            title: 'Numbers 11-20',
            description: 'Teen numbers',
            tasks: [
              {
                id: 1,
                question: '12',
                answer: 'Двенадцать',
                options: ['Десять', 'Одиннадцать', 'Двенадцать', 'Тринадцать']
              },
              {
                id: 2,
                question: '15',
                answer: 'Пятнадцать',
                options: ['Пятнадцать', 'Четырнадцать', 'Шестнадцать', 'Семнадцать']
              }
            ]
          }
        ]
      },
      {
        id: 'tens',
        title: 'Level 2: Tens',
        lessons: [
          {
            id: 1,
            title: '20-100',
            description: 'Counting by tens',
            tasks: [
              {
                id: 1,
                question: '20',
                answer: 'Двадцать',
                options: ['Двадцать', 'Тридцать', 'Сорок', 'Пятьдесят']
              },
              {
                id: 2,
                question: '50',
                answer: 'Пятьдесят',
                options: ['Сорок', 'Пятьдесят', 'Шестьдесят', 'Семьдесят']
              }
            ]
          }
        ]
      }
    ]
  },
  // Новая категория - Цвета
  colors: {
    title: 'Colors',
    color: '#FF0000',
    description: 'Learn colors in Russian',
    levels: [
      {
        id: 'Level 1',
        title: 'Level 1: Basic Colors',
        lessons: [
          {
            id: 1,
            title: 'Primary Colors',
            description: 'Basic color names',
            tasks: [
              {
                id: 1,
                question: 'Red',
                answer: 'Красный',
                options: ['Красный', 'Синий', 'Зелёный', 'Жёлтый']
              },
              {
                id: 2,
                question: 'Blue',
                answer: 'Синий',
                options: ['Синий', 'Голубой', 'Зелёный', 'Фиолетовый']
              },
              {
                id: 3,
                question: 'Green',
                answer: 'Зелёный',
                options: ['Зелёный', 'Красный', 'Синий', 'Жёлтый']
              },
              {
                id: 4,
                question: 'Yellow',
                answer: 'Жёлтый',
                options: ['Жёлтый', 'Оранжевый', 'Красный', 'Зелёный']
              },
              {
                id: 5,
                question: 'Black',
                answer: 'Чёрный',
                options: ['Чёрный', 'Белый', 'Серый', 'Коричневый']
              },
              {
                id: 6,
                question: 'White',
                answer: 'Белый',
                options: ['Белый', 'Чёрный', 'Серый', 'Бежевый']
              },
              {
                id: 7,
                question: 'Orange',
                answer: 'Оранжевый',
                options: ['Оранжевый', 'Красный', 'Жёлтый', 'Коричневый']
              },
              {
                id: 8,
                question: 'Purple',
                answer: 'Фиолетовый',
                options: ['Фиолетовый', 'Синий', 'Розовый', 'Красный']
              },
              {
                id: 9,
                question: 'Pink',
                answer: 'Розовый',
                options: ['Розовый', 'Красный', 'Фиолетовый', 'Бордовый']
              },
              {
                id: 10,
                question: 'Gray',
                answer: 'Серый',
                options: ['Серый', 'Чёрный', 'Белый', 'Бежевый']
              },
              {
                id: 11,
                question: 'Brown',
                answer: 'Коричневый',
                options: ['Коричневый', 'Бордовый', 'Бежевый', 'Оранжевый']
              },
              {
                id: 12,
                question: 'Light blue',
                answer: 'Голубой',
                options: ['Голубой', 'Синий', 'Бирюзовый', 'Фиолетовый']
              },
              {
                id: 13,
                question: 'Gold',
                answer: 'Золотой',
                options: ['Золотой', 'Жёлтый', 'Оранжевый', 'Коричневый']
              },
              {
                id: 14,
                question: 'Silver',
                answer: 'Серебряный',
                options: ['Серебряный', 'Серый', 'Белый', 'Голубой']
              },
              {
                id: 15,
                question: 'Turquoise',
                answer: 'Бирюзовый',
                options: ['Бирюзовый', 'Голубой', 'Зелёный', 'Синий']
              },
              {
                id: 16,
                question: 'Dark red',
                answer: 'Бордовый',
                options: ['Бордовый', 'Красный', 'Коричневый', 'Фиолетовый']
              },
              {
                id: 17,
                question: 'Beige',
                answer: 'Бежевый',
                options: ['Бежевый', 'Коричневый', 'Жёлтый', 'Белый']
              },
              {
                id: 18,
                question: 'Emerald',
                answer: 'Изумрудный',
                options: ['Изумрудный', 'Зелёный', 'Бирюзовый', 'Салатовый']
              },
              {
                id: 19,
                question: 'Light green',
                answer: 'Салатовый',
                options: ['Салатовый', 'Зелёный', 'Жёлтый', 'Бирюзовый']
              },
              {
                id: 20,
                question: 'Dark blue',
                answer: 'Тёмно-синий',
                options: ['Тёмно-синий', 'Синий', 'Фиолетовый', 'Чёрный']
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
});