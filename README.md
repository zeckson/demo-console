# Псевдо-Консоль
Вывод лога Консоли в DOM-дерево.

## Подключение

```html
<div class="console-container"></div>

<script src="https://rawgit.com/htmlacademy/console-stub/master/lib/index.js"></script>

<script>
 var jsConsole = jsConsoleInit(document.querySelector('.console-container'));
 console.log = jsConsole.log;
</script>
```
