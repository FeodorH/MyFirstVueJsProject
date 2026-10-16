export class FormSubmitter {
  /**
   * @param {string} endpoint - URL эндпоинта
   * @param {object} [options] - опции по умолчанию
   * @param {object} [options.headers] - заголовки
   * @param {number} [options.timeout] - таймаут в мс
   */
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    this.timeout = options.timeout ?? 30000
    this.controller = null
  }

  /**
   * Отправить данные формы
   * @param {object} data - данные формы
   * @param {object} [opts] - опции вызова
   * @param {AbortSignal} [opts.signal] - сигнал для отмены
   * @returns {Promise<any>} - распарсенный ответ
   * @throws {Error} - при ошибке сети или HTTP
   */
  async submit(data, { signal } = {}) {
    let timeoutId = null

    if (!signal && this.timeout > 0) {
      this.controller = new AbortController()
      timeoutId = setTimeout(() => controller.abort(), this.timeout)
      signal = this.controller.signal
    }

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify(data),
        signal,
      })

      if (res.status === 204) return null

      if (!res.ok) {
        let message = `HTTP ${res.status}`
        try {
          const body = await res.json()
          if (body.message) message = body.message
        } catch {}

        const error = new Error(message)
        error.status = res.status
        throw error
      }

      return res.json()
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }

  deny(){
    if(this.controller){
      this.controller.abort()
    }
  }
}