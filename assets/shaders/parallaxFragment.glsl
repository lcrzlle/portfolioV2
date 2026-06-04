uniform float uSliderProgress;
uniform vec2 uTextureRatio;
uniform sampler2D uTexture;
uniform sampler2D uTextureNext;

varying vec2 vUv;
varying vec2 vSize;

uniform float uScrollProgress;
uniform float uParallaxStrength;
uniform float uSlider;

vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize) {
    vec2 tempUV = uv - vec2(0.5);

    float quadAspect = quadSize.x / quadSize.y;
    float textureAspect = textureSize.x / textureSize.y;

    if(quadAspect < textureAspect) {
        tempUV = tempUV * vec2(quadAspect / textureAspect, 1.);
    } else {
        tempUV = tempUV * vec2(1., textureAspect / quadAspect);
    }

    tempUV += vec2(0.5);
    return tempUV;
}

void main() {
    vec2 correctUV = getUV(vUv, uTextureRatio, vSize);
    mat3 sliderMat;

    if (uSlider > 0.0) 
    {
        sliderMat = mat3(
        vec3(1., 0.0 , 0.0),
        vec3(0.0, 1., 0.),
        vec3((uScrollProgress * uParallaxStrength), -uSliderProgress / 2., 1.0));
    }
    else 
    {
        sliderMat = mat3(
        vec3(1., 0.0 , 0.0),
        vec3(0.0, 1., 0.),
        vec3((uScrollProgress * uParallaxStrength) + uSliderProgress / 2., 0.0 , 1.0));
    }

    vec2 vUvLeft =  (sliderMat * vec3(correctUV, 1.0)).xy;
    vec2 vUvRight = (sliderMat * vec3(correctUV, 1.0)).xy;
    vec4 baseImg = texture(uTexture, vUvLeft); 
    vec4 nullImg = texture(uTextureNext, vUvRight );

    if (uSlider > 0.0) 
    {
        gl_FragColor = mix(baseImg, nullImg, step((vUv.y), uSliderProgress));
    }
    else
    {
        gl_FragColor = mix(baseImg, nullImg, step(1.0-vUv.x, uSliderProgress));
    }
}