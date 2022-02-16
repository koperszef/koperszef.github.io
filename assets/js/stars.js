const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const text = document.querySelector('.text')
const title = document.querySelector('.title')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


addEventListener('resize', () => {

  init()
})


//Add the light trail when the mouse is down
let mousedown = false
addEventListener('mousedown', () => {
  mousedown = true
})
addEventListener('mouseup', () => {
  mousedown = false
})


// class particles
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //Add glow effect
    c.shadowColor = this.color
    c.shadowBlur = 15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation : 1- Population of the canvas with random particles 
let particles
function init() {
  particles = []

  for (let i = 0; i < 1500; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 1000

    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = Math.random() * 3
    const color = colors[Math.floor(Math.random() * 4)]
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop : 1 
let radians = 0
let alpha = 1

function animate() {
  requestAnimationFrame(animate)
  //Add background
  c.fillStyle = `rgba(22,22,22,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)

  //Rotating the background at his center
  c.save()
  c.translate(canvas.width /2, canvas.height /2)
  c.rotate(radians)
  //Draw the stars
  particles.forEach(particle => {
    particle.update()
  })
  c.restore()
  radians += 0.003

  //Trail effect
  if (mousedown && alpha >= 0.03) {
    alpha -= 0.01
    radians +=0.002
  } else if (!mousedown && alpha < 1) {
    alpha += 0.001
    radians -=0.002
  }
}

init()
animate()