<template>
  <div class="pure-floating-3d-stage">
    <!-- Ambient Radial Spotlight behind floating 3D model -->
    <div class="ambient-model-glow"></div>

    <!-- Transparent Three.js Interactive Canvas (Full Viewport, Zero Clipping) -->
    <div 
      class="canvas-stage"
      ref="canvasContainer"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <canvas ref="canvasEl"></canvas>
    </div>

    <!-- Smart, Minimal Model Indicator Dots (No bulky buttons, elegant & unobtrusive) -->
    <div class="model-indicator-dots" aria-label="3D Model selector">
      <button 
        v-for="(_, idx) in modelsCount" 
        :key="idx" 
        class="dot-indicator" 
        :class="{ active: currentIdx === idx }"
        @click="selectModel(idx)"
        :aria-label="'Switch to 3D model ' + (idx + 1)"
      ></button>
    </div>

    <!-- Subtle temporary interaction hint (fades away automatically) -->
    <div class="smart-floating-hint" :class="{ 'fade-out': hasInteracted }">
      <span class="hint-text">Click model to switch &bull; Drag to rotate 360&deg;</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// 5 Models to cycle through every 20 seconds
const modelsCount = 5
const currentIdx = ref(0)
const hasInteracted = ref(false)

const canvasContainer = ref(null)
const canvasEl = ref(null)

let scene, camera, renderer, animationFrameId
let rootGroup
const modelMeshes = []
let timerInterval = null

// Rotation state for interactive dragging
const rotation = reactive({
  targetX: 0.32,
  targetY: -0.5,
  currentX: 0.32,
  currentY: -0.5,
  isDragging: false,
  pointerStartX: 0,
  pointerStartY: 0,
  previousMouseX: 0,
  previousMouseY: 0
})

// Procedural stone texture for stone-coated tiles
function createStoneTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#1e2126'
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 4500; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const radius = 0.5 + Math.random() * 1.6
    const shade = Math.floor(30 + Math.random() * 95)
    ctx.fillStyle = `rgb(${shade}, ${shade + 3}, ${shade + 7})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
  return new THREE.CanvasTexture(canvas)
}

// -------------------------------------------------------------
// 1. Model 0: Aluminium Roofing Sheet (Corrugated Longspan & Step-Tile)
// -------------------------------------------------------------
function buildRoofingModel() {
  const group = new THREE.Group()

  const width = 4.2
  const length = 3.8
  const segmentsX = 80
  const segmentsY = 50
  const geometry = new THREE.PlaneGeometry(width, length, segmentsX, segmentsY)
  const pos = geometry.attributes.position

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)

    // Deep corrugation waves
    const wave = Math.sin(x * 6.5) * 0.24
    // Steptile ridge steps
    const step = Math.sin(y * 4.0) * 0.08

    pos.setZ(i, wave + step)
  }
  geometry.computeVertexNormals()
  geometry.center() // Ensure geometry rotates around its true geometric center

  const material = new THREE.MeshStandardMaterial({
    color: 0x1b4b82, // Glossy royal blue architectural finish
    metalness: 0.88,
    roughness: 0.2,
    side: THREE.DoubleSide
  })

  const sheet = new THREE.Mesh(geometry, material)
  sheet.rotation.x = -Math.PI / 3.2
  group.add(sheet)

  // Gold Edge Trims on flanks
  const trimGeo = new THREE.CylinderGeometry(0.04, 0.04, length, 16)
  trimGeo.center()
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 })
  
  const leftTrim = new THREE.Mesh(trimGeo, trimMat)
  leftTrim.position.set(-width / 2, 0, 0)
  leftTrim.rotation.x = -Math.PI / 3.2
  group.add(leftTrim)

  const rightTrim = leftTrim.clone()
  rightTrim.position.x = width / 2
  group.add(rightTrim)

  group.scale.set(0.9, 0.9, 0.9)
  return group
}

// -------------------------------------------------------------
// 2. Model 1: Aluminium Profiles, Eaves & Outlets
// -------------------------------------------------------------
function buildProfilesModel() {
  const group = new THREE.Group()
  const matSilver = new THREE.MeshStandardMaterial({ color: 0xdde3eb, metalness: 0.95, roughness: 0.15 })
  const matGold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.18 })

  // 1. Extruded Architectural Box Profile
  const boxGeo = new THREE.BoxGeometry(4.2, 0.55, 0.8)
  boxGeo.center()
  const boxMesh = new THREE.Mesh(boxGeo, matSilver)
  boxMesh.position.y = 0.6
  group.add(boxMesh)

  // 2. Fascia Eaves Flashing Channel
  const fasciaGeo = new THREE.BoxGeometry(4.2, 1.25, 0.12)
  fasciaGeo.center()
  const fasciaMesh = new THREE.Mesh(fasciaGeo, matGold)
  fasciaMesh.position.set(0, 0.0, 0.4)
  group.add(fasciaMesh)

  // 3. Cylindrical Gutter Drainage Outlet Spout
  const outletGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.6, 32)
  outletGeo.center()
  const outletMesh = new THREE.Mesh(outletGeo, matSilver)
  outletMesh.position.set(-1.1, -0.6, 0)
  group.add(outletMesh)

  // Flange Ring
  const ringGeo = new THREE.TorusGeometry(0.52, 0.08, 16, 32)
  const ringMesh = new THREE.Mesh(ringGeo, matGold)
  ringMesh.rotation.x = Math.PI / 2
  ringMesh.position.set(-1.1, 0.15, 0)
  group.add(ringMesh)

  // 4. Roof Ridge Cap Profile
  const ridgeGeo = new THREE.CylinderGeometry(0.38, 0.38, 4.2, 3)
  ridgeGeo.center()
  const ridgeMesh = new THREE.Mesh(ridgeGeo, matSilver)
  ridgeMesh.rotation.z = Math.PI / 2
  ridgeMesh.position.set(0, 1.3, -0.2)
  group.add(ridgeMesh)

  group.scale.set(0.88, 0.88, 0.88)
  return group
}

// -------------------------------------------------------------
// 3. Model 2: Coated Aluminium Coils
// -------------------------------------------------------------
function buildCoilsModel() {
  const group = new THREE.Group()

  const coilRadius = 1.6
  const innerHole = 0.7
  const coilLength = 3.2

  // Outer Master Coil Cylinder
  const coilGeo = new THREE.CylinderGeometry(coilRadius, coilRadius, coilLength, 48, 1, true)
  coilGeo.center()
  const coilMat = new THREE.MeshStandardMaterial({
    color: 0x124275, // Rich coated enamel blue
    metalness: 0.88,
    roughness: 0.22,
    side: THREE.DoubleSide
  })
  const coilMesh = new THREE.Mesh(coilGeo, coilMat)
  coilMesh.rotation.z = Math.PI / 2
  group.add(coilMesh)

  // Inner Core Cylinder
  const coreGeo = new THREE.CylinderGeometry(innerHole, innerHole, coilLength + 0.04, 32, 1, true)
  coreGeo.center()
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x8f9bb3, metalness: 0.95, roughness: 0.2, side: THREE.DoubleSide })
  const coreMesh = new THREE.Mesh(coreGeo, coreMat)
  coreMesh.rotation.z = Math.PI / 2
  group.add(coreMesh)

  // Concentric Layers Ring Discs on both ends
  const discGeo = new THREE.RingGeometry(innerHole, coilRadius, 48)
  const discMat = new THREE.MeshStandardMaterial({ color: 0x1a2638, metalness: 0.92, roughness: 0.25, side: THREE.DoubleSide })
  
  const leftDisc = new THREE.Mesh(discGeo, discMat)
  leftDisc.rotation.y = Math.PI / 2
  leftDisc.position.x = -coilLength / 2
  group.add(leftDisc)

  const rightDisc = new THREE.Mesh(discGeo, discMat)
  rightDisc.rotation.y = Math.PI / 2
  rightDisc.position.x = coilLength / 2
  group.add(rightDisc)

  // Gold Strapping Tension Bands
  const strapMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.96, roughness: 0.12 })
  const strapPositions = [-1.0, 0, 1.0]

  strapPositions.forEach(pos => {
    const strapGeo = new THREE.TorusGeometry(coilRadius + 0.02, 0.035, 16, 48)
    const strapMesh = new THREE.Mesh(strapGeo, strapMat)
    strapMesh.rotation.y = Math.PI / 2
    strapMesh.position.x = pos
    group.add(strapMesh)
  })

  group.scale.set(0.9, 0.9, 0.9)
  return group
}

// -------------------------------------------------------------
// 4. Model 3: Stone-Coated Tiles (Classic & Shingle)
// -------------------------------------------------------------
function buildStoneTilesModel() {
  const group = new THREE.Group()
  const stoneTex = createStoneTexture()

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x2e3238, // Volcanic charcoal stone chip
    map: stoneTex,
    bumpMap: stoneTex,
    bumpScale: 0.08,
    roughness: 0.88,
    metalness: 0.08
  })

  const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.2 })

  // 3 Stepped Overlapping Barrel Tile Tiers
  for (let tier = 0; tier < 3; tier++) {
    const tierGroup = new THREE.Group()
    tierGroup.position.set(0, (tier - 1) * 0.95, -tier * 0.4)

    // 4 Barrel Curves per tier
    for (let col = 0; col < 4; col++) {
      const tileWidth = 0.95
      const tileGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.15, 24, 1, false, 0, Math.PI)
      tileGeo.center()
      const tileMesh = new THREE.Mesh(tileGeo, stoneMat)
      tileMesh.rotation.x = Math.PI / 2
      tileMesh.position.x = (col - 1.5) * (tileWidth + 0.04)
      tierGroup.add(tileMesh)
    }

    // Interlocking Ridge Flange
    const stripGeo = new THREE.BoxGeometry(4.2, 0.1, 0.1)
    stripGeo.center()
    const stripMesh = new THREE.Mesh(stripGeo, goldTrimMat)
    stripMesh.position.set(0, -0.5, 0.1)
    tierGroup.add(stripMesh)

    group.add(tierGroup)
  }

  group.rotation.x = -Math.PI / 4.5
  group.scale.set(0.88, 0.88, 0.88)
  return group
}

// -------------------------------------------------------------
// 5. Model 4: Roll Forming & Coiling Machine Stand
// -------------------------------------------------------------
function buildRollFormingModel() {
  const group = new THREE.Group()

  const matFrame = new THREE.MeshStandardMaterial({ color: 0x112136, metalness: 0.75, roughness: 0.35 })
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.08 })
  const matSheet = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.92, roughness: 0.18, side: THREE.DoubleSide })

  // Dual Industrial Stanchions
  const stanchionGeo = new THREE.BoxGeometry(0.5, 3.0, 1.4)
  stanchionGeo.center()
  const leftStanchion = new THREE.Mesh(stanchionGeo, matFrame)
  leftStanchion.position.set(-2.2, 0, 0)
  group.add(leftStanchion)

  const rightStanchion = leftStanchion.clone()
  rightStanchion.position.x = 2.2
  group.add(rightStanchion)

  // Top & Bottom Heavy Crossbeams
  const beamGeo = new THREE.BoxGeometry(4.8, 0.4, 1.0)
  beamGeo.center()
  const topBeam = new THREE.Mesh(beamGeo, matFrame)
  topBeam.position.y = 1.35
  group.add(topBeam)

  const bottomBeam = topBeam.clone()
  bottomBeam.position.y = -1.35
  group.add(bottomBeam)

  // Top Precision Chrome Roller
  const topRollerGeo = new THREE.CylinderGeometry(0.45, 0.45, 4.0, 32)
  topRollerGeo.center()
  const topRoller = new THREE.Mesh(topRollerGeo, matChrome)
  topRoller.rotation.z = Math.PI / 2
  topRoller.position.y = 0.55
  group.add(topRoller)

  // Bottom Precision Chrome Roller
  const bottomRoller = topRoller.clone()
  bottomRoller.position.y = -0.55
  group.add(bottomRoller)

  // Corrugated Sheet Passing Through
  const sheetGeo = new THREE.PlaneGeometry(4.6, 2.5, 36, 1)
  const pos = sheetGeo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    pos.setZ(i, Math.sin(x * 8) * 0.12)
  }
  sheetGeo.computeVertexNormals()
  sheetGeo.center()

  const sheetMesh = new THREE.Mesh(sheetGeo, matSheet)
  sheetMesh.rotation.x = Math.PI / 2
  sheetMesh.position.y = 0
  group.add(sheetMesh)

  group.scale.set(0.88, 0.88, 0.88)
  return group
}

// -------------------------------------------------------------
// Scene Initialization (Generous Field of View, Zero Clipping)
// -------------------------------------------------------------
function initThree() {
  if (!canvasContainer.value || !canvasEl.value) return

  const width = canvasContainer.value.clientWidth || 540
  const height = canvasContainer.value.clientHeight || 540

  scene = new THREE.Scene()

  // Generous camera distance (z = 9.8) with FOV 38 ensures 100% of the model stays well within canvas
  camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
  camera.position.set(0, 0, 9.8)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasEl.value,
    antialias: true,
    alpha: true // 100% transparent background
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffe88a, 2.8)
  keyLight.position.set(6, 8, 8)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x73a5d8, 1.9)
  fillLight.position.set(-7, -4, 6)
  scene.add(fillLight)

  const rimLight = new THREE.PointLight(0xffffff, 2.4, 18)
  rimLight.position.set(0, 6, -3)
  scene.add(rimLight)

  rootGroup = new THREE.Group()
  scene.add(rootGroup)

  // Build the 5 Models
  modelMeshes.push(buildRoofingModel())
  modelMeshes.push(buildProfilesModel())
  modelMeshes.push(buildCoilsModel())
  modelMeshes.push(buildStoneTilesModel())
  modelMeshes.push(buildRollFormingModel())

  modelMeshes.forEach((mesh, idx) => {
    mesh.visible = idx === 0
    rootGroup.add(mesh)
  })

  animate()
}

// -------------------------------------------------------------
// Animation Loop (Gentle Floating Bobbing & User Dragging)
// -------------------------------------------------------------
let clock = new THREE.Clock()
let autoRotateSpeed = 0.007

function animate() {
  animationFrameId = requestAnimationFrame(animate)

  const elapsedTime = clock.getElapsedTime()

  // Smooth rotation damping
  rotation.currentX += (rotation.targetX - rotation.currentX) * 0.08
  rotation.currentY += (rotation.targetY - rotation.currentY) * 0.08

  if (!rotation.isDragging) {
    rotation.targetY += autoRotateSpeed
  }

  if (rootGroup) {
    rootGroup.rotation.x = rotation.currentX
    rootGroup.rotation.y = rotation.currentY

    // Smooth floating bobbing in air (subtle amplitude so it stays cleanly framed)
    rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12
    rootGroup.rotation.z = Math.sin(elapsedTime * 0.7) * 0.03
  }

  renderer.render(scene, camera)
}

// -------------------------------------------------------------
// Model Transitions
// -------------------------------------------------------------
function selectModel(idx) {
  if (idx === currentIdx.value) return

  const oldMesh = modelMeshes[currentIdx.value]
  const newMesh = modelMeshes[idx]

  currentIdx.value = idx

  if (oldMesh && newMesh) {
    newMesh.scale.set(0.1, 0.1, 0.1)
    newMesh.visible = true

    let scaleProgress = 0.1
    const scaleUpInterval = setInterval(() => {
      scaleProgress += 0.12
      if (scaleProgress >= 1) {
        newMesh.scale.set(1, 1, 1)
        oldMesh.visible = false
        clearInterval(scaleUpInterval)
      } else {
        newMesh.scale.set(scaleProgress, scaleProgress, scaleProgress)
      }
    }, 16)
  }
}

function nextModel() {
  const next = (currentIdx.value + 1) % modelsCount
  selectModel(next)
}

// -------------------------------------------------------------
// Smart Click vs Drag Detection
// -------------------------------------------------------------
function onPointerDown(e) {
  rotation.isDragging = true
  hasInteracted.value = true
  rotation.pointerStartX = e.clientX
  rotation.pointerStartY = e.clientY
  rotation.previousMouseX = e.clientX
  rotation.previousMouseY = e.clientY
}

function onPointerMove(e) {
  if (!rotation.isDragging) return
  const deltaX = e.clientX - rotation.previousMouseX
  const deltaY = e.clientY - rotation.previousMouseY

  rotation.targetY += deltaX * 0.009
  rotation.targetX += deltaY * 0.009

  // Clamp vertical rotation so model never flips upside down
  rotation.targetX = Math.max(-0.95, Math.min(0.95, rotation.targetX))

  rotation.previousMouseX = e.clientX
  rotation.previousMouseY = e.clientY
}

function onPointerUp(e) {
  if (rotation.isDragging) {
    rotation.isDragging = false
    
    // SMART FEATURE: If user simply clicked (moved less than 7px), cycle to next model!
    const distMoved = Math.hypot(
      e.clientX - rotation.pointerStartX,
      e.clientY - rotation.pointerStartY
    )
    if (distMoved < 7) {
      nextModel()
    }
  }
}

function handleResize() {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// -------------------------------------------------------------
// Lifecycle Hooks & 20s Auto-Cycling
// -------------------------------------------------------------
onMounted(() => {
  try {
    initThree()
  } catch (err) {
    console.warn('WebGL initialization failed or unsupported in this environment:', err)
  }
  window.addEventListener('resize', handleResize)

  // Automatically cycle to the next 3D model every 20 seconds
  timerInterval = setInterval(() => {
    nextModel()
  }, 20000)

  // Auto fade hint after 4 seconds even without interaction
  setTimeout(() => {
    hasInteracted.value = true
  }, 4500)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (timerInterval) clearInterval(timerInterval)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
})
</script>

<style scoped>
.pure-floating-3d-stage {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
  user-select: none;
}

/* Ambient Radial Glow behind the floating 3D model */
.ambient-model-glow {
  position: absolute;
  width: min(440px, 85vw);
  height: min(440px, 85vw);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.04) 50%, transparent 72%);
  pointer-events: none;
  z-index: 1;
  filter: blur(45px);
}

/* Three.js Canvas Stage: Full Size, Zero Clipping */
.canvas-stage {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: pan-y; /* Allows vertical swipe to scroll webpage naturally */
  overflow: hidden;
}

.canvas-stage:active {
  cursor: grabbing;
}

.canvas-stage canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  background: transparent;
  overflow: visible;
}

/* Minimal Smart Indicator Dots (Completely unobtrusive, no bulky buttons) */
.model-indicator-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 17, 36, 0.4);
  padding: 6px 12px;
  border-radius: var(--radius-full);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dot-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all var(--transition-fast);
}

.dot-indicator:hover {
  background: var(--gold-300);
  transform: scale(1.3);
}

.dot-indicator.active {
  width: 20px;
  border-radius: 4px;
  background: var(--gold-gradient);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

/* Smart Subtle Interaction Hint */
.smart-floating-hint {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 5;
  background: rgba(6, 17, 36, 0.55);
  border: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(8px);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  pointer-events: none;
  transition: opacity 0.6s ease;
}

.smart-floating-hint.fade-out {
  opacity: 0;
}

.hint-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--gold-300);
  letter-spacing: 0.02em;
}

@media (max-width: 868px) {
  .pure-floating-3d-stage {
    height: 400px;
  }
  .ambient-model-glow {
    width: 360px;
    height: 360px;
  }
}

@media (max-width: 540px) {
  .pure-floating-3d-stage {
    height: 320px;
  }
  .ambient-model-glow {
    width: 260px;
    height: 260px;
  }
  .smart-floating-hint {
    top: 5px;
    right: 8px;
    padding: 0.25rem 0.6rem;
  }
  .hint-text {
    font-size: 0.64rem;
  }
}
</style>
