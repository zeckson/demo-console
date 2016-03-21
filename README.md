[![Build Status](https://travis-ci.org/htmlacademy/console-stub.svg?branch=master)](https://travis-ci.org/htmlacademy/console-stub)

# Псевдо-Консоль
Вывод лога Консоли в DOM-дерево.

## Подключение

```html
<div class="console-container"></div>

<style> @import url('//htmlacademy.github.io/console-stub/lib/index.css'); </style>
<script src="//htmlacademy.github.io/console-stub/lib/index.js"></script>

<script>
 var jsConsole = jsConsoleInit(document.querySelector('.console-container'));
 console.log = jsConsole.log;
</script>
```

## Пример
Для запуска примера наберите в терминале `npm run examples` и откройте в браузере страницу <http://localhost:8080/examples>.

### Код
```js
console.log(undefined);

console.log(NaN);

console.log(null);

console.log(true);

console.log(100);

console.log('Here is console log');

console.log("current year: ", (new Date()).getFullYear());

console.log([
  {key1: 'value1'},
  {key2: 'value2'}
]);
```

### Вывод лога
![Пример лога](log_example.png)
