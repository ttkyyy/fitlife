// === ПОСЕЩЕНИЯ ГРАБЛЕВА ЕГОРА ===
let visits = [
  { date: '2025-05-05', time: '18:30 – 19:30' },
  { date: '2025-05-08', time: '19:00 – 20:00' },
  { date: '2025-05-10', time: '18:45 – 19:45' },
  { date: '2025-05-12', time: '12:15 – 13:15' },
  { date: '2025-05-15', time: '19:20 – 20:20' },
  { date: '2025-06-02', time: '18:10 – 19:10' },
  { date: '2025-06-05', time: '19:05 – 20:05' },
  { date: '2025-07-10', time: '18:30 – 19:30' },
  { date: '2025-08-20', time: '19:00 – 20:00' },
];

// === ТРЕНЕРЫ ===
const trainers = [
  { name: 'Алексей', category: 'strength', desc: 'Силовые, бодибилдинг, пауэрлифтинг. 10 лет опыта.' },
  { name: 'Марина', category: 'functional', desc: 'Функциональный тренинг, реабилитация, осанка.' },
  { name: 'Дмитрий', category: 'cardio', desc: 'Кардио, кроссфит, выносливость. Подготовка к соревнованиям.' },
  { name: 'Елена', category: 'yoga', desc: 'Йога, пилатес, растяжка. Успокаивает, но не прощает.' },
  { name: 'Сергей', category: 'personal', desc: 'Персональные тренировки, составление планов.' },
  { name: 'Анна', category: 'group', desc: 'Групповые занятия, зарядка, мотивация.' },
  { name: 'Игорь', category: 'strength', desc: 'Жим, присед, становая. Только серьёзные цели.' },
  { name: 'Ольга', category: 'functional', desc: 'TRX, петли, баланс. Для тех, кто хочет двигаться свободно.' },
  { name: 'Виктор', category: 'cardio', desc: 'Бег, велосипед, интервалы. Выносливость — это привычка.' },
  { name: 'Татьяна', category: 'yoga', desc: 'Хатха, виньяса, медитация. Тело и разум в равновесии.' },
  { name: 'Никита', category: 'personal', desc: 'Индивидуальный подход, питание, прогресс.' },
  { name: 'Ксения', category: 'group', desc: 'Зарядка, танцы, энергия. Каждый найдёт своё.' },
  { name: 'Павел', category: 'strength', desc: 'Масса, сила, дисциплина. Работаю только с мотивированными.' },
  { name: 'Алёна', category: 'functional', desc: 'Мобильность, координация, здоровье. Для всех возрастов.' },
];

// Текущая дата
let currentDate = new Date();

// Показываем нужную вкладку
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.add('hidden');
  });
  document.getElementById(tabId).classList.remove('hidden');

  if (tabId === 'profile') {
    renderCalendar();
  }

  if (tabId === 'trainers') {
    renderTrainers('all');
  }
}

// Рендерим календарь
function renderCalendar() {
  const title = document.getElementById('calendar-title');
  const datesContainer = document.getElementById('calendar-dates');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  title.textContent = new Date(year, month).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  datesContainer.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const offset = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    empty.classList.add('day', 'empty');
    datesContainer.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');
    dayEl.textContent = day;

    const visit = visits.find(v => v.date === dateStr);
    if (visit) {
      dayEl.classList.add('has-workout');
      dayEl.title = visit.time;

      dayEl.addEventListener('mouseenter', (e) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = `Время: ${visit.time}`;
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.classList.add('show');
      });

      dayEl.addEventListener('mouseleave', () => {
        document.getElementById('tooltip').classList.remove('show');
      });

      dayEl.addEventListener('click', () => {
        alert(`Дата: ${dateStr}\nВы посетили зал с ${visit.time}`);
      });
    }

    datesContainer.appendChild(dayEl);
  }
}

// Переключение месяцев
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

// Фильтр тренеров
function filterTrainers(category) {
  renderTrainers(category);

  // Обновляем кнопки фильтра
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.filter-btn[onclick="filterTrainers('${category}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Рендерим тренеров
function renderTrainers(category) {
  const container = document.getElementById('trainers-list');
  container.innerHTML = '';

  const filtered = category === 'all'
    ? trainers
    : trainers.filter(t => t.category === category);

  filtered.forEach(t => {
    const card = document.createElement('div');
    card.classList.add('trainer-card');
    card.innerHTML = `
      <h3>${t.name}</h3>
      <div class="category">${getCategoryLabel(t.category)}</div>
      <p>${t.desc}</p>
    `;
    container.appendChild(card);
  });
}

// Названия категорий
function getCategoryLabel(category) {
  const labels = {
    strength: 'Силовые',
    functional: 'Функциональный',
    yoga: 'Йога и растяжка',
    cardio: 'Кардио',
    personal: 'Персональные',
    group: 'Групповые'
  };
  return labels[category] || category;
}

// Автоматический вход
function autoLogin() {
  const usernameEl = document.getElementById('username');
  if (usernameEl) {
    usernameEl.textContent = 'Граблев Егор';
  }
}

// При загрузке
window.onload = function () {
  autoLogin();
  showTab('home');
};