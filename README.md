# VerseSeed · 한 줄 씨앗

API 키 없이 브라우저에서 작동하는 한국어 N행시 초안 제작기입니다. 사전·문장 조합 방식이며 생성형 AI가 아닙니다. 입력의 의미를 깊게 이해하지 않으며 초안은 직접 검토·수정해야 합니다.

## 실행

Node.js 22 이상에서 `npm.cmd run dev`를 실행하고 http://127.0.0.1:4178 을 엽니다. 외부 의존성 설치는 필요 없습니다. 검사는 `npm.cmd test`입니다. `public/` 전체가 실행에 필요한 정적 파일 묶음입니다. HTML 파일 더블클릭 대신 HTTP 서버를 사용하세요.

## 기능

- 완성된 한글 2~12글자, 공백 제외, NFC 정규화
- 길이 3단계·분위기 3종·후보 1/3/5/10개
- 각 행 편집, 첫 글자 이탈 알림, 후보별·전체 복사, UTF-8 텍스트 저장
- 모바일·PC 반응형, 키보드·폼 레이블·상태 안내
- 가이드·FAQ·소개·GitHub 문의·데이터 사용 안내

입력 및 결과를 서버로 전송하거나 영구 저장하지 않습니다. 새로고침하면 없어집니다. Google 광고 스크립트와 Cloudflare 호스팅의 접속 데이터 처리는 별도입니다.

## Cloudflare Pages

- 저장소: https://github.com/HG0395/verse-seed
- 프로덕션 브랜치: `main`
- Framework preset: None
- 빌드 명령: 비움 (필요할 경우 `exit 0`)
- 빌드 출력 디렉터리: `public`
- 루트 디렉터리: 저장소 루트
- GitHub 연동의 자동 프로덕션 배포 활성화

이미 완성된 HTML을 커밋하므로 빌드 없이 배포합니다. `create-pages.mjs`는 설명 페이지의 편집용 생성기이며 실행 시 동일한 설명 페이지를 다시 생성합니다. 설명 수정은 해당 생성기에 반영하고 `node create-pages.mjs`를 실행하세요. 생성 엔진은 `public/engine.js`, UI는 `public/app.js`입니다.

## 광고 운영

요청받은 AdSense 스크립트·확인 메타 태그를 콘텐츠 페이지 head에 삽입하고 루트 ads.txt에 게시자 정보를 기록했습니다. 404 페이지에는 광고를 넣지 않습니다. 승인이나 수익을 보장하지 않으며, AdSense 사이트 등록·심사 요청·지역별 CMP 설정은 게시자 계정에서 관리해야 합니다. 별도의 광고 슬롯 ID가 없으므로 수동 광고 슬롯을 임의 생성하지 않았습니다.

검토 기준: https://adsense-ko.googleblog.com/2012/09/2.html 및 https://adsense.googleblog.com/2012/04/tips-for-creating-high-quality-sites.html . 실제 기능 우선, 별도 주제의 유용한 작성 가이드, 중복 페이지 제한, 명확한 탐색과 문의, 과장 없는 생성 한계·데이터 안내를 적용했습니다.
