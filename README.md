# 개선된 강의 리뷰 웹사이트

## 프로젝트 개요

이 프로젝트는 기존 학교의 강의 리뷰 시스템의 사용성을 개선하기 위해 만들어졌습니
다. 현재 시스템의 한계점(리스트 형식의 불편한 UI, PDF 형식의 리뷰, 필터링의 어려
움 등)을 해결하고, 사용자 친화적인 인터페이스를 제공하는 것이 목표입니다.

## 와이어 프레임

https://www.figma.com/proto/kbdvYvQwfErjummTOZDuLb/Course-Review?t=kc0S8Fj5fcfNCR4z-1

## 주요 기능

1. 컴퓨터공학과 교수진의 다음 학기 강의 정보 일회성 크롤링 및 저장
2. GPT API를 활용한 강의 리뷰 요약
3. 교수별 강의 목록 표시 (강의명, 코드, 리뷰 수)
4. 강의별 학기 단위 리뷰 요약 제공

## 기술 스택

- Frontend: React, TypeScript, MUI (library)
- Backend: Supabase
- 데이터 수집: Selenium, Beautiful Soup (일회성 크롤링에 사용)
- 자연어 처리: GPT API

## 작동 방식

1. Selenium과 Beautiful Soup을 사용하여 학교 강의 리뷰 웹사이트에서 데이터를 일
   회성으로 크롤링합니다.
2. 크롤링한 데이터를 GPT API를 통해 요약하고 저장합니다.
3. React와 TypeScript를 사용하여 사용자 인터페이스를 구현합니다.
4. 사용자는 저장된 데이터를 기반으로 교수별 강의 목록을 확인할 수 있으며, 각 강
   의를 선택하여 학기별 요약된 리뷰를 볼 수 있습니다.

## 데이터베이스 구조

<img width="920" alt="Screenshot 2024-08-12 at 9 41 57 AM" src="https://github.com/user-attachments/assets/d5757a87-c108-48c9-9066-d3fe5e79e144">

### 주요 테이블:

- courses: 강의 정보
- instructors: 교수 정보
- raw_course_reviews: 요약되지 않은 수업 후기 정보
- course_reviews: GPT로 요약된 수업 후기 정보
- instructor_reviews: 교수님이랑 후기를 매핑해주는 테이블

## 데이터 관리

- 데이터는 일회성으로 크롤링되어 저장됩니다.
- 정기적인 업데이트가 필요한 경우, 수동으로 크롤링 과정을 재실행해야 합니다.

## 리팩토링 중 생긴 문제 (해결 x, 문제 파악중)

- Search Input Component에서 교수님의 상태가 변경되면 해당 교수님의 페이지로 자
  동으로 이동하도록 설정했습니다. 그러나 교수님의 페이지에서 수업 후기를 보려고
  수업을 클릭하면, 수업 후기 페이지로 이동하려 하지만 교수님의 페이지가 다시 로
  드되면서교수님의 페이지가 새로고침됩니다.
- instructor 상태를 변경하는 것은 오직 Search Input Component에서만 일어납니다.
  그러나 상태를 업데이트하는 함수가 로그에 찍히지 않음에도 불구하고 상태 변경이
  계속 발생하고 있습니다.
- 교수님의 페이지에서 수업 후기를 보려면, 교수님의 페이지로 이동한 후 수동으로화
  면을 새로고침하고 나서 수업을 클릭하면 정상적으로 수업 후기 페이지로 이동할수
  있습니다.

## 향후 계획

- 실시간 요약 표시 개선: GPT API를 사용한 수업 후기 요약 시 실시간으로 결과를 표
  시하는 기능 구현 필요 (지금은 요약이 다 된 후 -- 콘솔창으로 확인하고 -- 화면을
  리프레쉬 해줘야 함)
- 로딩 기능 추가: 데이터 가져올때 로딩 표시 필요
- 사용자 경험(UX) 개선:
  - 고민중
- 성능 최적화: 데이터 로딩 및 렌더링 속도 개선
- (잠정 보류) 로그인/회원가입 기능: 현재 필요성이 낮아 보류 중이나, 추후 필요시
  구현 고려

## 설치 및 실행 방법

1. 프로젝트 클론

```
  git clone git@github.com:nbko/course-review.git
  cd course-review
```

2. 의존성 설치

```
   npm install
   npm install @supabase/supabase-js
   npm i jotai
   npm install @mui/material @emotion/react @emotion/styled
```

3. 개발 서버 실행

```
npm run dev
```

## 사진

### 홈화면

<img width="1106" alt="Screenshot 2024-08-10 at 5 43 27 PM" src="https://github.com/user-attachments/assets/74060a50-be9c-4140-bc3f-a454b52cc181">

### 수업 리스트

<img width="1131" alt="Screenshot 2024-08-10 at 5 35 08 PM" src="https://github.com/user-attachments/assets/0128f82c-c00c-4777-be91-00ec3f9aadd3">

### 수업 후기

<img width="1102" alt="Screenshot 2024-08-10 at 5 34 31 PM" src="https://github.com/user-attachments/assets/b981f8ef-826a-4371-a582-1bff87f86c5d">
