import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { PointerLockControls } from
"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";


// ============================================================
// ADIDAS — OUR LITTLE WORLD
// ============================================================

const scene = new THREE.Scene();

// =====================================================
// ADIDAS WORLD — EXTRA GARDEN DETAILS
// =====================================================

function adidasMakeFlower(x, z, color) {

    const flower = new THREE.Group();

    // stem
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.035, 0.55, 6),
        new THREE.MeshStandardMaterial({
            color: 0x3f7a3a
        })
    );

    stem.position.y = 0.275;
    flower.add(stem);

    // petals
    const petalMaterial = new THREE.MeshStandardMaterial({
        color: color
    });

    for (let i = 0; i < 6; i++) {

        const petal = new THREE.Mesh(
            new THREE.SphereGeometry(0.11, 8, 6),
            petalMaterial
        );

        const angle = (Math.PI * 2 / 6) * i;

        petal.position.set(
            Math.cos(angle) * 0.12,
            0.55,
            Math.sin(angle) * 0.12
        );

        petal.scale.set(
            1,
            0.45,
            0.7
        );

        flower.add(petal);
    }

    // centre
    const centre = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 6),
        new THREE.MeshStandardMaterial({
            color: 0xffd84a
        })
    );

    centre.position.y = 0.55;
    flower.add(centre);

    flower.position.set(x, 0, z);

    scene.add(flower);

    return flower;
}

// -----------------------------------------------------
// FLOWER PATCHES
// -----------------------------------------------------

const adidasFlowerPositions = [

    // garden
    [-8, -7],
    [-6.5, -6],
    [-4.8, -7.5],
    [-2.5, -6.2],

    // near house
    [5, -7],
    [7, -6],
    [9, -7.5],

    // path
    [-11, 2],
    [-10, 4],
    [-8.5, 5],

    // farther garden
    [12, 3],
    [14, 4],
    [15, 6],

    // random little clusters
    [-15, -4],
    [-13.5, -5],
    [16, -3],
    [18, -4]
];

adidasFlowerPositions.forEach(function(pos, index) {

    const colors = [
        0xff6f91,
        0xffd85c,
        0xffffff,
        0xb98cff
    ];

    adidasMakeFlower(
        pos[0],
        pos[1],
        colors[index % colors.length]
    );
});

// =====================================================
// ADIDAS WORLD — TREES & BUSHES
// =====================================================

function adidasMakeTree(x, z, scale = 1) {

    const tree = new THREE.Group();

    // trunk
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.22 * scale,
            0.35 * scale,
            2.4 * scale,
            8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x65452c,
            roughness: 1
        })
    );

    trunk.position.y = 1.2 * scale;
    tree.add(trunk);

    // lower foliage
    const foliage1 = new THREE.Mesh(
        new THREE.SphereGeometry(1.15 * scale, 10, 8),
        new THREE.MeshStandardMaterial({
            color: 0x315f35,
            roughness: 1
        })
    );

    foliage1.position.y = 2.5 * scale;
    tree.add(foliage1);

    // upper foliage
    const foliage2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.9 * scale, 10, 8),
        new THREE.MeshStandardMaterial({
            color: 0x3f7540,
            roughness: 1
        })
    );

    foliage2.position.set(
        0.35 * scale,
        3.25 * scale,
        0
    );

    tree.add(foliage2);

    // small side foliage
    const foliage3 = new THREE.Mesh(
        new THREE.SphereGeometry(0.65 * scale, 9, 7),
        new THREE.MeshStandardMaterial({
            color: 0x284f30,
            roughness: 1
        })
    );

    foliage3.position.set(
        -0.45 * scale,
        2.9 * scale,
        0.2 * scale
    );

    tree.add(foliage3);

    tree.position.set(x, 0, z);

    scene.add(tree);

    return tree;
}


// -----------------------------------------------------
// TREES AROUND THE WORLD
// -----------------------------------------------------

adidasMakeTree(-18, -8, 1.25);
adidasMakeTree(-14, -12, 0.9);
adidasMakeTree(-10, -14, 1.1);

adidasMakeTree(12, -10, 1.2);
adidasMakeTree(16, -13, 0.85);
adidasMakeTree(21, -9, 1.35);

adidasMakeTree(-19, 8, 1.05);
adidasMakeTree(-16, 12, 1.3);

adidasMakeTree(17, 9, 1.15);
adidasMakeTree(21, 13, 0.9);

adidasMakeTree(-5, 18, 1.15);
adidasMakeTree(11, 20, 1.3);


scene.background =
  new THREE.Color(0x9ed8ff);

scene.fog =
  new THREE.Fog(
    0x9ed8ff,
    35,
    150
  );


// ============================================================
// CAMERA
// ============================================================

const camera =
  new THREE.PerspectiveCamera(
    75,
    window.innerWidth /
      window.innerHeight,
    0.1,
    300
  );

camera.position.set(
  0,
  2,
  18
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

document
  .getElementById("game")
  .appendChild(
    renderer.domElement
  );


// ============================================================
// LIGHTING — CINEMATIC WORLD
// ============================================================

const hemiLight = new THREE.HemisphereLight(
    0xb9dcff,
    0x3b2d24,
    1.8
);

scene.add(hemiLight);


// Main sunlight

const sun = new THREE.DirectionalLight(
    0xfff1d0,
    3.2
);

sun.position.set(
    18,
    32,
    12
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -60;
sun.shadow.camera.right = 60;
sun.shadow.camera.top = 60;
sun.shadow.camera.bottom = -60;

sun.shadow.bias = -0.0005;

scene.add(sun);


// Warm secondary light near the house

const houseGlow = new THREE.PointLight(
    0xffc078,
    1.8,
    18
);

houseGlow.position.set(
    0,
    5,
    -10
);

scene.add(houseGlow);


// Soft light around the garden

const gardenGlow = new THREE.PointLight(
    0xffd6a0,
    0.8,
    25
);

gardenGlow.position.set(
    -18,
    4,
    12
);

scene.add(gardenGlow);

// ============================================================
// MATERIALS
// ============================================================

const grass =
  new THREE.MeshStandardMaterial({
    color: 0x4f8c45
  });

const grassDark =
  new THREE.MeshStandardMaterial({
    color: 0x315c32
  });

const stone =
  new THREE.MeshStandardMaterial({
    color: 0x77746d
  });

const marble =
  new THREE.MeshStandardMaterial({
    color: 0xe8e3d9
  });

const white =
  new THREE.MeshStandardMaterial({
    color: 0xf0ede6
  });

const concrete =
  new THREE.MeshStandardMaterial({
    color: 0xb5b1a9
  });

const wood =
  new THREE.MeshStandardMaterial({
    color: 0x70482f
  });

const darkWood =
  new THREE.MeshStandardMaterial({
    color: 0x302018
  });

const black =
  new THREE.MeshStandardMaterial({
    color: 0x171717
  });

const glass =
  new THREE.MeshPhysicalMaterial({
    color: 0x8ed4ff,
    transparent: true,
    opacity: 0.38,
    roughness: 0.08
  });

const sofaMat =
  new THREE.MeshStandardMaterial({
    color: 0xb18b72
  });

const cushionMat =
  new THREE.MeshStandardMaterial({
    color: 0xd7b79f
  });

const green =
  new THREE.MeshStandardMaterial({
    color: 0x4d7746
  });

const red =
  new THREE.MeshStandardMaterial({
    color: 0x9c4145
  });

const gold =
  new THREE.MeshStandardMaterial({
    color: 0xc79b42,
    metalness: 0.7,
    roughness: 0.25
  });

const paper =
  new THREE.MeshStandardMaterial({
    color: 0xf5ead5
  });

const blue =
  new THREE.MeshStandardMaterial({
    color: 0x5278a8
  });

const purple =
  new THREE.MeshStandardMaterial({
    color: 0x765a91
  });

const pink =
  new THREE.MeshStandardMaterial({
    color: 0xff8fab
  });

const orange =
  new THREE.MeshStandardMaterial({
    color: 0xe78b45
  });

const riverBlue =
  new THREE.MeshStandardMaterial({
    color: 0x4fa7c9,
    roughness: 0.2
  });


// ============================================================
// HELPERS
// ============================================================

function cube(
  w,
  h,
  d,
  material,
  x,
  y,
  z,
  parent = scene
) {

  const object =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        w,
        h,
        d
      ),
      material
    );

  object.position.set(
    x,
    y,
    z
  );

  object.castShadow = true;
  object.receiveShadow = true;

  parent.add(object);

  return object;
}


function cylinder(
  radius,
  height,
  material,
  x,
  y,
  z,
  parent = scene
) {

  const object =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        24
      ),
      material
    );

  object.position.set(
    x,
    y,
    z
  );

  object.castShadow = true;
  object.receiveShadow = true;

  if (
    !parent ||
    typeof parent.add !== "function"
  ) {
    parent = scene;
  }

  parent.add(object);

  return object;
}


function sphere(
  radius,
  material,
  x,
  y,
  z,
  parent = scene
) {

  const object =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        20,
        20
      ),
      material
    );

  object.position.set(
    x,
    y,
    z
  );

  object.castShadow = true;
  object.receiveShadow = true;

  parent.add(object);

  return object;
}


function glowSphere(
  radius,
  color,
  x,
  y,
  z,
  parent = scene
) {

  const material =
    new THREE.MeshBasicMaterial({
      color: color
    });

  const object =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        20,
        20
      ),
      material
    );

  object.position.set(
    x,
    y,
    z
  );

  parent.add(object);

  return object;
}


// ============================================================
// GROUND
// ============================================================

cube(
  180,
  1,
  180,
  grass,
  0,
  -0.5,
  0
);


// ============================================================
// MAIN PATH
// ============================================================

cube(
  5,
  0.08,
  42,
  marble,
  0,
  0.04,
  10
);


// ============================================================
// TREES
// ============================================================

function tree(x, z) {

  // TRUNK
  cylinder(
    0.38,
    0.55,
    4.5,
    wood,
    x,
    2.25,
    z
  );

  // MAIN FOLIAGE
  sphere(
    1.45,
    green,
    x,
    5.1,
    z
  );

  sphere(
    1.25,
    green,
    x - 1.0,
    5.25,
    z + 0.2
  );

  sphere(
    1.3,
    green,
    x + 1.0,
    5.35,
    z - 0.15
  );

  sphere(
    1.05,
    green,
    x - 0.25,
    6.25,
    z + 0.45
  );

  // SMALL HIGHER BRANCH
  sphere(
    0.85,
    green,
    x + 0.65,
    6.35,
    z - 0.5
  );
}


tree(-18, -12);
tree(18, -12);
tree(-19, 5);
tree(19, 5);
tree(-18, 21);
tree(18, 21);
tree(-25, 32);
tree(25, 32);


// ============================================================
// FLOWERS
// ============================================================

function flower(
  x,
  z,
  material
) {

  cylinder(
    0.05,
    0.5,
    green,
    x,
    0.25,
    z
  );

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const angle =
      i *
      Math.PI *
      2 /
      5;

    sphere(
      0.14,
      material,
      x +
        Math.cos(angle) *
        0.18,
      0.52,
      z +
        Math.sin(angle) *
        0.18
    );
  }

  sphere(
    0.07,
    gold,
    x,
    0.52,
    z
  );
}


const flowerMaterials = [
  pink,
  white,
  orange,
  purple
];


for (
  let i = 0;
  i < 70;
  i++
) {

  flower(
    -16 +
      Math.random() * 32,

    -2 +
      Math.random() * 32,

    flowerMaterials[
      Math.floor(
        Math.random() *
        flowerMaterials.length
      )
    ]
  );
}


// ============================================================
// HOUSE GROUP
// ============================================================

const house =
  new THREE.Group();

house.position.set(
  0,
  0,
  -12
);

scene.add(house);

// ============================================================
// HOUSE EXTERIOR
// ============================================================

// HOUSE BODY
cube(
  26,
  5,
  15,
  white,
  0,
  3,
  0,
  house
);

// STONE FOUNDATION
cube(
  27,
  1,
  16,
  stone,
  0,
  0.5,
  0,
  house
);

// ROOF
cube(
  28,
  0.8,
  17,
  darkWood,
  0,
  5.9,
  0,
  house
);

// ROOF TOP
cube(
  26,
  0.35,
  15.5,
  black,
  0,
  6.45,
  0,
  house
);
// ============================================================
// FRONT DOOR
// ============================================================

// Door
cube(
  3.2,
  4.2,
  0.3,
  darkWood,
  0,
  2.6,
  7.65,
  house
);

// Glass panel in door
cube(
  2.1,
  2.8,
  0.08,
  glass,
  0,
  2.8,
  7.48,
  house
);

// Door frame - left
cube(
  0.25,
  4.5,
  0.35,
  darkWood,
  -1.7,
  2.6,
  7.8,
  house
);

// Door frame - right
cube(
  0.25,
  4.5,
  0.35,
  darkWood,
  1.7,
  2.6,
  7.8,
  house
);

// Door frame - top
cube(
  3.65,
  0.25,
  0.35,
  darkWood,
  0,
  4.85,
  7.8,
  house
);

// Door handle
sphere(
  0.12,
  gold,
  0.85,
  2.6,
  7.35,
  house
);


// ============================================================
// FRONT WINDOWS
// ============================================================

// LEFT LARGE WINDOW
cube(
  5.5,
  3.2,
  0.12,
  glass,
  -8,
  3.2,
  7.52,
  house
);

// LEFT WINDOW FRAME
cube(0.2, 3.5, 0.3, darkWood, -10.8, 3.2, 7.7, house);
cube(0.2, 3.5, 0.3, darkWood, -5.2, 3.2, 7.7, house);
cube(5.8, 0.2, 0.3, darkWood, -8, 4.95, 7.7, house);
cube(5.8, 0.2, 0.3, darkWood, -8, 1.45, 7.7, house);

// Window divider
cube(
  0.15,
  3.2,
  0.25,
  darkWood,
  -8,
  3.2,
  7.72,
  house
);


// RIGHT LARGE WINDOW