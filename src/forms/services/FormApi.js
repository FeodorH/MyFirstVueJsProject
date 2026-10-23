export class FormApi {
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
    const t = options.timeout ?? 30000
    this.timeout = t > 0 ? t : 0
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
    const controller = new AbortController()

    if (this.timeout > 0) {
      timeoutId = setTimeout(() => controller.abort(new Error("Timeout Exception")), this.timeout)
    }

    const onExternalAbort = () => { controller.abort(signal.reason) }
    if (signal) {
      signal.addEventListener('abort', onExternalAbort, { once: true })
    }

    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      if (res.status === 204) return null

      if (!res.ok) {
        let message = `HTTP ${res.status}`
        try {
          const body = await res.json()
          if (body.message) message = body.message
        } catch { }

        const error = new Error(message)
        error.status = res.status
        throw error
      }

      return res.json()
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
      if (signal) signal.removeEventListener('abort', onExternalAbort)
    }
  }

  /**
   * Получить все формы
   * @param {object} [opts] - опции вызова
   * @param {AbortSignal} [opts.signal] - сигнал для отмены
   * @returns {Promise<any>} - распарсенный ответ
   * @throws {Error} - при ошибке сети или HTTP
   */
  async getAll({ signal } = {}) {
    let timeout = null
    const controller = new AbortController()

    if (this.timeout > 0) {
      timeout = setTimeout(() => controller.abort(new Error("Timeout")), this.timeout)
    }

    const onExternalAbort = () => { controller.abort(signal.reason) }
    if(signal){
      signal.addEventListener("abort",onExternalAbort,{once:true})
    }

    try{
    const result = await fetch(
      this.endpoint,
      {
        method: "GET",
        headers: this.defaultHeaders,
        signal: controller.signal
      }
    )

    const body = await result.json()
    console.log(body);
    

    if(result.status === 204){
      return
    }

    if(!(result.status === 200)){
      const error = new Error(`HTTP ${result.status}`)
      error.status = result.status
      throw error
    }

    return body

    }finally{
      if(timeout)clearTimeout(timeout)
      if (signal) signal.removeEventListener('abort', onExternalAbort)
    }
  }
}