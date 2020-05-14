# Magnae-note

[https://www.magnae-note.com/](https://www.magnae-note.com/)

화상회의를 진행하는 동안 음성 인식을 통해 회의록을 자동으로 작성해 주고,   
작성된 회의록을 선택하여 녹화된 회의 영상을 손쉽게 되돌려 볼 수 있도록 Time travel 기능을 제공하는 웹 애플리케이션입니다.

// gif 추가예정

회사에서 회의를 할 때 다양한 이슈들이 많은 사람들에 의해 오고 가는데, 기억하기 어려울뿐더러 기록하는 것에도 한계가 있음을 느낀 적이 많았습니다.
음성 메모로 녹음을 해본 적도 있지만 다시 들어봐야 하는 번거로움이 컸습니다.   
이런 불편을 해소해보고자 **음성인식으로 회의록을 대신 작성**해 주고, 음원 서비스의 구간 탐색 기능과 같이 자유자재로 영상을 돌려볼 수 있도록 **Time travel 기능**을 구현해보았습니다.

회의 영상과 회의록 파일은 보안 및 용량 문제로 사용자 로컬에 저장하며, 상세페이지에서 파일 첨부 후 Time travel 기능을 사용할 수 있습니다.   

=======
**데스크탑 애플리케이션(Electron)** 으로 이용 시 정해진 경로에서 파일이 관리되어, 사용자의 별도 파일 첨부 과정 없이 보다 간편하게 회의 내용을 활용할 수 있습니다.
>>>>>>> 2ff728f126507e613b90b4442b9e4dbf3091cead

## Period

- 2020.04.27. ~ 2020.05.08.

## Features

- Firebase 인증 SDK를 통한 Github 로그인
- JSON Web Token Authentication
- 비밀번호 인증으로 회의실 생성 및 참여
- WebRTC, Socket.io를 통한 화상 회의 및 녹화
- Watson Speech to Text를 통한 음성인식 후 회의록 작성
- 회의 영상 & 회의록 파일 로컬 다운로드
- 회의록 문단 선택으로 영상 Time travel(구간 탐색) 기능
- Electron 데스크탑 애플리케이션 제공

## Installation

### Client

```
$ git clone https://github.com/minnnji/magnae-note_client
$ cd magnae-note_client
$ yarn install (or npm install)
$ yarn start (or npm start)
```

### Server

```
$ git clone https://github.com/minnnji/magnae-note_server
$ cd magnae-note_server
$ yarn install (or npm install)
$ yarn start (or npm start)
```

## Skills

### FrontEnd

- 모던 자바스크립트 ES2015+
- React를 활용, 컴포넌트 베이스 UI 아키텍처 구현
- React Router를 활용한 routing
- Styled Components를 통한 리액트 컴포넌트 스타일링
- Redux를 활용한 Flux 아키텍처 기반 설계
- Electron, Electron-store를 통한 데스크탑 애플리케이션 구현
- Firebase Authentication
- WebRTC
- Socket.io
- Watson Speech to Text

### BackEnd

- 모던 자바스크립트 ES2015+
- V8 engine기반 Node.js
- Node.js 웹 애플리케이션 프레임워크 Express
- 토큰 기반 인증 시스템 JSON Web Token Authentication
- NoSQL 데이터베이스 MongoDB, Atlas
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose

## Deployment

- FrontEnd : Netlify로 배포, Electron-builder를 통한 설치용 exe파일 생성
- BackEnd : Amazon Web Services(AWS) Elastic Beanstalk 으로 배포
- Custom Domain

## ETC

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분
- Moqups를 활용한 Wireframe & UI Prototyping
- Lucidchart를 활용한 Schema design
- Notion To do를 이용한 Task 및 스케쥴 관리


## Challenges

- Socket.io와 WebRTC를 도와주는 simple-peer 라이브러리를 활용해 영상을 주고받는 부분을 구현하는 데 어려움이 있었습니다.   
문서를 참고하여 코드를 작성, 상대방의 영상 stream이 재생 가능한 상태값으로 들어오는 것을 로그로 확인했지만 실제 재생이 되지 않는 문제가 있었습니다. Socket으로 서로를 연결하는 부분과 영상을 주고 받는 부분을 좀 더 명확하게 끊어 처리하여 해결하였고, 라이브러리가 뒤에서 처리해주는 부분이 있어 에러를 찾아내기 어려웠던 것 같습니다. 짧은 개발 일정 상 라이브러리를 택했지만 라이브러리 없이 구현했다면 디버깅이 쉬웠을 것이라는 아쉬움과 함께, 라이브러리를 사용하더라도 전반적인 구조를 더 잘 파악하고 접근해야겠다는 교훈을 얻었습니다.
- React에서 불필요한 렌더링에 대해 고려해야 할 필요성을 체감하였습니다. 회의 영상을 녹화하면서 음성인식으로 텍스트를 계속 state로 업데이트 하였는데, 중간중간 리렌더링되며 영상 stream과 회의록 state가 초기화되어 회의 종료 후 저장 시점에 저장이 불가한 이슈가 있었습니다. useCallback, useMemo, React.memo를 사용하여 해결하였는데, SPA로 개발할 경우 고려해야 할 부분들에 대해 더 고민해보는 기회가 되었습니다.
- 로컬 시스템 자원에 자유롭게 접근하기 위하여 Electron으로 데스크탑 애플리케이션 개발을 도전하였습니다. 구글/Firebase 등으로 간편 로그인 구현 시, 최근 정책 상 Electron이 지원 브라우저에서 제외되어 개발 초기와 배포 후 로그인 처리에 계속적인 이슈가 있었습니다. 또한 Electron-builder로 패키징하여 배포하는 과정 또한 쉽지 않은 과정이었습니다. 일정이 촉박하여 자세히 보지 못한 부분들이 있어 추가로 더 살펴볼 예정이며, 여러 시행착오들이 있었지만 새로운 기술을 접하여 적용해보는 것이 흥미로웠습니다.

## Things to do

- Electron 로그인 관련 오류 해결
- 회의실, 회의록 삭제 기능
- 회의 재시작 기능
- 버그 수정
- Unit test, End To End(E2E) Test
- Code Refactoring
