// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

import * as THREE from 'three'
import * as dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';

// First: Set up your name
let std_name = "Bryce Johnson & Brendan Bates"
document.querySelector('#std_name').innerHTML = `<strong>${std_name}</strong>`

//Then: comes everything else

export function SolarSystem(){
    let canvas = document.querySelector('#webgl-scene')
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer({canvas})
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, .1, 200000)

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
        'sky': texLoader.load('./images/Sky_box_8k.jpg', function(){
            renderer.render(scene, camera)
        }),
        'dione': texLoader.load('./images/dione.jpg', function(){
            renderer.render(scene, camera)
        }),
        'enceladus': texLoader.load('./images/enceladus.jpg', function(){
            renderer.render(scene, camera)
        }),
        'epimetheus': texLoader.load('./images/Epimetheus.jpg', function(){
            renderer.render(scene, camera)
        }),
        'hyperion': texLoader.load('./images/hyperion.jpg', function(){
            renderer.render(scene, camera)
        }),
        'janus': texLoader.load('./images/janus.jpg', function(){
            renderer.render(scene, camera)
        }),
        'lapetus': texLoader.load('./images/lapetus.jpg', function(){
            renderer.render(scene, camera)
        }),
        'mimas': texLoader.load('./images/mimas.jpg', function(){
            renderer.render(scene, camera)
        }),
        'rhea': texLoader.load('./images/Rhea.jpg', function(){
            renderer.render(scene, camera)
        }),
        'tethys': texLoader.load('./images/Tethys.jpg', function(){
            renderer.render(scene, camera)
        }),
        'bennu': texLoader.load('./images/bennu.jpg', function(){
            renderer.render(scene, camera)
        }),
        'callisto': texLoader.load('./images/callisto.jpg', function(){
            renderer.render(scene, camera)
        }),
        'europa': texLoader.load('./images/europa.jpg', function(){
            renderer.render(scene, camera)
        }),
        'ganymede': texLoader.load('./images/ganymede.jpg', function(){
            renderer.render(scene, camera)
        }),
        'Io': texLoader.load('./images/Io.jpg', function(){
            renderer.render(scene, camera)
        }),
        'jmoon1': texLoader.load('./images/jmoon1.jpg', function(){
            renderer.render(scene, camera)
        }),
        'jmoon2': texLoader.load('./images/jmoon2.jpg', function(){
            renderer.render(scene, camera)
        }),
        'Io2': texLoader.load('./images/Io2.jpg', function(){
            renderer.render(scene, camera)
        }),
        'thebe': texLoader.load('./images/thebe.jpg', function(){
            renderer.render(scene, camera)
        }),
        'ceres': texLoader.load('./images/ceres.jpg', function(){
            renderer.render(scene, camera)
        }),
        'arial': texLoader.load('./images/arial.jpg', function(){
            renderer.render(scene, camera)
        }),
        'oberon': texLoader.load('./images/oberon.jpg', function(){
            renderer.render(scene, camera)
        }),
        'puck': texLoader.load('./images/puck.jpg', function(){
            renderer.render(scene, camera)
        }),
        'titania': texLoader.load('./images/titania.jpg', function(){
            renderer.render(scene, camera)
        }),
        'titan': texLoader.load('./images/titan.jpg', function(){
            renderer.render(scene, camera)
        }),
        'umbriel': texLoader.load('./images/umbriel.jpg', function(){
            renderer.render(scene, camera)
        })



    }

    /// OBJECT SIZE VARIABLES ///
    let sky_size = 100000.0
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
    let pluto_size = earth_size/6;


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
    let pluto_rotation = earth_rotation / 6

    // comet
    let comet_angle = 0.0

    /********************** Objects **********************/
    let sky = new THREE.Mesh(new THREE.SphereBufferGeometry(sky_size, 10, 10), new THREE.MeshBasicMaterial())
    sky.name = 'sky'
    sky.material.side = THREE.BackSide
    sky.material.map = textures[sky.name]
    scene.add(sky)

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

    let earth_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    earth_C.material.side = THREE.DoubleSide
    earth_C.name = 'obama'
    earth_C.material.map = textures[earth_C.name]
    earth_C.position.set(earth_radius, 0, 0)

    let earth = new THREE.Mesh(new THREE.SphereBufferGeometry(earth_size, 20, 20), new THREE.MeshStandardMaterial())
    earth.name = 'earth'
    earth.material.map = textures[earth.name]
    earth.rotateX(23.5 * Math.PI / 180)
    earth_C.add(earth)
    earth_CO.add(earth_C)

    let moon_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    moon_CO.material.side = THREE.DoubleSide
    moon_CO.name = 'obama'
    moon_CO.material.map = textures[moon_CO.name]
    moon_CO.rotateX(23.5 * Math.PI / 180)
    earth_C.add(moon_CO)

    let moon = new THREE.Mesh(new THREE.SphereBufferGeometry(moon_size, 30, 30), new THREE.MeshStandardMaterial())
    moon.name = 'moon'
    moon.material.map = textures[moon.name]
    moon.position.set(50, 0, 0)
    moon.rotation.y = Math.PI // moon faces earth
    moon_CO.add(moon)
    axes.add(earth_CO)

    /// MARS OBJECTS ///
    let mars_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    mars_CO.name = 'obama'
    mars_CO.material.map = textures[mars_CO.name]

    let mars_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    mars_C.material.side = THREE.DoubleSide
    mars_C.name = 'obama'
    mars_C.material.map = textures[mars_C.name]
    mars_C.position.set(mars_radius, 0, 0)

    let mars = new THREE.Mesh(new THREE.SphereBufferGeometry(mars_size, 40, 40), new THREE.MeshStandardMaterial())
    mars.name = 'mars'
    mars.material.map = textures[mars.name]
    mars.rotateX(25 * Math.PI / 180)
    mars_C.add(mars)
    mars_CO.add(mars_C)
    axes.add(mars_CO)

    let deimos_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    deimos_CO.material.side = THREE.DoubleSide
    deimos_CO.name = 'obama'
    deimos_CO.material.map = textures[deimos_CO.name]
    deimos_CO.rotateX(25 * Math.PI / 180)
    mars_C.add(deimos_CO)

    let phobos_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    phobos_CO.material.side = THREE.DoubleSide
    phobos_CO.name = 'obama'
    phobos_CO.material.map = textures[phobos_CO.name]
    phobos_CO.rotateX(25 * Math.PI / 180)
    mars_C.add(phobos_CO)

    let phobos = new THREE.Mesh(new THREE.SphereBufferGeometry(1.5, 10, 10), new THREE.MeshStandardMaterial())
    phobos.name = 'phobos'
    phobos.material.map = textures[phobos.name]
    phobos.position.set(mars_size + 5, 0, 0)
    phobos_CO.add(phobos)

    let deimos = new THREE.Mesh(new THREE.SphereBufferGeometry(1.5, 10, 10), new THREE.MeshStandardMaterial())
    deimos.name = 'deimos'
    deimos.material.map = textures[deimos.name]
    deimos.position.set(mars_size + 50, 0, 0)
    deimos_CO.add(deimos)


    /// JUPITER OBJECTS ///
    let jupiter_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jupiter_CO.name = 'obama'
    jupiter_CO.material.map = textures[jupiter_CO.name]

    let jupiter_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    jupiter_C.material.side = THREE.DoubleSide
    jupiter_C.name = 'obama'
    jupiter_C.material.map = textures[jupiter_C.name]
    jupiter_C.position.set(jupiter_radius, 0, 0)

    let jupiter = new THREE.Mesh(new THREE.SphereBufferGeometry(jupiter_size, 40, 40), new THREE.MeshStandardMaterial())
    jupiter.name = 'jupiter'
    jupiter.material.map = textures[jupiter.name]
    jupiter.rotateX(-3.13 * Math.PI / 180)
    jupiter_C.add(jupiter)
    jupiter_CO.add(jupiter_C)
    axes.add(jupiter_CO)

    let texture = new THREE.TextureLoader().load('./images/jupiter_ring.png')
    let jupiter_ring = new THREE.Mesh(new THREE.PlaneGeometry(900, 900))
    jupiter_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    jupiter_ring.rotateX((90 - 3.13) * Math.PI / 180)
    jupiter_C.add(jupiter_ring)
    jupiter_ring.material = new THREE.MeshPhongMaterial(jupiter_ring.materialParams)
    jupiter_ring.material.map = texture

    let jupiter_moon_CO = []
    let jupiter_moon = []
    let jupiter_moon_speed = []
    let jupiter_textures = ['bennu', 'callisto', 'europa', 'ganymede', 'Io', 'Io2', 'jmoon2', 'thebe', 'ceres', 'jmoon1']
    for (let i = 0; i < 95; i++) {
        let temp_moon = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 10, 10), new THREE.MeshStandardMaterial())
        temp_moon.name = jupiter_textures[i%10]
        temp_moon.material.map = textures[temp_moon.name]
        jupiter_moon.push(temp_moon)

        let temp_moon_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
        temp_moon_CO.material.side = THREE.DoubleSide
        temp_moon_CO.name = 'obama'
        temp_moon_CO.material.map = textures[temp_moon_CO.name]
        temp_moon_CO.rotateX(-3.13 * Math.PI / 180)
        jupiter_moon_CO.push(temp_moon_CO)
        jupiter_moon_CO[i].add(jupiter_moon[i])
        jupiter_C.add(jupiter_moon_CO[i])

        jupiter_moon[i].position.set((1500*Math.random()+250),0,0)
        let jmoon_orbit = ((250 * 250 / (jupiter_moon[i].position.x * jupiter_moon[i].position.x)) * (earth_rotation / 17.0))
        jupiter_moon_speed.push(jmoon_orbit)
        let jradius = 8.33*Math.random()
        jupiter_moon[i].scale.set(jradius,jradius,jradius)
    }


    /// SATURN OBJECTS ///
    let saturn_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    saturn_CO.name = 'obama'
    saturn_CO.material.map = textures[saturn_CO.name]

    let saturn_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    saturn_C.material.side = THREE.DoubleSide
    saturn_C.name = 'obama'
    saturn_C.material.map = textures[saturn_C.name]
    saturn_C.position.set(saturn_radius, 0, 0)

    let saturn = new THREE.Mesh(new THREE.SphereBufferGeometry(saturn_size, 40, 40), new THREE.MeshStandardMaterial())
    saturn.name = 'saturn'
    saturn.material.map = textures[saturn.name]
    saturn.rotateX(-26.73 * Math.PI / 180)
    saturn_C.add(saturn)
    saturn_CO.add(saturn_C)
    axes.add(saturn_CO)

    texture = new THREE.TextureLoader().load('./images/saturn_ring.png')
    let saturn_ring = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200))
    saturn_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    saturn_ring.rotateX((90 - 26.73) * Math.PI / 180)
    saturn_C.add(saturn_ring)
    saturn_ring.material = new THREE.MeshPhongMaterial(saturn_ring.materialParams)
    saturn_ring.material.map = texture

    /// Saturn's moons ///
    let saturn_moon_CO = []
    let saturn_moon = []
    let saturn_moon_speed = []
    let texture_list = ["dione", "enceladus", "epimetheus", "hyperion", "janus", "lapetus", "mimas", "rhea", "tethys", "titan"]
    for (let i = 0; i < 146; i++) {
        let temp_moon = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 10, 10), new THREE.MeshStandardMaterial())
        temp_moon.name = texture_list[i%10]
        temp_moon.material.map = textures[temp_moon.name]
        saturn_moon.push(temp_moon)

        let temp_moon_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
        temp_moon_CO.material.side = THREE.DoubleSide
        temp_moon_CO.name = 'obama'
        temp_moon_CO.material.map = textures[temp_moon_CO.name]
        temp_moon_CO.rotateX(-26.73 * Math.PI / 180)
        saturn_moon_CO.push(temp_moon_CO)
        saturn_moon_CO[i].add(saturn_moon[i])
        saturn_C.add(saturn_moon_CO[i])

        //let r = (saturn_size*9)*Math.random() + saturn_size + 10
        saturn_moon[i].position.set(((saturn_size*9)*Math.random() + saturn_size + 20),0,0)
        let smoon_orbit = (((saturn_size + 10) * (saturn_size + 10) / (saturn_moon[i].position.x * saturn_moon[i].position.x)) * (earth_rotation / 16.0))
        saturn_moon_speed.push(smoon_orbit)
        let smradius = 8*Math.random() //0.4*earth_size the size of Titan the largest moon of saturn
        saturn_moon[i].scale.set(smradius,smradius,smradius)
    }


    /// URANUS OBJECTS ///
    let yourAnus_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    yourAnus_CO.name = 'obama'
    yourAnus_CO.material.map = textures[yourAnus_CO.name]

    let yourAnus_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    yourAnus_C.material.side = THREE.DoubleSide
    yourAnus_C.name = 'obama'
    yourAnus_C.material.map = textures[yourAnus_C.name]
    yourAnus_C.rotateX(97.7 * Math.PI / 180)
    yourAnus_C.rotateZ(Math.PI/2)
    yourAnus_C.position.set(yourAnus_radius, 0, 0)

    let yourAnus = new THREE.Mesh(new THREE.SphereBufferGeometry(yourAnus_size, 40, 40), new THREE.MeshStandardMaterial())
    yourAnus.name = 'yourAnus'
    yourAnus.material.map = textures[yourAnus.name]
    yourAnus_C.add(yourAnus)
    yourAnus_CO.add(yourAnus_C)
    axes.add(yourAnus_CO)

    texture = new THREE.TextureLoader().load('./images/uranus_ring.png')
    let uranus_ring = new THREE.Mesh(new THREE.PlaneGeometry(350, 350))
    uranus_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    uranus_ring.rotateX(Math.PI / 2)
    yourAnus_C.add(uranus_ring)
    uranus_ring.material = new THREE.MeshPhongMaterial(uranus_ring.materialParams)
    uranus_ring.material.map = texture

    let uranus_moon_CO = []
    let uranus_moon = []
    let uranus_moon_speed = []
    let uranus_textures = ['bennu', 'callisto', 'europa', 'arial', 'oberon', 'puck', 'titania', 'umbriel', 'epimetheus', 'dione']
    for (let i = 0; i < 28; i++) {
        let temp_moon = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 5, 5), new THREE.MeshStandardMaterial())
        temp_moon.name = uranus_textures[i%10]
        temp_moon.material.map = textures[temp_moon.name]
        uranus_moon.push(temp_moon)

        let temp_moon_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
        temp_moon_CO.material.side = THREE.DoubleSide
        temp_moon_CO.name = 'obama'
        temp_moon_CO.material.map = textures[temp_moon_CO.name]
        temp_moon_CO.rotateX(-3.13 * Math.PI / 180)
        uranus_moon_CO.push(temp_moon_CO)
        uranus_moon_CO[i].add(uranus_moon[i])
        yourAnus_C.add(uranus_moon_CO[i])

        uranus_moon[i].position.set(((yourAnus_size * 5 * Math.random()) + yourAnus_size + 10),0,0)
        let umoon_orbit = (((yourAnus_size + 10) * (yourAnus_size + 10) / (uranus_moon[i].position.x * uranus_moon[i].position.x)) * (earth_rotation * 3))
        uranus_moon_speed.push(umoon_orbit)
        let uradius = 2.5*Math.random()
        uranus_moon[i].scale.set(uradius,uradius,uradius)
    }

    /// NEPTUNE OBJECTS ///
    let neptune_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    neptune_CO.name = 'obama'
    neptune_CO.material.map = textures[neptune_CO.name]

    let neptune_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    neptune_C.material.side = THREE.DoubleSide
    neptune_C.name = 'obama'
    neptune_C.material.map = textures[neptune_CO.name]
    neptune_C.position.set(neptune_radius, 0, 0)

    let neptune = new THREE.Mesh(new THREE.SphereBufferGeometry(neptune_size, 40, 40), new THREE.MeshStandardMaterial())
    neptune.name = 'neptune'
    neptune.material.map = textures[neptune.name]
    neptune.rotateX(-28 * Math.PI / 180)
    neptune_C.add(neptune)
    neptune_CO.add(neptune_C)
    axes.add(neptune_CO)

    texture = new THREE.TextureLoader().load('./images/neptune_rings.png')
    let neptune_ring = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 40))
    neptune_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    neptune_ring.rotateX((90 - 28) * Math.PI / 180)
    neptune_C.add(neptune_ring)
    neptune_ring.material = new THREE.MeshBasicMaterial(neptune_ring.materialParams)
    neptune_ring.material.map = texture

    let neptune_moon_CO = []
    let neptune_moon = []
    let neptune_moon_speed = []
    let neptune_textures = ['bennu', 'callisto', 'europa', 'ganymede', 'Io', 'Io2', 'jmoon2', 'thebe', 'moon', 'dione']
    for (let i = 0; i < 14; i++) {
        let temp_moon = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 5, 5), new THREE.MeshStandardMaterial())
        temp_moon.name = neptune_textures[i%10]
        temp_moon.material.map = textures[temp_moon.name]
        neptune_moon.push(temp_moon)

        let temp_moon_CO = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
        temp_moon_CO.material.side = THREE.DoubleSide
        temp_moon_CO.name = 'obama'
        temp_moon_CO.material.map = textures[temp_moon_CO.name]
        temp_moon_CO.rotateX(-28 * Math.PI / 180)
        neptune_moon_CO.push(temp_moon_CO)
        neptune_moon_CO[i].add(neptune_moon[i])
        neptune_C.add(neptune_moon_CO[i])

        neptune_moon[i].position.set(((neptune_size * 5 * Math.random()) + neptune_size + 10),0,0)
        let nmoon_orbit = (((neptune_size + 10) * (neptune_size + 10) / (neptune_moon[i].position.x * neptune_moon[i].position.x)) * (earth_rotation * 3))
        neptune_moon_speed.push(nmoon_orbit)
        let nradius = 1.8*Math.random() + 0.1 // actual suze is 0.9*Math.random() but youcan barely see them then
        neptune_moon[i].scale.set(nradius,nradius,nradius)
    }

    /// PLUTO OBJECTS ///
    let pluto_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    pluto_CO.name = 'obama'
    pluto_CO.material.map = textures[pluto_CO.name]

    let pluto= new THREE.Mesh(new THREE.SphereBufferGeometry(pluto_size, 40, 40), new THREE.MeshStandardMaterial)
    pluto.name = 'pluto'
    pluto.material.map = textures[pluto.name]
    pluto.position.set(pluto_radius, 0, 0)
    pluto_CO.add(pluto)
    axes.add(pluto_CO)

    let charon= new THREE.Mesh(new THREE.SphereBufferGeometry(pluto_size / 2, 40, 40), new THREE.MeshStandardMaterial)
    charon.name = 'charon'
    charon.material.map = textures[charon.name]
    charon.position.set(15, 0, 0)
    pluto.add(charon)

    /// COMET ///
    let rx = 1500.0 * 10
    let rz = 1500.0 * 2.5
    let comet_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    comet_CO.name = 'obama'
    comet_CO.position.set(rx*(1 - .125), 0, 0)
    comet_CO.material.map = textures[comet_CO.name]

    let comet_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    comet_C.name = 'obama'
    comet_C.material.map = textures[comet_C.name]

    let comet = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1))
    comet.name = 'obama'
    comet.material.map = textures[comet.name]

    let cmt_mtl = './models/comet/Comet.mtl'
    let cmt_obj = './models/comet/Comet.obj'

    var mtLoader = new MTLLoader();
    mtLoader.load(cmt_mtl,
        function(materials) {
            materials.preload()

            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials)
            objLoader.load(cmt_obj,
                function(object){
                    object.name = 'comet'
                    comet.add(object)
                })
        })

    // aligns the comet with the z axis
    comet.position.set(0,-3.5,0)
    comet.rotateX(1.2)
    comet.rotateY(.7)
    comet_C.scale.set(2,2,2)

    // add comet trail
    texture = new THREE.TextureLoader().load('./images/comet_trail.png')
    let comet_trail = new THREE.Mesh(new THREE.PlaneGeometry(100,100))
    comet_trail.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    comet_trail.rotateY((-90) * Math.PI / 180)
    comet_trail.rotateZ(-.5)
    comet_trail.position.set(0,5,40)
    scene.add(comet_trail)
    comet_trail.material = new THREE.MeshBasicMaterial(comet_trail.materialParams)
    comet_trail.material.map = texture

    comet_C.add(comet)
    comet_C.add(comet_trail)
    comet_CO.add(comet_C)
    axes.add(comet_CO)

    /// Asteroids ///
    // let rx = 1500.0 * 10
    // let rz = 1500.0 * 2.5
    let asteroids_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    asteroids_CO.name = 'obama'
    asteroids_CO.material.map = textures[asteroids_CO.name]

    let asteroids_C = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1), new THREE.MeshBasicMaterial())
    asteroids_C.material.side = THREE.DoubleSide
    asteroids_C.name = 'obama'
    asteroids_C.material.map = textures[asteroids_C.name]
    asteroids_C.position.set(mars_radius, 0, 0)

    let asteroids = new THREE.Mesh(new THREE.PlaneBufferGeometry(.1, .1))
    asteroids.name = 'obama'
    asteroids.material.map = textures[asteroids.name]
    let ast_mtl = './models/asteroids/asteroids.mtl'
    let ast_obj = './models/asteroids/asteroids.obj'

    var mtLoader = new MTLLoader();
    mtLoader.load(ast_mtl,
        function(materials) {
            materials.preload()

            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials)
            objLoader.load(ast_obj,
                function(object){
                    object.name = 'asteroids'
                    asteroids.add(object)
                })
        })

    // aligns the asteroids with the z axis
    asteroids_C.scale.set(10,10,10)

    asteroids_C.add(asteroids)
    asteroids_CO.add(asteroids_C)
    axes.add(asteroids_CO)

    /// LIGHT SOURCES ///
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
        for (let i = 0; i < 95;i++) {
            jupiter_moon_CO[i].rotation.y = Math.random() * 2 * Math.PI
        }

        //saturn
        saturn_CO.rotation.y = Math.random() * 2 * Math.PI
        for (let i = 0; i < 146; i++) {
            saturn_moon_CO[i].rotation.y = Math.random() * 2 * Math.PI
        }

        //yourAnus
        yourAnus_CO.rotation.y = Math.random() * 2 * Math.PI
        for (let i = 0; i < 28; i++) {
            uranus_moon_CO[i].rotation.y = Math.random() * 2 * Math.PI
        }

        //neptune
        neptune_CO.rotation.y = Math.random() * 2 * Math.PI
        for (let i = 0; i < 14; i++) {
            neptune_moon_CO[i].rotation.y = Math.random() * 2 * Math.PI
        }

        //pluto
        pluto_CO.rotation.y = Math.random() * 2 * Math.PI

        //comet
        comet_angle = Math.random() * 2 * Math.PI
    }
    randomize()

    function animate() {
        sun.rotation.y += sun_rotation * controls.speed // sun is not connected to anything

        // Earth rotations
        earth_CO.rotation.y += earth_orbit * controls.speed// contains earth and moon
        earth_C.rotation.y = - earth_CO.rotation.y
        earth.rotation.y += earth_rotation * controls.speed
        moon_CO.rotation.y += moon_orbit * controls.speed // contains moon

        // mercury
        mercury_CO.rotation.y += mercury_orbit * controls.speed
        mercury.rotation.y += mercury_rotation * controls.speed

        // Venus
        venus_CO.rotation.y += venus_orbit * controls.speed
        venus.rotation.y -= venus_rotation * controls.speed

        //mars
        mars_CO.rotation.y += mars_orbit * controls.speed
        mars.rotation.y += mars_rotation * controls.speed
        mars_C.rotation.y = -mars_CO.rotation.y
        deimos_CO.rotation.y += deimos_orbit * controls.speed
        phobos_CO.rotation.y += phobos_orbit * controls.speed

        //jupiter
        jupiter_CO.rotation.y += jupiter_orbit * controls.speed
        jupiter_C.rotation.y = -jupiter_CO.rotation.y
        jupiter.rotation.y += jupiter_rotation * controls.speed
        for (let i = 0; i < 95; i++) {
            jupiter_moon_CO[i].rotation.y += jupiter_moon_speed[i] * controls.speed // contains moon
        }

        //saturn
        saturn_CO.rotation.y += saturn_orbit * controls.speed
        saturn_C.rotation.y = -saturn_CO.rotation.y
        saturn.rotation.y += saturn_rotation * controls.speed

        for (let i = 0; i < 146; i++) {
            saturn_moon_CO[i].rotation.y += saturn_moon_speed[i] * controls.speed // contains moon
        }

        //yourAnus
        yourAnus_CO.rotation.y += yourAnus_orbit * controls.speed
        yourAnus.rotation.y += yourAnus_rotation * controls.speed

        for (let i = 0; i < 28; i++) {
            uranus_moon_CO[i].rotation.y += uranus_moon_speed[i] * controls.speed // contains moon
        }

        //neptune
        neptune_CO.rotation.y += neptune_orbit * controls.speed
        neptune_C.rotation.y = -neptune_CO.rotation.y
        neptune.rotation.y += neptune_rotation * controls.speed

        for (let i = 0; i < 14; i++) {
            neptune_moon_CO[i].rotation.y += neptune_moon_speed[i] * controls.speed // contains moon
        }

        //pluto
        pluto_CO.rotation.y += pluto_orbit * controls.speed
        pluto.rotation.y += pluto_rotation * controls.speed

        //comet
        comet_angle += earth_orbit * controls.speed * ((rx * 2 + 1000) - (comet_C.position.x + rx)) / rx // dynamic speed
        comet_C.rotation.y = comet_angle - (Math.PI / 2)
        let x = rx * Math.sin(comet_angle - (Math.PI/2))
        let z = rz * Math.sin(comet_angle)
        comet_C.position.set(x,0,z)

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