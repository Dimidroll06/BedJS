# BedJS
 bedsJS is the open source library to draw on canvas
 
 LANGUAGUES:
 [Russian](https://github.com/Dimidroll06/BedJS/blob/main/README.md#Russian)
 [English](https://github.com/Dimidroll06/BedJS/blob/main/README.md#English)


BedJS 0.3:
* Image animations
* Console notification that BedJS started
* Fixed Bugs 


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

## Layers
Layers in BedJS are created through the constructor:

```js
var Layer = new Bed.layer();
```

The constructor takes obj as an optional parameter

Obj itself can be written
```js
Bed.layer({
    transperent: true,
    backgroundColor: 'white',
    visible: true
});
```

* transperent - whether the background of the layer is transparent
* backgroundColor - background color (if transperent = false)
* visible - whether the layer is rendered

All parameters can be changed in real time
Example:

```js
var Layer1 = new Bed.layer()

Layer1.backgroundColor = '#ff2'
Layer1.transperent = false
```

## Sprites
There are several types of sprites in BedJS:

### Rect

```js
var rect = new Bed.rect(lay);
```

rect is the constructor taking the layer and obj as an optional parameter

obj itself can be written:

```js
Bed.rect(Layer1, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    color: 'black',
    visible: true
});
```

* x - float, position x
* y - float, y position
* width - float, width
* height - float, height
* color - string, accepts css-style color, ('red', '# fff', '# ffff33', '# ffff3310', 'rgb (255,255,255)', 'rgba (255,255,255,1)')
* visible - bool, accepts true or false, if true - the sprite is rendering, false - not rendering

All parameters can be changed in real time
Example:

```js
var rect = new Bed.rect();
Bed.everyTick(()=>{
    rect.x++
});
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

## Слои
Слои в BedJS создаются через конструктор:

```js
var Layer = new Bed.layer();
```

Конструктор принимает obj как не обязательный параметр

В самом obj могут быть записанны
```js
Bed.layer({
    transperent: true,
    backgroundColor: 'white',
    visible: true
});
```

* transperent - прозрачный ли фон у слоя
* backgroundColor - цвет фона(если transperent = false)
* visible - отрисовывается ли слой

Все параметры могут быть измененны в реальном времени
Пример:

```js
var Layer1 = new Bed.layer()

Layer1.backgroundColor = '#ff2'
Layer1.transperent = false
```

## Спрайты
Существует несколько видов спрайтов в BedJS:

### Rect

```js
var rect = new Bed.rect(lay);
```

rect это конструктор принимающий слой и obj как необязательный параметр

в сам obj могут быть записанны:

```js
Bed.rect(Layer1, {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    color: 'black',
    visible: true
});
```

* x - float, позиция x
* y - float, позиция y
* width - float, ширина
* height - float, высота
* color - string, принимает цвет в стиле css, ( 'red' ,'#fff', '#ffff33', '#ffff3310', 'rgb(255,255,255)', 'rgba(255,255,255,1)' )
* visible - bool, принимает true или false, если true - спрайт отрисовывается, false - не отрисовывается

Все параметры могут изменятся в реальном времени
Пример:

```js
var rect = new Bed.rect();
Bed.everyTick(()=>{
    rect.x++
});
```
