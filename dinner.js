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

// ── Menu Data ──
const menus = [
  { category: '한식', name: '김치찌개', emoji: '🍲' },
  { category: '한식', name: '된장찌개', emoji: '🍲' },
  { category: '한식', name: '불고기', emoji: '🥩' },
  { category: '한식', name: '비빔밥', emoji: '🍚' },
  { category: '한식', name: '삼겹살', emoji: '🥓' },
  { category: '한식', name: '제육볶음', emoji: '🍖' },
  { category: '한식', name: '닭갈비', emoji: '🍗' },
  { category: '한식', name: '갈비찜', emoji: '🍖' },
  { category: '한식', name: '순두부찌개', emoji: '🍲' },
  { category: '한식', name: '김치볶음밥', emoji: '🍳' },
  { category: '한식', name: '잔치국수', emoji: '🍜' },
  { category: '한식', name: '칼국수', emoji: '🍜' },
  { category: '한식', name: '떡볶이', emoji: '🌶️' },
  { category: '한식', name: '순대국', emoji: '🍲' },
  { category: '한식', name: '감자탕', emoji: '🍲' },
  { category: '한식', name: '부대찌개', emoji: '🍲' },
  { category: '한식', name: '쌈밥', emoji: '🥬' },
  { category: '중식', name: '짜장면', emoji: '🍝' },
  { category: '중식', name: '짬뽕', emoji: '🍜' },
  { category: '중식', name: '탕수육', emoji: '🍖' },
  { category: '중식', name: '마파두부', emoji: '🫕' },
  { category: '중식', name: '볶음밥', emoji: '🍚' },
  { category: '중식', name: '양장피', emoji: '🥗' },
  { category: '일식', name: '초밥', emoji: '🍣' },
  { category: '일식', name: '라멘', emoji: '🍜' },
  { category: '일식', name: '돈카츠', emoji: '🍛' },
  { category: '일식', name: '우동', emoji: '🍜' },
  { category: '일식', name: '카레', emoji: '🍛' },
  { category: '일식', name: '규동', emoji: '🍚' },
  { category: '일식', name: '오코노미야키', emoji: '🥞' },
  { category: '양식', name: '파스타', emoji: '🍝' },
  { category: '양식', name: '피자', emoji: '🍕' },
  { category: '양식', name: '햄버거', emoji: '🍔' },
  { category: '양식', name: '스테이크', emoji: '🥩' },
  { category: '양식', name: '리조또', emoji: '🍚' },
  { category: '양식', name: '샐러드', emoji: '🥗' },
  { category: '양식', name: '치킨', emoji: '🍗' },
  { category: '분식', name: '라볶이', emoji: '🌶️' },
  { category: '분식', name: '김밥', emoji: '🍙' },
  { category: '분식', name: '튀김', emoji: '🍤' },
  { category: '분식', name: '오므라이스', emoji: '🍳' },
  { category: '아시안', name: '쌀국수', emoji: '🍜' },
  { category: '아시안', name: '팟타이', emoji: '🍜' },
  { category: '아시안', name: '똠양꿍', emoji: '🍲' },
  { category: '아시안', name: '나시고렝', emoji: '🍚' },
];

function pickRandom(exclude) {
  const filtered = exclude
    ? menus.filter(m => !exclude.includes(m.name))
    : menus;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// ── Recommend Single ──
function recommend() {
  clearMulti();
  const menu = pickRandom();
  const card = document.getElementById('menuCard');
  const placeholder = document.getElementById('placeholder');

  placeholder.style.display = 'none';
  card.classList.remove('hidden');
  card.classList.remove('pop');
  void card.offsetWidth;
  card.classList.add('pop');

  document.getElementById('menuEmoji').textContent = menu.emoji;
  document.getElementById('menuCategory').textContent = menu.category;
  document.getElementById('menuName').textContent = menu.name;
}

// ── Recommend 3 ──
function recommend3() {
  const card = document.getElementById('menuCard');
  const placeholder = document.getElementById('placeholder');
  placeholder.style.display = 'none';
  card.classList.add('hidden');
  clearMulti();

  const wrapper = document.createElement('div');
  wrapper.className = 'multi-menu-results';
  document.getElementById('multiMenu').appendChild(wrapper);

  const picked = [];
  for (let i = 0; i < 3; i++) {
    const menu = pickRandom(picked);
    picked.push(menu.name);

    setTimeout(() => {
      const row = document.createElement('div');
      row.className = 'menu-row';
      row.style.animationDelay = `${i * 0.08}s`;
      row.innerHTML = `
        <span class="menu-row-emoji">${menu.emoji}</span>
        <div class="menu-row-info">
          <span class="menu-row-category">${menu.category}</span>
          <span class="menu-row-name">${menu.name}</span>
        </div>
      `;
      wrapper.appendChild(row);
    }, i * 200);
  }
}

function clearMulti() {
  const prev = document.querySelector('.multi-menu-results');
  if (prev) prev.remove();
}
