import React, {useRef, useEffect} from 'react';
import * as THREE from 'three'

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const currentMount = mountRef.current

        //Scene
        const scene = new THREE.Scene()

        //Camera
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

        // Agregar cámara a la escena
        scene.add(camera)

        // Renderer, renderizador de escena: se encargará de renderizar todos los objetos en la escena, colores, luces, cámara, etc.
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        // renderer.setSize : espacio donde se renderizarán los objetos.

        // renderer creará un canvas como elemento HTML.
        
        // Montamos el canvas
        currentMount.appendChild(renderer.domElement)

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
