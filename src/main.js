import "./assets/main.css";

import { createApp } from "vue";
import App from "@/articles/ArticleApp.vue"; //REPLACE 1

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/main.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import ConfirmationService from "primevue/confirmationservice";
import { definePreset } from "@primevue/themes";

import router from "@/articles/router/index.js"; //REPLACE 2

import { createPinia } from "pinia";
import { useArticleStore } from "./articles/stores/articleStore";

// Тема
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{violet.50}",
      100: "{violet.100}",
      200: "{violet.200}",
      300: "{violet.300}",
      400: "{violet.400}",
      500: "{violet.500}", // Основной цвет (кнопки, ссылки)
      600: "{violet.600}",
      700: "{violet.700}",
      800: "{violet.800}",
      900: "{violet.900}",
      950: "{violet.950}",
    },
    fontSize: "16px",
  },
});

// Русская локализация
const ruLocale = {
  startsWith: "Начинается с",
  contains: "Содержит",
  notContains: "Не содержит",
  endsWith: "Заканчивается на",
  equals: "Равно",
  notEquals: "Не равно",
  noFilter: "Без фильтра",
  lt: "Меньше чем",
  lte: "Меньше или равно",
  gt: "Больше чем",
  gte: "Больше или равно",
  dateIs: "Дата равна",
  dateIsNot: "Дата не равна",
  dateBefore: "Дата до",
  dateAfter: "Дата после",
  clear: "Очистить",
  apply: "Применить",
  matchAll: "Совпадение со всеми",
  matchAny: "Совпадение с любым",
  addRule: "Добавить правило",
  removeRule: "Удалить правило",
  accept: "Да",
  reject: "Нет",
  choose: "Выбрать",
  upload: "Загрузить",
  cancel: "Отмена",
  completed: "Завершено",
  pending: "В ожидании",
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  today: "Сегодня",
  weekHeader: "Неделя",
  firstDayOfWeek: 1,
  dateFormat: "dd.mm.yy",
};

const app = createApp(App);
const pinia = createPinia();

// app.component('BaseInput', BaseInput)
// app.component('BaseButton',BaseButton)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: ".dark-mode",
      cssLayer: false,
    },
  },
  locale: ruLocale,
  Ripple: true,
  license: import.meta.env.VITE_PRIMEVUE_LICENSE,
});

app.use(router).use(pinia);

const articleStore = useArticleStore(pinia);

articleStore.loadArticles();

app.mount("#app");
