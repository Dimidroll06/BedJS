# BedJS
 bedsJS is the open source library to draw on canvas
 
 LANGUAGUES:
 [Russian](https://github.com/Dimidroll06/BedJS/blob/main/README.md#Russian)
 [English](https://github.com/Dimidroll06/BedJS/blob/main/README.md#English)


# English

## Basics

BedJS is written to a variable this way

```js
var Bed = new BedJS({});
```

Now we can add canvas to our page. To do this, write the following code

```js
document.body.appendChild(Bed.domElement);
```
To start rendering, we must let the library know that the preparatory stage is over. To do this, we write the following function

```js
Bed.start()
```

As a result, we should get this code.
```js
var Bed = new BedJS({});
document.body.appendChild(Bed.domElement);

Bed.start();
```

# Russian

## Базовые настройки

BedJS должен хранится в переменной как конструктор

```js
var Bed = new BedJS({});
```
Теперь, когда мы создали экземпляр BedJS, мы можем добавить canvas на наш сайт

```js
document.body.appendChild(Bed.domElement);
```

Чтоб BedJS начал отрисовывать, нам надо сообщить ему, что подготовка завершенна и можно отрисовывать. Для этого прописываем функцию

```js
Bed.start()
```

В конце концов у вас должен получится следующий код

```js
var Bed = new BedJS({});
document.body.appendChild(Bed.domElement);

Bed.start();
```
