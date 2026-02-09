# 프리미엄 로또 번호 생성기 (Premium Lotto Generator)

이 프로젝트는 구글 애드센스 승인을 목표로 최적화된 로또 번호 생성기 웹사이트입니다.

## ✨ 주요 기능
- **알고리즘 기반 번호 생성:** 중복 없는 1~45 사이의 난수 6개 생성
- **애드센스 친화적 구조:** 풍부한 텍스트 콘텐츠와 SEO 태그 적용
- **다크 모드 지원:** 사용자 눈 보호를 위한 테마 전환 기능
- **반응형 디자인:** PC, 태블릿, 모바일 완벽 지원
- **자동 배포:** GitHub Actions를 통한 GitHub Pages 자동 배포

## 🚀 설치 및 배포 방법

### 1. 설정 수정
`index.html` 파일을 열어 다음 부분들을 본인의 정보로 수정해주세요.

- **AdSense ID:** `ca-pub-XXXXXXXXXXXXXXXX` 부분을 본인의 게시자 ID로 변경
- **광고 슬롯 ID:** `data-ad-slot="XXXXXXXXXX"` 부분을 생성한 광고 단위 ID로 변경
- **Disqus:** `s.src = 'https://lotto-gen-demo.disqus.com/embed.js'` 부분을 본인의 Shortname 주소로 변경

### 2. GitHub 업로드 및 배포
이 프로젝트는 GitHub Actions가 설정되어 있어, 코드를 올리기만 하면 자동으로 배포됩니다.

1. GitHub에서 새 리포지토리(Repository) 생성 (Public으로 설정)
2. 터미널에서 다음 명령어 입력:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [https://github.com/본인아이디/리포지토리이름.git](https://github.com/본인아이디/리포지토리이름.git)
   git push -u origin main
   ```
3. GitHub 리포지토리의 Settings > Pages 메뉴로 이동
4. Source는 Deploy from a branch 선택 (이미 되어있을 수 있음)
5. Actions 탭에서 배포 진행 상황 확인 (초록색 체크 표시가 뜨면 완료)

⚠️ 애드센스 승인 팁
사이트 배포 후 구글 서치 콘솔(Google Search Console)에 사이트를 등록하세요.

단순히 번호만 생성하는 것보다, 블로그 등을 연결하여 유입을 늘리면 승인 확률이 더 높아집니다.
