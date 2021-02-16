[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![MIT License][license-shield]][license-url]

<img src="public/logo192.png" align="right" />

# Карта московских общественных туалетов

Карта стационарных общественных туалетов, находящхся на балансе Департамента жилищно-коммунального хозяйства города Москвы, расположенные в пределах установленных границ города Москвы.

Данные загружаются с [data.mos.ru](https://data.mos.ru/opendata/7701236617-statsionarnye-obshchestvennye-tualety). Внутри CRA и Leaflet.js.



## Запуск

Зарегистрируйтесь и получите ключ доступа к API открытых данных на сайте [apidata.mos.ru](https://apidata.mos.ru/).

Добавьте его в .env:

```bash
$ echo "REACT_APP_MOS_RU = YOUR_API_KEY" >> .env
```

Затем все, как обычно:

```bash
$ npm i
[...]
$ npm run start
```


Приложение запускается по адресу [http://localhost:3000](http://localhost:3000).



Развернуто с помощью [Create React App](https://github.com/facebook/create-react-app).
