var BedJS = function(params = {}){
    //canvas
    var canvas = document.createElement('canvas')
    canvas.width = params.width || 600;
    canvas.height = params.height || 400;
    //context
    var ctx = canvas.getContext('2d');
    //dom element
    this.domElement = canvas
    this.context = ctx


    //other
    var FPS = 20 || params.FPS,
        inited = false

    //===vec2 func====
    this.vec2 = (x, y)=>{
        return {
            x: x,
            y: y
        }
    }

    //=========Layers==============
    var Layers = []

    this.layer = function(params = {}){
        /*
            Params - {} objects
            can have parameters how:

            transperent = true: is layer background transperent or not
            backgroundColor = 'rgb(255,255,255)': background color of layer
            visible = true
        */
        if(params.transperent != undefined) this.transperent = params.transperent
        else this.transperent = true

        this.backgroundColor = (params.backgroundColor != undefined)?params.backgroundColor:'rgb(255,255,255)'

        if(params.visible != undefined) this.visible = params.visible
        else this.visible = true

        this.sprites = []


        this.draw = ()=>{
            //if layer visible
            if(this.visible){
                //if not transperent
                if(!this.transperent){
                    //fill canvas with self BG color
                    ctx.fillStyle = this.backgroundColor
                    ctx.fillRect(0,0,canvas.width,canvas.height)

                }
                //for each sprites
                this.sprites.forEach(sprite => {
                    //draw sprite
                    sprite.draw()

                });
        }}

        //push this to layers array
        Layers.push(this)
    }

    //==========sprites============
    //rect
    this.rect = function(lay, params={}){
        this.x = (params.x!=undefined)?params.x:0
        this.y = (params.y!=undefined)?params.y:0
        this.width = (params.width!=undefined)?params.width:100
        this.height = (params.height!=undefined)?params.height:100
        
        this.color = (params.color!=undefined)?params.color:'black'

        this.visible = (params.visible!=undefined)?params.visible:true

        this.draw= ()=>{
            if(this.visible){
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.width, this.height)
            }
            
        }

        lay.sprites.push(this)
    }

    //image
    this.image = function(lay,params={}){
        /*
            new Bed.image(layer, {})

            params is object with parameters such as:
            x : 0,
            y : 0,
            size : 100 - size in %,
            image : './lib/logo.png',
            visible : true
        */

        this.x = (params.x!=undefined)?params.x:0
        this.y = (params.y!=undefined)?params.y:0
        this.size = (params.size!=undefined)?params.size:100

        this.image = new Image()
        this.image.src = (params.image != undefined)?params.image: './lib/logo.png'
        
        this.visible = (params.visible!=undefined)?params.visible:true

        
        var currentAnimation = 'default'
        var currentFrame = 0;
        var spriteSheetImg = new Image()
        var ticks = 0;
        var horizontalElementsCount = 1;
        var verticalElementsCount = 1;
        
        var Animations = {};
        
        
        this.spriteSheet = (spriteSheetSrc, horizontalElements=2, verticalElements=2) => {
            spriteSheetImg.src = spriteSheetSrc;
            
            horizontalElementsCount = horizontalElements;
            verticalElementsCount = verticalElements;
            currentFrame = 0
        }

        this.newAnimation = (animationName = 'newAnimation', frames = [[0,0],[1,0]], speed = 5) => {
            var anim = {}
            if(typeof Animations[animationName] !== 'undefined' || animationName == 'default'){
                console.error('BedJS: animation with name '+animationName+' already used')
                return null 
            } 

            anim.frames = frames
            anim.speed = speed
            
            Animations[animationName] = anim
        }
        
        this.setAnimation = (animationName = 'default')=>{
            if(typeof Animations[animationName] !== 'undefined' || animationName == 'default') {
                currentAnimation = animationName
                currentFrame = 0
                ticks = 0
            }
            else console.error('BedJS: animation "'+animationName+'" is undefinded')
        }
        
        
        this.draw = ()=>{
            
            
            if(this.visible) {
                if(currentAnimation == 'default') {
                    ctx.drawImage(this.image, this.x, this.y, this.image.width * (this.size/100), this.image.height * (this.size/100))
                } 
                else{
                    var curAnimArr = Animations[currentAnimation]
                    var curAnimFramesArr = Animations[currentAnimation].frames

                    //frames
                    ticks++
                    if(ticks == curAnimArr.speed){
                        if( currentFrame >= curAnimFramesArr.length - 1){
                            currentFrame = 0
                        }else if( currentFrame != curAnimFramesArr.length - 1) currentFrame++
                        
                        ticks = 0
                    }


                    var x = curAnimFramesArr[currentFrame][0];
                    var y = curAnimFramesArr[currentFrame][1];
                    

                    ctx.drawImage(spriteSheetImg,
                        x*(spriteSheetImg.width/horizontalElementsCount), y*(spriteSheetImg.height/verticalElementsCount),
                        (spriteSheetImg.width/horizontalElementsCount), (spriteSheetImg.height/verticalElementsCount),
                        this.x, this.y, 
                        (spriteSheetImg.width/horizontalElementsCount) * (this.size/100), (spriteSheetImg.height/verticalElementsCount) * (this.size/100)
                        )

                    console.log()
                    }
                }
        }
        lay.sprites.push(this)
    }
    
    //text
    this.text = function(lay,params={}){
        /*
        new Bed.text( layer, {} )

            params is object with parameters such as:
            x : 0,
            y : 0,
            color : 'black', 
            words : 'Hello BedJS!',
            font : 'Arial',
            fontStyle : 'normal', - normal || italic e.c.
            fontWeight : 'normal',
            size : 18 - in pixels
        */

        this.x = params.x || 0
        this.y = params.y || 0
        this.words = params.words || 'Hello BedJS!'
        this.color = params.color || 'black'
        this.font = params.font || 'Arial'
        this.fontStyle = params.fontStyle || 'normal'
        this.fontWeight = params.fontWeight || 'normal'
        this.size = params.size || 18


        this.draw = function(){
            ctx.textBaseline = "top"
            ctx.fillStyle = this.color
            ctx.font = this.fontStyle+' '+this.fontWeight+' '+this.size+'px '+this.font

            ctx.fillText(this.words, this.x, this.y)
        }

        lay.sprites.push(this)
    }

    //loops 
    var everyTick = [],
        whenStart = [];

    this.everyTick = func=>{
        if(typeof func === 'function') everyTick.push(func)
        else console.error("BedJS : Bed.everyTick takes function as param, not a '"+typeof func+"'")
    }
    this.clearEveryTick = ()=>{
        everyTick = []
    }

    this.whenStart = func=>{
        if(typeof func === 'function') whenStart.push(func)
        else console.error("BedJS : Bed.whenStart takes function as param, not a '"+typeof func+"'")
    }
    this.whenStart = ()=>{
        everyTick = []
    }



    //init
    this.start = ()=>{
        inited = true
        console.log('===========================\nHello from BedJS community!\n===========================')
        whenStart.forEach(func => {
            func()
        });
    }
    
    //==========draw functions==============
    this.time = 0

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if(inited){
            Layers.forEach(lay => {
                lay.draw()
            });

            everyTick.forEach(func => {
                func()
            });

        }
        
        this.time+=1/FPS
        
        
    }, 1000/FPS);

};
