let round = 0;

function getColorClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-10';
  if (num <= 30) return 'range-20';
  if (num <= 40) return 'range-30';
  return 'range-40';
}

function draw() {
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

  const ballsEl = document.getElementById('balls');
  const bonusSection = document.getElementById('bonusSection');
  const bonusBall = document.getElementById('bonusBall');

  ballsEl.innerHTML = '';
  bonusSection.classList.remove('show');

  nums.forEach((num, i) => {
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = `ball ${getColorClass(num)}`;
      ball.textContent = num;
      ball.style.animationDelay = '0s';
      ballsEl.appendChild(ball);
    }, i * 150);
  });

  setTimeout(() => {
    bonusBall.className = `ball bonus ${getColorClass(bonus)}`;
    bonusBall.textContent = bonus;
    bonusSection.classList.add('show');
  }, 6 * 150 + 200);

  setTimeout(() => addHistory(nums, bonus), 6 * 150 + 300);
}

function addHistory(nums, bonus) {
  round++;
  const list = document.getElementById('historyList');
  const li = document.createElement('li');

  let html = `<span class="round">#${round}</span>`;
  nums.forEach(n => {
    html += `<span class="mini-ball ${getColorClass(n)}">${n}</span>`;
  });
  html += `<span class="mini-bonus-label">+</span>`;
  html += `<span class="mini-ball ${getColorClass(bonus)}">${bonus}</span>`;

  li.innerHTML = html;
  list.insertBefore(li, list.firstChild);
}
