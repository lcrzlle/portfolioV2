uniform float uScreenProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
varying vec2 vUv;
varying vec2 vSize;

void main() {
    vUv = uv;
    vec4 defaultState = modelMatrix * vec4 (position, 1.0);
    vec4 fullScreenState = vec4 (position, 1.0);
    fullScreenState.x *= uResolution.x ;
    fullScreenState.y *= uResolution.y ;

    vec4 finalState = mix(defaultState, fullScreenState, uScreenProgress);
    vSize = mix(uQuadSize, uResolution, uScreenProgress);

    gl_Position = projectionMatrix * viewMatrix * finalState;
}