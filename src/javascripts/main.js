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
    /********************** Objects **********************/
    let sky = new THREE.Mesh(new THREE.SphereBufferGeometry(sky_size, 40, 40), new THREE.MeshBasicMaterial())
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

    let earth_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    earth_C.name = 'obama'
    earth_C.material.map = textures[earth_C.name]
    earth_C.position.set(earth_radius, 0, 0)

    let earth = new THREE.Mesh(new THREE.SphereBufferGeometry(earth_size, 40, 40), new THREE.MeshStandardMaterial())
    earth.name = 'earth'
    earth.material.map = textures[earth.name]
    earth.rotateX(23.5 * Math.PI / 180)
    earth_C.add(earth)
    earth_CO.add(earth_C)

    let moon_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    moon_CO.name = 'obama'
    moon_CO.material.map = textures[moon_CO.name]
    moon_CO.rotateX(23.5 * Math.PI / 180)
    earth_C.add(moon_CO)

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

    let jupiter_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jupiter_C.name = 'obama'
    jupiter_C.material.map = textures[jupiter_C.name]
    jupiter_C.position.set(jupiter_radius, 0, 0)

    let jupiter = new THREE.Mesh(new THREE.SphereBufferGeometry(jupiter_size, 40, 40), new THREE.MeshStandardMaterial())
    jupiter.name = 'jupiter'
    jupiter.material.map = textures[jupiter.name]
    jupiter.rotateX(-3.13 * Math.PI / 180)
    jupiter_C.add(jupiter)

    let jmoon0_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon0_CO.name = 'obama'
    jmoon0_CO.material.map = textures[jmoon0_CO.name]
    jupiter_C.add(jmoon0_CO)

    let jmoon0_size = (20*Math.random())
    let jmoon0 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon0_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon0.name = 'moon'
    jmoon0.rotation.y = Math.PI // moon faces earth
    jmoon0.position.set(280, 0, 0)
    jmoon0.material.map = textures[jmoon0.name]
    jmoon0_CO.add(jmoon0)

    let jmoon1_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon1_CO.name = 'obama'
    jmoon1_CO.material.map = textures[jmoon1_CO.name]
    jupiter_C.add(jmoon1_CO)

    let jmoon1_size = (20*Math.random())
    let jmoon1 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon1_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon1.name = 'moon'
    jmoon1.rotation.y = Math.PI // moon faces earth
    jmoon1.position.set(369, 0, 0)
    jmoon1.material.map = textures[jmoon1.name]
    jmoon1_CO.add(jmoon1)

    let jmoon2_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon2_CO.name = 'obama'
    jmoon2_CO.material.map = textures[jmoon2_CO.name]
    jupiter_C.add(jmoon2_CO)

    let jmoon2_size = (20*Math.random())
    let jmoon2 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon2_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon2.name = 'moon'
    jmoon2.rotation.y = Math.PI // moon faces earth
    jmoon2.position.set(420, 0, 0)
    jmoon2.material.map = textures[jmoon2.name]
    jmoon2_CO.add(jmoon2)

    let jmoon3_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon3_CO.name = 'obama'
    jmoon3_CO.material.map = textures[jmoon3_CO.name]
    jupiter_C.add(jmoon3_CO)

    let jmoon3_size = (20*Math.random())
    let jmoon3 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon3_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon3.name = 'moon'
    jmoon3.rotation.y = Math.PI // moon faces earth
    jmoon3.position.set(410, 0, 0)
    jmoon3.material.map = textures[jmoon3.name]
    jmoon3_CO.add(jmoon3)

    let jmoon4_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon4_CO.name = 'obama'
    jmoon4_CO.material.map = textures[jmoon4_CO.name]
    jupiter_C.add(jmoon4_CO)

    let jmoon4_size = (20*Math.random())
    let jmoon4 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon4_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon4.name = 'moon'
    jmoon4.rotation.y = Math.PI // moon faces earth
    jmoon4.position.set(380, 0, 0)
    jmoon4.material.map = textures[jmoon4.name]
    jmoon4_CO.add(jmoon4)

    let jmoon5_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon5_CO.name = 'obama'
    jmoon5_CO.material.map = textures[jmoon5_CO.name]
    jupiter_C.add(jmoon5_CO)

    let jmoon5_size = (20*Math.random())
    let jmoon5 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon5_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon5.name = 'moon'
    jmoon5.rotation.y = Math.PI // moon faces earth
    jmoon5.position.set(300, 0, 0)
    jmoon5.material.map = textures[jmoon5.name]
    jmoon5_CO.add(jmoon5)

    let jmoon6_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon6_CO.name = 'obama'
    jmoon6_CO.material.map = textures[jmoon6_CO.name]
    jupiter_C.add(jmoon6_CO)

    let jmoon6_size = (20*Math.random())
    let jmoon6 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon6_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon6.name = 'moon'
    jmoon6.rotation.y = Math.PI // moon faces earth
    jmoon6.position.set(325, 0, 0)
    jmoon6.material.map = textures[jmoon6.name]
    jmoon6_CO.add(jmoon6)

    let jmoon7_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon7_CO.name = 'obama'
    jmoon7_CO.material.map = textures[jmoon7_CO.name]
    jupiter_C.add(jmoon7_CO)

    let jmoon7_size = (20*Math.random())
    let jmoon7 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon7_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon7.name = 'moon'
    jmoon7.rotation.y = Math.PI // moon faces earth
    jmoon7.position.set(350, 0, 0)
    jmoon7.material.map = textures[jmoon7.name]
    jmoon7_CO.add(jmoon7)

    let jmoon8_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon8_CO.name = 'obama'
    jmoon8_CO.material.map = textures[jmoon8_CO.name]
    jupiter_C.add(jmoon8_CO)

    let jmoon8_size = (20*Math.random())
    let jmoon8 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon8_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon8.name = 'moon'
    jmoon8.rotation.y = Math.PI // moon faces earth
    jmoon8.position.set(450, 0, 0)
    jmoon8.material.map = textures[jmoon8.name]
    jmoon8_CO.add(jmoon8)

    let jmoon9_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    jmoon9_CO.name = 'obama'
    jmoon9_CO.material.map = textures[jmoon9_CO.name]
    jupiter_C.add(jmoon9_CO)

    let jmoon9_size = (20*Math.random())
    let jmoon9 = new THREE.Mesh(new THREE.SphereBufferGeometry(jmoon9_size, 40, 40), new THREE.MeshStandardMaterial())
    jmoon9.name = 'moon'
    jmoon9.rotation.y = Math.PI // moon faces earth
    jmoon9.position.set(400, 0, 0)
    jmoon9.material.map = textures[jmoon9.name]
    jmoon9_CO.add(jmoon9)
    jupiter_CO.add(jupiter_C)
    axes.add(jupiter_CO)

    let texture = new THREE.TextureLoader().load('./images/jupiter_ring.png')
    let jupiter_ring = new THREE.Mesh(new THREE.RingGeometry(250, 450, 40))
    jupiter_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    jupiter_ring.rotateX((90 - 3.13) * Math.PI / 180)
    jupiter_C.add(jupiter_ring)
    jupiter_ring.material = new THREE.MeshPhongMaterial(jupiter_ring.materialParams)
    jupiter_ring.material.map = texture

    /// SATURN OBJECTS ///
    let saturn_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    saturn_CO.name = 'obama'
    saturn_CO.material.map = textures[saturn_CO.name]

    let saturn_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
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
    let saturn_ring = new THREE.Mesh(new THREE.RingGeometry(300, 600, 40))
    saturn_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    saturn_ring.rotateX((90 - 26.73) * Math.PI / 180)
    saturn_C.add(saturn_ring)
    saturn_ring.material = new THREE.MeshPhongMaterial(saturn_ring.materialParams)
    saturn_ring.material.map = texture

    /// Saturn's moons ///
    let saturn_moon_CO = []
    let saturn_moon = []
    let texture_list = ["obama", "obama", "obama", "obama", "obama", "obama", "obama", "obama", "obama", "obama"]
    for (let i = 0; i < 10; i++) {
        let temp_moon = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 40, 40), new THREE.MeshStandardMaterial())
        temp_moon.name = texture_list[i]
        temp_moon.material.map = textures[temp_moon.name]
        saturn_moon.push(temp_moon)

        let temp_moon_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
        temp_moon_CO.name = 'obama'
        temp_moon_CO.material.map = textures[temp_moon_CO.name]
        saturn_moon_CO.push(temp_moon_CO)
        saturn_moon_CO[i].add(saturn_moon[i])
        saturn_C.add(saturn_moon_CO[i])
    }

    saturn_moon[0].position.set(10,0,0)
    saturn_moon[0].scale.set(5,5,5)


    /// URANUS OBJECTS ///
    let yourAnus_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    yourAnus_CO.name = 'obama'
    yourAnus_CO.material.map = textures[yourAnus_CO.name]

    let yourAnus_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
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
    let uranus_ring = new THREE.Mesh(new THREE.RingGeometry(50, 175, 40))
    uranus_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    uranus_ring.rotateX(Math.PI / 2)
    yourAnus_C.add(uranus_ring)
    uranus_ring.material = new THREE.MeshPhongMaterial(uranus_ring.materialParams)
    uranus_ring.material.map = texture

    /// NEPTUNE OBJECTS ///
    let neptune_CO = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
    neptune_CO.name = 'obama'
    neptune_CO.material.map = textures[neptune_CO.name]

    let neptune_C = new THREE.Mesh(new THREE.BoxBufferGeometry(.1, .1, .1), new THREE.MeshBasicMaterial())
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
    let neptune_ring = new THREE.Mesh(new THREE.RingGeometry(50, 250, 40))
    neptune_ring.materialParams = { side: THREE.DoubleSide, map: texture, transparent: true, blending: THREE.NormalBlending, depthTest: true, depthWrite: true }
    neptune_ring.rotateX((90 - 28) * Math.PI / 180)
    neptune_C.add(neptune_ring)
    neptune_ring.material = new THREE.MeshBasicMaterial(neptune_ring.materialParams)
    neptune_ring.material.map = texture

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
    let jmoon_orbit =  (earth_rotation / 4333.0)/27.0

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
        jmoon0_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon1_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon2_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon3_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon4_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon5_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon6_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon7_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon8_CO.rotation.y = Math.random() * 2 * Math.PI
        jmoon9_CO.rotation.y = Math.random() * 2 * Math.PI

        //saturn
        saturn_CO.rotation.y = Math.random() * 2 * Math.PI

        //yourAnus
        yourAnus_CO.rotation.y = Math.random() * 2 * Math.PI

        //neptune
        neptune_CO.rotation.y = Math.random() * 2 * Math.PI

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

        //jupiter
        jupiter_CO.rotation.y += jupiter_orbit * controls.speed
        jupiter_C.rotation.y = -jupiter_CO.rotation.y
        jupiter.rotation.y += jupiter_rotation * controls.speed
        jmoon0_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon1_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon2_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon3_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon4_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon5_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon6_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon7_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon8_CO.rotation.y += jmoon_orbit * controls.speed // contains moon
        jmoon9_CO.rotation.y += jmoon_orbit * controls.speed // contains moon

        //saturn
        saturn_CO.rotation.y += saturn_orbit * controls.speed
        saturn_C.rotation.y = -saturn_CO.rotation.y
        saturn.rotation.y += saturn_rotation * controls.speed

        //yourAnus
        yourAnus_CO.rotation.y += yourAnus_orbit * controls.speed
        yourAnus.rotation.y += yourAnus_rotation * controls.speed

        //neptune
        neptune_CO.rotation.y += neptune_orbit * controls.speed
        neptune_C.rotation.y = -neptune_CO.rotation.y
        neptune.rotation.y += neptune_rotation * controls.speed

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