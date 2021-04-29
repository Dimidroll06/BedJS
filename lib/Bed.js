/**
 * @param  {Number} x x position from 0 to infinity
 * @param  {Number} y y position from 0 to infinity
 */
 var Vector2 = function(x=0, y=0){
    this.x = x;
    this.y = y;
    this.type = "Vector2";

    this.add = (a=0, b=0)=>{
        if(typeof a === 'object'){
            this.x+=a.x
            this.y+=a.y
        }else if(typeof a === 'number' && typeof b === 'number'){
            this.x+=a
            this.y+=b
        }

        return this
    }

    this.subtract = (a=0, b=0)=>{
        if(typeof a === 'object'){
            this.x-=a.x
            this.y-=a.y
        }else if(typeof a === 'number' && typeof b === 'number'){
            this.x-=a
            this.y-=b
        }

        return this
    }

    this.dvide = (a=0, b=0)=>{
        if(typeof a === 'object'){
            this.x/=a.x
            this.y/=a.y
        }else if(typeof a === 'number' && typeof b === 'number'){
            this.x/=a
            this.y/=b
        }

        return this
    }

    this.multiply = (a=0, b=0)=>{
        if(typeof a === 'object'){
            this.x*=a.x
            this.y*=a.y
        }else if(typeof a === 'number' && typeof b === 'number'){
            this.x*=a
            this.y*=b
        }

        return this
    }


    // Vector deep math

    //magnitude
    this.mag = ()=>{
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };

    //vector normilize
    this.normilize = ()=>{
        this.x = this.x!=0?this.x / Math.abs(this.x):0
        this.y = this.y!=0?this.y / Math.abs(this.y):0

        var mag = this.mag()

        if(mag!=0){
            this.dvide(mag, mag)
        }

        return this
    }
};
/**
 * @param  {Number} r Red from 0 to 255
 * @param  {Number} g Green from 0 to 255
 * @param  {Number} b Blue from 0 to 255
 */
var RGB = function(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
    this.type = "RGB";
};


/*=======================================*/
/*=======================================*/
/*=======================================*/


/**
 * @param  {Object} params
 */
var BedJS = function(params = {} ){
    
    var __canvas = document.createElement( 'canvas' ),
        __ctx    = __canvas.getContext( '2d' ),
        __inited = false;

    __canvas.width  = params.width  || 800;
    __canvas.height = params.height || 400;

    
    this.domElement = __canvas;
    this.context    = __ctx;
    this.FPS        = params.FPS || 20

    window.BedJS = this;
    
    //////=DEV=
    function WARN(toWarn){
        console.warn("WARNING in BedJS: "& toWarn);
    }
    
    
    
    var __layers = []
    
    var scroll = new Vector2(0, 0);
    /**
     * top-right corner position of main camera
     */
    this.scroll  = scroll;

    /**
     * change position of main camera
     * @param {Number} x 
     * @param {Number} y 
     */
    this.setScroll = (x, y)=>{
        scroll.x = x
        scroll.y = y
    }

    /**
     * change position x of main camera
     * @param {Number} x 
     */
    this.scrollX = (x)=>{
        scroll.x = x
    }
    /**
     * change position y of main camera
     * @param {Number} y 
     */
    this.scrollY = (y)=>{
        scroll.y = y
    }


    /**
     * new Bed.layer() - creates new layer to draw sprites
     * @param  {} params={} - how: "opacity" - (Number) from 0 to 1, "paralax" - (Vector2) from 0 to 1, "visible" - (Boolean) is layer drawing
     */
    this.layer = function(params = {}){
        
        this.paralax     = params.paralax      || new Vector2(1, 1);
        this.BGcolor     = params.BGcolor      || new RGB(255, 255, 255)

        this.opacity     = (typeof params.opacity === 'number'?params.opacity:1);
        this.transperent = (typeof params.transperent === 'boolean'?params.transperent:true);
        this.visible     = (typeof params.visible === 'boolean'?params.visible:true);
        
        
        this.sprites = []
        
        this.draw = ()=>{
            if(!this.transperent){
                __ctx.fillStyle = `RGBa( ${this.BGcolor.r}, ${this.BGcolor.g}, ${this.BGcolor.b}, ${this.opacity})`
                __ctx.fillRect(0, 0, __canvas.width, __canvas.height)
            }

            this.sprites.forEach(sprite => {
                if(typeof sprite.draw === 'function') sprite.draw()
                else {
                    WARN("some sprite haven't function 'draw'")
                    sprite.draw = ()=>{
                        return 
                    }
                }
            });
        }
        
        __layers.push(this)
        
    }

    /////* Sprites */
    
    /**
     * new Bed.rect() - creates rectangle
     * @param {layer}  layer  = sprite layer
     * @param {Object} params = { position: new Vector2(0, 0), size: new Vector2(100, 100), color: new RGB(255, 0, 0), opacity:1, visible:true}
     */
    this.rect = function(layer, params = { position: new Vector2(0, 0), size: new Vector2(100, 100), color: new RGB(255, 0, 0), opacity:1, visible:true}){
        
        this.layer = layer
        
        this.position = params.position || new Vector2(0, 0);
        this.size     = params.size     || new Vector2(100, 100);
        this.color    = params.color    || new RGB(255, 0, 0);
        this.opacity  = params.opacity  || 1;
        this.visible  = (typeof params.visible === 'boolean'?params.visible:true);
        
        /////Actions
        
        /**
         * Change position of rect
         * @param {Number} x - x position of rect
         * @param {Number} y - y position of rect
         */
        this.setPosition = (x, y)=>{
            this.position.x = x;
            this.position.y = y;
        }
        
        /**
         * Change size of rect
         * @param {Number} x - sprite width
         * @param {Number} y - sprite height
         */
        this.setSize = (x, y)=>{
            this.size.x = x;
            this.size.y = y;
        }

        this.moveToTop = ()=>{
            var move = this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            
            this.layer.sprites.push(move[0])
        }
        
        this.moveToBottom = ()=>{
            var move = this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            
            this.layer.sprites.unshift(move[0])
        }
        /**
         * Delete object from BedJS (not from variable)
         */
        this.delete = ()=>{
            this.layer.sprites.splice(this.layer.sprites.indexOf(this), 1);
            console.log(this.layer.sprites.indexOf(this))
        }
        
    ////Events
        var __spriteEveryTick = ()=>{};
        
        this.__everyTick = __spriteEveryTick
        
        /**
         * set everyTick function of rect
         * @param {Function} func 
         */
        this.everyTick = (func)=>{
            if(typeof func === 'function') __spriteEveryTick = func;
            else WARN('everyTick of rect can\'t be a '&typeof func);
        }

        var __spriteAfterDraw = ()=>{};

        this.__everyTick = __spriteAfterDraw

        /**
             * set afterDrawSprite function of rect
             * @param {Function} func 
         */
        this.afterDraw = (func)=>{
            if(typeof func === 'function') __spriteAfterDraw = func;
            else WARN('everyTick of rect can\'t be a '&typeof func);
        }

        ////Draw
        this.draw = ()=>{
            //etick
            __spriteEveryTick();

            //draw
            __ctx.fillStyle = `RGBa(${this.color.r}, ${this.color.g}, ${this.color.b}, ${(this.opacity+this.layer.opacity)/2})`;
            __ctx.fillRect( this.position.x + (this.layer.paralax.x * scroll.x) , this.position.y + (this.layer.paralax.y * scroll.y), this.size.x, this.size.y );
            //aDraw
            __spriteAfterDraw()
        }

        layer.sprites.push(this)
    }
/////* Plugin loader */

    var _plugins = {}

    this.pluginLoad = (plugin_func, plugin_name)=>{
        var Name = plugin_name[0].toUpperCase()+plugin_name.slice(1, plugin_name.length-2)
        _plugins[Name] = plugin_func( window.BedJS )
    }

    this.plugin = (pluginName)=>{
        var Name = pluginName[0].toUpperCase()+pluginName.slice(1, pluginName.length-2)
        return _plugins[Name]
    }


/////* Main loops */

    __everyTick = [];

    /**
     * @param {Function} func - function to call every tick
     */
    this.everyTick = (func)=>{
        if(typeof func === 'function') __everyTick.push(func)
        else WARN(func&" - is not function. In everyTick")
    }

    /**
     * clear all everyTick functions
     */
    this.clearEveryTick = ()=>{
        __everyTick = []
    }

    /**
     * Start main loops and begin draw
     */
    this.init = function(){
        __inited = true;
    }


////Main draw
    setInterval(() => {
        if(__inited){
            __ctx.clearRect(0, 0, __canvas.width, __canvas.height);
    
            __everyTick.forEach(_func => {
                _func()
            });

            __layers.forEach(_layer => {
                _layer.draw()
            });
        }

    }, 1000 / this.FPS);


};

