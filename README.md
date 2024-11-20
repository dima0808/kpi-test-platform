## Інструкція зі збірки та запуску

1. **Клонуйте репозиторій собі на комп'ютер**:
   
    ```bash
    git clone https://github.com/dima0808/kpi-test-platform.git
    ```

### Backend

Перейдіть у папку backend

2. **Збірка проєкту**:
   Завантажте залежності
   
   ```bash
   mvn dependency:resolve
   ```

4. **Запуск**:
   
   ```bash
   mvn spring-boot:run
   ```

### Frontend

Перейдіть у папку frontend

4. **Збірка проєкту**:
   Завантажте залежності
   
   ```bash
   npm install
   ```

6. **Запуск**:
   ```bash
   npm start
   ```
