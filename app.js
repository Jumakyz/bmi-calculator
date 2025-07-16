const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Папка для стилей

// Отображение формы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Обработка формы и расчет BMI
app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    return res.send(`<h2>Пожалуйста, введите положительные числа!</h2>`);
  }

  const bmi = weight / (height * height);
  let category = '';
  let color = '';

  if (bmi < 18.5) {
    category = 'Недостаточный вес';
    color = 'blue';
  } else if (bmi < 24.9) {
    category = 'Норма';
    color = 'green';
  } else if (bmi < 29.9) {
    category = 'Избыточный вес';
    color = 'orange';
  } else {
    category = 'Ожирение';
    color = 'red';
  }

  res.send(`
    <h2>Ваш BMI: ${bmi.toFixed(2)}</h2>
    <h3 style="color:${color};">Категория: ${category}</h3>
    <a href="/">← Назад</a>
  `);
});

app.listen(3000, () => {
  console.log('✅ Сервер запущен на http://localhost:3000');
});
