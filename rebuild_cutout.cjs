const fs = require('fs');
const jpeg = require('jpeg-js');
const PNG = require('pngjs').PNG;

const fileIn = 'src/assets/hand_held_phone_c_original.jpg';
const fileOut = 'src/assets/app_showcase_mockup_c.png';

console.log('Reading original image...');
if (!fs.existsSync(fileIn)) {
  console.error('Source file not found:', fileIn);
  process.exit(1);
}

const data = fs.readFileSync(fileIn);
const raw = jpeg.decode(data);
const { width, height } = raw;
console.log(`Image dimensions: ${width}x${height}`);

function isBgLike(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  // Checkerboard is desaturated and bright
  return (max - min <= 20) && (min > 175);
}

// 1. Run BFS to identify the background pixels
const visited = new Uint8Array(width * height);
const queue = [];

function add(x, y) {
  const idx = y * width + x;
  if (visited[idx]) return;
  const pIdx = idx * 4;
  const r = raw.data[pIdx];
  const g = raw.data[pIdx+1];
  const b = raw.data[pIdx+2];
  if (isBgLike(r, g, b)) {
    visited[idx] = 1;
    queue.push([x, y]);
  }
}

// Seed the BFS from borders (excluding bottom corners if they contain skin)
for (let x = 0; x < width; x++) {
  add(x, 0); // Top border
  if (x < 100 || x > width - 100) {
    add(x, height - 1); // Bottom corners
  }
}
for (let y = 0; y < height; y++) {
  add(0, y); // Left border
  add(width - 1, y); // Right border
}

// Seed from the known right-side pocket between fingers and phone body
add(715, 542);

console.log(`Starting BFS with ${queue.length} seed pixels...`);
let head = 0;
while (head < queue.length) {
  const [cx, cy] = queue[head++];
  const dirs = [[0,1], [0,-1], [1,0], [-1,0]];
  for (const [dx, dy] of dirs) {
    const nx = cx + dx;
    const ny = cy + dy;
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nidx = ny * width + nx;
      if (!visited[nidx]) {
        const npIdx = nidx * 4;
        const nr = raw.data[npIdx];
        const ng = raw.data[npIdx+1];
        const nb = raw.data[npIdx+2];
        if (isBgLike(nr, ng, nb)) {
          visited[nidx] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }
}
console.log(`BFS complete. Found ${queue.length} background pixels.`);

// 2. Dilate the background mask to cover transition pixels (anti-aliased edges)
console.log('Dilating background mask...');
const dilated = new Uint8Array(width * height);
const dRadius = 4; // covers a 9x9 neighborhood to fully capture alpha transitions
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    if (visited[idx]) {
      for (let dy = -dRadius; dy <= dRadius; dy++) {
        for (let dx = -dRadius; dx <= dRadius; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            dilated[ny * width + nx] = 1;
          }
        }
      }
    }
  }
}

// 3. Process image and calculate alpha and decontaminate color
const png = new PNG({ width, height });

console.log('Calculating alpha channel and decontaminating colors...');
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pIdx = idx * 4;
    
    const cr = raw.data[pIdx];
    const cg = raw.data[pIdx+1];
    const cb = raw.data[pIdx+2];
    
    if (visited[idx]) {
      // Pure background
      png.data[pIdx] = 0;
      png.data[pIdx+1] = 0;
      png.data[pIdx+2] = 0;
      png.data[pIdx+3] = 0;
    } else if (dilated[idx] === 0) {
      // Definite foreground
      png.data[pIdx] = cr;
      png.data[pIdx+1] = cg;
      png.data[pIdx+2] = cb;
      png.data[pIdx+3] = 255;
    } else {
      // Transition pixel (in dilated but not visited)
      // Predict background color B based on checkerboard cell coordinates
      const cellX = Math.floor(x / 20.48);
      const cellY = Math.floor(y / 20.48);
      let bgR = 234.6, bgG = 234.6, bgB = 234.6; // Grey cell average
      if ((cellX + cellY) % 2 === 1) {
        bgR = 252.9; bgG = 252.9; bgB = 252.9; // White cell average
      }
      
      const dist = Math.sqrt((cr - bgR)**2 + (cg - bgG)**2 + (cb - bgB)**2);
      
      let alpha = 255;
      const T_bg = 8;     // Distances below this are pure background (alpha = 0)
      const T_fg = 140;   // Distances above this are pure foreground (alpha = 255)
      
      if (dist < T_bg) {
        alpha = 0;
      } else if (dist > T_fg) {
        alpha = 255;
      } else {
        alpha = Math.round(255 * (dist - T_bg) / (T_fg - T_bg));
      }
      
      if (alpha === 0) {
        png.data[pIdx] = 0;
        png.data[pIdx+1] = 0;
        png.data[pIdx+2] = 0;
        png.data[pIdx+3] = 0;
      } else {
        const alphaRatio = alpha / 255;
        // Un-multiply background: C = alpha*F + (1-alpha)*B => F = (C - (1-alpha)*B) / alpha
        let fr = (cr - (1 - alphaRatio) * bgR) / alphaRatio;
        let fg = (cg - (1 - alphaRatio) * bgG) / alphaRatio;
        let fb = (cb - (1 - alphaRatio) * bgB) / alphaRatio;
        
        // Clamp to original observed color to guarantee edge is darker than background
        // and prevent noise amplification near transparency
        fr = Math.max(0, Math.min(cr, fr));
        fg = Math.max(0, Math.min(cg, fg));
        fb = Math.max(0, Math.min(cb, fb));
        
        png.data[pIdx] = Math.round(fr);
        png.data[pIdx+1] = Math.round(fg);
        png.data[pIdx+2] = Math.round(fb);
        png.data[pIdx+3] = alpha;
      }
    }
  }
}

// 4. Run a double-pass 5x5 Gaussian blur on the alpha channel at the transition edges for ultra-smooth anti-aliasing
console.log('Smoothing alpha channel transitions with a double-pass 5x5 Gaussian blur...');

// Pass 1
const alpha1 = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  alpha1[i] = png.data[i * 4 + 3];
}

const alpha2 = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  alpha2[i] = alpha1[i];
}

// 5x5 Gaussian kernel approximation weights (sum = 273)
const gKernel = [
  [1,  4,  7,  4, 1],
  [4, 16, 26, 16, 4],
  [7, 26, 41, 26, 7],
  [4, 16, 26, 16, 4],
  [1,  4,  7,  4, 1]
];
const gKernelSum = 273;

// Helper to check if pixel is near a transparent pixel
function isBoundary(x, y, alphaMap) {
  if (alphaMap[y * width + x] === 0) return false;
  
  // Check in a 4-pixel radius
  for (let dy = -4; dy <= 4; dy++) {
    for (let dx = -4; dx <= 4; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        if (alphaMap[ny * width + nx] === 0) {
          return true;
        }
      }
    }
  }
  return false;
}

// Pass 1: Blur alpha1 into alpha2
for (let y = 2; y < height - 2; y++) {
  for (let x = 2; x < width - 2; x++) {
    const idx = y * width + x;
    if (isBoundary(x, y, alpha1)) {
      let sum = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          sum += alpha1[(y + dy) * width + (x + dx)] * gKernel[dy + 2][dx + 2];
        }
      }
      alpha2[idx] = Math.round(sum / gKernelSum);
    }
  }
}

// Pass 2: Blur alpha2 and write to png.data, and apply darkening to prevent halos
for (let y = 2; y < height - 2; y++) {
  for (let x = 2; x < width - 2; x++) {
    const idx = y * width + x;
    const pIdx = idx * 4;
    
    if (isBoundary(x, y, alpha2)) {
      let sum = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          sum += alpha2[(y + dy) * width + (x + dx)] * gKernel[dy + 2][dx + 2];
        }
      }
      const newA = Math.round(sum / gKernelSum);
      png.data[pIdx + 3] = newA;
      
      // Color decontamination/darkening for semi-transparent pixels to blend with dark backgrounds
      if (newA < 235) {
        const factor = newA / 235;
        png.data[pIdx] = Math.round(png.data[pIdx] * factor);
        png.data[pIdx + 1] = Math.round(png.data[pIdx + 1] * factor);
        png.data[pIdx + 2] = Math.round(png.data[pIdx + 2] * factor);
      }
    }
  }
}

console.log('Writing output file...');
const buffer = PNG.sync.write(png);
fs.writeFileSync(fileOut, buffer);
console.log(`Success! Transparent mockup written to ${fileOut}`);
