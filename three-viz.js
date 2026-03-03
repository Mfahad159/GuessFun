const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Main animated icosahedron
const geom = new THREE.IcosahedronGeometry(3, 5);
const mat = new THREE.MeshPhongMaterial({ 
    color: 0x667eea, 
    emissive: 0x3344dd,
    wireframe: false,
    shininess: 100
});
const mesh = new THREE.Mesh(geom, mat);
mesh.position.z = 0;
scene.add(mesh);

// Additional rotating spheres for anime effect
const sphereGeom = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMat = new THREE.MeshPhongMaterial({ 
    color: 0x764ba2, 
    emissive: 0x9966ff,
});
const sphere1 = new THREE.Mesh(sphereGeom, sphereMat);
sphere1.position.set(6, 0, -5);
scene.add(sphere1);

const sphere2 = new THREE.Mesh(sphereGeom, new THREE.MeshPhongMaterial({ 
    color: 0xff6b9d, 
    emissive: 0xff88bb,
}));
sphere2.position.set(-6, 0, -5);
scene.add(sphere2);

// Lighting
const light1 = new THREE.PointLight(0x667eea, 2, 100);
light1.position.set(10, 10, 10);
scene.add(light1);

const light2 = new THREE.PointLight(0xff6b9d, 1.5, 80);
light2.position.set(-10, -5, 10);
scene.add(light2);

const light3 = new THREE.PointLight(0x764ba2, 1, 60);
light3.position.set(0, 15, -10);
scene.add(light3);

const ambientLight = new THREE.AmbientLight(0x404080, 0.8);
scene.add(ambientLight);

camera.position.z = 8;

function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.004;
    mesh.rotation.z += 0.001;
    
    sphere1.rotation.y += 0.008;
    sphere1.position.x = 6 + Math.sin(Date.now() * 0.0003) * 2;
    sphere1.position.y = Math.cos(Date.now() * 0.0004) * 3;
    
    sphere2.rotation.y -= 0.006;
    sphere2.position.x = -6 + Math.sin(Date.now() * 0.0003 + Math.PI) * 2;
    sphere2.position.y = Math.cos(Date.now() * 0.0005) * 3;
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
