import { useEffect, useRef } from 'react'

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function syncSize() {
      if (!canvas) return
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }
    window.addEventListener('resize', syncSize)
    syncSize()

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const vs = `attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

    const fs = `precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float line(vec2 p, vec2 a, vec2 b, float width) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return smoothstep(width, 0.0, length(pa - ba * h));
}

void main() {
    vec2 uv = v_uv;
    vec2 mouse = u_mouse / u_resolution;
    
    vec3 bgColor = vec3(0.976, 0.976, 0.976); // #f9f9f9 (background)
    vec3 lineColor = vec3(0.173, 0.173, 0.173); // #2c2c2c (lines)
    
    float mask = 0.0;
    
    for(float i = 0.1; i < 1.0; i += 0.1) {
        float x = i + sin(u_time * 0.2 + i * 10.0) * 0.01;
        float distToMouseX = abs(uv.x - mouse.x);
        float mouseEffectX = smoothstep(0.2, 0.0, distToMouseX) * 0.02;
        mask += line(uv, vec2(x + mouseEffectX, 0.0), vec2(x - mouseEffectX, 1.0), 0.001);
        
        float y = i + cos(u_time * 0.2 + i * 10.0) * 0.01;
        float distToMouseY = abs(uv.y - mouse.y);
        float mouseEffectY = smoothstep(0.2, 0.0, distToMouseY) * 0.02;
        mask += line(uv, vec2(0.0, y + mouseEffectY), vec2(1.0, y - mouseEffectY), 0.001);
    }
    
    mask += line(uv, vec2(mouse.x, 0.0), vec2(mouse.x, 1.0), 0.0015) * 0.5;
    mask += line(uv, vec2(0.0, mouse.y), vec2(1.0, mouse.y), 0.0015) * 0.5;

    vec3 finalColor = mix(bgColor, lineColor, clamp(mask, 0.0, 0.15));
    gl_FragColor = vec4(finalColor, 1.0);
}`

    function cs(type: number, src: string) {
      if (!gl) return null
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    if (!prog) return
    const vShader = cs(gl.VERTEX_SHADER, vs)
    const fShader = cs(gl.FRAGMENT_SHADER, fs)
    if (!vShader || !fShader) return
    gl.attachShader(prog, vShader)
    gl.attachShader(prog, fShader)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width * canvas.width
      mouse.y = (1.0 - (e.clientY - rect.top) / rect.height) * canvas.height
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number;
    function render(t: number) {
      if (!gl || !canvas) return
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, t * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationFrameId = requestAnimationFrame(render)
    }
    render(0)

    return () => {
      window.removeEventListener('resize', syncSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
    />
  )
}

export default ShaderBackground
