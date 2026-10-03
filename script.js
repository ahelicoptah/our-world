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
cube(
  5.5,
  3.2,
  0.12,
  glass,
  8,
  3.2,
  7.52,
  house
);

// RIGHT WINDOW FRAME
cube(0.2, 3.5, 0.3, darkWood, 5.2, 3.2, 7.7, house);
cube(0.2, 3.5, 0.3, darkWood, 10.8, 3.2, 7.7, house);
cube(5.8, 0.2, 0.3, darkWood, 8, 4.95, 7.7, house);
cube(5.8, 0.2, 0.3, darkWood, 8, 1.45, 7.7, house);

// Window divider
cube(
  0.15,
  3.2,
  0.25,
  darkWood,
  8,
  3.2,
  7.72,
  house
);
// ============================================================
// SECOND FLOOR
// ============================================================

// Upper floor

cube(
    20,
    0.3,
    11,
    white,
    0,
    5.05,
    -0.5,
    house
);

// Upper front window
cube(
  8,
  2.6,
  0.12,
  glass,
  0,
  8.0,
  5.05,
  house
);

// Upper window frame - left
cube(
  0.22,
  2.9,
  0.3,
  darkWood,
  -4,
  8.0,
  5.2,
  house
);

// Upper window frame - right
cube(
  0.22,
  2.9,
  0.3,
  darkWood,
  4,
  8.0,
  5.2,
  house
);

// Upper window divider
cube(
  0.15,
  2.6,
  0.25,
  darkWood,
  0,
  8.0,
  5.22,
  house
);

// Upper window top
cube(
  8.4,
  0.2,
  0.3,
  darkWood,
  0,
  9.45,
  5.2,
  house
);

// Upper window bottom
cube(
  8.4,
  0.2,
  0.3,
  darkWood,
  0,
  6.55,
  5.2,
  house
);


// ============================================================
// BALCONY
// ============================================================

cube(
  11,
  0.3,
  2.4,
  marble,
  0,
  6.0,
  6.3,
  house
);

// Balcony front railing
cube(
  11,
  0.15,
  0.15,
  black,
  0,
  7.0,
  7.45,
  house
);

// Balcony railing posts
for (let x = -5; x <= 5; x += 1) {
  cube(
    0.12,
    1.1,
    0.12,
    black,
    x,
    6.5,
    7.45,
    house
  );
}
// ============================================================
// FRONT ENTRANCE + ARCHITECTURAL DETAILS
// ============================================================

// Wide entrance canopy
cube(
  7,
  0.35,
  2.8,
  marble,
  0,
  5.45,
  8.0,
  house
);

// Entrance columns
for (let x of [-4.8, 4.8]) {

  cylinder(
    0.35,
    4.5,
    concrete,
    x,
    3.0,
    8.0,
    house
  );

  cylinder(
    0.5,
    0.25,
    stone,
    x,
    5.35,
    8.0,
    house
  );

  cylinder(
    0.5,
    0.25,
    stone,
    x,
    0.8,
    8.0,
    house
  );
}


// ============================================================
// ENTRANCE STEPS
// ============================================================

cube(
  8,
  0.25,
  1.2,
  stone,
  0,
  0.8,
  8.8,
  house
);

cube(
  10,
  0.25,
  1.2,
  stone,
  0,
  0.55,
  9.8,
  house
);


// ============================================================
// MODERN ROOF
// ============================================================

// Main roof overhang
cube(
  28,
  0.65,
  17,
  darkWood,
  0,
  10.0,
  -0.2,
  house
);

// Thin roof cap
cube(
  29,
  0.25,
  18,
  black,
  0,
  10.45,
  -0.2,
  house
);


// ============================================================
// WARM ARCHITECTURAL LIGHTS
// ============================================================

for (let x of [-10, -4, 4, 10]) {

  sphere(
    0.13,
    gold,
    x,
    4.9,
    7.35,
    house
  );
}


// ============================================================
// INDIAN-INSPIRED DETAIL
// ============================================================

// Small decorative gold finials
for (let x of [-3.5, 3.5]) {

  sphere(
    0.22,
    gold,
    x,
    5.65,
    8.0,
    house
  );
}

// ============================================================
// HOUSE INTERIOR — FLOOR
// ============================================================
// ============================================================
// GRAND HOUSE INTERIOR
// ============================================================

const interior =
  new THREE.Group();

interior.position.set(
  0,
  0,
  -12
);

scene.add(interior);

interior.visible = true;


// ============================================================
// FLOOR
// ============================================================

cube(
  24,
  0.25,
  15,
  marble,
  0,
  0.15,
  0,
  interior
);


// ============================================================
// BACK WALL
// ============================================================

cube(
  24,
  7,
  0.3,
  white,
  0,
  3.5,
  -7.2,
  interior
);


// ============================================================
// LEFT WALL
// ============================================================

cube(
  0.3,
  7,
  15,
  white,
  -12,
  3.5,
  0,
  interior
);


// ============================================================
// RIGHT WALL
// ============================================================

cube(
  0.3,
  7,
  15,
  white,
  12,
  3.5,
  0,
  interior
);


// ============================================================
// LARGE BACK WINDOWS
// ============================================================

cube(
  8,
  4.2,
  0.12,
  glass,
  -6.5,
  4,
  -7.0,
  interior
);

cube(
  8,
  4.2,
  0.12,
  glass,
  6.5,
  4,
  -7.0,
  interior
);


// Window frames

for (let x of [-10.5, -6.5, -2.5, 2.5, 6.5, 10.5]) {

  cube(
    0.14,
    4.5,
    0.2,
    darkWood,
    x,
    4,
    -7.05,
    interior
  );
}

cube(
  23,
  0.18,
  0.25,
  darkWood,
  0,
  6.25,
  -7.05,
  interior
);

cube(
  23,
  0.18,
  0.25,
  darkWood,
  0,
  1.75,
  -7.05,
  interior
);


// ============================================================
// WARM INTERIOR LIGHTING
// ============================================================

const interiorLight =
  new THREE.PointLight(
    0xffd6a0,
    3.5,
    24
  );

interiorLight.position.set(
  -2,
  5.5,
  0
);

interior.add(
  interiorLight
);


const interiorLight2 =
  new THREE.PointLight(
    0xffd6a0,
    2.8,
    18
  );

interiorLight2.position.set(
  8,
  4,
  -4
);

interior.add(
  interiorLight2
);


// ============================================================
// CEILING BEAMS
// ============================================================

for (let x of [-9, -3, 3, 9]) {

  cube(
    0.35,
    0.35,
    14,
    darkWood,
    x,
    6.9,
    0,
    interior
  );
}


// ============================================================
// LARGE AREA RUG
// ============================================================

cube(
  10,
  0.06,
  6,
  purple,
  -3,
  0.32,
  1.2,
  interior
);

cube(
  9.5,
  0.04,
  5.5,
  cushionMat,
  -3,
  0.36,
  1.2,
  interior
);

// ============================================================
// LIVING ROOM
// ============================================================

// ============================================================
// LIVING ROOM — PROPER SCALE
// ============================================================

const livingRoom =
  new THREE.Group();

interior.add(livingRoom);

// ------------------------------------------------------------
// LIVING ROOM RUG
// ------------------------------------------------------------

cube(
  8,
  0.05,
  5,
  purple,
  -3.5,
  0.32,
  1.0,
  livingRoom
);

cube(
  7.7,
  0.03,
  4.7,
  cushionMat,
  -3.5,
  0.36,
  1.0,
  livingRoom
);

// ------------------------------------------------------------
// SOFA BASE
// ------------------------------------------------------------

cube(
  5.2,
  0.35,
  1.9,
  darkWood,
  -3.8,
  0.75,
  1.9,
  livingRoom
);

// ------------------------------------------------------------
// SOFA SEAT
// ------------------------------------------------------------

cube(
  5.0,
  0.4,
  1.65,
  sofaMat,
  -3.8,
  1.05,
  1.8,
  livingRoom
);

// ------------------------------------------------------------
// SOFA BACK
// ------------------------------------------------------------

cube(
  5.1,
  1.45,
  0.35,
  sofaMat,
  -3.8,
  1.75,
  2.55,
  livingRoom
);

// ------------------------------------------------------------
// SOFA ARMRESTS
// ------------------------------------------------------------

cube(
  0.38,
  1.15,
  1.7,
  sofaMat,
  -6.1,
  1.45,
  1.85,
  livingRoom
);

cube(
  0.38,
  1.15,
  1.7,
  sofaMat,
  -1.5,
  1.45,
  1.85,
  livingRoom
);

// ------------------------------------------------------------
// SOFA CUSHIONS
// ------------------------------------------------------------

for (let x of [-5.35, -3.8, -2.25]) {

  cube(
    1.35,
    0.18,
    1.25,
    cushionMat,
    x,
    1.36,
    1.75,
    livingRoom
  );

}

// ------------------------------------------------------------
// BACK CUSHIONS
// ------------------------------------------------------------

for (let x of [-5.25, -3.8, -2.35]) {

  cube(
    1.3,
    0.85,
    0.22,
    sofaMat,
    x,
    1.9,
    2.35,
    livingRoom
  );

}

// ------------------------------------------------------------
// DECORATIVE PILLOWS
// ------------------------------------------------------------

cube(
  0.75,
  0.22,
  0.65,
  purple,
  -5.45,
  1.95,
  2.0,
  livingRoom
);

cube(
  0.75,
  0.22,
  0.65,
  gold,
  -2.15,
  1.95,
  2.0,
  livingRoom
);

// ============================================================
// COFFEE TABLE
// ============================================================

cube(
  3.2,
  0.22,
  1.5,
  darkWood,
  -3.8,
  0.65,
  -0.15,
  livingRoom
);

cube(
  3.0,
  0.06,
  1.3,
  marble,
  -3.8,
  0.79,
  -0.15,
  livingRoom
);

// ------------------------------------------------------------
// TABLE LEGS
// ------------------------------------------------------------

for (let x of [-5.0, -2.6]) {

  for (let z of [-0.7, 0.4]) {

    cube(
      0.14,
      0.65,
      0.14,
      black,
      x,
      0.32,
      z,
      livingRoom
    );

  }

}

// ------------------------------------------------------------
// COFFEE TABLE DECOR
// ------------------------------------------------------------

cylinder(
  0.32,
  0.08,
  gold,
  -3.8,
  0.9,
  -0.15,
  livingRoom
);

sphere(
  0.12,
  green,
  -3.8,
  1.05,
  -0.15,
  livingRoom
);

sphere(
  0.12,
  pink,
  -3.55,
  1.05,
  -0.15,
  livingRoom
);

sphere(
  0.12,
  white,
  -4.05,
  1.05,
  -0.15,
  livingRoom
);

// ============================================================
// TV WALL
// ============================================================

cube(
  6.2,
  3.8,
  0.25,
  darkWood,
  -3.8,
  3.25,
  -6.8,
  livingRoom
);

// ------------------------------------------------------------
// TV
// ------------------------------------------------------------

cube(
  4.8,
  2.7,
  0.10,
  black,
  -3.8,
  3.65,
  -6.62,
  livingRoom
);

cube(
  4.4,
  2.35,
  0.035,
  glass,
  -3.8,
  3.65,
  -6.55,
  livingRoom
);

// ------------------------------------------------------------
// TV CONSOLE
// ------------------------------------------------------------

cube(
  5.8,
  0.42,
  0.75,
  darkWood,
  -3.8,
  0.85,
  -5.95,
  livingRoom
);

// ------------------------------------------------------------
// CONSOLE SHELVES
// ------------------------------------------------------------

cube(
  1.5,
  0.06,
  0.55,
  black,
  -5.15,
  0.95,
  -5.5,
  livingRoom
);

cube(
  1.5,
  0.06,
  0.55,
  black,
  -2.45,
  0.95,
  -5.5,
  livingRoom
);

// ============================================================
// PLANT BESIDE TV
// ============================================================

cylinder(
  0.32,
  0.5,
  darkWood,
  0.4,
  0.5,
  -5.8,
  livingRoom
);

cylinder(
  0.05,
  1.0,
  green,
  0.4,
  1.25,
  -5.8,
  livingRoom
);

sphere(
  0.55,
  green,
  0.4,
  1.9,
  -5.8,
  livingRoom
);

sphere(
  0.35,
  green,
  0.05,
  1.75,
  -5.8,
  livingRoom
);

sphere(
  0.35,
  green,
  0.75,
  1.72,
  -5.8,
  livingRoom
);

// ============================================================
// DINING AREA — PROPER SCALE
// ============================================================

const diningArea =
  new THREE.Group();

interior.add(diningArea);

// ------------------------------------------------------------
// DINING TABLE
// ------------------------------------------------------------

cube(
  4.0,
  0.22,
  1.65,
  darkWood,
  6.3,
  1.55,
  2.0,
  diningArea
);

cube(
  3.75,
  0.06,
  1.4,
  marble,
  6.3,
  1.69,
  2.0,
  diningArea
);

// ------------------------------------------------------------
// TABLE LEGS
// ------------------------------------------------------------

for (let x of [4.75, 7.85]) {

  for (let z of [1.4, 2.6]) {

    cube(
      0.18,
      1.45,
      0.18,
      darkWood,
      x,
      0.78,
      z,
      diningArea
    );

  }

}

// ------------------------------------------------------------
// DINING CHAIRS
// ------------------------------------------------------------

// Front chairs

for (let x of [5.1, 7.5]) {

  cube(
    0.85,
    0.18,
    0.85,
    darkWood,
    x,
    0.95,
    0.75,
    diningArea
  );

  cube(
    0.85,
    1.15,
    0.16,
    darkWood,
    x,
    1.48,
    0.35,
    diningArea
  );

}

// Back chairs

for (let x of [5.1, 7.5]) {

  cube(
    0.85,
    0.18,
    0.85,
    darkWood,
    x,
    0.95,
    3.25,
    diningArea
  );

  cube(
    0.85,
    1.15,
    0.16,
    darkWood,
    x,
    1.48,
    3.65,
    diningArea
  );

}

// ------------------------------------------------------------
// TABLE CENTREPIECE
// ------------------------------------------------------------

cylinder(
  0.28,
  0.08,
  gold,
  6.3,
  1.82,
  2.0,
  diningArea
);

cylinder(
  0.10,
  0.18,
  glass,
  6.3,
  2.05,
  2.0,
  diningArea
);

sphere(
  0.12,
  pink,
  6.3,
  2.35,
  2.0,
  diningArea
);

// ============================================================
// DINING PENDANT LIGHT
// ============================================================

const diningLight =
  new THREE.PointLight(
    0xffd6a0,
    1.5,
    8
  );

diningLight.position.set(
  6.3,
  5.0,
  2.0
);

diningArea.add(
  diningLight
);

// Pendant cable

cylinder(
  0.025,
  0.025,
  1.5,
  black,
  6.3,
  4.45,
  2.0,
  diningArea
);

// Pendant lamp

sphere(
  0.25,
  gold,
  6.3,
  3.7,
  2.0,
  diningArea
);

// ============================================================
// GRAND STAIRCASE — PROPER SCALE
// ============================================================

const grandStairs =
  new THREE.Group();

interior.add(grandStairs);

// ------------------------------------------------------------
// STAIR LANDING
// ------------------------------------------------------------

cube(
  3.3,
  0.16,
  2.0,
  marble,
  8.4,
  0.18,
  -1.7,
  grandStairs
);

// ------------------------------------------------------------
// STAIRS
// ------------------------------------------------------------

for (let i = 0; i < 11; i++) {

  cube(
    2.5,
    0.25 + i * 0.13,
    0.58,
    darkWood,
    8.4,
    0.35 + i * 0.13,
    -2.35 - i * 0.48,
    grandStairs
  );

}

// ------------------------------------------------------------
// GOLD STAIR EDGES
// ------------------------------------------------------------

for (let i = 0; i < 11; i++) {

  cube(
    2.35,
    0.045,
    0.06,
    gold,
    8.4,
    0.53 + i * 0.13,
    -2.64 - i * 0.48,
    grandStairs
  );

}

// ------------------------------------------------------------
// STAIR RAILINGS
// ------------------------------------------------------------

for (let side of [-1, 1]) {

  const x = 8.4 + side * 1.35;

  cube(
    0.10,
    2.0,
    0.10,
    darkWood,
    x,
    1.75,
    -4.7,
    grandStairs
  );

}

// ------------------------------------------------------------
// RAILING POSTS
// ------------------------------------------------------------

for (let i = 0; i < 6; i++) {

  const z = -2.45 - i * 0.48;
  const y = 0.8 + i * 0.13;

  for (let side of [-1, 1]) {

    cube(
      0.12,
      1.15,
      0.12,
      darkWood,
      8.4 + side * 1.35,
      y,
      z,
      grandStairs
    );

  }

}

// ------------------------------------------------------------
// GOLD HANDRAILS
// ------------------------------------------------------------

for (let side of [-1, 1]) {

  cube(
    0.12,
    0.12,
    3.8,
    gold,
    8.4 + side * 1.35,
    2.75,
    -4.0,
    grandStairs
  );

}

// ------------------------------------------------------------
// SMALL STAIRCASE PLANT
// ------------------------------------------------------------

cylinder(
  0.30,
  0.45,
  darkWood,
  10.25,
  0.45,
  -1.2,
  grandStairs
);

cylinder(
  0.045,
  0.8,
  green,
  10.25,
  1.05,
  -1.2,
  grandStairs
);

sphere(
  0.55,
  green,
  10.25,
  1.6,
  -1.2,
  grandStairs
);

sphere(
  0.32,
  green,
  9.9,
  1.45,
  -1.2,
  grandStairs
);

sphere(
  0.32,
  green,
  10.6,
  1.45,
  -1.2,
  grandStairs
);


// ------------------------------------------------------------
// STAIRCASE BASE / LANDING
// ------------------------------------------------------------

cube(
  4.2,
  0.18,
  2.5,
  marble,
  8.2,
  0.25,
  -1.8,
  grandStairs
);

// ------------------------------------------------------------
// STAIRS
// ------------------------------------------------------------

for (let i = 0; i < 11; i++) {

  cube(
    3.2,
    0.35 + i * 0.18,
    0.65,
    darkWood,
    8.2,
    0.45 + i * 0.18,
    -2.5 - i * 0.55,
    grandStairs
  );

}

// ------------------------------------------------------------
// GOLD STAIR EDGES
// ------------------------------------------------------------

for (let i = 0; i < 11; i++) {

  cube(
    3.05,
    0.06,
    0.08,
    gold,
    8.2,
    0.67 + i * 0.18,
    -2.82 - i * 0.55,
    grandStairs
  );

}

// ------------------------------------------------------------
// LEFT RAILING
// ------------------------------------------------------------

cube(
  0.12,
  2.8,
  0.12,
  darkWood,
  6.55,
  2.0,
  -5.1,
  grandStairs
);

cube(
  0.12,
  2.8,
  0.12,
  darkWood,
  9.85,
  2.0,
  -5.1,
  grandStairs
);

// ------------------------------------------------------------
// RAILING POSTS
// ------------------------------------------------------------

for (let i = 0; i < 6; i++) {

  const z = -2.5 - i * 0.55;
  const y = 0.8 + i * 0.18;

  cube(
    0.16,
    1.8,
    0.16,
    darkWood,
    6.55,
    y,
    z,
    grandStairs
  );

  cube(
    0.16,
    1.8,
    0.16,
    darkWood,
    9.85,
    y,
    z,
    grandStairs
  );

}

// ------------------------------------------------------------
// GOLD RAILING TOPS
// ------------------------------------------------------------

cube(
  0.18,
  0.18,
  4.0,
  gold,
  6.55,
  3.35,
  -4.0,
  grandStairs
);

cube(
  0.18,
  0.18,
  4.0,
  gold,
  9.85,
  3.35,
  -4.0,
  grandStairs
);

// ------------------------------------------------------------
// STAIRCASE WALL DECOR
// ------------------------------------------------------------

cube(
  3.8,
  0.12,
  0.12,
  gold,
  8.2,
  4.5,
  -7.0,
  grandStairs
);

// ------------------------------------------------------------
// SMALL PLANTS BESIDE STAIRCASE
// ------------------------------------------------------------

cylinder(
  0.45,
  0.6,
  darkWood,
  10.3,
  0.6,
  -1.3,
  grandStairs
);

sphere(
  0.75,
  green,
  10.3,
  1.5,
  -1.3,
  grandStairs
);

sphere(
  0.5,
  green,
  9.9,
  1.8,
  -1.3,
  grandStairs
);

sphere(
  0.5,
  green,
  10.7,
  1.8,
  -1.3,
  grandStairs
);

// ============================================================
// UPSTAIRS GROUP
// ============================================================

const upstairs =
  new THREE.Group();

upstairs.position.set(
  0,
  0,
  -12
);

scene.add(upstairs);

upstairs.visible = false;

// ============================================================
// FORCE UPSTAIRS BEDROOM TO RENDER
// ============================================================

upstairs.visible = true;


// ============================================================
// UPSTAIRS FLOOR
// ============================================================

cube(
  15.5,
  0.3,
  8,
  marble,
  0,
  5.05,
  0,
  upstairs
);


// ============================================================
// UPSTAIRS WALLS
// ============================================================

cube(
  15.5,
  4,
  0.3,
  white,
  0,
  7,
  -4,
  upstairs
);

cube(
  0.3,
  4,
  8,
  white,
  -7.7,
  7,
  0,
  upstairs
);

cube(
  0.3,
  4,
  8,
  white,
  7.7,
  7,
  0,
  upstairs
);
// ============================================================
// UPSTAIRS BEDROOM — PROPER SCALE
// ============================================================

// ============================================================
// BED
// ============================================================
// ============================================================
// UPSTAIRS BEDROOM GROUP
// ============================================================

const bedroom = new THREE.Group();

upstairs.add(bedroom);

// ============================================================
// BEDROOM — FORCE VISIBLE
// ============================================================

bedroom.visible = true;
bedroom.position.set(0, 0, 0);
bedroom.rotation.set(0, 0, 0);
cube(
  4.2,
  0.35,
  3.0,
  darkWood,
  -2.6,
  5.55,
  -1.2,
  upstairs
);

// Mattress

cube(
  4.0,
  0.42,
  2.8,
  sofaMat,
  -2.6,
  5.95,
  -1.2,
  upstairs
);

// Headboard

cube(
  4.15,
  2.25,
  0.28,
  darkWood,
  -2.6,
  7.05,
  -2.58,
  upstairs
);

// Headboard detail

cube(
  3.3,
  0.06,
  0.06,
  gold,
  -2.6,
  7.55,
  -2.40,
  upstairs
);

// ============================================================
// PILLOWS
// ============================================================

cube(
  1.25,
  0.18,
  0.75,
  cushionMat,
  -3.55,
  6.45,
  -1.75,
  upstairs
);

cube(
  1.25,
  0.18,
  0.75,
  cushionMat,
  -1.65,
  6.45,
  -1.75,
  upstairs
);

// ============================================================
// THROW BLANKET
// ============================================================

cube(
  3.4,
  0.08,
  1.05,
  purple,
  -2.6,
  6.27,
  -0.15,
  upstairs
);

// ============================================================
// BEDSIDE TABLES
// ============================================================

for (let x of [-5.2, 0.0]) {

  cube(
    0.85,
    0.8,
    0.8,
    darkWood,
    x,
    5.65,
    -1.2,
    upstairs
  );

  cylinder(
    0.08,
    0.35,
    gold,
    x,
    6.2,
    -1.2,
    upstairs
  );

  sphere(
    0.16,
    cushionMat,
    x,
    6.55,
    -1.2,
    upstairs
  );
}

// ============================================================
// BEDROOM RUG
// ============================================================

cube(
  6.0,
  0.04,
  4.2,
  purple,
  -2.6,
  5.22,
  -0.3,
  upstairs
);

cube(
  5.7,
  0.025,
  3.9,
  cushionMat,
  -2.6,
  5.25,
  -0.3,
  upstairs
);

// ============================================================
// DRESSER
// ============================================================

cube(
  2.5,
  1.0,
  0.65,
  darkWood,
  -5.3,
  5.7,
  2.4,
  upstairs
);

// Dresser top

cube(
  2.6,
  0.10,
  0.72,
  marble,
  -5.3,
  6.25,
  2.4,
  upstairs
);

// Drawers

for (let y of [5.65, 5.95]) {

  cube(
    1.8,
    0.05,
    0.04,
    gold,
    -5.3,
    y,
    2.05,
    upstairs
  );

}

// ============================================================
// LARGE BEDROOM MIRROR
// ============================================================

cube(
  1.7,
  2.3,
  0.08,
  glass,
  -5.3,
  7.55,
  1.98,
  upstairs
);

// Mirror frame

cube(
  1.9,
  0.10,
  0.10,
  darkWood,
  -5.3,
  8.75,
  1.95,
  upstairs
);

cube(
  1.9,
  0.10,
  0.10,
  darkWood,
  -5.3,
  6.35,
  1.95,
  upstairs
);

cube(
  0.10,
  2.4,
  0.10,
  darkWood,
  -6.2,
  7.55,
  1.95,
  upstairs
);

cube(
  0.10,
  2.4,
  0.10,
  darkWood,
  -4.4,
  7.55,
  1.95,
  upstairs
);

// ============================================================
// SMALL LAMP ON DRESSER
// ============================================================

cylinder(
  0.06,
  0.35,
  gold,
  -4.65,
  6.55,
  2.4,
  upstairs
);

sphere(
  0.22,
  cushionMat,
  -4.65,
  6.9,
  2.4,
  upstairs
);

// ============================================================
// WINDOW
// ============================================================

cube(
  4.6,
  2.3,
  0.08,
  glass,
  -2.6,
  7.45,
  3.82,
  upstairs
);

// Window frame — sides

cube(
  0.15,
  2.5,
  0.15,
  darkWood,
  -4.85,
  7.45,
  3.72,
  upstairs
);

cube(
  0.15,
  2.5,
  0.15,
  darkWood,
  -0.35,
  7.45,
  3.72,
  upstairs
);

// Window frame — top/bottom

cube(
  4.7,
  0.15,
  0.15,
  darkWood,
  -2.6,
  8.65,
  3.72,
  upstairs
);

cube(
  4.7,
  0.15,
  0.15,
  darkWood,
  -2.6,
  6.25,
  3.72,
  upstairs
);

// Window divider

cube(
  0.10,
  2.3,
  0.12,
  darkWood,
  -2.6,
  7.45,
  3.70,
  upstairs
);

// ============================================================
// BEDROOM PLANTS
// ============================================================

cylinder(
  0.28,
  0.4,
  darkWood,
  -0.7,
  5.5,
  2.9,
  upstairs
);

cylinder(
  0.04,
  0.7,
  green,
  -0.7,
  6.05,
  2.9,
  upstairs
);

sphere(
  0.48,
  green,
  -0.7,
  6.5,
  2.9,
  upstairs
);

sphere(
  0.30,
  green,
  -1.0,
  6.35,
  2.9,
  upstairs
);

sphere(
  0.30,
  green,
  -0.4,
  6.35,
  2.9,
  upstairs
);

// ============================================================
// BEDROOM LIGHT
// ============================================================

const bedroomLight =
  new THREE.PointLight(
    0xffd6a0,
    2.2,
    10
  );

bedroomLight.position.set(
  -2.5,
  8.5,
  0
);

upstairs.add(
  bedroomLight
);


// ============================================================
// ARCHITECTURE DESK
// ============================================================

cube(
  4.2,
  0.25,
  1.5,
  darkWood,
  4.5,
  6.1,
  -1.2,
  bedroom
);


// DESK LEGS

for (
  let x of [2.8, 6.2]
) {

  cube(
    0.25,
    1.5,
    0.25,
    black,
    x,
    5.35,
    -1.2,
    bedroom
  );
}


// ============================================================
// MONITOR
// ============================================================

cube(
  2.7,
  1.7,
  0.15,
  black,
  4.5,
  7.2,
  -1.55,
  bedroom
);

cube(
  2.35,
  1.35,
  0.08,
  blue,
  4.5,
  7.2,
  -1.45,
  bedroom
);


// MONITOR STAND

cube(
  0.18,
  0.7,
  0.18,
  black,
  4.5,
  6.35,
  -1.5,
  bedroom
);

cube(
  1.2,
  0.08,
  0.5,
  black,
  4.5,
  6.05,
  -1.5,
  bedroom
);


// ============================================================
// KEYBOARD
// ============================================================

cube(
  1.8,
  0.08,
  0.65,
  white,
  4.5,
  6.35,
  -0.45,
  bedroom
);


// MOUSE

sphere(
  0.16,
  black,
  5.7,
  6.38,
  -0.45,
  bedroom
);


// ============================================================
// ARCHITECTURE DRAWINGS
// ============================================================

for (
  let i = 0;
  i < 3;
  i++
) {

  cube(
    1.1,
    0.03,
    0.75,
    paper,
    2.9 + i * 1.15,
    6.27,
    0.0,
    bedroom
  );

  cube(
    0.8,
    0.02,
    0.03,
    gold,
    2.9 + i * 1.15,
    6.3,
    -0.15,
    bedroom
  );
}


// ============================================================
// DESK CHAIR
// ============================================================

cylinder(
  0.65,
  0.18,
  black,
  4.5,
  4.95,
  0.45,
  bedroom
);

cylinder(
  0.08,
  1.2,
  black,
  4.5,
  4.4,
  0.45,
  bedroom
);

sphere(
  0.75,
  sofaMat,
  4.5,
  5.55,
  0.45,
  bedroom
);


// ============================================================
// BOOKSHELF
// ============================================================

cube(
  3.4,
  3.8,
  0.5,
  darkWood,
  -5.5,
  7,
  2.7,
  bedroom
);

for (
  let y = 5.8;
  y <= 8.4;
  y += 0.85
) {

  cube(
    3.0,
    0.12,
    0.75,
    wood,
    -5.5,
    y,
    2.25,
    bedroom
  );
}


// ============================================================
// BOOKS
// ============================================================

const bookMaterials = [
  red,
  blue,
  purple,
  green,
  orange,
  paper
];

for (
  let row = 0;
  row < 3;
  row++
) {

  for (
    let col = 0;
    col < 5;
    col++
  ) {

    cube(
      0.35,
      0.65,
      0.55,
      bookMaterials[
        (row + col) %
        bookMaterials.length
      ],

      -6.7 +
        col * 0.55,

      6.2 +
        row * 0.85,

      2.15,

      bedroom
    );
  }
}


// ============================================================
// READING CORNER
// ============================================================

sphere(
  1.2,
  sofaMat,
  -5.3,
  6.25,
  -2.5,
  bedroom
);

sphere(
  0.75,
  cushionMat,
  -5.3,
  7.15,
  -2.5,
  bedroom
);


// ============================================================
// PLANT CORNER
// ============================================================

cylinder(
  0.55,
  0.7,
  darkWood,
  6.2,
  5.45,
  2.6,
  bedroom
);

for (
  let i = 0;
  i < 7;
  i++
) {

  cylinder(
    0.07,
    1.8,
    green,
    6.2 +
      Math.cos(i) *
      0.3,

    6.4,

    2.6 +
      Math.sin(i) *
      0.3,

    bedroom
  );
}

for (
  let i = 0;
  i < 7;
  i++
) {

  sphere(
    0.25,
    green,
    6.2 +
      Math.cos(i) *
      0.45,

    7.1,

    2.6 +
      Math.sin(i) *
      0.45,

    bedroom
  );
}


// ============================================================
// BEDROOM WALL ART
// ============================================================

for (
  let x of [-4.8, -2.8, -0.8]
) {

  cube(
    1.4,
    1.2,
    0.08,
    paper,
    x,
    8.0,
    -3.78,
    bedroom
  );

  cube(
    1.05,
    0.04,
    0.04,
    gold,
    x,
    8.0,
    -3.72,
    bedroom
  );
}


// ============================================================
// LARGE WINDOW
// ============================================================

cube(
  4.8,
  2.7,
  0.12,
  glass,
  2.8,
  7.5,
  3.8,
  bedroom
);


// WINDOW FRAME

cube(
  0.12,
  2.8,
  0.15,
  darkWood,
  0.4,
  7.5,
  3.72,
  bedroom
);

cube(
  0.12,
  2.8,
  0.15,
  darkWood,
  5.2,
  7.5,
  3.72,
  bedroom
);

cube(
  4.8,
  0.12,
  0.15,
  darkWood,
  2.8,
  8.85,
  3.72,
  bedroom
);

cube(
  4.8,
  0.12,
  0.15,
  darkWood,
  2.8,
  6.15,
  3.72,
  bedroom
);


// ============================================================
// BALCONY
// ============================================================

cube(
  7,
  0.25,
  2.8,
  marble,
  2.8,
  5.2,
  5.2,
  upstairs
);

cube(
  7,
  1.1,
  0.15,
  black,
  2.8,
  5.8,
  6.55,
  upstairs
);

for (
  let x = -0.2;
  x <= 5.8;
  x += 1
) {

  cube(
    0.1,
    1.1,
    0.1,
    black,
    x,
    5.8,
    6.55,
    upstairs
  );
}


// ============================================================
// BALCONY PLANTS
// ============================================================

for (
  let x of [0.2, 2.2, 4.2]
) {

  cylinder(
    0.45,
    0.6,
    darkWood,
    x,
    5.55,
    5.2,
    upstairs
  );

  sphere(
    0.7,
    green,
    x,
    6.2,
    5.2,
    upstairs
  );
}


// ============================================================
// UPSTAIRS LIGHTS
// ============================================================

function roomLight(
  x,
  y,
  z,
  parent
) {

  const light =
    new THREE.PointLight(
      0xffe7c2,
      5,
      12
    );

  light.position.set(
    x,
    y,
    z
  );

  parent.add(light);

  sphere(
    0.16,
    gold,
    x,
    y,
    z,
    parent
  );
}

roomLight(
  -3,
  9,
  0,
  upstairs
);

roomLight(
  4,
  8.8,
  0,
  upstairs
);


// ============================================================
// PERSONAL CORNER
// ============================================================

const personalCorner =
  new THREE.Group();

upstairs.add(personalCorner);


// LITTLE TABLE

cube(
  2.4,
  0.18,
  1.4,
  darkWood,
  -5.1,
  5.7,
  0.2,
  personalCorner
);


// THREE SMALL DISPLAY OBJECTS

cylinder(
  0.28,
  0.7,
  gold,
  -5.8,
  6.15,
  0.2,
  personalCorner
);

sphere(
  0.32,
  pink,
  -5.1,
  6.15,
  0.2,
  personalCorner
);

cube(
  0.6,
  0.08,
  0.45,
  paper,
  -4.4,
  6.15,
  0.2,
  personalCorner
);


// ============================================================
// FINAL HOUSE INTERIOR DETAILS
// ============================================================

// ------------------------------------------------------------
// KITCHEN
// ------------------------------------------------------------

const kitchen = new THREE.Group();
interior.add(kitchen);

// Kitchen island
cube(
    4.5, 1.0, 1.5,
    darkWood,
    6.8, 0.7, -3.8,
    kitchen
);

cube(
    4.3, 0.10, 1.35,
    marble,
    6.8, 1.25, -3.8,
    kitchen
);

// Counter along back wall
cube(
    7.0, 0.9, 1.0,
    darkWood,
    6.0, 0.65, -6.1,
    kitchen
);

cube(
    7.1, 0.10, 1.1,
    marble,
    6.0, 1.15, -6.1,
    kitchen
);

// Cabinets
for (let x of [3.2, 4.8, 6.4, 8.0, 9.6]) {
    cube(
        1.25, 1.5, 0.75,
        white,
        x, 2.0, -6.0,
        kitchen
    );
}

// Sink
cube(
    1.4, 0.08, 0.75,
    black,
    4.2, 1.23, -6.1,
    kitchen
);

// Stove
for (let x of [6.0, 6.7, 7.4]) {
    cylinder(
        0.18, 0.04,
        black,
        x, 1.23, -6.1,
        kitchen
    );
}

// Refrigerator
cube(
    1.5, 3.2, 1.2,
    white,
    10.2, 1.8, -5.7,
    kitchen
);

cube(
    0.08, 2.2, 0.08,
    black,
    9.85, 1.8, -5.05,
    kitchen
);

// Small kitchen pendant
roomLight(6.8, 4.8, -3.8, interior);


// ============================================================
// BEDROOM MEMORY OBJECTS
// ============================================================

// ------------------------------------------------------------
// SMALL CLOSET
// ------------------------------------------------------------

const closet = new THREE.Group();
upstairs.add(closet);

closet.position.set(5.9, 0, 2.55);

// Main closet
cube(
    2.1, 3.4, 0.8,
    darkWood,
    0, 1.7, 0,
    closet
);

// Doors
cube(
    0.95, 3.05, 0.06,
    wood,
    -0.5, 1.7, -0.43,
    closet
);

cube(
    0.95, 3.05, 0.06,
    wood,
    0.5, 1.7, -0.43,
    closet
);

// Door handles
sphere(
    0.07,
    gold,
    -0.08, 1.7, -0.49,
    closet
);

sphere(
    0.07,
    gold,
    0.08, 1.7, -0.49,
    closet
);


// ------------------------------------------------------------
// COW PLUSHIE ON BED
// ------------------------------------------------------------

const cowPlushie = new THREE.Group();
upstairs.add(cowPlushie);

cowPlushie.position.set(
    -0.9,
    6.65,
    -0.15
);

// Body
const cowWhite = new THREE.MeshStandardMaterial({
    color: 0xf2eee5,
    roughness: 0.9
});

const cowBlack = new THREE.MeshStandardMaterial({
    color: 0x302c28,
    roughness: 0.9
});

sphere(
    0.38,
    cowWhite,
    0, 0, 0,
    cowPlushie
);

// Head
sphere(
    0.32,
    cowWhite,
    0, 0.34, -0.28,
    cowPlushie
);

// Ears
sphere(
    0.10,
    cowWhite,
    -0.27, 0.48, -0.25,
    cowPlushie
);

sphere(
    0.10,
    cowWhite,
    0.27, 0.48, -0.25,
    cowPlushie
);

// Spots
sphere(
    0.13,
    cowBlack,
    -0.20, 0.08, -0.22,
    cowPlushie
);

sphere(
    0.11,
    cowBlack,
    0.18, 0.18, 0.05,
    cowPlushie
);

// Eyes
sphere(
    0.035,
    black,
    -0.11, 0.40, -0.56,
    cowPlushie
);

sphere(
    0.035,
    black,
    0.11, 0.40, -0.56,
    cowPlushie
);

// Little nose
sphere(
    0.08,
    pink,
    0, 0.30, -0.58,
    cowPlushie
);


// ------------------------------------------------------------
// CROCHET FLOWERS — BIRTHDAY MEMORY
// ------------------------------------------------------------

const crochetFlowers = new THREE.Group();
upstairs.add(crochetFlowers);

crochetFlowers.position.set(
    0.0,
    6.35,
    -1.2
);

// stems
for (let i = 0; i < 3; i++) {

    cylinder(
        0.025,
        0.65,
        green,
        -0.18 + i * 0.18,
        0.32,
        0,
        crochetFlowers
    );

}

// flowers
for (let i = 0; i < 3; i++) {

    const flower = new THREE.Group();

    const cx = -0.18 + i * 0.18;

    for (let p = 0; p < 5; p++) {

        const angle =
            (Math.PI * 2 / 5) * p;

        sphere(
            0.075,
            i === 0 ? pink : i === 1 ? purple : red,
            cx + Math.cos(angle) * 0.10,
            0.72 + Math.sin(angle) * 0.10,
            0,
            flower
        );
    }

    sphere(
        0.055,
        gold,
        cx,
        0.72,
        0,
        flower
    );

    crochetFlowers.add(flower);
}

// ============================================================
// UPSTAIRS MEMORY OBJECTS
// ============================================================

// ------------------------------------------------------------
// SMALL CLOSET
// ------------------------------------------------------------

const memoryCloset = new THREE.Group();

upstairs.add(memoryCloset);

cube(
    2.2,
    2.9,
    1.0,
    darkWood,
    5.4,
    6.5,
    2.0,
    memoryCloset
);

cube(
    0.95,
    2.65,
    0.08,
    darkWood,
    4.82,
    6.5,
    1.45,
    memoryCloset
);

cube(
    0.95,
    2.65,
    0.08,
    darkWood,
    5.98,
    6.5,
    1.45,
    memoryCloset
);

cube(
    0.08,
    2.3,
    0.08,
    gold,
    5.4,
    6.5,
    1.43,
    memoryCloset
);


// ------------------------------------------------------------
// CROCHET FLOWERS
// ------------------------------------------------------------

const memoryFlowers = new THREE.Group();

upstairs.add(memoryFlowers);

for (let i = 0; i < 3; i++) {

    const flower = new THREE.Group();

    cylinder(
        0.025,
        0.35,
        green,
        0,
        0.18,
        0,
        flower
    );

    sphere(
        0.14,
        i === 0 ? pink : i === 1 ? purple : red,
        0,
        0.42,
        0,
        flower
    );

    flower.position.set(
        -5.1 + i * 0.42,
        6.2,
        -11.8
    );

    memoryFlowers.add(flower);
}
// ============================================================
// MEMORY WORLD
// ============================================================

const memories =
  new THREE.Group();

scene.add(memories);


// ============================================================
// THE EMPTY CLASSROOM MEMORY
// ============================================================

const classroom = new THREE.Group();
scene.add(classroom);

// ------------------------------------------------------------
// CLASSROOM MATERIALS
// ------------------------------------------------------------

const classroomWall = new THREE.MeshStandardMaterial({
    color: 0xe7e1d5,
    roughness: 0.82
});

const classroomFloor = new THREE.MeshStandardMaterial({
    color: 0x8b765f,
    roughness: 0.9
});

const classroomCeiling = new THREE.MeshStandardMaterial({
    color: 0xf2eee5,
    roughness: 0.85
});

const classroomFrame = new THREE.MeshStandardMaterial({
    color: 0x3b3028,
    roughness: 0.75
});

const classroomGlass = new THREE.MeshStandardMaterial({
    color: 0x9ecfe0,
    transparent: true,
    opacity: 0.48,
    roughness: 0.2
});

const classroomBoard = new THREE.MeshStandardMaterial({
    color: 0x172b2b,
    roughness: 0.7
});


// ------------------------------------------------------------
// CLASSROOM DIMENSIONS
// ------------------------------------------------------------

const CLASSROOM_WIDTH = 14;
const CLASSROOM_DEPTH = 12;
const CLASSROOM_HEIGHT = 5.5;


// ------------------------------------------------------------
// FLOOR
// ------------------------------------------------------------

cube(
    CLASSROOM_WIDTH,
    0.25,
    CLASSROOM_DEPTH,
    classroomFloor,
    0,
    0,
    0,
    classroom
);


// ------------------------------------------------------------
// BACK WALL
// ------------------------------------------------------------

cube(
    CLASSROOM_WIDTH,
    CLASSROOM_HEIGHT,
    0.25,
    classroomWall,
    0,
    CLASSROOM_HEIGHT / 2,
    -CLASSROOM_DEPTH / 2,
    classroom
);


// ------------------------------------------------------------
// LEFT WALL
// ------------------------------------------------------------

cube(
    0.25,
    CLASSROOM_HEIGHT,
    CLASSROOM_DEPTH,
    classroomWall,
    -CLASSROOM_WIDTH / 2,
    CLASSROOM_HEIGHT / 2,
    0,
    classroom
);


// ------------------------------------------------------------
// RIGHT WALL
// ------------------------------------------------------------

cube(
    0.25,
    CLASSROOM_HEIGHT,
    CLASSROOM_DEPTH,
    classroomWall,
    CLASSROOM_WIDTH / 2,
    CLASSROOM_HEIGHT / 2,
    0,
    classroom
);


// ------------------------------------------------------------
// FRONT WALL
// ------------------------------------------------------------
// Split into pieces so the classroom has a proper doorway.

cube(
    5.0,
    CLASSROOM_HEIGHT,
    0.25,
    classroomWall,
    -4.5,
    CLASSROOM_HEIGHT / 2,
    CLASSROOM_DEPTH / 2,
    classroom
);

cube(
    5.0,
    CLASSROOM_HEIGHT,
    0.25,
    classroomWall,
    4.5,
    CLASSROOM_HEIGHT / 2,
    CLASSROOM_DEPTH / 2,
    classroom
);

cube(
    4.0,
    1.8,
    0.25,
    classroomWall,
    0,
    CLASSROOM_HEIGHT - 0.9,
    CLASSROOM_DEPTH / 2,
    classroom
);


// ------------------------------------------------------------
// ROOF / CEILING
// ------------------------------------------------------------

cube(
    CLASSROOM_WIDTH + 0.35,
    0.3,
    CLASSROOM_DEPTH + 0.35,
    classroomCeiling,
    0,
    CLASSROOM_HEIGHT + 0.15,
    0,
    classroom
);


// ============================================================
// CLASSROOM DOOR
// ============================================================

const classroomDoor = new THREE.Group();
classroom.add(classroomDoor);

classroomDoor.position.set(
    0,
    0,
    CLASSROOM_DEPTH / 2 + 0.12
);


// Door frame — left
cube(
    0.22,
    4.25,
    0.30,
    classroomFrame,
    -1.7,
    2.125,
    0,
    classroomDoor
);


// Door frame — right
cube(
    0.22,
    4.25,
    0.30,
    classroomFrame,
    1.7,
    2.125,
    0,
    classroomDoor
);


// Door frame — top
cube(
    3.6,
    0.22,
    0.30,
    classroomFrame,
    0,
    4.25,
    0,
    classroomDoor
);


// Actual wooden door
cube(
    3.15,
    4.0,
    0.16,
    new THREE.MeshStandardMaterial({
        color: 0x654936,
        roughness: 0.75
    }),
    0,
    2.0,
    0.04,
    classroomDoor
);


// Door window
cube(
    1.65,
    1.25,
    0.06,
    classroomGlass,
    0,
    2.65,
    0.14,
    classroomDoor
);


// Door handle
sphere(
    0.09,
    new THREE.MeshStandardMaterial({
        color: 0xd4b36a,
        metalness: 0.75,
        roughness: 0.25
    }),
    1.15,
    1.9,
    0.18,
    classroomDoor
);

// ============================================================
// WINDOWS
// ============================================================

function classroomWindow(x, z, rotationY = 0) {

    const windowGroup = new THREE.Group();
    classroom.add(windowGroup);

    windowGroup.position.set(x, 3.1, z);
    windowGroup.rotation.y = rotationY;

    // frame
    cube(
        3.0,
        1.8,
        0.18,
        classroomFrame,
        0,
        0,
        0,
        windowGroup
    );

    // glass
    cube(
        2.55,
        1.35,
        0.08,
        classroomGlass,
        0,
        0,
        0,
        windowGroup
    );

    // vertical divider
    cube(
        0.10,
        1.35,
        0.10,
        classroomFrame,
        0,
        0,
        0,
        windowGroup
    );

    // horizontal divider
    cube(
        2.55,
        0.10,
        0.10,
        classroomFrame,
        0,
        0,
        0,
        windowGroup
    );
}


// Windows along left wall
classroomWindow(
    -CLASSROOM_WIDTH / 2 - 0.05,
    -2.7,
    Math.PI / 2
);

classroomWindow(
    -CLASSROOM_WIDTH / 2 - 0.05,
    1.0,
    Math.PI / 2
);


// Windows along right wall
classroomWindow(
    CLASSROOM_WIDTH / 2 + 0.05,
    -2.7,
    Math.PI / 2
);

classroomWindow(
    CLASSROOM_WIDTH / 2 + 0.05,
    1.0,
    Math.PI / 2
);


// ============================================================
// BLACKBOARD
// ============================================================

cube(
    6.5,
    2.2,
    0.15,
    classroomBoard,
    0,
    3.25,
    -CLASSROOM_DEPTH / 2 + 0.15,
    classroom
);


// Blackboard frame
cube(
    6.9,
    0.16,
    0.22,
    classroomFrame,
    0,
    4.42,
    -CLASSROOM_DEPTH / 2 + 0.05,
    classroom
);

cube(
    6.9,
    0.16,
    0.22,
    classroomFrame,
    0,
    2.08,
    -CLASSROOM_DEPTH / 2 + 0.05,
    classroom
);


// ============================================================
// TEACHER'S DESK
// ============================================================

cube(
    3.2,
    0.22,
    1.5,
    darkWood,
    0,
    1.05,
    -3.8,
    classroom
);

cube(
    0.18,
    1.05,
    0.18,
    darkWood,
    -1.25,
    0.52,
    -4.3,
    classroom
);

cube(
    0.18,
    1.05,
    0.18,
    darkWood,
    1.25,
    0.52,
    -4.3,
    classroom
);

cube(
    0.18,
    1.05,
    0.18,
    darkWood,
    -1.25,
    0.52,
    -3.3,
    classroom
);

cube(
    0.18,
    1.05,
    0.18,
    darkWood,
    1.25,
    0.52,
    -3.3,
    classroom
);


// ============================================================
// STUDENT DESKS
// ============================================================

function classroomDesk(x, z) {

    cube(
        2.4,
        0.22,
        1.3,
        darkWood,
        x,
        1.15,
        z,
        classroom
    );

    cube(
        0.14,
        1.72,
        0.14,
        darkWood,
        x - 0.9,
        0.575,
        z - 0.4,
        classroom
    );

    cube(
        0.14,
        1.72,
        0.14,
        darkWood,
        x + 0.9,
        0.575,
        z - 0.4,
        classroom
    );

    cube(
        0.14,
        1.72,
        0.14,
        darkWood,
        x - 0.9,
        0.575,
        z + 0.4,
        classroom
    );

    cube(
        0.14,
        1.72,
        0.14,
        darkWood,
        x + 0.9,
        0.575,
        z + 0.4,
        classroom
    );
}


// ============================================================
// THE SPECIAL MEMORY DESK
// ============================================================

classroomDesk(0, 2.8);


// ============================================================
// OTHER CLASSROOM DESKS
// ============================================================

classroomDesk(-4.0, 0.2);
classroomDesk(4.0, 0.2);

classroomDesk(-4.0, 3.7);
classroomDesk(4.0, 3.7);


// ============================================================
// CHAIRS
// ============================================================

function classroomChair(x, z) {

    cube(
        1.1,
        0.18,
        1.1,
        classroomFrame,
        x,
        0.95,
        z,
        classroom
    );

    cube(
        0.12,
        1.0,
        0.12,
        classroomFrame,
        x - 0.4,
        0.5,
        z - 0.4,
        classroom
    );

    cube(
        0.12,
        1.0,
        0.12,
        classroomFrame,
        x + 0.4,
        0.5,
        z - 0.4,
        classroom
    );

    cube(
        0.12,
        1.0,
        0.12,
        classroomFrame,
        x - 0.4,
        0.5,
        z + 0.4,
        classroom
    );

    cube(
        0.12,
        1.0,
        0.12,
        classroomFrame,
        x + 0.4,
        0.5,
        z + 0.4,
        classroom
    );
}

classroomChair(-4.0, -1.0);
classroomChair(4.0, -1.0);
classroomChair(-4.0, 2.5);
classroomChair(4.0, 2.5);

// ============================================================
// THE WAFFLE
// ============================================================

const waffle = new THREE.Group();
classroom.add(waffle);

waffle.position.set(
    -0.55,
    1.34,
    2.8
);


// Waffle body
const waffleMaterial = new THREE.MeshStandardMaterial({
    color: 0xd99535,
    roughness: 0.8
});

const waffleBody = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.72,
        0.12,
        0.72
    ),
    waffleMaterial
);

waffle.add(waffleBody);


// Raised grid
const waffleRidgeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb96f24,
        roughness: 0.85
    });


// Horizontal ridges
for (
    let z = -0.24;
    z <= 0.24;
    z += 0.16
) {
    const ridge = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.62,
            0.06,
            0.045
        ),
        waffleRidgeMaterial
    );

    ridge.position.set(
        0,
        0.09,
        z
    );

    waffle.add(ridge);
}


// Vertical ridges
for (
    let x = -0.24;
    x <= 0.24;
    x += 0.16
) {
    const ridge = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.045,
            0.06,
            0.62
        ),
        waffleRidgeMaterial
    );

    ridge.position.set(
        x,
        0.10,
        0
    );

    waffle.add(ridge);
}


// Butter
const butterMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffe7a1,
        roughness: 0.5
    });

cube(
    0.16,
    0.055,
    0.16,
    butterMaterial,
    -0.10,
    0.13,
    -0.08,
    waffle
);


// Syrup
const syrupMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x6b351b,
        roughness: 0.5
    });

sphere(
    0.065,
    syrupMaterial,
    0.16,
    0.14,
    0.12,
    waffle
);

sphere(
    0.05,
    syrupMaterial,
    0.23,
    0.14,
    -0.08,
    waffle
);

classroom.position.set(-28, 0, -10);
/* ============================================================
   PART 4/5 — OUTDOOR WORLD
   PART 1/4 — WORLD FOUNDATION + LANDSCAPING
   ============================================================ */


/* ------------------------------------------------------------
   OUTDOOR WORLD GROUP
   ------------------------------------------------------------ */

const extraWorld = new THREE.Group();
extraWorld.name = "ADIDAS_OUTDOOR_WORLD";
scene.add(extraWorld);


/* ------------------------------------------------------------
   MATERIALS
   ------------------------------------------------------------ */

const outdoorGrassMat = new THREE.MeshStandardMaterial({
    color: 0x61795b,
    roughness: 1
});

const outdoorGrassDarkMat = new THREE.MeshStandardMaterial({
    color: 0x4d6248,
    roughness: 1
});

const pathStoneMat = new THREE.MeshStandardMaterial({
    color: 0x8a8175,
    roughness: 0.95
});

const pathLightMat = new THREE.MeshStandardMaterial({
    color: 0xb5aa98,
    roughness: 0.9
});

const wallStoneMat = new THREE.MeshStandardMaterial({
    color: 0x77736b,
    roughness: 1
});

const wallLightMat = new THREE.MeshStandardMaterial({
    color: 0xa9a295,
    roughness: 0.95
});

const outdoorWoodMat = new THREE.MeshStandardMaterial({
    color: 0x684a35,
    roughness: 0.95
});

const outdoorDarkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3f3025,
    roughness: 1
});

const leafMat = new THREE.MeshStandardMaterial({
    color: 0x3f6846,
    roughness: 1
});

const leafLightMat = new THREE.MeshStandardMaterial({
    color: 0x648653,
    roughness: 1
});

const warmLightMat = new THREE.MeshStandardMaterial({
    color: 0xf0b65b,
    emissive: 0x8c4f13,
    emissiveIntensity: 0.7
});

const waterMat = new THREE.MeshStandardMaterial({
    color: 0x4f91ae,
    roughness: 0.18,
    metalness: 0.05,
    transparent: true,
    opacity: 0.82
});


/* ------------------------------------------------------------
   SAFE HELPERS
   ------------------------------------------------------------ */

function outdoorBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z
) {

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            height,
            depth
        ),
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    extraWorld.add(mesh);

    return mesh;
}


function outdoorCylinder(
    radiusTop,
    radiusBottom,
    height,
    material,
    x,
    y,
    z,
    segments = 16
) {

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            segments
        ),
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    extraWorld.add(mesh);

    return mesh;
}


function outdoorSphere(
    radius,
    material,
    x,
    y,
    z
) {

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            18,
            14
        ),
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    extraWorld.add(mesh);

    return mesh;
}


/* ------------------------------------------------------------
   SOFT GROUND PATCHES
   ------------------------------------------------------------ */

const groundPatches = [
    {
        x: 0,
        z: 0,
        width: 58,
        depth: 58
    },
    {
        x: -28,
        z: -10,
        width: 24,
        depth: 22
    },
    {
        x: 5,
        z: 38,
        width: 34,
        depth: 25
    },
    {
        x: 30,
        z: 18,
        width: 40,
        depth: 30
    }
];

for (const patch of groundPatches) {

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(
            patch.width,
            patch.depth
        ),
        outdoorGrassMat
    );

    ground.rotation.x = -Math.PI / 2;

    ground.position.set(
        patch.x,
        0.01,
        patch.z
    );

    ground.receiveShadow = true;

    extraWorld.add(ground);
}


/* ------------------------------------------------------------
   HOUSE DRIVEWAY
   ------------------------------------------------------------ */

const driveway = new THREE.Mesh(
    new THREE.PlaneGeometry(
        8,
        22
    ),
    pathLightMat
);

driveway.rotation.x = -Math.PI / 2;

driveway.position.set(
    0,
    0.025,
    13
);

driveway.receiveShadow = true;

extraWorld.add(driveway);


/* ------------------------------------------------------------
   DRIVEWAY STONE EDGES
   ------------------------------------------------------------ */

for (let i = 0; i < 11; i++) {

    const z = 3 + i * 2;

    outdoorBox(
        0.35,
        0.12,
        1.35,
        pathStoneMat,
        -4.2,
        0.08,
        z
    );

    outdoorBox(
        0.35,
        0.12,
        1.35,
        pathStoneMat,
        4.2,
        0.08,
        z
    );
}


/* ------------------------------------------------------------
   FRONT STEPPING STONES
   ------------------------------------------------------------ */

for (let i = 0; i < 7; i++) {

    const z = -1 + i * 0.9;

    const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.72,
            0.82,
            0.12,
            8
        ),
        pathStoneMat
    );

    stone.position.set(
        0,
        0.08,
        z
    );

    stone.rotation.y =
        Math.random() * Math.PI;

    stone.receiveShadow = true;
    stone.castShadow = true;

    extraWorld.add(stone);
}


/* ------------------------------------------------------------
   LOW STONE BOUNDARY AROUND HOUSE
   ------------------------------------------------------------ */

function lowWall(
    width,
    height,
    depth,
    x,
    y,
    z
) {

    return outdoorBox(
        width,
        height,
        depth,
        wallStoneMat,
        x,
        y,
        z
    );
}


/* LEFT BOUNDARY */

lowWall(
    0.6,
    0.9,
    28,
    -14,
    0.45,
    0
);


/* RIGHT BOUNDARY */

lowWall(
    0.6,
    0.9,
    28,
    14,
    0.45,
    0
);


/* BACK BOUNDARY */

lowWall(
    28,
    0.9,
    0.6,
    0,
    0.45,
    -14
);


/* ------------------------------------------------------------
   BOUNDARY CAP STONES
   ------------------------------------------------------------ */

for (let x = -13; x <= 13; x += 2) {

    outdoorBox(
        1.55,
        0.16,
        0.72,
        wallLightMat,
        x,
        0.98,
        -14
    );
}


/* ------------------------------------------------------------
   FRONT GARDEN BEDS
   ------------------------------------------------------------ */

function gardenBed(
    x,
    z,
    width,
    depth
) {

    const soil = new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            0.16,
            depth
        ),
        new THREE.MeshStandardMaterial({
            color: 0x4b3628,
            roughness: 1
        })
    );

    soil.position.set(
        x,
        0.09,
        z
    );

    soil.receiveShadow = true;

    extraWorld.add(soil);

    return soil;
}


gardenBed(
    -9,
    5,
    5,
    2.2
);

gardenBed(
    9,
    5,
    5,
    2.2
);

gardenBed(
    -9,
    -5,
    4,
    2
);

gardenBed(
    9,
    -5,
    4,
    2
);


/* ------------------------------------------------------------
   SIMPLE OUTDOOR TREE
   ------------------------------------------------------------ */

function outdoorTree(
    x,
    z,
    scale = 1
) {

    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.18 * scale,
            0.28 * scale,
            2.8 * scale,
            8
        ),
        outdoorWoodMat
    );

    trunk.position.set(
        x,
        1.4 * scale,
        z
    );

    trunk.castShadow = true;

    extraWorld.add(trunk);


    const lowerLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(
            1.25 * scale,
            12,
            10
        ),
        leafMat
    );

    lowerLeaves.position.set(
        x,
        3.0 * scale,
        z
    );

    lowerLeaves.scale.y = 1.15;

    lowerLeaves.castShadow = true;

    extraWorld.add(lowerLeaves);


    const upperLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.9 * scale,
            12,
            10
        ),
        leafLightMat
    );

    upperLeaves.position.set(
        x,
        3.9 * scale,
        z
    );

    upperLeaves.castShadow = true;

    extraWorld.add(upperLeaves);
}


/* TREES AROUND HOUSE */

outdoorTree(
    -11,
    -9,
    1.15
);

outdoorTree(
    11,
    -9,
    1.05
);

outdoorTree(
    -12,
    8,
    0.9
);

outdoorTree(
    12,
    8,
    0.95
);


/* ------------------------------------------------------------
   SMALL GARDEN SHRUBS
   ------------------------------------------------------------ */

function gardenShrub(
    x,
    z,
    scale = 1
) {

    const shrub = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.65 * scale,
            12,
            8
        ),
        leafLightMat
    );

    shrub.position.set(
        x,
        0.55 * scale,
        z
    );

    shrub.scale.y = 0.8;

    shrub.castShadow = true;

    extraWorld.add(shrub);
}


const shrubPositions = [
    [-7, 4],
    [-5.8, 4.5],
    [7, 4],
    [5.8, 4.5],
    [-7, -4],
    [7, -4],
    [-11, 3],
    [11, 3]
];

for (const position of shrubPositions) {

    gardenShrub(
        position[0],
        position[1],
        0.8 + Math.random() * 0.35
    );
}


/* ------------------------------------------------------------
   HOUSE GARDEN LAMPS
   ------------------------------------------------------------ */

function gardenLamp(
    x,
    z
) {

    outdoorCylinder(
        0.055,
        0.075,
        1.5,
        outdoorDarkWoodMat,
        x,
        0.75,
        z,
        10
    );

    outdoorSphere(
        0.16,
        warmLightMat,
        x,
        1.55,
        z
    );
}


gardenLamp(
    -5.5,
    3
);

gardenLamp(
    5.5,
    3
);

gardenLamp(
    -6,
    -3
);

gardenLamp(
    6,
    -3
);


/* ------------------------------------------------------------
   HOUSE FRONT SEATING AREA
   ------------------------------------------------------------ */

const terrace = new THREE.Mesh(
    new THREE.BoxGeometry(
        11,
        0.22,
        4
    ),
    pathStoneMat
);

terrace.position.set(
    0,
    0.13,
    -1.8
);

terrace.receiveShadow = true;

extraWorld.add(terrace);


/* ------------------------------------------------------------
   TERRACE EDGE
   ------------------------------------------------------------ */

outdoorBox(
    11,
    0.18,
    0.35,
    wallLightMat,
    0,
    0.34,
    -3.65
);


/* ------------------------------------------------------------
   SMALL DECORATIVE PLANTERS
   ------------------------------------------------------------ */

function planter(
    x,
    z
) {

    outdoorBox(
        0.65,
        0.5,
        0.65,
        wallStoneMat,
        x,
        0.25,
        z
    );

    outdoorSphere(
        0.42,
        leafMat,
        x,
        0.72,
        z
    );
}


planter(
    -4.8,
    -2.3
);

planter(
    4.8,
    -2.3
);


/* ------------------------------------------------------------
   DISTANT WORLD TREES
   ------------------------------------------------------------ */

const distantTrees = [
    [-22, -18, 1.5],
    [-16, -21, 1.2],
    [17, -18, 1.4],
    [21, -12, 1.1],

    [-20, 8, 1.25],
    [19, 7, 1.35],

    [-15, 20, 1.4],
    [14, 21, 1.3],

    [-12, 28, 1.2],
    [15, 29, 1.5]
];

for (const tree of distantTrees) {

    outdoorTree(
        tree[0],
        tree[1],
        tree[2]
    );
}


/* ------------------------------------------------------------
   MAIN CROSS-WORLD PATH
   ------------------------------------------------------------ */

const worldPath = new THREE.Mesh(
    new THREE.PlaneGeometry(
        3.2,
        46
    ),
    pathStoneMat
);

worldPath.rotation.x = -Math.PI / 2;

worldPath.position.set(
    0,
    0.035,
    18
);

worldPath.receiveShadow = true;

extraWorld.add(worldPath);


/* ------------------------------------------------------------
   PATH IRREGULAR STONES
   ------------------------------------------------------------ */

for (let i = 0; i < 24; i++) {

    const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.55,
            0.7,
            0.12,
            7
        ),
        pathLightMat
    );

    stone.position.set(
        (Math.random() - 0.5) * 1.8,
        0.09,
        -4 + i * 2
    );

    stone.rotation.y =
        Math.random() * Math.PI;

    stone.receiveShadow = true;

    extraWorld.add(stone);
}


/* ============================================================
   END OF PART 4 — PART 1/4
   ============================================================ */
/* ============================================================
   PART 4.2 — PELLING + HIKING + FLOWERS
   ============================================================ */

/* ---------- CONE HELPER ---------- */

function outdoorCone(radius, height, segments, material) {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(radius, height, segments),
        material
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
}

// ============================================================
// PELLING MEMORY WORLD
// ============================================================

const pelling = new THREE.Group();
pelling.name = "PELLING_MEMORY_WORLD";
scene.add(pelling);


// ============================================================
// MATERIALS
// ============================================================

const pellingStoneMat = new THREE.MeshStandardMaterial({
    color: 0x77736b,
    roughness: 0.95
});

const pellingDarkStoneMat = new THREE.MeshStandardMaterial({
    color: 0x3d4143,
    roughness: 1
});

const pellingMountainMat = new THREE.MeshStandardMaterial({
    color: 0x59645b,
    roughness: 1
});

const pellingSnowMat = new THREE.MeshStandardMaterial({
    color: 0xe7eceb,
    roughness: 0.9
});

const pellingGrassMat = new THREE.MeshStandardMaterial({
    color: 0x596c4b,
    roughness: 1
});

const pellingWoodMat = new THREE.MeshStandardMaterial({
    color: 0x654d38,
    roughness: 0.95
});

const pellingWaterMat = new THREE.MeshStandardMaterial({
    color: 0x4d8791,
    roughness: 0.18,
    metalness: 0.05
});


// ============================================================
// RIVER
// ============================================================

const river = new THREE.Group();
river.name = "PELLING_RIVER";
pelling.add(river);

const riverSurface = new THREE.Mesh(
    new THREE.PlaneGeometry(
        42,
        14,
        32,
        12
    ),
    pellingWaterMat
);

riverSurface.rotation.x = -Math.PI / 2;

riverSurface.position.set(
    30,
    0.04,
    20
);

riverSurface.receiveShadow = true;

river.add(riverSurface);
/* SAVE ORIGINAL WATER VERTICES */

const riverBasePositions =
    riverSurface.geometry.attributes.position
        .array
        .slice();

// ============================================================
// RIVER BANKS
// ============================================================

for (let i = 0; i < 34; i++) {

    const side =
        i % 2 === 0 ? -1 : 1;

    const rock = outdoorSphere(
        0.45 + Math.random() * 0.55,
        i % 3 === 0
            ? pellingDarkStoneMat
            : pellingStoneMat
    );

    rock.position.set(
        10 + Math.random() * 40,
        0.28 + Math.random() * 0.25,
        20 +
        side *
        (7.1 + Math.random() * 1.3)
    );

    rock.scale.y = 0.65;

    pelling.add(rock);
}


// ============================================================
// RIVER STONES
// ============================================================

for (let i = 0; i < 14; i++) {

    const stone = outdoorSphere(
        0.4 + Math.random() * 0.25,
        pellingDarkStoneMat
    );

    stone.position.set(
        19 + i * 1.8,
        0.28,
        20 + Math.sin(i * 1.4) * 2.3
    );

    stone.scale.y = 0.5;

    pelling.add(stone);
}


// ============================================================
// MOUNTAINS
// ============================================================

function pellingMountain(
    x,
    z,
    scale,
    snowy
) {

    const mountain =
        new THREE.Group();

    const base = new THREE.Mesh(
        new THREE.ConeGeometry(
            5.5 * scale,
            10 * scale,
            8
        ),
        pellingMountainMat
    );

    base.position.y =
        5 * scale;

    base.castShadow = true;

    mountain.add(base);


    if (snowy) {

        const snow = new THREE.Mesh(
            new THREE.ConeGeometry(
                2.7 * scale,
                4 * scale,
                8
            ),
            pellingSnowMat
        );

        snow.position.y =
            9 * scale;

        snow.castShadow = true;

        mountain.add(snow);
    }


    mountain.position.set(
        x,
        0,
        z
    );

    pelling.add(mountain);
}


// Background mountain range
pellingMountain(12, 8, 1.45, true);
pellingMountain(22, 3, 1.9, true);
pellingMountain(36, 5, 1.65, true);
pellingMountain(49, 10, 1.35, false);
pellingMountain(57, 20, 1.8, true);
pellingMountain(49, 32, 1.35, false);
pellingMountain(29, 38, 1.7, true);
pellingMountain(10, 30, 1.4, false);


// ============================================================
// GRASS PATCHES
// ============================================================

for (let i = 0; i < 24; i++) {

    const patch = new THREE.Mesh(
        new THREE.CircleGeometry(
            1.2 + Math.random() * 2.0,
            16
        ),
        pellingGrassMat
    );

    patch.rotation.x =
        -Math.PI / 2;


    let px;
    let pz;

    do {

        px =
            10 + Math.random() * 42;

        pz =
            6 + Math.random() * 29;

    } while (
        px > 9 &&
        px < 51 &&
        pz > 12.5 &&
        pz < 27.5
    );


    patch.position.set(
        px,
        0.035,
        pz
    );

    pelling.add(patch);
}


// ============================================================
// TREES
// ============================================================

function pellingTree(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();


    const trunk = outdoorCylinder(
        0.25 * scale,
        1.8 * scale,
        0.25 * scale,
        pellingWoodMat
    );

    trunk.position.y =
        0.9 * scale;

    tree.add(trunk);


    const crown = outdoorSphere(
        1.45 * scale,
        leafMat
    );

    crown.position.y =
        2.6 * scale;

    crown.scale.y =
        1.15;

    tree.add(crown);


    const crown2 = outdoorSphere(
        1.0 * scale,
        leafLightMat
    );

    crown2.position.set(
        0.55 * scale,
        3.15 * scale,
        0
    );

    tree.add(crown2);


    tree.position.set(
        x,
        0,
        z
    );

    pelling.add(tree);
}


// Trees stay beside the river,
// not inside it.
pellingTree(14, 11, 1.1);
pellingTree(18, 8, 0.9);

pellingTree(42, 11, 1.2);
pellingTree(48, 15, 0.95);

pellingTree(44, 29, 1.1);
pellingTree(17, 30, 1.2);

pellingTree(52, 27, 1.0);
pellingTree(10, 25, 0.9);


// ============================================================
// WALKWAY TO THE WATER
// ============================================================

const pellingWalkway =
    new THREE.Group();

pelling.add(pellingWalkway);


for (let i = 0; i < 11; i++) {

    const stone = outdoorBox(
        1.45,
        0.14,
        0.85,
        pellingStoneMat
    );

    stone.position.set(
        30 +
        Math.sin(i * 0.6) * 1.4,

        0.12,

        13 +
        i * 0.9
    );

    stone.rotation.y =
        Math.sin(i) * 0.12;

    pellingWalkway.add(stone);
}


// ============================================================
// PELLING MEMORY SPOT
// ============================================================

const pellingMemorySpot =
    new THREE.Group();

pellingMemorySpot.position.set(
    30,
    0,
    13
);

pelling.add(
    pellingMemorySpot
);


// ============================================================
// WOODEN VIEWING BENCH
// ============================================================

const pellingBench =
    new THREE.Group();


// Seat
const pellingBenchSeat =
    outdoorBox(
        2.8,
        0.22,
        0.65,
        pellingWoodMat
    );

pellingBenchSeat.position.y =
    1.0;

pellingBench.add(
    pellingBenchSeat
);


// Backrest
const pellingBenchBack =
    outdoorBox(
        2.8,
        0.85,
        0.18,
        pellingWoodMat
    );

pellingBenchBack.position.set(
    0,
    1.45,
    0.25
);

pellingBench.add(
    pellingBenchBack
);


// Legs
for (
    const x of [-1.1, 1.1]
) {

    const leg = outdoorBox(
        0.18,
        1,
        0.18,
        pellingDarkStoneMat
    );

    leg.position.set(
        x,
        0.5,
        0
    );

    pellingBench.add(leg);
}

pellingMemorySpot.add(
    pellingBench
);


// ============================================================
// SMALL STONE CIRCLE
// ============================================================

for (let i = 0; i < 8; i++) {

    const angle =
        (i / 8) *
        Math.PI *
        2;

    const stone =
        outdoorSphere(
            0.25,
            pellingStoneMat
        );

    stone.position.set(
        Math.cos(angle) * 2.1,
        0.22,
        Math.sin(angle) * 1.5
    );

    stone.scale.y =
        0.55;

    pellingMemorySpot.add(
        stone
    );
}


// ============================================================
// MEMORY MARKER
// ============================================================

const pellingMemoryMarker =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            0.65,
            0.08,
            12,
            32
        ),

        new THREE.MeshStandardMaterial({
            color: 0xffd86b,
            emissive: 0xff9f2f,
            emissiveIntensity: 1.2,
            roughness: 0.35
        })
    );

pellingMemoryMarker.position.set(
    30,
    1.8,
    13
);

pellingMemoryMarker.rotation.x =
    Math.PI / 2;

pelling.add(
    pellingMemoryMarker
);

/* ============================================================
   HIKING TRAIL
   ============================================================ */

const hikingWorld = new THREE.Group();
hikingWorld.name = "HIKING_TRAIL";
scene.add(hikingWorld);

const hikingStoneMat = new THREE.MeshStandardMaterial({
    color: 0x68635b,
    roughness: 1
});

const hikingWoodMat = new THREE.MeshStandardMaterial({
    color: 0x614936,
    roughness: 0.95
});

const hikingSignMat = new THREE.MeshStandardMaterial({
    color: 0x765335,
    roughness: 0.9
});

const hikingTrailGrassMat = new THREE.MeshStandardMaterial({
    color: 0x506044,
    roughness: 1
});


/* ---------- TRAIL GROUND ---------- */

const trailGround = new THREE.Mesh(
    new THREE.PlaneGeometry(27, 17),
    hikingTrailGrassMat
);

trailGround.rotation.x = -Math.PI / 2;
trailGround.position.set(5, 0.025, 36);
hikingWorld.add(trailGround);


/* ---------- TRAIL STONES ---------- */

for (let i = 0; i < 17; i++) {

    const t = i / 16;

    const stone = outdoorBox(
        1.15 + Math.random() * 0.4,
        0.16,
        0.75 + Math.random() * 0.25,
        hikingStoneMat
    );

    stone.position.set(
        -7 + t * 24,
        0.13,
        33 + Math.sin(t * Math.PI * 2) * 4
    );

    stone.rotation.y = (Math.random() - 0.5) * 0.4;
    hikingWorld.add(stone);
}


/* ---------- HIKING TREES ---------- */

function hikingTree(x, z, scale = 1) {

    const tree = new THREE.Group();

    const trunk = outdoorCylinder(
        0.22 * scale,
        2.2 * scale,
        0.25 * scale,
        hikingWoodMat
    );

    trunk.position.y = 1.1 * scale;
    tree.add(trunk);

    const leaves = outdoorCone(
        1.5 * scale,
        3.5 * scale,
        8,
        leafMat
    );

    leaves.position.y = 3.0 * scale;
    tree.add(leaves);

    const leaves2 = outdoorCone(
        1.15 * scale,
        2.5 * scale,
        8,
        leafLightMat
    );

    leaves2.position.y = 4.4 * scale;
    tree.add(leaves2);

    tree.position.set(x, 0, z);
    hikingWorld.add(tree);
}

hikingTree(-11, 30, 1.15);
hikingTree(-15, 35, 1.3);
hikingTree(-10, 41, 1.0);
hikingTree(15, 30, 1.2);
hikingTree(19, 35, 1.35);
hikingTree(17, 41, 1.0);
hikingTree(1, 43, 1.15);


/* ---------- HIKING SIGN ---------- */

const hikingSign = new THREE.Group();

const signPost = outdoorCylinder(
    0.13,
    2.5,
    0.16,
    hikingWoodMat
);

signPost.position.y = 1.25;
hikingSign.add(signPost);

const signBoard = outdoorBox(
    2.8,
    1.05,
    0.18,
    hikingSignMat
);

signBoard.position.y = 2.35;
hikingSign.add(signBoard);

hikingSign.position.set(-6, 0, 30);
hikingSign.rotation.y = -0.12;
hikingWorld.add(hikingSign);


/* ---------- HIKING BENCH ---------- */

const hikingBench = new THREE.Group();

const hikingSeat = outdoorBox(
    3.0,
    0.25,
    0.65,
    hikingWoodMat
);

hikingSeat.position.y = 1.0;
hikingBench.add(hikingSeat);

for (const x of [-1.15, 1.15]) {

    const leg = outdoorBox(
        0.18,
        1,
        0.18,
        hikingWoodMat
    );

    leg.position.set(x, 0.5, 0);
    hikingBench.add(leg);
}

hikingBench.position.set(5, 0, 36);
hikingBench.rotation.y = -0.15;
hikingWorld.add(hikingBench);


/* ---------- TRAIL LANTERNS ---------- */

const hikingLanternMat = new THREE.MeshStandardMaterial({
    color: 0x302c28,
    roughness: 0.8,
    metalness: 0.25
});

for (let i = 0; i < 8; i++) {

    const lantern = new THREE.Group();

    const post = outdoorCylinder(
        0.08,
        1.7,
        0.1,
        hikingWoodMat
    );

    post.position.y = 0.85;
    lantern.add(post);

    const lamp = outdoorSphere(
        0.22,
        warmLightMat
    );

    lamp.position.y = 1.75;
    lantern.add(lamp);

    const cap = outdoorBox(
        0.38,
        0.12,
        0.38,
        hikingLanternMat
    );

    cap.position.y = 2.0;
    lantern.add(cap);

    lantern.position.set(
        -4 + i * 2.7,
        0,
        31 + Math.sin(i * 0.8) * 3
    );

    hikingWorld.add(lantern);
}


/* ============================================================
   NATURAL FLOWER MEADOW
   ============================================================ */

const flowerWorld = new THREE.Group();
flowerWorld.name = "NATURAL_FLOWER_MEADOW";
scene.add(flowerWorld);

const meadowMat = new THREE.MeshStandardMaterial({
    color: 0x627151,
    roughness: 1
});

const meadow = new THREE.Mesh(
    new THREE.CircleGeometry(8, 32),
    meadowMat
);

meadow.rotation.x = -Math.PI / 2;
meadow.position.set(-29, 0.035, 19);
flowerWorld.add(meadow);


/* ---------- FLOWER MATERIALS ---------- */

const roseMat = new THREE.MeshStandardMaterial({
    color: 0xb44755,
    roughness: 0.7
});

const tulipMat = new THREE.MeshStandardMaterial({
    color: 0xd58b91,
    roughness: 0.7
});

const daisyMat = new THREE.MeshStandardMaterial({
    color: 0xf0e9d5,
    roughness: 0.8
});

const flowerYellowMat = new THREE.MeshStandardMaterial({
    color: 0xe2c85b,
    roughness: 0.8
});

const lilyMat = new THREE.MeshStandardMaterial({
    color: 0xe5d8df,
    roughness: 0.7
});

const orchidMat = new THREE.MeshStandardMaterial({
    color: 0xb89bc7,
    roughness: 0.7
});

const tigerLilyMat = new THREE.MeshStandardMaterial({
    color: 0xd77b38,
    roughness: 0.75
});

const flowerStemMat = new THREE.MeshStandardMaterial({
    color: 0x4d6842,
    roughness: 1
});


/* ---------- FLOWER HELPERS ---------- */

function makeFlower(x, z, material, scale = 1) {

    const flower = new THREE.Group();

    const stem = outdoorCylinder(
        0.025 * scale,
        0.45 * scale,
        0.035 * scale,
        flowerStemMat
    );

    stem.position.y = 0.225 * scale;
    flower.add(stem);

    const bloom = outdoorSphere(
        0.16 * scale,
        material
    );

    bloom.position.y = 0.55 * scale;
    bloom.scale.y = 0.75;
    flower.add(bloom);

    flower.position.set(x, 0, z);
    flower.rotation.y = Math.random() * Math.PI;

    flowerWorld.add(flower);
}


/* ---------- RANDOM NATURAL FLOWERS ---------- */

for (let i = 0; i < 75; i++) {

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * 7.3;

    const x = -29 + Math.cos(angle) * radius;
    const z = 19 + Math.sin(angle) * radius;

    const roll = Math.random();

    if (roll < 0.24) {
        makeFlower(x, z, roseMat, 0.9);
    } else if (roll < 0.48) {
        makeFlower(x, z, tulipMat, 0.9);
    } else if (roll < 0.73) {
        makeFlower(x, z, daisyMat, 0.75);
    } else {
        makeFlower(x, z, flowerYellowMat, 0.8);
    }
}


/* ============================================================
   SPECIAL FLOWERS — SMALL NATURAL GARDEN
   ============================================================ */

const specialGarden = new THREE.Group();
specialGarden.name = "SPECIAL_FLOWER_GARDEN";
flowerWorld.add(specialGarden);


/* ---------- SMALL POND ---------- */

const flowerPondMat = new THREE.MeshStandardMaterial({
    color: 0x608b8d,
    roughness: 0.2,
    transparent: true,
    opacity: 0.82
});

const flowerPond = new THREE.Mesh(
    new THREE.CircleGeometry(2.5, 24),
    flowerPondMat
);

flowerPond.rotation.x = -Math.PI / 2;
flowerPond.position.set(4, 0.03, 1);
specialGarden.add(flowerPond);


/* ---------- LOTUS FLOWERS ---------- */

for (let i = 0; i < 6; i++) {

    const lotus = new THREE.Group();

    const pad = outdoorSphere(
        0.35,
        new THREE.MeshStandardMaterial({
            color: 0x5f8051,
            roughness: 1
        })
    );

    pad.position.y = 0.15;
    pad.scale.y = 0.25;
    lotus.add(pad);

    const bloom = outdoorSphere(
        0.18,
        lilyMat
    );

    bloom.position.y = 0.32;
    bloom.scale.y = 0.65;
    lotus.add(bloom);

    lotus.position.set(
        4 + Math.cos(i * 1.05) * 1.4,
        0,
        1 + Math.sin(i * 1.05) * 1.0
    );

    specialGarden.add(lotus);
}


/* ---------- LILIES ---------- */

for (let i = 0; i < 8; i++) {

    makeFlower(
        -25 + Math.random() * 5,
        16 + Math.random() * 6,
        lilyMat,
        1.05
    );
}


/* ---------- ORCHIDS ---------- */

for (let i = 0; i < 7; i++) {

    makeFlower(
        -34 + Math.random() * 5,
        16 + Math.random() * 6,
        orchidMat,
        0.9
    );
}


/* ---------- TIGER LILIES ---------- */

for (let i = 0; i < 8; i++) {

    makeFlower(
        -32 + Math.random() * 7,
        22 + Math.random() * 4,
        tigerLilyMat,
        1.0
    );
}


/* ---------- NATURAL MEADOW SHRUBS ---------- */

for (let i = 0; i < 18; i++) {

    const shrub = outdoorSphere(
        0.25 + Math.random() * 0.35,
        leafMat
    );

    shrub.position.set(
        -37 + Math.random() * 16,
        0.3,
        12 + Math.random() * 14
    );

    shrub.scale.y = 0.65;
    flowerWorld.add(shrub);
}


/* ---------- LITTLE MEADOW PATH ---------- */

for (let i = 0; i < 7; i++) {

    const stone = outdoorBox(
        1.0,
        0.12,
        0.7,
        pathStoneMat
    );

    stone.position.set(
        -29 + i * 0.9,
        0.12,
        26 - i * 1.2
    );

    stone.rotation.y = (Math.random() - 0.5) * 0.35;
    flowerWorld.add(stone);
}


/* ============================================================
   END OF PART 4.2
   ============================================================ */




   /* ============================================================
   PART 5A — GAME SYSTEM: SETUP + MEMORIES
   ============================================================ */

const adidasControls = new PointerLockControls(camera, renderer.domElement);

let adidasLocked = false;

const adidasKeys = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false
};

const adidasGameState = {
    memoriesFound: 0,
    totalMemories: 6,
    currentMemory: null,
    memoryOpen: false,
    lastArea: ""
};

camera.position.set(0, 1.7, 18);

const adidasInteractions = [];
const adidasMemoryData = [

    {
        name: "classroom",
        x: -28,
        y: 1.5,
        z: -10,
        title: "THE EMPTY CLASSROOM",
        text: "The waffle. The empty classroom. The Casio watches. Somewhere in all of that, I knew this was becoming something special.",
        range: 7
    },

    {
        name: "pelling",
        x: 30,
        y: 1.8,
        z: 13,
        title: "PELLING",
        text: "The mountains. The river. Being held close. You led me down to the water and somehow made the whole world feel quiet.",
        range: 8
    },

    {
        name: "hiking",
        x: 5,
        y: 1.5,
        z: 36,
        title: "THE HIKES",
        text: "I pretend to hate hiking. You keep taking me anyway. Somewhere along the way, you taught me that I could keep going.",
        range: 8
    },

    {
        name: "girlfriendDay",
        x: -1.65,
        y: 6.8,
        z: -13.2,
        title: "THE LITTLE COW",
        text: "You remembered the little things I wanted. Even something as simple as this cow plushie became a tiny piece of us.",
        range: 2.5
    },

    {
        name: "clothes",
        x: 5.4,
        y: 6.5,
        z: -10.0,
        title: "WAIT, WHO GAVE YOU THAAAT?",
        text: "We give each other clothes and then immediately act like we don't remember who gave what. I wouldn't trade that joke for anything.",
        range: 2.5
    },

    {
        name: "birthday",
        x: -5.1,
        y: 6.3,
        z: -11.8,
        title: "MY BIRTHDAY",
        text: "The little things you gave me. The Kinder Joy. The 19 éclairs. The letter. The roses. You made my birthday feel like me.",
        range: 2.5
    }

];
    

function adidasAddInteraction(memory) {
    adidasInteractions.push(memory);
}

adidasMemoryData.forEach(function(memory) {
    adidasAddInteraction(memory);
});


// ============================================================
// STAIRCASE INTERACTION
// ============================================================

// ============================================================
// STAIRCASE INTERACTIONS
// ============================================================

adidasAddInteraction({
    name: "stairs",
    x: 8.4,
    y: 1.5,
    z: -14.5,
    title: "UPSTAIRS",
    text: "There is more waiting upstairs.",
    range: 5.5
});

adidasAddInteraction({
    name: "stairsDown",
    x: 8.2,
    y: 6.5,
    z: -14,
    title: "DOWNSTAIRS",
    text: "Back downstairs.",
    range: 7
});



console.log("ADIDAS GAME SYSTEM READY");
console.log("Memories loaded:", adidasMemoryData.length);
/* ============================================================
   PART 5B — UI + MEMORY OVERLAY
   ============================================================ */

const adidasInteractionPrompt = document.createElement("div");

adidasInteractionPrompt.id = "adidasInteractionPrompt";

adidasInteractionPrompt.innerHTML =
    '<span>E</span>&nbsp; INTERACT';

document.body.appendChild(adidasInteractionPrompt);


const adidasMemoryCounter = document.createElement("div");

adidasMemoryCounter.id = "adidasMemoryCounter";

adidasMemoryCounter.innerHTML = "MEMORIES 0 / 6";

document.body.appendChild(adidasMemoryCounter);


const adidasMemoryOverlay = document.createElement("div");

adidasMemoryOverlay.id = "adidasMemoryOverlay";

adidasMemoryOverlay.innerHTML = `
    <div id="adidasMemoryBox">

        <div id="adidasMemorySmall">
            MEMORY DISCOVERED
        </div>

        <div id="adidasMemoryTitle">
            OUR WORLD
        </div>

        <div id="adidasMemoryText">
            A memory.
        </div>

        <button id="adidasMemoryClose">
            CLOSE
        </button>

    </div>
`;

document.body.appendChild(adidasMemoryOverlay);


const adidasStyle = document.createElement("style");

adidasStyle.textContent = `
    #adidasInteractionPrompt {
        position: fixed;
        left: 50%;
        bottom: 12%;
        transform: translateX(-50%);

        padding: 12px 22px;

        background: rgba(10, 10, 15, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 999px;

        color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        letter-spacing: 2px;

        z-index: 1000;

        display: none;

        backdrop-filter: blur(10px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.35);

        pointer-events: none;
    }

    #adidasInteractionPrompt span {
        display: inline-flex;

        width: 27px;
        height: 27px;

        align-items: center;
        justify-content: center;

        margin-right: 5px;

        border: 1px solid rgba(255,255,255,0.7);
        border-radius: 7px;

        font-weight: bold;
    }


    #adidasMemoryCounter {
        position: fixed;
        top: 22px;
        right: 22px;

        padding: 10px 16px;

        background: rgba(10,10,15,0.75);
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 999px;

        color: white;
        font-family: Arial, sans-serif;
        font-size: 11px;
        letter-spacing: 1.5px;

        z-index: 1000;

        backdrop-filter: blur(10px);
    }


    #adidasMemoryOverlay {
        position: fixed;
        inset: 0;

        display: none;
        align-items: center;
        justify-content: center;

        background: rgba(0,0,0,0.72);

        z-index: 2000;

        backdrop-filter: blur(8px);
    }


    #adidasMemoryBox {
        width: min(620px, 82vw);

        padding: 42px;

        background:
            linear-gradient(
                145deg,
                rgba(35,35,45,0.97),
                rgba(12,12,18,0.97)
            );

        border: 1px solid rgba(255,255,255,0.22);
        border-radius: 22px;

        box-shadow:
            0 30px 100px rgba(0,0,0,0.65),
            inset 0 1px rgba(255,255,255,0.08);

        color: white;

        font-family: Arial, sans-serif;

        text-align: center;
    }


    #adidasMemorySmall {
        margin-bottom: 14px;

        color: rgba(255,255,255,0.55);

        font-size: 11px;
        letter-spacing: 4px;
    }


    #adidasMemoryTitle {
        margin-bottom: 22px;

        font-size: clamp(25px, 4vw, 42px);
        font-weight: 700;

        letter-spacing: 2px;
    }


    #adidasMemoryText {
        max-width: 520px;

        margin: 0 auto 30px;

        color: rgba(255,255,255,0.82);

        font-size: 16px;
        line-height: 1.8;
    }


    #adidasMemoryClose {
        padding: 11px 24px;

        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 999px;

        background: rgba(255,255,255,0.08);

        color: white;

        font-size: 12px;
        letter-spacing: 2px;

        cursor: pointer;
    }


    #adidasMemoryClose:hover {
        background: rgba(255,255,255,0.18);
    }
`;

document.head.appendChild(adidasStyle);


/* POINTER LOCK */

renderer.domElement.addEventListener("click", function() {

    if (!adidasGameState.memoryOpen) {
        adidasControls.lock();
    }

});


adidasControls.addEventListener("lock", function() {

    adidasLocked = true;

});


adidasControls.addEventListener("unlock", function() {

    adidasLocked = false;

    adidasInteractionPrompt.style.display = "none";

});


/* KEYBOARD */

document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();

    if (key === "w") adidasKeys.w = true;
    if (key === "a") adidasKeys.a = true;
    if (key === "s") adidasKeys.s = true;
    if (key === "d") adidasKeys.d = true;

    if (event.key === "Shift") {
        adidasKeys.shift = true;
    }

    if (key === "e") {

        if (adidasGameState.memoryOpen) {
            adidasCloseMemory();
        } else {
            adidasTryInteraction();
        }

    }

});


document.addEventListener("keyup", function(event) {

    const key = event.key.toLowerCase();

    if (key === "w") adidasKeys.w = false;
    if (key === "a") adidasKeys.a = false;
    if (key === "s") adidasKeys.s = false;
    if (key === "d") adidasKeys.d = false;

    if (event.key === "Shift") {
        adidasKeys.shift = false;
    }

});


/* CLOSE BUTTON */

document
    .getElementById("adidasMemoryClose")
    .addEventListener("click", function(event) {

        event.stopPropagation();

        adidasCloseMemory();

    });




 function adidasOpenMemory(memory) {

    if (memory.name === "stairs") {

        interior.visible = false;
        upstairs.visible = true;

        camera.position.set(
            2.8,
            6.8,
            -9.5
        );

        adidasInteractionPrompt.style.display = "none";

        return;
    }


    if (memory.name === "stairsDown") {

        upstairs.visible = false;
        interior.visible = true;

        camera.position.set(
            8.2,
            1.7,
            -14
        );

        adidasInteractionPrompt.style.display = "none";

        return;
    }


    adidasGameState.currentMemory = memory;
    adidasGameState.memoryOpen = true;

    document.getElementById("adidasMemoryTitle").textContent =
        memory.title;

    document.getElementById("adidasMemoryText").textContent =
        memory.text;

    adidasMemoryOverlay.style.display = "flex";

    adidasInteractionPrompt.style.display = "none";


    if (!memory.found) {

        memory.found = true;

        adidasGameState.memoriesFound++;

        adidasMemoryCounter.textContent =
            "MEMORIES " +
            adidasGameState.memoriesFound +
            " / " +
            adidasGameState.totalMemories;
        if (
            adidasGameState.memoriesFound ===
            adidasGameState.totalMemories
        ) {

            setTimeout(function() {

                adidasCloseMemory();

                setTimeout(function() {

                    adidasShowFinalLetter();

                }, 1800);

            }, 1800);
        }
    }
  }

/* ============================================================
   FINAL LETTER
   ============================================================ */

function adidasShowFinalLetter() {

    const overlay =
        document.createElement("div");

    overlay.id =
        "adidasFinalLetter";

    overlay.innerHTML = `
        <div id="adidasFinalLetterBox">

            <div id="adidasFinalLetterSmall">
                SIX MEMORIES FOUND
            </div>

            <div id="adidasFinalLetterTitle">
                Dearest Aditya,
            </div>

            <div id="adidasFinalLetterText">

                <p>
                    I don't think I could ever fit everything
                    I feel about us into one little world.
                </p>

                <p>
                    But I wanted to leave you these pieces of it.
                    The empty classroom. The waffle. The watches.
                    Pelling. The hikes. The little things you gave me.
                    All those tiny moments that somehow became
                    some of the biggest parts of my life.
                </p>

                <p>
                    You have made me laugh when I needed it,
                    stayed beside me when things felt difficult,
                    and somehow made ordinary days feel special.
                </p>

                <p>
                    You taught me to walk.
                </p>

                <p>
                    Not literally.
                    You just made me believe that I could keep going,
                    that I could trust myself,
                    and that I didn't always have to be afraid
                    of taking the next step.
                </p>

                <p>
                    So this little world is my way of saying
                    that I remember.
                </p>

                <p>
                    I remember us.
                    I love us.
                    And I would choose all of these little moments again.
                </p>

                <p id="adidasFinalSignature">
                    — yours, Aheli ♡
                </p>

            </div>

            <button id="adidasFinalClose">
                CLOSE
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    const style =
        document.createElement("style");

    style.textContent = `

        #adidasFinalLetter {

            position: fixed;

            inset: 0;

            z-index: 99999;

            display: flex;

            align-items: flex-start;

            justify-content: center;

            padding: 30px 20px 50px;

            overflow-y: auto;

            background:
                radial-gradient(
                    circle at center,
                    rgba(45,35,55,0.96),
                    rgba(5,5,10,0.99)
                );

            color: white;

            font-family:
                Georgia,
                "Times New Roman",
                serif;

            box-sizing: border-box;
        }


        #adidasFinalLetterBox {

            width: min(720px, 100%);

            margin: 0 auto;

            padding: 45px 42px;

            box-sizing: border-box;

            text-align: center;

            border:
                1px solid
                rgba(255,255,255,0.18);

            border-radius: 24px;

            background:
                rgba(20,18,28,0.88);

            box-shadow:
                0 30px 100px
                rgba(0,0,0,0.55);
        }


        #adidasFinalLetterSmall {

            margin-bottom: 14px;

            color:
                rgba(255,210,150,0.75);

            font-family: Arial, sans-serif;

            font-size: 11px;

            letter-spacing: 4px;
        }


        #adidasFinalLetterTitle {

            margin-bottom: 32px;

            font-size: 34px;

            line-height: 1.2;
        }


        #adidasFinalLetterText {

            color:
                rgba(255,255,255,0.88);

            font-size: 18px;

            line-height: 1.8;

            text-align: left;
        }


        #adidasFinalLetterText p {

            margin:
                0 0 22px;
        }


        #adidasFinalSignature {

            text-align: right;

            margin-top: 35px !important;

            font-style: italic;

            font-size: 21px;
        }


        #adidasFinalClose {

            margin-top: 18px;

            padding: 12px 28px;

            border:
                1px solid
                rgba(255,255,255,0.3);

            border-radius: 999px;

            background:
                rgba(255,255,255,0.08);

            color: white;

            cursor: pointer;

            font-size: 12px;

            letter-spacing: 2px;
        }


        #adidasFinalClose:hover {

            background:
                rgba(255,255,255,0.16);
        }


        @media (max-width: 600px) {

            #adidasFinalLetterBox {

                padding: 32px 24px;
            }

            #adidasFinalLetterTitle {

                font-size: 27px;
            }

            #adidasFinalLetterText {

                font-size: 16px;
            }
        }

    `;

    document.head.appendChild(style);


    document
        .getElementById("adidasFinalClose")
        .addEventListener(
            "click",
            function() {

                overlay.remove();
                style.remove();

            }
        );
}


function adidasCloseMemory() {

    adidasGameState.memoryOpen = false;
    adidasGameState.currentMemory = null;

    adidasMemoryOverlay.style.display = "none";

}
/* ============================================================
   PART 5C — SMOOTH MOVEMENT + INTERACTION + ANIMATION
   ============================================================ */

let adidasNearestMemory = null;

const adidasVelocity = new THREE.Vector2(0, 0);

const adidasClock = new THREE.Clock();
function adidasFindNearestMemory() {

    adidasNearestMemory = null;

    let closestDistance = Infinity;

    const isUpstairs = camera.position.y > 4.5;

    for (let i = 0; i < adidasInteractions.length; i++) {

        const memory = adidasInteractions[i];

        // STAIRS ARE NAVIGATION, NOT A MEMORY
        if (memory.name === "stairs") {

            // Only show UPSTAIRS when downstairs
            if (isUpstairs) continue;

        }

        if (memory.name === "stairsDown") {

            // Only show DOWNSTAIRS when upstairs
            if (!isUpstairs) continue;

        }

        // Upstairs memories only work upstairs
        if (
            memory.name !== "stairs" &&
            memory.name !== "stairsDown" &&
            memory.y > 4 &&
            !isUpstairs
        ) {
            continue;
        }

        // Downstairs memories only work downstairs
        if (
            memory.name !== "stairs" &&
            memory.name !== "stairsDown" &&
            memory.y <= 4 &&
            isUpstairs
        ) {
            continue;
        }

        const dx = camera.position.x - memory.x;
        const dz = camera.position.z - memory.z;

        const distance = Math.sqrt(
            dx * dx + dz * dz
        );

        if (
            distance <= memory.range &&
            distance < closestDistance
        ) {

            closestDistance = distance;
            adidasNearestMemory = memory;

        }

    }

}


function adidasUpdateInteractionPrompt() {

    if (
        adidasLocked &&
        !adidasGameState.memoryOpen &&
        adidasNearestMemory
    ) {

        adidasInteractionPrompt.style.display = "block";

    } else {

        adidasInteractionPrompt.style.display = "none";

    }

}


function adidasTryInteraction() {

    if (!adidasLocked) {
        return;
    }

    adidasFindNearestMemory();

    if (adidasNearestMemory) {

        adidasOpenMemory(adidasNearestMemory);

    }

}


function adidasUpdateMovement(delta) {

    if (!adidasLocked || adidasGameState.memoryOpen) {

        adidasVelocity.x *= 0.82;
        adidasVelocity.y *= 0.82;

        return;

    }


    let moveX = 0;
    let moveZ = 0;


    if (adidasKeys.w) moveZ += 1;
    if (adidasKeys.s) moveZ -= 1;
    if (adidasKeys.a) moveX -= 1;
    if (adidasKeys.d) moveX += 1;


    const length = Math.sqrt(
        moveX * moveX +
        moveZ * moveZ
    );


    if (length > 0) {

        moveX /= length;
        moveZ /= length;

    }


    const speed = adidasKeys.shift ? 9 : 5.5;

    const targetX = moveX * speed;
    const targetZ = moveZ * speed;


    const smoothing = 1 - Math.pow(0.001, delta);

    adidasVelocity.x = THREE.MathUtils.lerp(
        adidasVelocity.x,
        targetX,
        smoothing
    );

    adidasVelocity.y = THREE.MathUtils.lerp(
        adidasVelocity.y,
        targetZ,
        smoothing
    );


    if (Math.abs(adidasVelocity.x) > 0.001) {

        adidasControls.moveRight(
            adidasVelocity.x * delta
        );

    }


    if (Math.abs(adidasVelocity.y) > 0.001) {

        adidasControls.moveForward(
            adidasVelocity.y * delta
        );

    }


    /* WORLD BOUNDS */

    camera.position.x = THREE.MathUtils.clamp(
        camera.position.x,
        -45,
        45
    );

    camera.position.z = THREE.MathUtils.clamp(
        camera.position.z,
        -45,
        45
    );


    

}


/* AREA DETECTION */

function adidasUpdateArea() {

    const x = camera.position.x;
    const z = camera.position.z;

    let area = "OUR WORLD";

    if (x < -20 && z < 5) {
        area = "THE COLLEGE";
    }

    else if (x > 20 && z > 5) {
        area = "PELLING";
    }

    else if (x > 10 && z < -10) {
        area = "OUR GAMING CORNER";
    }

    else if (z > 28) {
        area = "THE HIKING TRAIL";
    }

    else if (x < -20 && z > 10) {
        area = "THE GARDEN";
    }

    else if (x < -10 && z < -10) {
        area = "OUR LITTLE HOUSE";
    }


    if (area !== adidasGameState.lastArea) {

        adidasGameState.lastArea = area;

        console.log("AREA:", area);

    }

}

/* ============================================================
   ✨ ADIDAS — FIREFLY / FLOATING LIGHT EFFECT
   ============================================================ */

const adidasFireflies = [];

const fireflyMaterial = new THREE.MeshBasicMaterial({
    color: 0xffe9a8
});

for (let i = 0; i < 55; i++) {

    const firefly = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        fireflyMaterial
    );

    const zone = Math.random();

    if (zone < 0.65) {

        // Garden / house area
        firefly.position.set(
            -22 + Math.random() * 44,
            1.2 + Math.random() * 3.5,
            -9 + Math.random() * 25
        );

    } else {

        // Pelling / river area
        firefly.position.set(
            18 + Math.random() * 27,
            0.8 + Math.random() * 3.5,
            10 + Math.random() * 22
        );
    }

    firefly.userData = {
        baseY: firefly.position.y,
        speed: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2
    };

    scene.add(firefly);
    adidasFireflies.push(firefly);
}

/* ============================================================
   ✨ ADIDAS — AMBIENT FLOATING PARTICLES
   ============================================================ */

const adidasAmbientParticles = [];

const ambientParticleMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xfff3cf,
        transparent: true,
        opacity: 0.32
    });

for (let i = 0; i < 45; i++) {

    const particle = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.025 + Math.random() * 0.025,
            6,
            6
        ),
        ambientParticleMaterial
    );

    particle.position.set(
        -35 + Math.random() * 70,
        0.8 + Math.random() * 5,
        -5 + Math.random() * 50
    );

    particle.userData = {
        baseX: particle.position.x,
        baseY: particle.position.y,
        baseZ: particle.position.z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.5
    };

    scene.add(particle);

    adidasAmbientParticles.push(particle);
}

/* ============================================================
   🌿 ADIDAS — GENTLE BREEZE
   ============================================================ */

const adidasBreezeObjects = [];

scene.traverse(function(object) {

    if (
        object.isMesh &&
        object.position.y > 0.4 &&
        object.position.y < 5.5
    ) {

        const material =
            object.material;

        if (
            material &&
            material.color &&
            (
                material.color.g >
                material.color.r * 1.15
            )
        ) {

            adidasBreezeObjects.push({
                mesh: object,
                rotation: object.rotation.z,
                phase: Math.random() * Math.PI * 2,
                strength: 0.008 + Math.random() * 0.012
            });

        }
    }
});
/* ANIMATION LOOP */

function adidasGameLoop() {

    requestAnimationFrame(adidasGameLoop);

    const delta = Math.min(
        adidasClock.getDelta(),
        0.05
    );


    adidasUpdateMovement(delta);

    adidasFindNearestMemory();

    adidasUpdateInteractionPrompt();

    adidasUpdateArea();


    /* Gentle world animation */

    /* GENTLE BREEZE */

const breezeTime =
    performance.now() * 0.001;

for (
    let i = 0;
    i < adidasBreezeObjects.length;
    i++
) {

    const item =
        adidasBreezeObjects[i];

    item.mesh.rotation.z =
        item.rotation +
        Math.sin(
            breezeTime * 0.7 +
            item.phase
        ) * item.strength;
}

    /* AMBIENT PARTICLE MOTION */

const particleTime =
    performance.now() * 0.001;

for (
    let i = 0;
    i < adidasAmbientParticles.length;
    i++
) {

    const particle =
        adidasAmbientParticles[i];

    const data =
        particle.userData;

    particle.position.x =
        data.baseX +
        Math.sin(
            particleTime * data.speed +
            data.phase
        ) * 0.45;

    particle.position.y =
        data.baseY +
        Math.sin(
            particleTime * 0.7 +
            data.phase
        ) * 0.25;

    particle.position.z =
        data.baseZ +
        Math.cos(
            particleTime * 0.35 +
            data.phase
        ) * 0.35;
}
/* FIREFLY ANIMATION */

const fireflyTime = performance.now() * 0.001;

for (let i = 0; i < adidasFireflies.length; i++) {

    const firefly = adidasFireflies[i];
    const data = firefly.userData;

    firefly.position.y =
        data.baseY +
        Math.sin(
            fireflyTime * data.speed +
            data.phase
        ) * 0.35;

    firefly.position.x +=
        Math.sin(
            fireflyTime * 0.35 +
            data.phase
        ) * 0.0015;

    const glow =
        0.45 +
        Math.sin(
            fireflyTime * 2 +
            data.phase
        ) * 0.4;

    firefly.scale.setScalar(
        0.7 + glow
    );
}
/* ============================================================
   🌊 PELLING — MOVING WATER
   ============================================================ */

if (
    typeof riverSurface !== "undefined" &&
    riverSurface
) {

    const waterTime = performance.now() * 0.001;

    const position =
        riverSurface.geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {

        const x =
            riverBasePositions[i * 3];

        const originalY =
            riverBasePositions[i * 3 + 1];

        const wave =
            Math.sin(
                x * 0.45 +
                waterTime * 1.8
            ) * 0.055 +

            Math.sin(
                originalY * 0.8 +
                waterTime * 1.25
            ) * 0.035 +

            Math.sin(
                (x + originalY) * 0.25 +
                waterTime
            ) * 0.025;

        position.setY(
            i,
            originalY + wave
        );
    }

    position.needsUpdate = true;

    riverSurface.geometry.computeVertexNormals();
}
  


    if (
        typeof danceFloor !== "undefined" &&
        danceFloor
    ) {

        danceFloor.rotation.y += delta * 0.05;

    }


    renderer.render(scene, camera);

}


adidasGameLoop();

console.log("ADIDAS WORLD: GAME LOOP STARTED");