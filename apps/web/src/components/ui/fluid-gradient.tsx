"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useFBO } from '@react-three/drei';


const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 iMouse;
  uniform int iFrame;
  uniform sampler2D iPreviousFrame;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uFluidDecay;
  uniform float uTrailLength;
  uniform float uStopDecay;
  varying vec2 vUv;
  
  vec2 ur, U;
  
  float ln(vec2 p, vec2 a, vec2 b) {
      return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.));
  }
  
  vec4 t(vec2 v, int a, int b) {
      return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur));
  }
  
  vec4 t(vec2 v) {
      return texture2D(iPreviousFrame, fract(v/ur));
  }
  
  float area(vec2 a, vec2 b, vec2 c) {
      float A = length(b-c), B = length(c-a), C = length(a-b), s = 0.5*(A+B+C);
      return sqrt(s*(s-A)*(s-B)*(s-C));
  }
  
  void main() {
      U = vUv * iResolution;
      ur = iResolution.xy;
      
      if (iFrame < 1) {
          float w = 0.5+sin(0.2*U.x)*0.5;
          float q = length(U-0.5*ur);
          gl_FragColor = vec4(0.1*exp(-0.001*q*q),0,0,w);
      } else {
          vec2 v = U,
               A = v + vec2( 1, 1),
               B = v + vec2( 1,-1),
               C = v + vec2(-1, 1),
               D = v + vec2(-1,-1);
          
          for (int i = 0; i < 8; i++) {
              v -= t(v).xy;
              A -= t(A).xy;
              B -= t(B).xy;
              C -= t(C).xy;
              D -= t(D).xy;
          }
          
          vec4 me = t(v);
          vec4 n = t(v, 0, 1),
              e = t(v, 1, 0),
              s = t(v, 0, -1),
              w = t(v, -1, 0);
          vec4 ne = .25*(n+e+s+w);
          me = mix(t(v), ne, vec4(0.15,0.15,0.95,0.));
          me.z = me.z - 0.01*((area(A,B,C)+area(B,C,D))-4.);
          
          vec4 pr = vec4(e.z,w.z,n.z,s.z);
          me.xy = me.xy + 100.*vec2(pr.x-pr.y, pr.z-pr.w)/ur;
          
          me.xy *= uFluidDecay;
          me.z *= uTrailLength;
          
          if (iMouse.z > 0.0) {
              vec2 mousePos = iMouse.xy;
              vec2 mousePrev = iMouse.zw;
              vec2 mouseVel = mousePos - mousePrev;
              float velMagnitude = length(mouseVel);
              float q = ln(U, mousePos, mousePrev);
              vec2 m = mousePos - mousePrev;
              float l = length(m);
              if (l > 0.0) m = min(l, 10.0) * m / l;
              
              float brushSizeFactor = 1e-4 / uBrushSize;
              float strengthFactor = 0.03 * uBrushStrength;
              
              float falloff = exp(-brushSizeFactor*q*q*q);
              falloff = pow(falloff, 0.5);
              
              me.xyw += strengthFactor * falloff * vec3(m, 10.);
              
              if (velMagnitude < 2.0) {
                  float distToCursor = length(U - mousePos);
                  float influence = exp(-distToCursor * 0.01);
                  float cursorDecay = mix(1.0, uStopDecay, influence);
                  me.xy *= cursorDecay;
                  me.z *= cursorDecay;
              }
          }
          
          gl_FragColor = clamp(me, -0.4, 0.4);
      }
  }
`;

const displayShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform sampler2D iFluid;
  uniform float uDistortionAmount;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uColorIntensity;
  uniform float uSoftness;
  varying vec2 vUv;
  
  void main() {
    vec2 fragCoord = vUv * iResolution;
    
    vec4 fluid = texture2D(iFluid, vUv);
    vec2 fluidVel = fluid.xy;
    
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;
    
    uv += fluidVel * (0.5 * uDistortionAmount);
    
    float d = -iTime * 0.5;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += iTime * 0.5;
    
    float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
    float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
    float mixer3 = sin(d + a) * 0.5 + 0.5;
    
    float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
    mixer1 = mix(mixer1, 0.5, smoothAmount);
    mixer2 = mix(mixer2, 0.5, smoothAmount);
    mixer3 = mix(mixer3, 0.5, smoothAmount);
    
    vec3 col = mix(uColor1, uColor2, mixer1);
    col = mix(col, uColor3, mixer2);
    col = mix(col, uColor4, mixer3 * 0.4);
    
    col *= uColorIntensity;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;


const config = {
  brushSize: 25.0,
  brushStrength: 0.5,
  distortionAmount: 2.5,
  fluidDecay: 0.98,
  trailLength: 0.8,
  stopDecay: 0.85,
  color1: '#b8fff7',
  color2: '#6e3466',
  color3: '#0133ff',
  color4: '#66d1fe',
  colorIntensity: 1.0,
  softness: 1.0,
  lerpFactor: 0.1,
};

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function FluidSimulation() {
  const { size, gl, camera } = useThree();
  const fluidMaterial = useRef<THREE.ShaderMaterial>(null);
  const displayMaterial = useRef<THREE.ShaderMaterial>(null);
  const fluidMeshRef = useRef<THREE.Mesh>(null);
  const displayMeshRef = useRef<THREE.Mesh>(null);

  const fluidTarget1 = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  const fluidTarget2 = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  const [currentFluidTarget, setCurrentFluidTarget] = useState(fluidTarget1);
  const [previousFluidTarget, setPreviousFluidTarget] = useState(fluidTarget2);
  const [frameCount, setFrameCount] = useState(0);

  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      targetMouse.current.x = e.clientX - rect.left;
      targetMouse.current.y = rect.height - (e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      // Don't reset target position to avoid jumping to (0,0)
      // Keep the last known position for smooth interpolation
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    gl.domElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
      gl.domElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl.domElement]);

  useFrame(({ gl, clock }) => {
    const time = clock.getElapsedTime();
    
    // Lerp mouse position for smooth movement
    mouse.current.prevX = smoothMouse.current.x;
    mouse.current.prevY = smoothMouse.current.y;
    
    smoothMouse.current.x += (targetMouse.current.x - smoothMouse.current.x) * config.lerpFactor;
    smoothMouse.current.y += (targetMouse.current.y - smoothMouse.current.y) * config.lerpFactor;
    
    mouse.current.x = smoothMouse.current.x;
    mouse.current.y = smoothMouse.current.y;
    
    if (fluidMaterial.current) {
      fluidMaterial.current.uniforms.iTime.value = time;
      fluidMaterial.current.uniforms.iFrame.value = frameCount;
      fluidMaterial.current.uniforms.iMouse.value.set(
        mouse.current.x,
        mouse.current.y,
        mouse.current.prevX,
        mouse.current.prevY
      );

      fluidMaterial.current.uniforms.uBrushSize.value = config.brushSize;
      fluidMaterial.current.uniforms.uBrushStrength.value = config.brushStrength;
      fluidMaterial.current.uniforms.uFluidDecay.value = config.fluidDecay;
      fluidMaterial.current.uniforms.uTrailLength.value = config.trailLength;
      fluidMaterial.current.uniforms.uStopDecay.value = config.stopDecay;
    }

    if (displayMaterial.current) {
      displayMaterial.current.uniforms.iTime.value = time;
      displayMaterial.current.uniforms.uDistortionAmount.value = config.distortionAmount;
      displayMaterial.current.uniforms.uColorIntensity.value = config.colorIntensity;
      displayMaterial.current.uniforms.uSoftness.value = config.softness;
      displayMaterial.current.uniforms.uColor1.value.set(...hexToRgb(config.color1));
      displayMaterial.current.uniforms.uColor2.value.set(...hexToRgb(config.color2));
      displayMaterial.current.uniforms.uColor3.value.set(...hexToRgb(config.color3));
      displayMaterial.current.uniforms.uColor4.value.set(...hexToRgb(config.color4));
    }

    if (fluidMaterial.current && fluidMeshRef.current) {
        fluidMaterial.current.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
        gl.setRenderTarget(currentFluidTarget);
        gl.render(fluidMeshRef.current, camera);
    }
    
    if (displayMaterial.current && displayMeshRef.current) {
        displayMaterial.current.uniforms.iFluid.value = currentFluidTarget.texture;
        gl.setRenderTarget(null);
        gl.render(displayMeshRef.current, camera);
    }

    const temp = currentFluidTarget;
    setCurrentFluidTarget(previousFluidTarget);
    setPreviousFluidTarget(temp);

    setFrameCount(prev => prev + 1);
  });

  const fluidPlane = useMemo(() => {
    const aspect = size.width / size.height;
    return (
      <mesh ref={fluidMeshRef}>
        <planeGeometry args={[2 * aspect, 2]} />
        <shaderMaterial
          ref={fluidMaterial}
          uniforms={{
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(size.width, size.height) },
            iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
            iFrame: { value: 0 },
            iPreviousFrame: { value: null },
            uBrushSize: { value: config.brushSize },
            uBrushStrength: { value: config.brushStrength },
            uFluidDecay: { value: config.fluidDecay },
            uTrailLength: { value: config.trailLength },
            uStopDecay: { value: config.stopDecay },
          }}
          vertexShader={vertexShader}
          fragmentShader={fluidShader}
        />
      </mesh>
    );
  }, [size]);

  const displayPlane = useMemo(() => {
    const aspect = size.width / size.height;
    return (
      <mesh ref={displayMeshRef}>
        <planeGeometry args={[2 * aspect, 2]} />
        <shaderMaterial
          ref={displayMaterial}
          uniforms={{
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(size.width, size.height) },
            iFluid: { value: null },
            uDistortionAmount: { value: config.distortionAmount },
            uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
            uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
            uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
            uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
            uColorIntensity: { value: config.colorIntensity },
            uSoftness: { value: config.softness },
          }}
          vertexShader={vertexShader}
          fragmentShader={displayShader}
        />
      </mesh>
    );
  }, [size]);

  useEffect(() => {
    if (fluidMaterial.current) {
      fluidMaterial.current.uniforms.iResolution.value.set(size.width, size.height);
    }
    if (displayMaterial.current) {
      displayMaterial.current.uniforms.iResolution.value.set(size.width, size.height);
    }
    fluidTarget1.setSize(size.width, size.height);
    fluidTarget2.setSize(size.width, size.height);
    setFrameCount(0);
  }, [size, fluidTarget1, fluidTarget2]);

  return (
    <>
      {fluidPlane}
      {displayPlane}
    </>
  );
}

function OrthographicCameraSetup() {
  const { size, set } = useThree();
  
  useEffect(() => {
    const aspect = size.width / size.height;
    const camera = new THREE.OrthographicCamera(
      -aspect, aspect, 1, -1, 0, 1
    );
    set({ camera });
  }, [size, set]);
  
  return null;
}

export const FluidGradient = () => {
  const [simKey, setSimKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSimKey(prev => prev + 1); 
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Canvas
     className='absolute inset-0'
     gl={{ antialias: true }}
>
      <OrthographicCameraSetup />
      <FluidSimulation key={simKey} />
    </Canvas>
  );
}
