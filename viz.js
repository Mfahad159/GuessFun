// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0a0e27, 1);
document.getElementById('canvas').appendChild(renderer.domElement);

// Geometry
const geo = new THREE.IcosahedronGeometry(3, 4);
const mat = new THREE.MeshPhongMaterial({
    color: 0x667eea,
    emissive: 0x3344dd,
    shininess: 100
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Light
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);

const light2 = new THREE.PointLight(0x764ba2, 1.5);
light2.position.set(-10, -10, 5);
scene.add(light2);

scene.add(new THREE.AmbientLight(0x404080, 0.8));

camera.position.z = 8;

// Animate
function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.004;
    
    renderer.render(scene, camera);
}

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
