var BedJS = function(params = {}){
    //canvas
    var canvas = document.createElement('canvas')
    canvas.width = params.width || 600;
    canvas.height = params.height || 400;
    //context
    var ctx = canvas.getContext('2d');
    //dom element
    this.domElement = canvas

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
        this.x = (params.x!=undefined)?params.x:0
        this.y = (params.y!=undefined)?params.y:0
        this.size = (params.size!=undefined)?params.size:100

        this.image = new Image()
        this.image.src = (params.image != undefined)?params.image: './lib/logo.png'
        
        this.visible = (params.visible!=undefined)?params.visible:true

        this.draw = ()=>{
            if(this.visible) ctx.drawImage(this.image, this.x, this.y, this.image.width * (this.size/100), this.image.height * (this.size/100))
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
        whenStart.forEach(func => {
            func()
        });
    }

    //==========draw functions==============
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
        
        
    }, 1000/FPS);

}