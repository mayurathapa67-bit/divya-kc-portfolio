const fs = require("fs");
const dir = "public/images";
const grads = {
  coral: ["#ff6b6b", "#ffd93d"],
  gold: ["#ffd93d", "#8b5cf6"],
  purple: ["#8b5cf6", "#6bcb77"],
  teal: ["#6bcb77", "#ff6b6b"],
  blend: ["#ff6b6b", "#8b5cf6"],
};
function svg(a, b, label) {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
  <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
  <rect width='800' height='1000' fill='url(#g)'/>
  <circle cx='200' cy='300' r='120' fill='#ffffff' opacity='0.12'/>
  <circle cx='620' cy='700' r='160' fill='#ffffff' opacity='0.1'/>
  <text x='400' y='520' font-family='Georgia, serif' font-size='44' fill='#ffffff' text-anchor='middle' opacity='0.85'>${label}</text>
  </svg>`;
}
const files = {
  "hero-divya.jpg.svg": ["#ff6b6b", "#8b5cf6", "Divya KC"],
  "about-divya.jpg.svg": ["#ffd93d", "#8b5cf6", "About"],
  "about-1.jpg.svg": grads.coral,
  "about-2.jpg.svg": grads.purple,
  "about-3.jpg.svg": grads.gold,
  "work-lumen-1.jpg.svg": grads.coral,
  "work-lumen-2.jpg.svg": grads.teal,
  "work-lumen-3.jpg.svg": grads.gold,
  "work-harbour-1.jpg.svg": grads.purple,
  "work-harbour-2.jpg.svg": grads.coral,
  "work-harbour-3.jpg.svg": grads.blend,
  "work-wander-1.jpg.svg": grads.gold,
  "work-wander-2.jpg.svg": grads.purple,
  "work-wander-3.jpg.svg": grads.teal,
  "work-roots-1.jpg.svg": grads.blend,
  "work-roots-2.jpg.svg": grads.coral,
  "work-roots-3.jpg.svg": grads.gold,
  "work-aurora-1.jpg.svg": grads.purple,
  "work-aurora-2.jpg.svg": grads.teal,
  "work-aurora-3.jpg.svg": grads.coral,
  "work-pulse-1.jpg.svg": grads.gold,
  "work-pulse-2.jpg.svg": grads.blend,
  "work-pulse-3.jpg.svg": grads.purple,
  "blog-warm.jpg.svg": grads.coral,
  "blog-story.jpg.svg": grads.purple,
  "blog-3d.jpg.svg": grads.blend,
  "blog-budget.jpg.svg": grads.teal,
  "avatar-1.jpg.svg": grads.coral,
  "avatar-2.jpg.svg": grads.purple,
  "avatar-3.jpg.svg": grads.gold,
  "avatar-4.jpg.svg": grads.blend,
};
for (const [f, g] of Object.entries(files)) {
  fs.writeFileSync(dir + "/" + f, svg(g[0], g[1], g[2]));
}
console.log("wrote", Object.keys(files).length, "svg placeholders");
