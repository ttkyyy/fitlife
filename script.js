// === Таймер для "Осеннего фитнес-марафона" ===
function startCountdown() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const deadline = new Date("2025-08-31T23:59:59").getTime();

  const update = () => {
    const now = new Date().getTime();
    const diff = deadline - now;

    if (diff <= 0) {
      countdownEl.textContent = "Завершено";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    countdownEl.textContent = `${days}д ${hours}ч ${mins}м`;
  };

  update();
  setInterval(update, 60000);
}
startCountdown();


// === Профиль: модальное окно ===
function toggleProfile() {
  document.getElementById("profileModal").classList.toggle("hidden");
}


// === Календарь ===
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

/*
  Здесь можно самому задавать даты посещений.
  Формат: "YYYY-MM-DD": "Комментарий"
*/
let visits = {
  "2025-08-04": " 19:00 - 19:45",
  "2025-08-06": " 19:00 - 19:45",
  "2025-08-08": " 19:00 - 19:45",
  "2025-08-11": " 19:00 - 19:45",
  "2025-08-13": " 19:00 - 19:45",
  "2025-08-15": " 19:00 - 19:45",
  "2025-08-18": " 19:00 - 19:45",
  "2025-08-20": " 19:00 - 19:45",
  "2025-08-22": " 19:00 - 19:45",
  "2025-08-25": " 19:00 - 19:45",
  "2025-08-27": " 19:00 - 19:45",
  "2025-08-29": " 19:00 - 19:45"
};

function renderCalendar(month = currentMonth, year = currentYear) {
  const datesContainer = document.getElementById("calendar-dates");
  const title = document.getElementById("calendar-title");
  const visitsCount = document.getElementById("visits-count");

  if (!datesContainer || !title) return;

  const date = new Date(year, month, 1);
  const monthName = date.toLocaleString("ru-RU", { month: "long" });
  title.textContent = `${monthName} ${year}`;

  datesContainer.innerHTML = "";

  let firstDay = date.getDay();
  if (firstDay === 0) firstDay = 7; // воскресенье в конец

  for (let i = 1; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty");
    datesContainer.appendChild(empty);
  }

  const lastDate = new Date(year, month + 1, 0).getDate();
  let count = 0;

  for (let d = 1; d <= lastDate; d++) {
    const day = document.createElement("div");
    day.textContent = d;

    let key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (visits[key]) {
      day.classList.add("visited");
      day.title = visits[key]; // подсказка при наведении
      count++;
    }

    datesContainer.appendChild(day);
  }

  if (visitsCount) {
    visitsCount.textContent = count;
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

// первый запуск
renderCalendar();


// === Тренеры ===
const trainers = [
  { name: "Алексей", spec: "strength", desc: "Силовые тренировки, опыт 5 лет" },
  { name: "Марина", spec: "functional", desc: "Функционал и стретчинг" },
  { name: "Игорь", spec: "yoga", desc: "Йога, дыхательные практики" },
  { name: "Светлана", spec: "strength", desc: "Бодибилдинг и питание" },
];

function renderTrainers(filter = "all") {
  const container = document.getElementById("trainers-list");
  if (!container) return;

  container.innerHTML = "";
  trainers
    .filter(t => filter === "all" || t.spec === filter)
    .forEach(t => {
      const card = document.createElement("div");
      card.classList.add("trainer-card");
      card.innerHTML = `
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
      `;
      container.appendChild(card);
    });
}

function filterTrainers(category) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  renderTrainers(category);
  event.target.classList.add("active");
}

// первый рендер
renderTrainers();
