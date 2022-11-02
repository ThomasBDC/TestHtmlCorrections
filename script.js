import * as THREE from "https://unpkg.com/three@0.123.0/build/three.module.js"
// import * as THREE from "./three.min.js" 

var c= document.getElementById("3dim")
c.setAttribute('width',window.innerWidth)
c.setAttribute('height',window.innerHeight) 

const ctx= c.getContext('webgl')
const w=c.getAttribute('width')
const h=c.getAttribute('height') 

const scene = new THREE.Scene()
const camera= new THREE.PerspectiveCamera(80,w/h,0.1,1000)
camera.position.set(6,2,5) 
const lumix= new THREE.SpotLight(0xFFFFFF,1,50,Math.PI,0) 
//const lumix= new THREE.AmbientLight()

lumix.position.set( 0, 2, 0 )
scene.add(lumix)
const rendu= new THREE.WebGLRenderer({canvas:c})
rendu.setClearColor('#11385b')
let stars = [];

createStars(500)
rendu.render(scene,camera)

animateStars();

function randomFunction(min,max){
    return Math.random() * (max-min+1)+min  
}
    
//Pluie d'étoile
function createStars(nb){
    let starGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 6);
    let starMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

    for (let i = 0; i < nb; i++) {
        let star = new THREE.Mesh(starGeometry, starMaterial);
        star.rotateX(90 * Math.PI / 180);
        setStarToRandomPosition(star)
        stars.push(star);
        scene.add(star);
    }

}

function getRandomNumber()
{
    return Math.random() * Math.floor(10);
}

function setStarToRandomPosition(star)
    {
        star.position.set(getRandomNumber(), getRandomNumber(), getRandomNumber() - 10);
    }
        
function animateStars(){
    
    for(let i in stars) {
        stars[i].position.z += 0.15;
        if (stars[i].position.z > camera.position.z) {
            setStarToRandomPosition(stars[i]);
        }
    }
    
    rendu.render(scene,camera)
    requestAnimationFrame(animateStars)
}
        
    



