import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xd0f4ea);

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()


// GLTF loader
const gltfLoader = new GLTFLoader()

const baseTexture = textureLoader.load('./models/id11.jpg')
baseTexture.flipY = false
baseTexture.encoding = THREE.sRGBEncoding

const baseMaterial = new THREE.MeshBasicMaterial({ map: baseTexture })

gltfLoader.load(
    '/models/id.glb',
    (gltf) => {
        console.log(gltf.scene.children[0]);
        gltf.scene.children[0].material = baseMaterial
        scene.add(gltf.scene)
    }
)

/**
 * Sizes
 */
const sizes = {
    width: document.querySelector('canvas.webgl').offsetWidth,
    height: document.querySelector('canvas.webgl').offsetHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = document.querySelector('canvas.webgl').offsetWidth,
    sizes.height = document.querySelector('canvas.webgl').offsetHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 12

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()