const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geom = new THREE.IcosahedronGeometry(2, 4);
const mat = new THREE.MeshPhongMaterial({ color: 0x667eea, wireframe: false });
const mesh = new THREE.Mesh(geom, mat);
scene.add(mesh);

const light1 = new THREE.PointLight(0xffffff, 1, 100);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x764ba2, 0.5, 100);
light2.position.set(-5, -5, 5);
scene.add(light2);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
