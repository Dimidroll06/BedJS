function textBedJS(BedPlug){
    return function(Layer, params={}){
        var Bed = BedPlug;
        var __ctx = Bed.context;
        var redy = false;

        this.layer = Layer;

        this.words      = params.words || 'Hello BedJS';
        this.fontFamily = params.fontFamily || 'Arial';
        this.fontSize   = params.fontSize   || 18;
        this.fontWeight = params.fontWeight || 'normal';
        
        this.position  = params.position || new Vector2(18, 18);
        this.color     = params.color    || new RGB(0, 0, 0);
        this.opacity   = params.opacity  || 1;
        this.visible   = (typeof params.visible === 'boolean'?params.visible:true);
        
        /////Actions
        
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
        
        this.__spriteEveryTick = __spriteEveryTick
        
        /**
         * set everyTick function of rect
         * @param {Function} func 
         */
        this.everyTick = (func)=>{
            if(typeof func === 'function') __spriteEveryTick = func;
            else WARN('everyTick of rect can\'t be a '&typeof func);
        }

        var __spriteAfterDraw = ()=>{};
        this.__spriteAfterDraw = __spriteAfterDraw
        /**
         * set __spriteAfterDraw function of rect
         * @param {Function} func 
         */
        this.afterDraw = (func)=>{
           if(typeof func === 'function') __spriteAfterDraw = func;
           else WARN('__spriteAfterDraw of rect can\'t be a '&typeof func);
        }

        ////Draw
        this.draw = ()=>{
            //etick
            __spriteEveryTick();

            //draw
            __ctx.textAlign    = "left";
            __ctx.textBaseline = "top";
            __ctx.fillStyle    = `RGBa(${this.color.r}, ${this.color.g}, ${this.color.b}, ${(this.opacity+this.layer.opacity)/2})`;
            __ctx.font         = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;

            __ctx.fillText(this.words, this.position.x, this.position.y)

            //aDraw
            __spriteAfterDraw()
        }

        this.layer.sprites.push(this)
    }
}