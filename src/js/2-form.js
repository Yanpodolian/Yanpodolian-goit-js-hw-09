// Ім'я ключа для збереження даних у локальному сховищі
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для збереження даних форми
const formData = {
  email: '',
  message: ''
};

// Посилання на елементи форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Функція для збереження даних у локальне сховище
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функція для отримання даних з локального сховища
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Функція для оновлення значень полів форми з об'єкта formData
const updateFormFields = () => {
  emailInput.value = formData.email;
  messageTextarea.value = formData.message;
};

// Відстеження події input на формі
form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  formData[name] = value.trim(); // Зберігаємо значення без пробілів по краях
  saveToLocalStorage(STORAGE_KEY, formData);
});

// Завантаження даних з локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage(STORAGE_KEY);
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    updateFormFields();
  }
});

// Обробка події submit на формі
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY); // Очищення локального сховища
  formData.email = '';
  formData.message = '';
  form.reset(); // Очистка полів форми
}); 