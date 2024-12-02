import * as THREE from 'three';
import { OrbitControls } from 'controls';

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = true;
camera.position.z = 100;

// Colores definidos
const coreColors = ["#f55232", "#e82515", "#f11414", "#f45725"];
const armColors = ["#ffda23", "#a9fff2", "#e78e16", "#de9b1f", "#fff446", "#cdfff4", "#cdf3ff"];

// Textura de resplandor para las estrellas
const spriteTexture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/glow.png");

// Función para crear una estrella con resplandor y destello
function createStarWithGlow(colorHex, size) {
    const color = new THREE.Color(colorHex);

    // Estrella en sí (partícula)
    const starGeometry = new THREE.SphereGeometry(size, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color });
    const star = new THREE.Mesh(starGeometry, starMaterial);

    // Resplandor (Sprite)
    const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteTexture,
        color: color.clone().addScalar(0.3),
        transparent: true,
        opacity: 1
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size * 15, size * 15, 5);
    star.add(sprite);

    // Agrega una propiedad de "destello" aleatorio a la estrella
    star.userData = {
        baseScale: size,
        flashSpeed: Math.random() * 0.05 + 0.01,
        flashOffset: Math.random() * Math.PI * 2
    };

    return star;
}

// Función para crear una galaxia con núcleo denso, núcleo adicional y brazos espirales
function createGalaxy(armCount, starsPerArm, coreRadius, armLength, bulboRadius) {
    const galaxy = new THREE.Group();

    // Núcleo central esférico más denso
    for (let i = 0; i < starsPerArm * 15; i++) { // Incrementa el número de estrellas en el núcleo principal
        const angle = Math.random() * Math.PI * 2;
        const distance = coreRadius * Math.sqrt(Math.random());

        const x = distance * Math.cos(angle);
        const y = (Math.random() - 0.5) * 1.5;
        const z = distance * Math.sin(angle);

        const color = coreColors[Math.floor(Math.random() * coreColors.length)];
        const star = createStarWithGlow(color, 0.2);

        star.position.set(x, y, z);
        galaxy.add(star);
    }

    // Núcleo adicional (capa extra de estrellas alrededor del núcleo principal)
    for (let i = 0; i < starsPerArm * 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = coreRadius * 1.25 * Math.sqrt(Math.random()); // Radio ligeramente mayor al núcleo principal

        const x = distance * Math.cos(angle);
        const y = (Math.random() - 0.5) * 2.5; // Mayor dispersión en Y
        const z = distance * Math.sin(angle);

        const color = coreColors[Math.floor(Math.random() * coreColors.length)];
        const star = createStarWithGlow(color, 0.15); // Tamaño ligeramente menor para dar sensación de distancia

        star.position.set(x, y, z);
        galaxy.add(star);
    }

    // Bulbo con mezcla de estrellas de núcleo y brazos
    for (let i = 0; i < starsPerArm * 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = bulboRadius * Math.sqrt(Math.random());

        const x = distance * Math.cos(angle) * 1.2;
        const y = (Math.random() - 0.5) * 3;
        const z = distance * Math.sin(angle) * 1.2;

        const colorArray = Math.random() < 0.5 ? coreColors : armColors;
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        const star = createStarWithGlow(color, 0.2);

        star.position.set(x, y, z);
        galaxy.add(star);
    }

    // Brazos espirales en 3D, con dispersión en Z
    for (let i = 0; i < armCount; i++) {
        const armOffset = (Math.PI * 2 / armCount) * i;

        for (let j = 0; j < starsPerArm; j++) {
            const angle = j * 0.3 + armOffset;
            const distance = coreRadius + (armLength * j) / starsPerArm;
            const twist = Math.pow(j / starsPerArm, 1.5) * 1.2;

            const x = distance * Math.cos(angle + twist) * 1.4;
            const y = (Math.random() - 0.5) * 3;
            const z = distance * Math.sin(angle + twist) * 1.4;

            const color = armColors[Math.floor(Math.random() * armColors.length)];
            const star = createStarWithGlow(color, 0.15);

            star.position.set(x, y, z);
            galaxy.add(star);
        }
    }

    // Inclinación de 60° en el eje X para simular la vista lateral
    galaxy.rotation.x = THREE.MathUtils.degToRad(60);

    return galaxy;
}

// Crea la galaxia con los parámetros adecuados
const galaxy = createGalaxy(100, 100, 12, 250, 15);
scene.add(galaxy);

// Luz ambiental para resaltar los colores de las estrellas
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Ajuste de la escena
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animación para el destello de las estrellas y rotación de la galaxia
function animate() {
    requestAnimationFrame(animate);

    // Anima el destello de cada estrella
    galaxy.children.forEach(star => {
        const time = performance.now() * 0.001;
        const scale = star.userData.baseScale + 0.1 * Math.sin(time * star.userData.flashSpeed + star.userData.flashOffset);
        star.scale.set(scale, scale, scale);

        // Cambia la opacidad del resplandor
        const sprite = star.children[0]; // el sprite es el resplandor
        sprite.material.opacity = 0.6 + 0.4 * Math.sin(time * star.userData.flashSpeed + star.userData.flashOffset);
    });

    renderer.render(scene, camera);
}

animate();