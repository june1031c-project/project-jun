// ── Theme ──
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// ── Lotto ──
function colorClass(n) {
  if (n <= 10) return 'c1';
  if (n <= 20) return 'c10';
  if (n <= 30) return 'c20';
  if (n <= 40) return 'c30';
  return 'c40';
}

function generate() {
  const nums = [];
  while (nums.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  let bonus;
  do { bonus = Math.floor(Math.random() * 45) + 1; } while (nums.includes(bonus));
  nums.sort((a, b) => a - b);
  return { nums, bonus };
}

function draw(count) {
  if (count === 1) drawSingle();
  else drawMulti(count);
}

function drawSingle() {
  const { nums, bonus } = generate();
  const ballsEl = document.getElementById('balls');
  const bonusSection = document.getElementById('bonusSection');
  const bonusBall = document.getElementById('bonusBall');
  const mainResult = document.getElementById('mainResult');
  const placeholder = document.getElementById('placeholder');

  clearMulti();
  mainResult.style.display = '';
  placeholder.style.display = 'none';
  ballsEl.innerHTML = '';
  bonusSection.classList.remove('show');

  nums.forEach((num, i) => {
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = `ball ${colorClass(num)}`;
      ball.textContent = num;
      ballsEl.appendChild(ball);
    }, i * 130);
  });

  setTimeout(() => {
    bonusBall.className = `ball bonus ${colorClass(bonus)}`;
    bonusBall.textContent = bonus;
    bonusSection.classList.add('show');
  }, 6 * 130 + 180);

}

function drawMulti(count) {
  const mainResult = document.getElementById('mainResult');
  mainResult.style.display = 'none';
  clearMulti();

  const wrapper = document.createElement('div');
  wrapper.className = 'multi-results';
  document.getElementById('multiWrapper').appendChild(wrapper);

  for (let i = 0; i < count; i++) {
    const { nums, bonus } = generate();
    setTimeout(() => {
      const row = document.createElement('div');
      row.className = 'multi-row';
      row.style.animationDelay = `${i * 0.06}s`;

      let html = `<span class="row-label">${String.fromCharCode(65 + i)}</span>`;
      nums.forEach(n => {
        html += `<span class="mini-ball ${colorClass(n)}">${n}</span>`;
      });
      html += `<span class="sep">+</span>`;
      html += `<span class="mini-ball ${colorClass(bonus)}">${bonus}</span>`;
      row.innerHTML = html;
      wrapper.appendChild(row);
    }, i * 160);
  }
}

function clearMulti() {
  const prev = document.querySelector('.multi-results');
  if (prev) prev.remove();
}
