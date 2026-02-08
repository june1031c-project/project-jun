let round = 0;

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
  do {
    bonus = Math.floor(Math.random() * 45) + 1;
  } while (nums.includes(bonus));
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

  // 기존 multi-results 제거
  const prev = document.querySelector('.multi-results');
  if (prev) prev.remove();

  mainResult.style.display = '';
  ballsEl.innerHTML = '';
  bonusSection.classList.remove('show');

  nums.forEach((num, i) => {
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = `ball ${colorClass(num)}`;
      ball.textContent = num;
      ballsEl.appendChild(ball);
    }, i * 120);
  });

  setTimeout(() => {
    bonusBall.className = `ball bonus ${colorClass(bonus)}`;
    bonusBall.textContent = bonus;
    bonusSection.classList.add('show');
  }, 6 * 120 + 150);

  setTimeout(() => addHistory(nums, bonus), 6 * 120 + 200);
}

function drawMulti(count) {
  const mainResult = document.getElementById('mainResult');
  mainResult.style.display = 'none';

  let prev = document.querySelector('.multi-results');
  if (prev) prev.remove();

  const wrapper = document.createElement('div');
  wrapper.className = 'multi-results';
  mainResult.parentNode.insertBefore(wrapper, mainResult.nextSibling);

  for (let i = 0; i < count; i++) {
    const { nums, bonus } = generate();

    setTimeout(() => {
      const row = document.createElement('div');
      row.className = 'multi-row';
      row.style.animationDelay = `${i * 0.08}s`;

      let html = `<span class="row-label">${String.fromCharCode(65 + i)}</span>`;
      nums.forEach(n => {
        html += `<span class="mini-ball ${colorClass(n)}">${n}</span>`;
      });
      html += `<span class="sep">+</span>`;
      html += `<span class="mini-ball ${colorClass(bonus)}">${bonus}</span>`;
      row.innerHTML = html;
      wrapper.appendChild(row);

      addHistory(nums, bonus);
    }, i * 150);
  }
}

function addHistory(nums, bonus) {
  round++;
  const list = document.getElementById('historyList');
  const li = document.createElement('li');

  let html = `<span class="round">#${round}</span>`;
  nums.forEach(n => {
    html += `<span class="mini-ball ${colorClass(n)}">${n}</span>`;
  });
  html += `<span class="sep">+</span>`;
  html += `<span class="mini-ball ${colorClass(bonus)}">${bonus}</span>`;

  li.innerHTML = html;
  list.insertBefore(li, list.firstChild);
}
