import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";


THREE.ColorManagement.legacyMode = false;
const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#89FCAE" });
const capMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.55,
  roughness: 0,
  color: "#89FCAE",
  emissive: "#000000",
  envMapIntensity: 10,
});
const sphereGeometry = new THREE.IcosahedronGeometry(1, 0);
const baubles = [...Array(30)].map(() => ({
  scale: [0.55, 0.65, 0.5, 0.5, 1][Math.floor(Math.random() * 5)],
}));

function Bauble({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}) {
  const { nodes } = useGLTF("/cap.glb");
  const api = useRef();
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiply({
          x: -50 * delta * scale,
          y: -150 * delta * scale,
          z: -50 * delta * scale,
        })
    );
  });
  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
      dispose={null}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      />
      {/* <mesh
        castShadow
        scale={2.5 * scale}
        position={[0, 0, -1.8 * scale]}
        geometry={nodes.Mesh_1.geometry}
        material={capMaterial}
      /> */}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      },
      0.2
    );
    ref.current.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}


const CanvasHero = () => {
  return (
    <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        >
        <ambientLight intensity={0.5} />
        <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight
        position={[0, -15, -0]}
        intensity={4}
        color="black"
        />
        <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {
            baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */
        }
        </Physics>
        {/* <Environment files="/adamsbridge.hdr" /> */}
        <EffectComposer multisampling={0}>
        <SSAO
            samples={11}
            radius={0.15}
            intensity={20}
            luminanceInfluence={0.6}
            color="black"
        />
        <SSAO
            samples={21}
            radius={0.03}
            intensity={15}
            luminanceInfluence={0.6}
            color="black"
        />
        </EffectComposer>
        </Canvas>
  )
}

export default CanvasHero

