<script setup>
import { ref, computed } from 'vue'
import { formApi } from '@/forms/services/FormApiProvider.js'

const form = ref({
  fullname: 'abc',
  phone: '123',
  email: 'a@b.c',
  dateOfBirthday: '1111-11-11',
  gender: 'male',
  languages: ['cpp'],
  bio: 'wasd',
  agreement: true,
})

const status = ref('idle')
const error  = ref('')

const isSending = computed(() => status.value === 'sending')

let submitController = null
let getAllController = null

async function handleSubmit() {
  status.value = 'sending'
  error.value = ''

  try {
    submitController?.abort()
    submitController = new AbortController()
    const saved = await formApi.submit(form.value,{signal : submitController.signal})
    console.log('Сохранено:', saved)
    status.value = 'sent'

    form.value = {
      fullname: '',
      phone: '',
      email: '',
      dateOfBirthday: '',
      gender: '',
      languages: [],
      bio: '',
      agreement: false,
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      status.value = 'cancelled'
      error.value = 'Запрос отменён'
    } else {
      status.value = 'error'
      error.value = e.message
    }
  }
}

function handleCancelSubmit(){
    submitController.abort()
}

</script>

<template>
  <main class="container my-4">
    <div class="row g-4">
        <!-- Обертка content ДОЛЖНА быть колонкой -->
        <div class="col-12">
            <div class="content p-3 p-md-4 rounded bg-white shadow-sm">
                
                <!-- Список -->
                <div class="mb-4"> <!-- вместо order-1 -->
                    <div class="list bg-secondary p-3 rounded">
                        <ul class="list-unstyled mb-0">
                        <li class="mb-2"><a href="http://www.kubsu.ru/" title="Сайт КубГУ" class="text-dark text-decoration-none">number 1</a></li>
                        <li class="mb-2"><a href="https://www.kubsu.ru/" title="Сайт КубГУ" class="text-dark text-decoration-none">number 2</a></li>
                        <li class="mb-2">
                            <a href="http://www.kubsu.ru/">
                                <img src="https://i.pinimg.com/1200x/1b/d8/29/1bd8298543e7d46672da548bd4f906ea.jpg" 
                                     width="150" height="100" alt="number 3" class="img-fluid">
                            </a>
                        </li>
                        <li class="mb-2"><a href="../www.kubsu.ru/ai/" title="Сайт КубГУ" class="text-dark text-decoration-none">number 4</a></li>
                        <li class="mb-2"><a href="../www.kubsu.ru/" title="Сайт КубГУ" class="text-dark text-decoration-none">number 5</a></li>
                        <li class="mb-2"><a href="#ancor" class="text-dark text-decoration-none">number 6</a> <a id="#ancor">fragment</a></li>
                        <li class="mb-2"><a href="students.html?faculty=FCTaAM&sort=age&group=MS" class="text-dark text-decoration-none">Найти студентов ФКТиПМ из математического обеспечения по возрасту</a></li>
                        <li class="mb-2"><a href="students.html?id=a118" class="text-dark text-decoration-none">Ссылка с айди a118</a></li>
                        <li class="mb-2"><a href="page.html" class="text-dark text-decoration-none">Ссылка на страницу page</a></li>
                        <li class="mb-2"><a href="about/page.html" class="text-dark text-decoration-none">about/page</a></li>
                        <li class="mb-2"><a href="../page.html" class="text-dark text-decoration-none">Уровнем выше</a></li>
                        <li class="mb-2"><a href="../../filename.html" class="text-dark text-decoration-none">Двумя уровнями выше</a></li>
                        <li class="mb-2">Некий текст <a href="http://www.kubsu.ru/" class="text-dark text-decoration-none">ссылка</a>, другой некий текст.</li>
                        <li class="mb-2"><a href="http://www.kubsu.ru/page#ancorInPage" class="text-dark text-decoration-none">Ссылка на фрагмент страницы page</a></li>
                        <li class="mb-2">
                            <img src="https://i.pinimg.com/1200x/1b/d8/29/1bd8298543e7d46672da548bd4f906ea.jpg" 
                                 width="150" height="100" alt="number 15" usemap="#myMap" class="img-fluid">
                        </li>
                        <li class="mb-2"><a href="" class="text-dark text-decoration-none">Ссылка на ничего</a></li>
                        <li class="mb-2"><a class="text-dark text-decoration-none">Ссылка на</a></li>
                        <li class="mb-2"><a href="https://www.kubsu.ru/" rel="nofollow" class="text-dark text-decoration-none">Запрещённая ссылка</a></li>
                        <li class="mb-2"><a href="https://www.kubsu.ru/" class="text-dark text-decoration-none">Не индексируется</a></li>
                        <li class="mb-2">
                            <ol class="mt-2">
                                <li class="mb-1"><a href="https://www.kubsu.ru" title="Первая ссылка" class="text-dark text-decoration-none">КубГУ</a></li>
                                <li class="mb-1"><a href="https://www.kubsu.ru" title="Вторая ссылка" class="text-dark text-decoration-none">КубГУ</a></li>
                                <li class="mb-1"><a href="https://www.kubsu.ru" title="Третья ссылка" class="text-dark text-decoration-none">КубГУ</a></li>
                                <li class="mb-1"><a href="https://www.kubsu.ru" title="Четвёртая ссылка" class="text-dark text-decoration-none">КубГУ</a></li>
                                <li class="mb-1"><a href="https://www.kubsu.ru" title="Пятая ссылка" class="text-dark text-decoration-none">КубГУ</a></li>
                            </ol>
                        </li>
                    </ul>
                    </div>
                </div>
                
                <!-- Таблица -->
                <div class="mb-4"> <!-- вместо order-2 -->
                    <div class="table-container">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Имя</th>
                                    <th colspan="2">Контакты</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Иван Иванов</td>
                                    <td>ivan @mail.ru</td>
                                    <td>+7-900-123-45-67</td>
                                    <td><span class="badge bg-success">On</span></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Петр Петров</td>
                                    <td>petr @yandex.ru</td>
                                    <td>+9-900-666-46-46</td>
                                    <td><span class="badge bg-danger">Off</span></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Олег Олегович</td>
                                    <td>vova @gmail.com</td>
                                    <td>+7-900-765-43-21</td>
                                    <td><span class="badge bg-success">On</span></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Василий Василиевич</td>
                                    <td>vasia @mail.ru</td>
                                    <td>+7-901-234-56-78</td>
                                    <td><span class="badge bg-success">On</span></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Сергей Сергеевич</td>
                                    <td colspan="2">sergey @yandex.ru</td>
                                    <td><span class="badge bg-success">On</span></td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Артём Артёмович</td>
                                    <td>artem @gmail.com</td>
                                    <td>+7-902-345-67-89</td>
                                    <td><span class="badge bg-danger">Off</span></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                
                <!-- Форма -->
                <div>
                        <form class="form bg-secondary p-3 p-md-5 rounded" @submit.prevent="handleSubmit">
                            <h3 class="mb-3">Добавить статью</h3>

                            <div class="row g-3">
                            <!-- ФИО -->
                            <div class="col-12">
                                <label class="form-label fw-bold">ФИО:</label>
                                <input
                                v-model="form.fullname"
                                type="text"
                                class="form-control"
                                name="fullname"
                                required
                                >
                            </div>

                            <!-- Телефон и Email -->
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-bold">Телефон:</label>
                                <input
                                v-model="form.phone"
                                type="tel"
                                class="form-control"
                                name="phone"
                                required
                                >
                            </div>

                            <div class="col-12 col-md-6">
                                <label class="form-label fw-bold">Email:</label>
                                <input
                                v-model="form.email"
                                type="email"
                                class="form-control"
                                name="email"
                                required
                                >
                            </div>

                            <!-- Дата рождения -->
                            <div class="col-12">
                                <label class="form-label fw-bold">Дата рождения:</label>
                                <input
                                v-model="form.dateOfBirthday"
                                type="date"
                                class="form-control"
                                name="dateOfBirthday"
                                required
                                >
                            </div>

                            <!-- Пол -->
                            <div class="col-12">
                                <label class="form-label fw-bold">Пол:</label>
                                <div class="d-flex gap-3">
                                <div class="form-check">
                                    <input
                                    v-model="form.gender"
                                    class="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    required
                                    >
                                    <label class="form-check-label">М</label>
                                </div>
                                <div class="form-check">
                                    <input
                                    v-model="form.gender"
                                    class="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    >
                                    <label class="form-check-label">Ж</label>
                                </div>
                                </div>
                            </div>

                            <!-- Языки (multiple select) -->
                            <div class="col-12">
                                <label class="form-label fw-bold">Язык программирования:</label>
                                <select
                                v-model="form.languages"
                                class="form-select"
                                name="languages"
                                multiple
                                required
                                >
                                <option value="pascal">Pascal</option>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="javascript">JavaScript</option>
                                <option value="php">PHP</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="haskel">Haskel</option>
                                <option value="clojure">Clojure</option>
                                <option value="prolog">Prolog</option>
                                <option value="scala">Scala</option>
                                </select>
                            </div>

                            <!-- Биография -->
                            <div class="col-12">
                                <label class="form-label fw-bold">Биография:</label>
                                <textarea
                                v-model="form.bio"
                                class="form-control"
                                name="bio"
                                rows="4"
                                required
                                ></textarea>
                            </div>

                            <!-- Согласие -->
                            <div class="col-12">
                                <div class="form-check">
                                <input
                                    v-model="form.agreement"
                                    class="form-check-input"
                                    type="checkbox"
                                    name="agreement"
                                    required
                                >
                                <label class="form-check-label fw-bold">С контрактом ознакомлен(а)</label>
                                </div>
                            </div>

                            <!-- Кнопки в строку -->
                            <div class="col-12 d-flex gap-2">
                                <button
                                type="submit"
                                class="btn btn-dark"
                                :disabled="isSending"
                                >
                                {{ isSending ? 'Отправка...' : 'Сохранить' }}
                                </button>

                                <button
                                v-if="isSending"
                                type="button"
                                class="btn btn-danger"
                                @click="handleCancelSubmit"
                                >
                                Отменить
                                </button>
                            </div>

                            <!-- Статусы -->
                            <div class="col-12">
                                <p v-if="status === 'sent'" class="text-success mb-0">Сохранено!</p>
                                <p v-if="status === 'error'" class="text-danger mb-0">Ошибка: {{ error }}</p>
                                <p v-if="status === 'cancelled'" class="text-warning mb-0">{{ error }}</p>
                            </div>
                        </div>

                        <div class="col-12">
                            <RouterLink to="/allForms">
                                <button
                                type="button"
                                class="btn btn-light">
                                Получить все формы
                                </button>
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

    <map name="myMap">
        <area shape="rect" coords="0,0,100,50" href="http://www.kubsu.ru/" alt="Прямоугольник">
        <area shape="circle" coords="50,50,25" href="http://www.kubsu.ru/" alt="Круг">
    </map>
</template>

<style scoped>
    .list {
        background-color: #999;
    }

    .form {
        background: #999;
    }

    @media (max-width: 480px) {
        .table th, .table td {
            padding: 8px;
            font-size: 14px;
        }
    }
</style>