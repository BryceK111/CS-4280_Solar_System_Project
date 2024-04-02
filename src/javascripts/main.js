// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { sinusoidal, checkerboard, somePattern} from '../../../../../../Documents/GitHub/spring24_cs4280_inclass/src/javascripts/textures'
import { MTLLoader, OBJLoader} from 'three-obj-mtl-loader' // material and object loaders

// First: Set up your name
let std_name = "Bryce Johnson"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else

export function SolarSystem(){
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    let texLoader = new THREE.TextureLoader()
    let textures = {
        'sun': texLoader.load('./images/sun.jpg', function(){
            renderer.render(scene, camera)
        }),
        'earth': texLoader.load('./images/earth.jpg', function(){
            renderer.render(scene, camera)
        }),
        'moon': texLoader.load('./images/moon.jpg', function(){
            renderer.render(scene, camera)
        })
    }

    // Objects
    let sun = new THREE.Mesh(new THREE.SphereBufferGeometry(50, 40, 40), new THREE.MeshStandardMaterial())
    sun.name = 'sun'
    sun.material.map = textures[sun.name]

    let earth = new THREE.Mesh(new THREE.SphereBufferGeometry(25, 40, 40), new THREE.MeshStandardMaterial())
    earth.name = 'earth'
    earth.material.map = textures[earth.name]
    earth.position.set(150, 0, 0)
    sun.add(earth)

    let moon = new THREE.Mesh(new THREE.SphereBufferGeometry(10, 40, 40), new THREE.MeshStandardMaterial())
    moon.name = 'moon'
    moon.material.map = textures[moon.name]
    moon.position.set(40, 0, 0)
    earth.add(moon)

    scene.add(sun)

    // Adding light sources
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x777777)
    let pointLight = new THREE.PointLight(0x999999)
    pointLight.position.set(0, 300, 0)


    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        renderer.render(scene, camera)
    })

    camera.position.set(-200, 400, -200)

    function animate() {
        sun.rotation.y += .01 // sun contains sun and earth.
        earth.rotation.y += .02 // earth contains earth and moon.

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()

        requestAnimationFrame(animate)
    }

    animate()
}
export function displayScene(){
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 1000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let axes = new THREE.AxesHelper(10)
    scene.add(axes)

    // Loading textures
    let texLoader = new THREE.TextureLoader()
    let textures = {
        earth: texLoader.load('./images/obama.jpg', function(){
            renderer.render(scene, camera)
        }),
        ball: texLoader.load('./images/balldimpled.png', function(){
            renderer.render(scene, camera)
        }),
        cone: texLoader.load('./images/cone.jpg', function(){
            renderer.render(scene, camera)
        }),
        torus: texLoader.load('./images/donut.jpg', function(){
            renderer.render(scene, camera)
        }),
        table: texLoader.load('./images/floor.jpg', function(){
            renderer.render(scene, camera)
        }),
        floor: texLoader.load('./images/Kitchen_Floor_Tile.jpg', function(texture){
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(6,5)
            renderer.render(scene, camera)
        }),
        wall0: texLoader.load('./images/stone.jpg', function(texture){
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(4,2)
            renderer.render(scene, camera)
        }),
        wall1: texLoader.load('./images/wall.jpg', function(texture){
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(2,2)
            renderer.render(scene, camera)
        }),
        red: texLoader.load('./images/Red_side.png', function(){
            renderer.render(scene, camera)
        }),
        blue: texLoader.load('./images/Blue_side.png', function(){
            renderer.render(scene, camera)
        }),
        green: texLoader.load('./images/Green_side.png', function(){
            renderer.render(scene, camera)
        }),
        yellow: texLoader.load('./images/Yellow_side.png', function(){
            renderer.render(scene, camera)
        }),
        orange: texLoader.load('./images/Orange_side.png', function(){
            renderer.render(scene, camera)
        }),
        white: texLoader.load('./images/White_Side.png', function(){
            renderer.render(scene, camera)
        }),
        sinusoidal: sinusoidal(256, 256),
        checkerboard: checkerboard(512, 512),
        somePattern: somePattern(128, 128)
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        renderer.render(scene, camera)
    })

    // Adding the floor
    let geometry = new THREE.PlaneGeometry(500, 300)
    let plane = new THREE.Mesh(geometry)
    plane.materialParams = { side: THREE.DoubleSide }
    plane.rotateX(Math.PI / 2)
    plane.name = 'floor'
    scene.add(plane)
    plane.material = new THREE.MeshPhongMaterial(plane.materialParams)
    plane.material.map = textures[plane.name]

    // Adding walls
    geometry = new THREE.PlaneGeometry(500, 300)
    let wall0 = new THREE.Mesh(geometry)
    wall0.materialParams = { side: THREE.DoubleSide }
    wall0.position.set(0,150,150)
    wall0.name = 'wall0'
    scene.add(wall0)
    wall0.material = new THREE.MeshPhongMaterial(wall0.materialParams)
    wall0.material.map = textures[wall0.name]

    geometry = new THREE.PlaneGeometry(300, 300)
    let wall1 = new THREE.Mesh(geometry)
    wall1.materialParams = { side: THREE.DoubleSide }
    wall1.position.set(250,150,0)
    wall1.rotateY(Math.PI/2)
    wall1.name = 'wall1'
    scene.add(wall1)
    wall1.material = new THREE.MeshPhongMaterial(wall1.materialParams)
    wall1.material.map = textures[wall1.name]

    geometry = new THREE.PlaneGeometry(300, 300)
    let wall2 = new THREE.Mesh(geometry)
    wall2.materialParams = { side: THREE.DoubleSide }
    wall2.position.set(-250,150,0)
    wall2.rotateY(Math.PI/2)
    wall2.name = 'wall1'
    scene.add(wall2)
    wall2.material = new THREE.MeshPhongMaterial(wall2.materialParams)
    wall2.material.map = textures[wall2.name]


    // Adding a table
    geometry = new THREE.BoxGeometry(150, 5, 100)
    let table = new THREE.Mesh(geometry)
    table.materialParams = {}
    table.name = 'table'
    table.position.set(0, 50, 0)
    scene.add(table)
    table.material = new THREE.MeshPhongMaterial(table.materialParams)
    table.material.map = textures[table.name]

    geometry = new THREE.BoxGeometry(10, 50, 10)
    let leg0 = new THREE.Mesh(geometry)
    leg0.materialParams = {}
    leg0.name = 'table'
    leg0.position.set(60, 25, 40)
    scene.add(leg0)
    leg0.material = new THREE.MeshPhongMaterial(table.materialParams)
    leg0.material.map = textures[leg0.name]

    geometry = new THREE.BoxGeometry(10, 50, 10)
    let leg1 = new THREE.Mesh(geometry)
    leg1.materialParams = {}
    leg1.name = 'table'
    leg1.position.set(60, 25, -40)
    scene.add(leg1)
    leg1.material = new THREE.MeshPhongMaterial(table.materialParams)
    leg1.material.map = textures[leg1.name]

    geometry = new THREE.BoxGeometry(10, 50, 10)
    let leg2 = new THREE.Mesh(geometry)
    leg2.materialParams = {}
    leg2.name = 'table'
    leg2.position.set(-60, 25, -40)
    scene.add(leg2)
    leg2.material = new THREE.MeshPhongMaterial(table.materialParams)
    leg2.material.map = textures[leg2.name]


    let leg3 = new THREE.Mesh(geometry)
    leg3.materialParams = {}
    leg3.name = 'table'
    leg3.position.set(-60, 25, 40)
    scene.add(leg3)
    leg3.material = new THREE.MeshPhongMaterial(table.materialParams)
    leg3.material.map = textures[leg3.name]

    //Adding basket Ball
    geometry = new THREE.SphereGeometry(15, 40, 40)
    let ball = new THREE.Mesh(geometry)
    ball.materialParams = {}
    ball.name = 'ball'
    ball.position.set(30, 15, -13)
    ball.rotateX(-Math.PI/4)
    ball.rotateY(Math.PI/5)
    ball.rotateZ(Math.PI/6)
    scene.add(ball)
    ball.material = new THREE.MeshPhongMaterial(ball.materialParams)
    ball.material.map = textures[ball.name]

    //Adding Birthday cone
    geometry = new THREE.ConeGeometry(10, 20, 40)
    let cone = new THREE.Mesh(geometry)
    cone.materialParams = {}
    cone.name = 'cone'
    cone.position.set(-25, 62.5, -30)
    scene.add(cone)
    cone.material = new THREE.MeshPhongMaterial(cone.materialParams)
    cone.material.map = textures[cone.name]

    // Adding donut
    geometry = new THREE.TorusGeometry(5, 2.5, 40,40)
    let torus = new THREE.Mesh(geometry)
    torus.materialParams = {}
    torus.name = 'torus'
    torus.position.set(-60, 55, 30)
    torus.rotateX(Math.PI/2)
    scene.add(torus)
    torus.material = new THREE.MeshPhongMaterial(torus.materialParams)
    torus.material.map = textures[torus.name]

    // Adding Rubik's cube
    let posx = 25
    let posy = 57.5
    let posz = 0
    geometry = new THREE.PlaneGeometry(10, 10)
    let side0 = new THREE.Mesh(geometry)
    side0.materialParams = { side: THREE.DoubleSide }
    side0.position.set(posx + 5,posy,posz)
    side0.rotateY(Math.PI/2)
    side0.name = 'red'
    scene.add(side0)
    side0.material = new THREE.MeshPhongMaterial(side0.materialParams)
    side0.material.map = textures[side0.name]

    let side1 = new THREE.Mesh(geometry)
    side1.materialParams = { side: THREE.DoubleSide }
    side1.position.set(posx - 5,posy,posz)
    side1.rotateY(Math.PI/2)
    side1.name = 'yellow'
    scene.add(side1)
    side1.material = new THREE.MeshPhongMaterial(side1.materialParams)
    side1.material.map = textures[side1.name]

    let side2 = new THREE.Mesh(geometry)
    side2.materialParams = { side: THREE.DoubleSide }
    side2.position.set(posx,posy,posz + 5)
    side2.name = 'green'
    scene.add(side2)
    side2.material = new THREE.MeshPhongMaterial(side2.materialParams)
    side2.material.map = textures[side2.name]

    let side3 = new THREE.Mesh(geometry)
    side3.materialParams = { side: THREE.DoubleSide }
    side3.position.set(posx,posy,posz - 5)
    side3.name = 'blue'
    scene.add(side3)
    side3.material = new THREE.MeshPhongMaterial(side3.materialParams)
    side3.material.map = textures[side3.name]

    let side4 = new THREE.Mesh(geometry)
    side4.materialParams = { side: THREE.DoubleSide }
    side4.position.set(posx,posy + 5,posz)
    side4.rotateX(Math.PI/2)
    side4.name = 'white'
    scene.add(side4)
    side4.material = new THREE.MeshPhongMaterial(side4.materialParams)
    side4.material.map = textures[side4.name]

    //Adding google obama
    geometry = new THREE.SphereGeometry(50, 40, 40)
    let sphere = new THREE.Mesh(geometry)
    sphere.materialParams = {}
    sphere.name = 'earth'
    sphere.position.set(0, 50, 201)
    sphere.rotateY(-Math.PI/2)
    scene.add(sphere)
    sphere.material = new THREE.MeshStandardMaterial(sphere.materialParams)
    sphere.material.map = textures[sphere.name]

    // Adding light sources
    let ambientLight = new THREE.AmbientLight(0x777777) // black
    let directionalLight = new THREE.DirectionalLight(0x777777) // Gray
    let pointLight = new THREE.PointLight(0x888888) // Light gray
    pointLight.position.set(0, 200, 0)
    scene.add(ambientLight)
    scene.add(directionalLight)
    scene.add(pointLight)

    camera.position.set(-200, 400, -200)

    function animate() {
        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }

    animate()
}

//displayScene()
SolarSystem()