const noise = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
`;

export const vertexShader = `
uniform float uT,uAmp,uFreq;uniform vec2 uMouse;
varying vec3 vN;varying vec3 vP;varying float vD;
${noise}
float dsp(vec3 p){float n=snoise(p*uFreq+vec3(0.,uT*.25,uT*.12));n+=.5*snoise(p*uFreq*2.3-vec3(uT*.2,0.,0.));
  float m=exp(-2.5*length(normalize(p).xy-uMouse*1.2));return (n*uAmp+m*.35);}
void main(){
  vec3 n=normalize(position);float d=dsp(position);vec3 p=position+n*d;
  vec3 t=normalize(cross(n,vec3(0.,1.,0.)+vec3(.001)));vec3 b=cross(n,t);float e=.02;
  vec3 p1=position+t*e;p1+=normalize(p1)*dsp(p1);vec3 p2=position+b*e;p2+=normalize(p2)*dsp(p2);
  vec3 nn=normalize(cross(p1-p,p2-p));
  vN=normalMatrix*nn;vec4 mv=modelViewMatrix*vec4(p,1.);vP=mv.xyz;vD=d;gl_Position=projectionMatrix*mv;}
`;

export const fragmentShader = `
precision highp float;uniform float uMix,uT;varying vec3 vN;varying vec3 vP;varying float vD;
void main(){vec3 n=normalize(vN);vec3 v=normalize(-vP);vec3 r=reflect(-v,n);
  float y=r.y;vec3 top=vec3(.93,.93,.91);vec3 bot=vec3(.07,.07,.08);vec3 env=mix(bot,top,smoothstep(-.9,.9,y));
  float band=smoothstep(.02,.0,abs(y-.18))*.9+smoothstep(.06,.0,abs(y+.42))*.5;env+=band;
  float stripe=smoothstep(.3,.0,abs(fract(r.x*2.5+uT*.05)-.5)-.2)*.12;env+=stripe;
  vec3 blue=vec3(.11,.17,1.);env=mix(env,mix(env,blue,.85),uMix*smoothstep(-.3,.5,y));
  float fr=pow(1.-max(dot(n,v),0.),3.);vec3 col=env*(.55+.45*fr)+fr*.35;
  col=mix(col,vec3(.98),smoothstep(.95,1.,dot(reflect(-v,n),normalize(vec3(.3,.8,.5))))*.6);
  gl_FragColor=vec4(col,1.);}
`;
