//Importamos las bibliotecas, los controles, 
import { 
  WebGLRenderer, ACESFilmicToneMapping, sRGBEncoding, 
  Color, CylinderGeometry, 
  RepeatWrapping, DoubleSide, BoxGeometry, Mesh, PointLight, MeshPhysicalMaterial, PerspectiveCamera,
  Scene, PMREMGenerator, PCFSoftShadowMap,
  Vector2, TextureLoader, SphereGeometry, MeshStandardMaterial
} from 'https://cdn.skypack.dev/three@0.137';
import { OrbitControls } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls';
import { RGBELoader } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/RGBELoader';
import { mergeBufferGeometries } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/utils/BufferGeometryUtils';
import {SimplexNoise} from 'https://cdn.skypack.dev/simplex-noise@3.0.0';

//Creamos la escena sobre la que vamos a realizar el proyecto, junto con su color de fondo.
const scene = new Scene();
scene.background = new Color("#FFEECC");

//Creamos una camara para observar toda la ecena
const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(-15,30,35);

//Creamos el renderer que nos ayudará a generar toda la escena
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
//Las propiedades Acesfilmictonemapping y srgbencoding nos ayudan mejorar el aspecto en relacion a nuestro monitor
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputEncoding = sRGBEncoding;
// creamos unas luces , sombras y correctores.
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const luces = new PointLight( new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(), 80, 200 );
luces.position.set(10, 20, 10);
luces.castShadow = true; 
luces.shadow.mapSize.width = 512; 
luces.shadow.mapSize.height = 512; 
luces.shadow.camera.near = 0.5; 
luces.shadow.camera.far = 500; 
//añadimos unas luces a nuestra escena
scene.add( luces );

//definimos los controles para poder mover nuestro mapa en 3d
const controles = new OrbitControls(camera, renderer.domElement);
controles.target.set(0,0,0);
controles.dampingFactor = 0.05;
controles.enableDamping = true;

//Añadimos texturas a nuestro mapa
let pmrem = new PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();

let envmap;

const MAX_HEIGHT = 10;

// creamos la funcion para los materiales, texturas y como se limitan
(async function() {
  let envmapTexture = await new RGBELoader().loadAsync("assets/envmap.hdr");
  let rt = pmrem.fromEquirectangular(envmapTexture);
  envmap = rt.texture;

  let textures = {
    tierra: await new TextureLoader().loadAsync("images/tierra.png"),
    tierra2: await new TextureLoader().loadAsync("images/tierra2.jpg"),
    cesped: await new TextureLoader().loadAsync("images/cesped.jpg"),
    arena: await new TextureLoader().loadAsync("images/arena.jpg"),
    agua: await new TextureLoader().loadAsync("images/agua.jpg"),
    piedra: await new TextureLoader().loadAsync("images/piedra.png"),
  };

  const simplex = new SimplexNoise();
//Creamos un loop que genera hexagonos en forma casi circular, a mayor numero sea el radio mas aproximado es
// con esto generaremos el terreno para nuestro mapa
  for(let i = -35; i <= 35; i++) {
    for(let j = -35; j <= 35; j++) {
      let position = tileToPosition(i, j);

      if(position.length() > 25) continue;
      
//Generamos el relieve del terreno
      let noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
      noise = Math.pow(noise, 1.25);

      hex(noise * 20, position, envmap);
    } 
  }
//generamos las texturas del terreno:

  let piedraMesh = hexMesh(piedraGeo, textures.piedra);
  let cespedMesh = hexMesh(cespedGeo, textures.cesped);
  let tierra2Mesh = hexMesh(tierra2Geo, textures.tierra2);
  let tierraMesh  = hexMesh(tierraGeo, textures.tierra);
  let arenaMesh  = hexMesh(arenaGeo, textures.arena);
  scene.add(piedraMesh, tierraMesh, tierra2Mesh, arenaMesh, cespedMesh);

//cremos las texturas del agua junto con las caracteristicas fisicas
  let aguaTexture = textures.agua;
  aguaTexture.repeat = new Vector2(1, 1);
  aguaTexture.wrapS = RepeatWrapping;
  aguaTexture.wrapT = RepeatWrapping;
//definimos el espacio que va a ocupar el agua, transparencia, trnsmision, sombras que crea, etc.
  let aguaMesh = new Mesh(
    new CylinderGeometry(17, 17, MAX_HEIGHT * 0.25, 50),
    new MeshPhysicalMaterial({
      envMap: envmap,
      color: new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3),
      ior: 1.4,
      transmission: 1,
      transparent: true,
      thickness: 1.25,
      envMapIntensity: 0.25, 
      roughness: 1,
      metalness: 0.025,
      roughnessMap: aguaTexture,
      metalnessMap: aguaTexture,
    })
  );
  aguaMesh.receiveShadow = true;
  aguaMesh.rotation.y = -Math.PI * 0.333 * 0.5;
  aguaMesh.position.set(0, MAX_HEIGHT * 0.1, 0);
  scene.add(aguaMesh);
//Creamos un contenedor para contener el mapa que hemos creado.
  let mapContainer = new Mesh(
    new CylinderGeometry(17.1, 17.1, MAX_HEIGHT * 0.25, 50, 1, true),
    new MeshPhysicalMaterial({
      envMap: envmap,
      map: textures.dirt,
      envMapIntensity: 0.2, 
      side: DoubleSide,
    })
  );
  mapContainer.receiveShadow = true;
  mapContainer.rotation.y = -Math.PI * 0.333 * 0.5;
  mapContainer.position.set(0, MAX_HEIGHT * 0.125, 0);
  scene.add(mapContainer);
//creamos una base para el mapa
  let mapFloor = new Mesh(
    new CylinderGeometry(18.5, 18.5, MAX_HEIGHT * 0.1, 50),
    new MeshPhysicalMaterial({
      envMap: envmap,
      map: textures.dirt2,
      envMapIntensity: 0.1, 
      side: DoubleSide,
    })
  );
  mapFloor.receiveShadow = true;
  mapFloor.position.set(0, -MAX_HEIGHT * 0.05, 0);
  scene.add(mapFloor);

  nubes();

  renderer.setAnimationLoop(() => {
    controles.update();
    renderer.render(scene, camera);
  });
})();
//Espaciamos los hexagonos para notar el limite entr unos y otros, y de esta forma que no se confundan las texturas.
function tileToPosition(tileX, tileY) {
  return new Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535);
}

function hexGeometry(height, position) {
  let geo  = new CylinderGeometry(1, 1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);

  return geo;
}

//Ahora bien no puede haber una montaña de agua rodeada de arena, es por ello que limitamos los 
//materiales dependiendo de la altura se genera uno u otra textura, las mas altas serán piedra y tierra
//mientras que las bajas serán arena y tierra2

const PIEDRA_HEIGHT = MAX_HEIGHT * 0.9;
const TIERRA_HEIGHT = MAX_HEIGHT * 0.6;
const CESPED_HEIGHT = MAX_HEIGHT * 0.4;
const ARENA_HEIGHT = MAX_HEIGHT * 0.2;
const TIERRA2_HEIGHT = MAX_HEIGHT * 0;

let piedraGeo = new BoxGeometry(0,0,0);
let tierraGeo = new BoxGeometry(0,0,0);
let tierra2Geo = new BoxGeometry(0,0,0);
let arenaGeo = new BoxGeometry(0,0,0);
let cespedGeo = new BoxGeometry(0,0,0);

//Esta funcion genera de forma aleatoria el terreno, y tambien los añadidos, por ejemplo si 
//hay un terreno PIEDRA se genera un numero aleatrorio entr 1 y 0, si este coincide con 0.5
//aparece una piedra en ese hexagono, de la misma forma se generan los arboles y las nubes, pero cuanto
//mayor es el valor mas posibilidades hay de que aparezca una piedra, una nube o un arbol.
function hex(height, position) {
  let geo = hexGeometry(height, position);

  if(height > PIEDRA_HEIGHT) {
    piedraGeo = mergeBufferGeometries([geo, piedraGeo]);

    if(Math.random() > 0.5) {
      piedraGeo = mergeBufferGeometries([piedraGeo, roca(height, position)]);
    }
  } else if(height > TIERRA_HEIGHT) {
    tierraGeo = mergeBufferGeometries([geo, arenaGeo]);

    if(Math.random() > 0.6) {
      cespedGeo = mergeBufferGeometries([cespedGeo, arbol(height, position)]);
    }
  } else if(height > CESPED_HEIGHT) {
    cespedGeo = mergeBufferGeometries([geo, cespedGeo]);
  } else if(height > ARENA_HEIGHT) { 
    arenaGeo = mergeBufferGeometries([geo, arenaGeo]);

    if(Math.random() > 0.7 && piedraGeo) {
      piedraGeo = mergeBufferGeometries([piedraGeo, roca(height, position)]);
    }
  } else if(height > TIERRA2_HEIGHT) {
    tierra2Geo = mergeBufferGeometries([geo, tierra2Geo]);
  } 
}
//funcion malla hexagono 
function hexMesh(geo, map) {
  let mat = new MeshPhysicalMaterial({ 
    envMap: envmap, 
    envMapIntensity: 0.135, 
    flatShading: true,
    map
  });

  let mesh = new Mesh(geo, mat);
  mesh.castShadow = true; 
  mesh.receiveShadow = true;

  return mesh;
}

// funcion arbol
function arbol(height, position) {
  const arbolHeight = Math.random() * 1 + 1.25;

  const geo = new CylinderGeometry(0, 1.5, arboleight, 3);
  geo.translate(position.x, height + arbolHeight * 0 + 1, position.y);
  
  const geo2 = new CylinderGeometry(0, 1.15, treeHeight, 3);
  geo2.translate(position.x, height + arbolHeight * 0.6 + 1, position.y);
  
  const geo3 = new CylinderGeometry(0, 0.8, treeHeight, 3);
  geo3.translate(position.x, height + arbolHeight * 1.25 + 1, position.y);

  return mergeBufferGeometries([geo, geo2, geo3]);
}

// funcion roca
function roca(height, position) {
  const px = Math.random() * 0.4;
  const pz = Math.random() * 0.4;

  const geo = new SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, height, position.y + pz);

  return geo;
}

//creamos las nubes
function nubes() {
  let geo = new SphereGeometry(0, 0, 0); 
  let count = Math.floor(Math.pow(Math.random(), 0.5) * 6);

  for(let i = 0; i < count; i++) {
    const puff1 = new SphereGeometry(1.2, 7, 7);
    const puff2 = new SphereGeometry(1.5, 7, 7);
    const puff3 = new SphereGeometry(0.9, 7, 7);
   
    puff1.translate(-1.85, Math.random() * 0.3, 0);
    puff2.translate(0,     Math.random() * 0.3, 0);
    puff3.translate(1.85,  Math.random() * 0.3, 0);

    const nubeGeo = mergeBufferGeometries([puff1, puff2, puff3]);
    nubeGeo.translate( 
      Math.random() * 20 - 10, 
      Math.random() * 7 + 7, 
      Math.random() * 20 - 10
    );
    nubeGeo.rotateY(Math.random() * Math.PI * 2);

    geo = mergeBufferGeometries([geo, nubeGeo]);
  }
  
  const mesh = new Mesh(
    geo,
    new MeshStandardMaterial({
      envMap: envmap, 
      envMapIntensity: 0.75, 
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    })
  );
//generamos la escena
  scene.add(mesh);
}