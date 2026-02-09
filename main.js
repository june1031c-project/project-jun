document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // 테마 설정 불러오기
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // 테마 변경 이벤트
    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // 번호 생성 이벤트
    generateBtn.addEventListener('click', generateLottoNumbers);

    function generateLottoNumbers() {
        // 버튼 로딩 효과
        const originalBtnText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 생성 중...';
        generateBtn.disabled = true;

        // 약간의 딜레이 후 결과 표시 (긴장감 조성)
        setTimeout(() => {
            const numbers = [];
            while (numbers.length < 6) {
                const num = Math.floor(Math.random() * 45) + 1;
                if (!numbers.includes(num)) {
                    numbers.push(num);
                }
            }
            
            // 오름차순 정렬
            numbers.sort((a, b) => a - b);
            
            displayNumbers(numbers);
            
            generateBtn.innerHTML = originalBtnText;
            generateBtn.disabled = false;
        }, 500);
    }

    function displayNumbers(numbers) {
        resultDiv.innerHTML = ''; // 기존 내용 지우기
        
        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = num;
            
            // 번호별 색상 클래스 부여 (동행복권 기준)
            if (num <= 10) ball.classList.add('yellow');
            else if (num <= 20) ball.classList.add('blue');
            else if (num <= 30) ball.classList.add('red');
            else if (num <= 40) ball.classList.add('gray');
            else ball.classList.add('green');
            
            // 순차적 애니메이션을 위한 딜레이 설정
            ball.style.animationDelay = `${index * 0.1}s`;
            
            resultDiv.appendChild(ball);
        });
    }
});