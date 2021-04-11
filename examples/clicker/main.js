var Bed = new BedJS({
    width:  WIDTH,
    height: HEIGHT
});
document.getElementById('back').appendChild(Bed.domElement)
Bed.domElement.classList.add('canv')
Bed.domElement.id = 'canv'

setCanv(Bed.domElement)

Bed.init();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Bed.pluginLoad(textBedJS,  "txt");
Bed.pluginLoad(ImageBedJS, "image");
const txt = Bed.plugin("txt");
const image = Bed.plugin("image");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var Layers = {}
Layers["BG"] = new Bed.layer({
    paralax:     new Vector2(1, 1),
    BGcolor:     new RGB(180, 200, 255),
    opacity:     1,
    transperent: false,
    visible:     true

});
Layers["Clicker"] = new Bed.layer({
    paralax:     new Vector2(1, 1),
    opacity:     1,
    transperent: true,
    visible:     true
});
Layers["UI"] = new Bed.layer({
    paralax:     new Vector2(1, 1),
    opacity:     1,
    transperent: true,
    visible:     true
});

//~~~~~~~~~~~SPRITES~~~~~~~~~~~~~~~~~~~~~~~~

//Тот спрайт куда мы будем кликать
var clicker = new image(Layers["Clicker"], {
    src: "./graphics/Aliens/alienGreen_round.png",
    size: new Vector2(120, 120),
    position: new Vector2( (WIDTH/2)-(120/2), (HEIGHT/2)-(120/2)  )
})
//Info about collisions: https://github.com/jriecken/sat-js
clicker.mesh = new SAT.Circle(new Vector2(clicker.position.x + 120/2, clicker.position.y + 120/2 ), 120/2);


//Текст показывающий количество монет
var CoinsCount = new txt(Layers["BG"], {
    words:"120",
    color: new RGB(255, 255, 255),
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "courier new"
})







//~~~~~~~~~~GAME~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var coins = 0
var coinsPerSec = 0

//eTick
Bed.everyTick(()=>{
    CoinsCount.words = coins
})
//eSec
setInterval(()=>{
    coins+=coinsPerSec
}, 1000)


//~~Add moneys
window.addEventListener('mousemove', e=>{
    if( SAT.pointInCircle(getMousePosition(), clicker.mesh) ){
        setCursorType('pointer')
    }else setCursorType('')
})
window.addEventListener('mousedown', e=>{
    if( SAT.pointInCircle(getMousePosition(), clicker.mesh) ) {
        clicker.position.x-=10
        clicker.position.y-=10
        clicker.size.x+=20
        clicker.size.y+=20
        coins++
        setCursorType('grab')
        clicker.image.src = choose([
            "./graphics/Aliens/alienGreen_round.png", 
            "./graphics/Aliens/alienBeige_round.png", 
            "./graphics/Aliens/alienPink_round.png", 
            "./graphics/Aliens/alienYellow_round.png", 
            "./graphics/Aliens/alienBlue_round.png"
        ])
    }
})
window.addEventListener('mouseup',()=>{
    clicker.size = new Vector2(120, 120)
    clicker.position = new Vector2( (WIDTH/2)-(120/2), (HEIGHT/2)-(120/2)  )
    if( SAT.pointInCircle(getMousePosition(), clicker.mesh) ){
        setCursorType('pointer')
    }else setCursorType('')
})

