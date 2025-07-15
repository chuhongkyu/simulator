# 🛣️ Autonomous Driving UI Simulator

[프로젝트 데모 보기](https://simulator-brown.vercel.app/)

React, Three.js, Storybook 등을 활용해 구축한 자율주행 시뮬레이터 UI 프로젝트입니다.  
실시간 3D 시각화, 지도 기반 경로 구성, 자율주행 흐름 UI 구성에 초점을 맞췄습니다.

---

## 📌 주요 기술 스택

- **React + TypeScript**: UI 구성 및 상태 관리
- **Three.js + @react-three/fiber**: 3D 차량, 건물, 지도 렌더링
- **Storybook**: 컴포넌트 단위 문서화 및 테스트
- **Zustand**: 전역 상태 관리
- **Overpass Turbo**: OpenStreetMap 기반 지리 데이터 수집

---

## 🌍 지도 및 경로 구성

- **지도 데이터**: Overpass Turbo에서 추출한 OpenStreetMap 데이터를 JSON으로 가공해 사용
- **경로 구조**: 위도/경도를 로컬 XY 좌표로 변환하여 3D 씬에 배치
- **건물 분리**: BufferGeometry를 분리하여 개별 건물로 처리  
  (예: `BufferGeometryUtils.mergeVertices`, `toNonIndexed()` 등 활용)

---

## 🚗 주요 기능

- 실시간 3D 차량 이동
- Waypoint 기반 경로 주행 시뮬레이션
- 건물, 도로, UI 오버레이 등 계층적 렌더링
- 미니맵, 상태창 등의 HUD UI

---

## 📚 Storybook

컴포넌트 단위로 문서화된 Storybook을 통해 UI 구성 요소를 독립적으로 확인할 수 있습니다.

```bash
npm run storybook
