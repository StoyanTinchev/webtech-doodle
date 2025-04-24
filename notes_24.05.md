# Ноутове от среща 24.05.2025 😄


## Правим **Doodle**,  
**НЕ** Google Calendar с event-и.

---

### Роси

Създаваш си бранч през issue-то: https://github.com/StoyanTinchev/webtech-doodle/issues/5

Трябва да направиш една страница, която да съдържа текстови полета:
- `title` – заглавие на събитието
- `ownerName` – име на хоста на събитието
- `description` – описание на събитието *(optional)*

Трябва да направиш **datePicker** за дати `dateFrom`, `dateTo`

*Ако ти се занимава*: Да направиш с текстови полета или с часовник или каквато визуализация си избереш за цели часове `hourFrom`, `hourTo`

**Бутон:** "Create event" – изпраща POST заявка:

```http
POST {{host}}/api/meetings
Content-Type: application/json

{
  "title": "Team Sync",
  "ownerName": "Alice",
  "dateFrom": "2025-05-01",
  "dateTo": "2025-05-05"
}
```

---

### Лидка

Създаваш си бранч през issue-то: https://github.com/StoyanTinchev/webtech-doodle/issues/6  
<br>

Получава информация за целия ивент:
```http
GET {{host}}/api/meetings/{{meetingId}}
```

**Примерен резултат, ако е изпълнена горната заявка от Роси:**
```json
{
  "meeting": {
    "id": "65f89770-de79-4045-bdea-2df811a3fe6d",
    "title": "Team Sync",
    "ownerName": "Alice",
    "dateFrom": "2025-05-01",
    "dateTo": "2025-05-05",
    "optionIds": []
  },
  "votesSummary": []
}
```

`votesSummary` параметърът е празен масив, тоест в момента няма създадени опции, така че трябва да се покаже празен екран с един бутон **"Add option"**

При натискане на **"Add option"** се отваря диалогов прозорец или се показват полетата (каквото избереш):
- `datePicker`, ограничен от `"dateFrom": "2025-05-01", "dateTo": "2025-05-05",`
- `hour` – текстово поле или падащо меню с часове (0-23)
- бутон **"Create"**:

При натискане на бутон **"Create"**:
```http
POST {{host}}/api/meetings/{{meetingId}}/options
Content-Type: application/json

{
  "date": "2025-05-02",
  "hour": 14
}
```
<br>

След това отново се извиква първата заявка - информация за целия ивент:
```http
GET {{host}}/api/meetings/{{meetingId}}
```

**С примерите до тук, връща резултат:**
```json
{
  "meeting": {
    "id": "65f89770-de79-4045-bdea-2df811a3fe6d",
    "title": "Team Sync",
    "ownerName": "Alice",
    "dateFrom": "2025-05-01",
    "dateTo": "2025-05-05",
    "optionIds": [
      "cbdee60a-b63f-432e-a840-af4eac96efc1"
    ]
  },
  "votesSummary": [
    {
      "option": {
        "id": "cbdee60a-b63f-432e-a840-af4eac96efc1",
        "meetingId": "65f89770-de79-4045-bdea-2df811a3fe6d",
        "date": "2025-05-02",
        "hour": 14
      },
      "count": 0
    }
  ]
}
```
⬆️ Тоест вече има една зададена времева опция, която все още никой не е гласувал за нея, защото `"count": 0`  
<br>

Гласуване за опцията:
```http
POST {{host}}/api/meetings/{{meetingId}}/votes
Content-Type: application/json

{
  "optionId": "{{optionId}}",
  "userName": "Bob"
}
```
<br>

След това отново се извиква заявката за информацията за целия ивент:
```json
{
  "meeting": {
    "id": "65f89770-de79-4045-bdea-2df811a3fe6d",
    "title": "Team Sync",
    "ownerName": "Alice",
    "dateFrom": "2025-05-01",
    "dateTo": "2025-05-05",
    "optionIds": [
      "cbdee60a-b63f-432e-a840-af4eac96efc1"
    ]
  },
  "votesSummary": [
    {
      "option": {
        "id": "cbdee60a-b63f-432e-a840-af4eac96efc1",
        "meetingId": "65f89770-de79-4045-bdea-2df811a3fe6d",
        "date": "2025-05-02",
        "hour": 14
      },
      "count": 1
    }
  ]
}
```

---

### Митко

Създаваш си бранч през issue-то: https://github.com/StoyanTinchev/webtech-doodle/issues/4

- Съгласува цветова схема с Роси и Лидия – избягване на несъответствия (напр. лилаво срещу зелено).
- Примерен backend за автентикация: https://github.com/dndonev/fmi-webtech-2024/tree/main/week10/2.%20example-project

---

### Оля

Създаваш си бранч през issue-то: https://github.com/StoyanTinchev/webtech-doodle/issues/1

- Модели: https://github.com/StoyanTinchev/webtech-doodle/blob/feature/3-be-server-prototype-core-api/src/models/types.ts
- Използвай същите релации и структура на директории, както е дадено в issue-то.

