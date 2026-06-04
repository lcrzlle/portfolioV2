uniform float uOpacity;

void main() {
    vec4 overlayColor = vec4(0,0.0,0.0, uOpacity); 
    gl_FragColor = overlayColor;
}