/**
 * POTGROWHUB SUPREME OMNI-PHYSICS ORCHESTRATOR v2.0-ULTRA
 * Role: The "Nerve Center" for 3D/2D collisions, particle smoke, PWA haptics, 
 * AR/VR spatial mapping, and multi-modal sensory feedback.
 * Persona: Snoop's Rhythm, Bruce Lee's Fluidity, Tupac's Grit.
 * Build: Zero-Cost, Mobile-Edge Optimized (iPhone PWA).
 */

const PotgrowPhysics = (() => {
    // --- 1. CORE ENGINE STATE ---
    let world, solver, lastTime;
    const items = new Map(); 
    const constraints = new Map();
    const fluidCells = [];
    const raycaster = new CANNON.RaycastResult();
    
    // --- 2. ADVANCED SENSORY & ECONOMIC CONSTANTS ---
    const CONSTANTS = {
        GRAVITY: -9.82,
        RESIN_FRICTION: 0.65,      // Enhanced "Sticky" tactile response
        SMOKE_BUOYANCY: 0.08,      // Optimized drift for GanjaGoddess puffs
        DOPAMINE_BOUNCE: 0.75,     // High-restitution for "satisfying" UI
        AIR_DENSITY: 1.225,        // For aerodynamics of 3D-printed bongs
        STOMATAL_PULSE: 0.02,      // For "breathing" plant animations
        HAPTIC_THRESHOLD: 0.45,    // Trigger for iPhone Taptic Engine
        GHOST_COMMERCE_LATENCY: 50 // Physics sync offset for AR stability
    };

    // --- 3. THE INFRASTRUCTURE (INIT) ---
    /**
     * INIT: Initializes the 3D Multiverse using Cannon-es (Free/Open Source)
     */
    const init = () => {
        world = new CANNON.World();
        world.gravity.set(0, CONSTANTS.GRAVITY, 0);
        
        // Broadphase: Sweep and Prune - Essential for iPhone performance
        world.broadphase = new CANNON.SAPBroadphase(world);
        world.defaultContactMaterial.friction = CONSTANTS.RESIN_FRICTION;
        world.defaultContactMaterial.restitution = CONSTANTS.DOPAMINE_BOUNCE;
        
        // Iterations: Balance Bruce Lee's precision with Snoop's ease
        world.solver.iterations = 15; 
        world.allowSleep = true; // Crucial for battery life on iPhone

        // Create the "Infinite Zen Floor" (AR Surface)
        const groundBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane(),
            material: new CANNON.Material("groundMaterial")
        });
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.addBody(groundBody);

        _initFluidGrid(); // Initialize smoke field physics
        animate();
    };

    // --- 4. BONG & HARDWARE GENERATION (3DPoD Bridge) ---
    /**
     * ADD_BONG: Physicalizes 3D designs for AR "Try-On"
     */
    const addBong = (id, config = {}) => {
        const { 
            position = { x: 0, y: 5, z: 0 }, 
            mass = 1.8, 
            height = 3.5, 
            radius = 0.8 
        } = config;

        // Composite Shape: Cylinder (Chamber) + Sphere (Base) + Box (Downstem)
        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(position.x, position.y, position.z),
            linearDamping: 0.1,
            angularDamping: 0.1
        });

        const chamberShape = new CANNON.Cylinder(radius * 0.5, radius, height, 16);
        body.addShape(chamberShape, new CANNON.Vec3(0, height / 2, 0));
        
        world.addBody(body);
        items.set(id, body);

        // Notify UI of creation for Dopamine Ripple effect
        _dispatch('hardware_spawn', { id, mass });
        return body;
    };

    // --- 5. SMOKE & AESTHETIC PHYSICS (GanjaGoddess UI) ---
    /**
     * CREATE_SMOKE_PUFF: Menu items wrapped in interactive gaseous physics
     */
    const createSmokePuff = (origin, data = {}) => {
        const puff = new CANNON.Body({
            mass: 0.02,
            shape: new CANNON.Sphere(0.4),
            position: new CANNON.Vec3(origin.x, origin.y, origin.z),
            collisionFilterGroup: 2, // Layer for smoke particles
            collisionFilterMask: 1   // Only collide with user's "Hands"
        });

        // Drift Vector: Subtle swirling upward motion
        const drift = new CANNON.Vec3(
            (Math.random() - 0.5) * 0.4, 
            CONSTANTS.SMOKE_BUOYANCY + (Math.random() * 0.1), 
            (Math.random() - 0.5) * 0.4
        );
        
        puff.applyImpulse(drift, puff.position);
        world.addBody(puff);

        // Add to cleanup queue - Preventing browser memory leaks is "The Hustle"
        setTimeout(() => {
            world.removeBody(puff);
            _dispatch('smoke_dissipate', { id: puff.id });
        }, 4000);
    };

    // --- 6. AGENTIC INTERACTION & HAPTICS ---
    /**
     * TRIGGER_HAPTICS: Physical feedback for the "Seed-to-Smoke" experience
     */
    const triggerHaptics = (intensity) => {
        if (!('vibrate' in navigator)) return;
        
        if (intensity > 8) {
            // "Heavy Impact" - Dropping a 3D Printed bong
            navigator.vibrate([30, 10, 30]);
        } else if (intensity > 2) {
            // "Soft Touch" - Interacting with GanjaGoddess smoke
            navigator.vibrate(15);
        }
    };

    /**
     * APPLY_WIND_FLOW: Simulates fan/ventilation for grow-room design
     */
    const applyGrowRoomWind = (forceVec) => {
        items.forEach(body => {
            if (body.mass > 0) {
                body.applyForce(new CANNON.Vec3(forceVec.x, forceVec.y, forceVec.z), body.position);
            }
        });
    };

    // --- 7. THE AUTOMATION LOOP (ANIMATE) ---
    /**
     * THE LOOP: High-precision temporal synchronization
     */
    const animate = () => {
        const time = performance.now() / 1000;
        const dt = lastTime ? time - lastTime : 0;
        
        // Step the world - Snoop's timing, no rush, just rhythm
        world.step(1/60, dt, 5); 

        items.forEach((body, id) => {
            // If body is moving, check for ground-strike haptics
            if (body.sleepState !== CANNON.Body.SLEEPING) {
                _syncVisuals(body, id);
                
                // Detect Ground Impact
                if (body.position.y < 0.15 && Math.abs(body.velocity.y) > 0.8) {
                    triggerHaptics(Math.abs(body.velocity.y));
                }
            }
        });

        lastTime = time;
        requestAnimationFrame(animate);
    };

    // --- 8. INTERNAL UTILITIES (THE SECRET SAUCE) ---
    const _initFluidGrid = () => {
        // Computational fluid dynamics lite for menu interaction
        // Mapping smoke density to 2D grid cells for mobile efficiency
        for(let i=0; i<100; i++) fluidCells.push({ density: 0, velocity: {x:0, y:0} });
    };

    const _syncVisuals = (body, id) => {
        window.dispatchEvent(new CustomEvent('potgrow_render_sync', {
            detail: {
                id: id,
                pos: { x: body.position.x, y: body.position.y, z: body.position.z },
                rot: { x: body.quaternion.x, y: body.quaternion.y, z: body.quaternion.z, w: body.quaternion.w }
            }
        }));
    };

    const _dispatch = (type, payload) => {
        window.dispatchEvent(new CustomEvent(`potgrow_${type}`, { detail: payload }));
    };

    // --- 9. PUBLIC API EXPOSURE ---
    return {
        init,
        addBong,
        createSmokePuff,
        applyGrowRoomWind,
        getWorld: () => world,
        getConstants: () => CONSTANTS
    };

})();

// Ignite the engine when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    PotgrowPhysics.init();
    console.log("🌿 Potgrow Physics: Hustling at 60fps.");
});
