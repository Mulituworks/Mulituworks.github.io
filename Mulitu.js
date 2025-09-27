document.getElementById("generatorForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const zone = e.target.zone.value;
  const role = e.target.role.value;
  const access = e.target.access.value;

  const binary = generateBinary(zone, role, access);
  drawQR(binary);
  document.getElementById("output").textContent = `Binary: ${binary}`;
});

function generateBinary(zone, role, access) {
  const raw = `${zone}:${role}:${access}`;
  return raw.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

function drawQR(binary) {
  const canvas = document.getElementById("qrCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < binary.length; i++) {
    const x = (i % 20) * 15;
    const y = Math.floor(i / 20) * 15;
    ctx.fillStyle = binary[i] === '1' ? '#0f0' : '#111';
    ctx.fillRect(x, y, 14, 14);
  }
}
