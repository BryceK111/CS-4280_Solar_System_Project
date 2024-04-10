// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { sinusoidal, checkerboard, somePattern} from './textures'
import { MTLLoader, OBJLoader} from 'three-obj-mtl-loader' // material and object loaders

// First: Set up your name
let std_name = "Bryce Johnson & Brendan Bates"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else

export function SolarSystem(){
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 100000)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x000000)

    let axes = new THREE.AxesHelper(10)

    let texLoader = new THREE.TextureLoader()
    let textures = {
        'sun': texLoader.load('./images/sun.jpg', function(){
            renderer.render(scene, camera)
        }),
        'mercury': texLoader.load('./images/mercury.png', function(){
            renderer.render(scene, camera)
        }),
        'venus': texLoader.load('./images/venus_atmosphere.png', function(){
            renderer.render(scene, camera)
        }),
        'earth': texLoader.load('./images/earth.jpg', function(){
            renderer.render(scene, camera)
        }),
        'moon': texLoader.load('./images/moon.jpg', function(){
            renderer.render(scene, camera)
        }),
        'mars': texLoader.load('./images/mars.png', function(){
            renderer.render(scene, camera)
        }),
        'phobos': texLoader.load('./images/phobos.jpg', function(){
            renderer.render(scene, camera)
        }),
        'deimos': texLoader.load('./images/deimos.jpg', function(){
            renderer.render(scene, camera)
        }),
        'jupiter': texLoader.load('./images/jupiter.png', function(){
            renderer.render(scene, camera)
        }),
        'saturn': texLoader.load('./images/saturn.png', function(){
            renderer.render(scene, camera)
        }),
        'saturn_ring': texLoader.load('./images/saturn_ring.png', function(){
            renderer.render(scene, camera)
        }),
        'yourAnus': texLoader.load('./images/uranus.png', function(){
            renderer.render(scene, camera)
        }),
        'neptune': texLoader.load('./images/neptune.png', function(){
            renderer.render(scene, camera)
        }),
        'pluto': texLoader.load('./images/pluto.png', function(){
            renderer.render(scene, camera)
        }),
        'charon': texLoader.load('./images/charon_orbits_pluto.png', function(){
            renderer.render(scene, camera)
        }),
        'obama': texLoader.load('./images/obama.jpg', function(){
            renderer.render(scene, camera)
        }),
    }

    /// OBJECT SIZE VARIABLES ///
    let earth_size = 20
    let moon_size = earth_size / 4

    let sun_size = earth_size * 20

    // rocky planets
    let mercury_size = earth_size / 3
    let venus_size = earth_size * .95
    let mars_size = earth_size / 2 // mars' moons are exceedingly small.

    // gassy planets (ate too many beans)
    let jupiter_size = earth_size*11;
    let saturn_size = earth_size*9;
    let yourAnus_size = earth_size*4;
    let neptune_size = earth_size*4;
    let pluto_size = earth_size*4;


    /// OBJECT DISTANCE VARIABLES ///
    let earth_radius_actual = 92.94 // in millions of miles
    let earth_radius = 1500.0
    let moon_radius = earth_radius * (.2389 / earth_radius_actual)

    let sun_radius = 0.0

    let mercury_radius = earth_radius * (34.51 / earth_radius_actual)
    let venus_radius = earth_radius * (67.66 / earth_radius_actual)
    let mars_radius = earth_radius * (142 / earth_radius_actual)

    let jupiter_radius = earth_radius * (484 / earth_radius_actual)
    let saturn_radius = earth_radius * (886 / earth_radius_actual)
    let yourAnus_radius = earth_radius * (1300 / earth_radius_actual)
    let neptune_radius = earth_radius * (2778 / earth_radius_actual)
    let pluto_radius = earth_radius * (3700 / earth_radius_actual)
    /********************** Objects **********************/
    let sun = new THREE.Mesh(new THREE.SphereBufferGeometry(sun_size, 40, 40), new THREE.MeshBasicMaterial())
    sun.name = 'sun'
    sun.material.map = textures[sun.name]
    axes.add(sun)

    /// MERCURY OBJECTS ///
    let mercury_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    mercury_CO.name = 'obama'
    mercury_CO.material.map = textures[mercury_CO.name]

    let mercury = new THREE.Mesh(new THREE.SphereBufferGeometry(mercury_size, 40, 40), new THREE.MeshStandardMaterial())
    mercury.name = 'mercury'
    mercury.material.map = textures[mercury.name]
    mercury.position.set(mercury_radius, 0, 0)
    mercury_CO.add(mercury)
    axes.add(mercury_CO)

    /// VENUS OBJECTS ///
    let venus_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    venus_CO.name = 'obama'
    venus_CO.material.map = textures[venus_CO.name]

    let venus = new THREE.Mesh(new THREE.SphereBufferGeometry(venus_size, 40, 40), new THREE.MeshStandardMaterial())
    venus.name = 'venus'
    venus.material.map = textures[venus.name]
    venus.position.set(venus_radius, 0, 0)
    venus_CO.add(venus)
    axes.add(venus_CO)

    /// EARTH OBJECTS ///
    let earth_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    earth_CO.name = 'obama'
    earth_CO.material.map = textures[earth_CO.name]

    let earth = new THREE.Mesh(new THREE.SphereBufferGeometry(earth_size, 40, 40), new THREE.MeshStandardMaterial())
    earth.name = 'earth'
    earth.material.map = textures[earth.name]
    earth.position.set(earth_radius, 0, 0)
    earth_CO.add(earth)

    let moon_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    moon_CO.name = 'obama'
    moon_CO.material.map = textures[moon_CO.name]
    moon_CO.position.set(earth.position.x,earth.position.y,earth.position.z)
    earth_CO.add(moon_CO)

    let moon = new THREE.Mesh(new THREE.SphereBufferGeometry(moon_size, 40, 40), new THREE.MeshStandardMaterial())
    moon.name = 'moon'
    moon.material.map = textures[moon.name]
    moon.position.set(40, 0, 0)
    moon.rotation.y = Math.PI // moon faces earth
    moon_CO.add(moon)
    axes.add(earth_CO)

    /// MARS OBJECTS ///
    let mars_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    mars_CO.name = 'obama'
    mars_CO.material.map = textures[mars_CO.name]

    let mars = new THREE.Mesh(new THREE.SphereBufferGeometry(mars_size, 40, 40), new THREE.MeshStandardMaterial())
    mars.name = 'mars'
    mars.material.map = textures[mars.name]
    mars.position.set(mars_radius, 0, 0)
    mars_CO.add(mars)
    axes.add(mars_CO)

    /// JUPITER OBJECTS ///
    let jupiter_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jupiter_CO.name = 'obama'
    jupiter_CO.material.map = textures[jupiter_CO.name]

    let jupiter = new THREE.Mesh(new THREE.SphereBufferGeometry(jupiter_size, 40, 40), new THREE.MeshStandardMaterial())
    jupiter.name = 'jupiter'
    jupiter.material.map = textures[jupiter.name]
    jupiter.position.set(jupiter_radius, 0, 0)
    jupiter_CO.add(jupiter)
    axes.add(jupiter_CO)

    /// SATURN OBJECTS ///
    let saturn_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    saturn_CO.name = 'obama'
    saturn_CO.material.map = textures[saturn_CO.name]

    let saturn = new THREE.Mesh(new THREE.SphereBufferGeometry(saturn_size, 40, 40), new THREE.MeshStandardMaterial())
    saturn.name = 'saturn'
    saturn.material.map = textures[saturn.name]
    saturn.position.set(saturn_radius, 0, 0)
    saturn_CO.add(saturn)
    axes.add(saturn_CO)

    let texture = new THREE.TextureLoader().load('./images/saturn_ring.png')
    let ring = new THREE.Mesh(new THREE.RingGeometry(300, 600, 40))
    ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    ring.name = 'saturn_ring'
    ring.rotateX(Math.PI/3)
    scene.add(ring)
    ring.material = new THREE.MeshStandardMaterial(ring.materialParams)
    ring.material.map = textures[ring.name]


    /// URANUS OBJECTS ///
    let yourAnus_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    yourAnus_CO.name = 'obama'
    yourAnus_CO.material.map = textures[yourAnus_CO.name]

    let yourAnus = new THREE.Mesh(new THREE.SphereBufferGeometry(yourAnus_size, 40, 40), new THREE.MeshStandardMaterial())
    yourAnus.name = 'yourAnus'
    yourAnus.material.map = textures[yourAnus.name]
    yourAnus.position.set(yourAnus_radius, 0, 0)
    yourAnus_CO.add(yourAnus)
    axes.add(yourAnus_CO)

    /// NEPTUNE OBJECTS ///
    let neptune_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    neptune_CO.name = 'obama'
    neptune_CO.material.map = textures[neptune_CO.name]

    let neptune = new THREE.Mesh(new THREE.SphereBufferGeometry(neptune_size, 40, 40), new THREE.MeshStandardMaterial())
    neptune.name = 'neptune'
    neptune.material.map = textures[neptune.name]
    neptune.position.set(neptune_radius, 0, 0)
    neptune_CO.add(neptune)
    axes.add(neptune_CO)

    /// PLUTO OBJECTS ///
    let pluto_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    pluto_CO.name = 'obama'
    pluto_CO.material.map = textures[pluto_CO.name]

    let pluto= new THREE.Mesh(new THREE.BoxBufferGeometry(.1, neptune_size*100, neptune_size*100), new THREE.MeshStandardMaterial)
    pluto.name = 'pluto'
    pluto.material.map = textures[pluto.name]
    pluto.position.set(pluto_radius, 0, 0)
    pluto_CO.add(pluto)
    axes.add(pluto_CO)


    // Adding light sources
    let ambientLight = new THREE.AmbientLight(0x444444)
    let pointLight = new THREE.PointLight(0xFFFFFF)
    pointLight.position.set(0, 0, 0)


    scene.add(ambientLight)
    axes.add(pointLight)

    // Adding axes
    scene.add(axes)

    /// ADDING CONTROLS DICTIONARY ///
    let controls = {
        speed: 1.0,
        snap_to: "Sun",
        planet: sun,
        orbital_radius: sun_radius,
        randomize: false
    }

    /// ADDING CAMERA CONTROLS
    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        renderer.render(scene, camera)
    })

    camera.position.set(-1000, 1000, -1000)

    /// SPEED VARIABLES ///

    // earth and moon
    let earth_orbit = .0001
    let earth_rotation = earth_orbit * 365.25 // number of days
    let moon_orbit = earth_rotation / 27.0

    let sun_rotation = earth_rotation / 27.0

    // other rocky planets
    let mercury_orbit = earth_rotation / 88
    let mercury_rotation = earth_rotation / 59
    let venus_orbit = earth_rotation / 224.7
    let venus_rotation = earth_rotation / 243

    // mars and its moons
    let mars_orbit = earth_rotation / 687
    let mars_rotation = earth_rotation * (24/24.6)
    // may not implement
    let phobos_orbit = earth_rotation * (24 / 7.6)
    let deimos_orbit = earth_rotation * (24 / 30.25)

    // jupiter and its moons
    let jupiter_orbit = earth_rotation / 4333.0
    let jupiter_rotation = earth_rotation * (24 / 10)

    //saturn and its onion rings
    let saturn_orbit = earth_rotation / 10756.0
    let saturn_rotation = earth_rotation * (24 / 10.7)

    // yourAnus and your moms
    let yourAnus_orbit = earth_rotation / 30687.0
    let yourAnus_rotation = earth_rotation * (24 / 17)

    // neptune and its moons
    let neptune_orbit = earth_rotation / 60190.0
    let neptune_rotation = earth_rotation * (24.0 / 16.0)

    // pluto and its moons
    let pluto_orbit = earth_rotation / 90560.0
    let pluto_rotation = earth_rotation * (24.0 / 16.0)

    /// RANDOMIZING ROTATION OF PLANETS ///
    function randomize() {
        // Earth rotations and moon
        earth_CO.rotation.y = Math.random() * 2 * Math.PI // contains earth and moon
        moon_CO.rotation.y = Math.random() * 2 * Math.PI // contains moon

        // mercury
        mercury_CO.rotation.y = Math.random() * 2 * Math.PI

        // Venus
        venus_CO.rotation.y = Math.random() * 2 * Math.PI

        //mars
        mars_CO.rotation.y = Math.random() * 2 * Math.PI

        //jupiter
        jupiter_CO.rotation.y = Math.random() * 2 * Math.PI

        //saturn
        saturn_CO.rotation.y = Math.random() * 2 * Math.PI

        //yourAnus
        yourAnus_CO.rotation.y = Math.random() * 2 * Math.PI

        //neptune
        neptune_CO.rotation.y = Math.random() * 2 * Math.PI

        //pluto
        pluto_CO.rotation.y = Math.random() * 2 * Math.PI
    }
    randomize()

    function animate() {
        sun.rotation.y += sun_rotation * controls.speed // sun is not connected to anything

        // Earth rotations
        earth_CO.rotation.y += earth_orbit * controls.speed// contains earth and moon
        earth.rotation.y += earth_rotation * controls.speed
        moon_CO.rotation.y += moon_orbit * controls.speed // contains moon

        // mercury
        mercury_CO.rotation.y += mercury_orbit * controls.speed
        mercury.rotation.y += mercury_rotation * controls.speed

        // Venus
        venus_CO.rotation.y += venus_orbit * controls.speed
        venus.rotation.y += venus_rotation * controls.speed

        //mars
        mars_CO.rotation.y += mars_orbit * controls.speed
        mars.rotation.y += mars_rotation * controls.speed

        //jupiter
        jupiter_CO.rotation.y += jupiter_orbit * controls.speed
        jupiter.rotation.y += jupiter_rotation * controls.speed

        //saturn
        saturn_CO.rotation.y += saturn_orbit * controls.speed
        saturn.rotation.y += saturn_rotation * controls.speed
        let x = saturn_radius * Math.sin(saturn_CO.rotation.y + (Math.PI / 2))
        let z = saturn_radius * Math.sin(saturn_CO.rotation.y + Math.PI)
        ring.position.set(x + axes.position.x,0,z + axes.position.z)

        //yourAnus
        yourAnus_CO.rotation.y += yourAnus_orbit * controls.speed
        yourAnus.rotation.y += yourAnus_rotation * controls.speed

        //neptune
        neptune_CO.rotation.y += neptune_orbit * controls.speed
        neptune.rotation.y += neptune_rotation * controls.speed

        //pluto
        pluto_CO.rotation.y += pluto_orbit * controls.speed
        //pluto.rotation.y += pluto_rotation * controls.speed

        // Camera Snap
        axes.position.x = controls.orbital_radius * Math.sin(controls.planet.rotation.y - (Math.PI / 2)) // cosine but faster
        axes.position.z = controls.orbital_radius * Math.sin(controls.planet.rotation.y)


        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()

        requestAnimationFrame(animate)
    }
    animate()

    function change_snap()
    {
        if(controls.snap_to === "Sun")
        {
            controls.planet = sun
            controls.orbital_radius = sun_radius
        }
        else if(controls.snap_to === "Mercury")
        {
            controls.planet = mercury_CO
            controls.orbital_radius = mercury_radius
        }
        else if(controls.snap_to === "Venus")
        {
            controls.planet = venus_CO
            controls.orbital_radius = venus_radius
        }
        else if(controls.snap_to === "Earth")
        {
            controls.planet = earth_CO
            controls.orbital_radius = earth_radius
        }
        else if(controls.snap_to === "Mars")
        {
            controls.planet = mars_CO
            controls.orbital_radius = mars_radius
        }
        else if(controls.snap_to === "Jupiter")
        {
            controls.planet = jupiter_CO
            controls.orbital_radius = jupiter_radius
        }
        else if(controls.snap_to === "Saturn")
        {
            controls.planet = saturn_CO
            controls.orbital_radius = saturn_radius
        }
        else if(controls.snap_to === "Uranus")
        {
            controls.planet = yourAnus_CO
            controls.orbital_radius = yourAnus_radius
        }
        else if(controls.snap_to === "Neptune")
        {
            controls.planet = neptune_CO
            controls.orbital_radius = neptune_radius
        }
        else if(controls.snap_to === "Pluto")
        {
            controls.planet = pluto_CO
            controls.orbital_radius = pluto_radius
        }
        else
        {
            controls.planet = sun
            controls.orbital_radius = sun_radius
        }
        camera.position.set(-1000, 1000, -1000)
    }

    let gui = new dat.GUI()
    document.querySelector('aside').appendChild(gui.domElement)
    gui.add(controls, 'speed').min(.1).max(100.0)
    gui.add(controls, 'snap_to', [
        "Sun",
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Pluto"
    ]).onChange(change_snap)

}
SolarSystem()