
//MOUSE
var mx = 0
var my = 0
var canv = undefined

function setCanv(canvas){
    canv = canvas
}

function getMousePosition(){
    if(canv != undefined){
        return new Vector2(mx, my)
    }else return new Vector2(0, 0)
}

function setCursorType(type){
    if(canv != undefined){
        canv.style.cursor = type
    }
}

window.addEventListener('mousemove', e=>{
    if(canv != undefined){
        var rect = canv.getBoundingClientRect()
        my = (e.clientY - rect.top)/(rect.bottom-rect.top)*HEIGHT
        mx = (e.clientX - rect.left)/(rect.right-rect.left)*WIDTH
    }
})


//STRING

function choose(arrToChose=[]){
    var index = Math.floor(Math.random() * arrToChose.length)
    return arrToChose[index]
}