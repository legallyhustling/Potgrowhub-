/**
 * POTGROWHUB HYPER-REALISTIC SMOKE ORCHESTRATOR
 * Role: GPU-accelerated volumetric smoke for GanjaGoddess UI/UX.
 * Persona: Smooth like Snoop, ethereal like Lennon, focused like Bruce Lee.
 * Tech: WebGL GLSL Shaders + Three.js BufferGeometry.
 */

const GanjaSmoke = (() => {
    let scene, camera, renderer, clock;
    let smokeParticles = [];
    let particleSystem;
    
    // --- 1. SMOKE DYNAMICS & VIBE CONFIG ---
    const CONFIG = {
        PARTICLE_COUNT: 420, // The Golden Number
        SMOKE_COLOR: 0xE8F5E9, // Pale "Sticky" Green-White
        DRIFT_SPEED: 0.05,
        TURBULENCE: 0.2,
        STOMATAL_PULSE_RATE: 1.5,
        TEXTURE_PATH: '/assets/particles/smoke_puff.webp' // High-compression WebP
    };

    /**
     * VERTEX SHADER: The "Muscle" (GLSL)
     * Handles the movement of each puff on the GPU for zero-lag.
     */
    const _VS = `
        varying vec2 vUv;
        varying float vOpacity;
        uniform float uTime;
        attribute float aSize;
        attribute float aSpeed;

        void main() {
            vUv = uv;
            // Swirl logic: Bruce Lee fluidity
            vec3 pos = position;
            pos.y += uTime * aSpeed * 0.5;
            pos.x += sin(uTime * aSpeed + pos.y) * 0.2;
            pos.z += cos(uTime * aSpeed + pos.y) * 0.2;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            
            // Fade out as it rises: Ghostly disappearance
            vOpacity = 1.0 - (pos.y / 10.0);
        }
    `;

    /**
     * FRAGMENT SHADER: The "Soul" (GLSL)
     * Handles the colors and textures of the smoke.
     */
    const _FS = `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        varying float vOpacity;

        void main() {
            vec4 tex = texture2D(uTexture, gl_PointCoord);
            gl_FragColor = vec4(tex.rgb, tex.a * vOpacity * 0.6);
            
            // Discard transparent pixels to prevent "box" artifacts
            if (gl_FragColor.a < 0.01) discard;
        }
    `;

    /**
     * INIT: Set up the WebGL Stage
     */
    const init = (containerId) => {
        const container = document.getElementById(containerId) || document.body;
        clock = new THREE.Clock();

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false }); // Antialias off for mobile speed
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for high-res iPhones
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        _createParticleSystem();
        _addEventListeners();
        _animate();
    };

    /**
     * _CREATE_PARTICLE_SYSTEM: Build the high-leverage BufferGeometry
     */
    const _createParticleSystem = () => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(CONFIG.PARTICLE_COUNT * 3);
        const sizes = new Float32Array(CONFIG.PARTICLE_COUNT);
        const speeds = new Float32Array(CONFIG.PARTICLE_COUNT);

        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            // Start at GanjaGoddess's blunt position (approx)
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = -2 + (Math.random() * 2);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

            sizes[i] = 1.0 + Math.random() * 3.0;
            speeds[i] = 0.5 + Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uTexture: { value: new THREE.TextureLoader().load(CONFIG.TEXTURE_PATH) }
            },
            vertexShader: _VS,
            fragmentShader: _FS,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
    };

    /**
     * SPAWN_MENU_PUFF: Intercepts clicks and spawns a "Data Puff"
     */
    const spawnMenuPuff = (label, x, y) => {
        // Create an HTML Overlay element that follows a physics puff
        const puffEl = document.createElement('div');
        puffEl.className = 'smoke-menu-item neo-brutalism';
        puffEl.innerHTML = `<span>${label}</span>`;
        document.body.appendChild(puffEl);

        // Link with PotgrowPhysics for movement
        const physBody = PotgrowPhysics.createSmokePuff({ x, y, z: 0 });
        
        // Sync Logic
        const sync = () => {
            const screenPos = _toScreenPosition(physBody.position);
            puffEl.style.transform = `translate(${screenPos.x}px, ${screenPos.y}px) scale(${1 - physBody.position.y/10})`;
            puffEl.style.opacity = 1 - (physBody.position.y / 5);
            
            if (physBody.position.y > 5) {
                puffEl.remove();
                window.removeEventListener('physicsSync', sync);
            }
        };
        window.addEventListener('physicsSync', sync);
    };

    /**
     * _ANIMATE: The heartbeat of the GanjaGoddess's breath
     */
    const _animate = () => {
        const elapsedTime = clock.getElapsedTime();
        particleSystem.material.uniforms.uTime.value = elapsedTime;

        // Subtle camera "sway" for the Vibe
        camera.position.x = Math.sin(elapsedTime * 0.5) * 0.2;
        camera.position.y = Math.cos(elapsedTime * 0.3) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(_animate);
    };

    const _toScreenPosition = (vec) => {
        const vector = new THREE.Vector3(vec.x, vec.y, vec.z);
        vector.project(camera);
        return {
            x: (vector.x + 1) * window.innerWidth / 2,
            y: -(vector.y - 1) * window.innerHeight / 2
        };
    };

    const _addEventListeners = () => {
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    return { init, spawnMenuPuff };
})();

// Start the Smoke Show
window.addEventListener('load', () => GanjaSmoke.init('goddess-canvas'));
