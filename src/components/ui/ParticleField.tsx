import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({
	count = 300,
	color = "#7A2E9D",
	size = 1.5,
	speed = 0.3,
}: {
	count?: number
	color?: string
	size?: number
	speed?: number
}) {
	const meshRef = useRef<THREE.Points>(null)

	const positions = useMemo(() => {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - 0.5) * 20
			pos[i * 3 + 1] = (Math.random() - 0.5) * 20
			pos[i * 3 + 2] = (Math.random() - 0.5) * 10
		}
		return pos
	}, [count])

	useFrame(({ clock }) => {
		if (!meshRef.current) return
		const t = clock.getElapsedTime()
		meshRef.current.rotation.y = t * 0.1 * speed
		meshRef.current.rotation.x = t * 0.03 * speed
	})

	return (
		<points ref={meshRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={count}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				color={color}
				size={size * 0.01}
				transparent
				opacity={0.32}
				sizeAttenuation
				fog={false}
			/>
		</points>
	)
}

export function ParticleField({
	count = 300,
	color = "#7A2E9D",
	size = 1.5,
	speed = 0.3,
}: {
	count?: number
	color?: string
	size?: number
	speed?: number
}) {
	const cameraConfig = { position: [0, 0, 8] as [number, number, number], fov: 60 }
	const canvasStyle = { position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%" }
	// Lighten the 3D scene on phones: fewer points + capped pixel ratio.
	const isMobile = typeof window !== "undefined" && window.innerWidth < 768
	const effectiveCount = isMobile ? Math.max(40, Math.round(count * 0.35)) : count
	const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5]
	return (
		<Canvas
			camera={cameraConfig}
			className="absolute inset-0 pointer-events-none"
			style={canvasStyle}
			dpr={dpr}
		>
			<ambientLight intensity={0.5} />
			<Particles count={effectiveCount} color={color} size={size} speed={speed} />
		</Canvas>
	)
}
