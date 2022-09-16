import React, {useRef, useEffect} from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const currentMount = mountRef.current

        //----------------------------------------- SCENE -----------------------------------------------------//
        const scene = new THREE.Scene()
        //-----------------------------------------------------------------------------------------------------//


        //----------------------------------------- CAMERA -----------------------------------------------------//
        const camera = new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        ) 
        
        // fov: (Field of View) cantidad de vista periférica.
        // aspect: el largo de la pantalla por la altura X:Y (16:9)
        // near: que tan cerca empieza a renderizar
        // far: hasta dónde llega el renderizado
        
        camera.position.z = 4
        // Agregar cámara a la escena
        scene.add(camera)
        
        //-----------------------------------------------------------------------------------------------------//
        
        
        //----------------------------------------- RENDERER -----------------------------------------------------//
        // renderizador de escena: se encargará de renderizar todos los objetos en la escena, colores, luces, cámara, etc.
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        // renderer.setSize : espacio donde se renderizarán los objetos.
        
        // renderer creará un canvas como elemento HTML.
        
        // Montamos el canvas
        currentMount.appendChild(renderer.domElement)
        
        //-----------------------------------------------------------------------------------------------------//
        
        
        //----------------------------------------- CONTROLS -----------------------------------------------------//
        const controls = new OrbitControls(camera, renderer.domElement) //para darle controles de desplazamiento sobre el espacio.
        // controls.target = new THREE.Vector3(0, 0.5, 0)
        controls.enableDamping = true
        
        //-----------------------------------------------------------------------------------------------------//
        

        
        //----------------------------------------- OBJECTS -----------------------------------------------------//
        //Cube:

        const textureLoader = new THREE.TextureLoader()
        const map = textureLoader.load('./bricks/Wall_Stone_010_basecolor.jpg')
        const aoMap = textureLoader.load('./bricks/Wall_Stone_010_ambientOcclusion.jpg')
        const roughnessMap = textureLoader.load('./bricks/Wall_Stone_010_roughness.jpg')
        const normalMap = textureLoader.load('./bricks/Wall_Stone_010_normal.jpg')
        const heightMap = textureLoader.load('./bricks/Wall_Stone_010_height.png')

        const geometry = new THREE.BoxGeometry(1, 1, 1, 
            200,
            200,
            200
            )
        const material = new THREE.MeshStandardMaterial({
            map: map,
            aoMap: aoMap,
            roughnessMap: roughnessMap,
            normalMap: normalMap,
            displacementMap: heightMap,
            displacementScale: 0.07
        })
        const box = new THREE.Mesh( geometry, material )
        scene.add(box)

        


        //CUBE:
        // const cube = new THREE.Mesh( //Malla    //width, height, depth
        //     new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
        //     new THREE.MeshBasicMaterial({
        //         color: 0xfd0000,
        //         transparent: true,
        //         opacity: 0.3,
        //         wireframe: true
        //     })
        // )
        // scene.add(cube)
        // cube.position.x = 0
        // cube.position.z = 0
        // cube.position.y = 0

        //Sphere
        // const textureLoader = new THREE.TextureLoader()
        // const matcap = textureLoader.load('./textures/bronze_like_texture.png')

        // const geometry = new THREE.SphereGeometry( 0.3, 32, 16 );
        // const material = new THREE.MeshMatcapMaterial( {
        //     matcap: matcap
        // } );
        // const sphere = new THREE.Mesh( geometry, material );
        // scene.add( sphere );
        // sphere.position.y = 1

        //TorusKnot
        // const geometryKnot = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
        // const materialKnot = new THREE.MeshNormalMaterial( {
        //     flatShading: true,
        // } );
        // const torusKnot = new THREE.Mesh( geometryKnot, materialKnot );
        // scene.add( torusKnot );
        // torusKnot.position.set(0, -1, 0)
        // torusKnot.scale.set(0.03, 0.03, 0.03)
        
        //-----------------------------------------------------------------------------------------------------//
        

        //----------------------------------------- LIGHTS -----------------------------------------------------//
        const AO = new THREE.AmbientLight(0xffffff, 0.5)
        // scene.add(AO)

        const pointLight = new THREE.PointLight(
            0xff0000,
            1.3,

        )
        pointLight.position.set(0, 0.6, 0)
        // scene.add(pointLight)

        const directionalLight = new THREE.DirectionalLight(
            0xffffff,
            1.3,
        )
        directionalLight.position.set(4, 4, 4)
        scene.add(directionalLight)

        const enviromentMap = new THREE.CubeTextureLoader()
        const envMap = enviromentMap.load([
            './envmap/px.png',
            './envmap/nx.png',
            './envmap/py.png',
            './envmap/ny.png',
            './envmap/pz.png',
            './envmap/nz.png'
        ])
        scene.environment = envMap
        scene.background = envMap

        //Render the scene
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate) //Al llamarse a si misma entrará en un loop constante, generando frames infinitamente.
        }
        animate()

        //No se renderiza el cubo porque si no le asignamos una posición al objeto, la malla se posicionará en las cordenadas x:0, y:0, z:0
        //La cámara al no asignarle posición también se encuentra en la posición x:0, y:0, z:0, ósea dentro del cubo.

        //Clean up scene
        return () => {
            currentMount.removeChild(renderer.domElement)
        }

    }, []);

    return (
        <div 
        className='Contenedor3D'
        ref={mountRef}
        style={{width:'100%', height:'100vh'}}>
            {/* <h1>Hello world</h1> */}
        </div>
    );
}

export default Scene;
