const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const particlesArray = []
let hue = 0

canvas.width = innerWidth
canvas.height = innerHeight

window.addEventListener("resize",()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

canvas.addEventListener("mousemove",e=>{
    mouse.x = e.x
    mouse.y = e.y

    for (let i = 0; i < 5; i++) {
        const p = new particle()
        particlesArray.push(p)
    }
})
canvas.addEventListener("click",e=>{
    mouse.x = e.x
    mouse.y = e.y

    for (let i = 0; i < 5; i++) {
        const p = new particle()
        particlesArray.push(p)
    }
})

//mouse
const mouse = {
    x:undefined,
    y:undefined
}

//particle
const particle = function(){

    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random()*15+1
    this.velocityX = Math.random()*3-1.5
    this.velocityY = Math.random()*3-1.5
    this.color = `hsl(${hue}, 100%, 50%)`
    
    this.update = function(){
        this.x += this.velocityX
        this.y += this.velocityY
        if(this.size > 0.4) this.size -= 0.1
    }
    this.draw = function(){
        c.strokeStyle = this.color
        c.lineWidth = 2
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI*2)
        c.stroke()
    }
}

function animate(){
    c.fillStyle = "rgba(0,0,0,0.09)"
    c.fillRect(0,0,canvas.width,canvas.height)
    
    // particlesArray.forEach((el,index)=>{
    //     el.update()
    //     el.draw()
    //     if(el.size >= 0.2 ){
    //         particlesArray.slice(index, 1)
    //         index--
    //     }
    // })

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

        if(particlesArray[i].size <= 0.5 ){
                particlesArray.splice(i, 1)
                i--
                for (let j = i; j < particlesArray.length; j++) {
                    

                    try {
                        const dx = particlesArray[i].x-particlesArray[j].x
                        const dy = particlesArray[i].y-particlesArray[j].y
                        const distance = Math.sqrt(dx*dx+dy*dy)
                        
                        if(distance<100){
                            c.beginPath()
                            c.moveTo(particlesArray[i].x, particlesArray[i].y)
                            c.lineTo(particlesArray[j].x, particlesArray[j].y)
                            c.stroke()
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
                }
        } 
    }

    hue++
    requestAnimationFrame(animate)
}
animate()