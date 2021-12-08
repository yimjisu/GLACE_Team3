# Node.js
* Installation

  [Node.js](https://nodejs.org/en/)
  
 * Check version
  
  ```
  node -v
  ```
  
* References

  [Express](http://expressjs.com/)






# Firebase
* Installation
```
npm install firebase
```
* References

  [Firebase Google Document](https://firebase.google.com/docs)
  
# API Structure

**세 가지 정보(공연, 좌석, 예약)을 관리함.**

## 1. 공연 정보
### GET shows
  공연 선택 화면에 필요한 정보 가져옴
  * Output : 모든 공연 정보 (제목, 장소, 기간, 런타임, 포스터 이미지, 전체 좌석 개수)

### GET show/:name
  공연 선택 후 해당 공연의 날짜, 좌석 정보 가져옴
  * Output : 선택한 공연의 공연 날짜와 시간 및 예약된 좌석 개수

## 2. 좌석 정보
### GET seatInfo
  선택한 공연 정보에 대한 좌석 배치도를 가져옴
  * Input : 선택한 공연 정보 (제목, 날짜 및 시간)
  * Output : 특정 공연의 좌석 배치도 및 현재 선점된 좌석

### POST seat/:seatID
  선택한 좌석이 선택가능한지 여부 판단
  * Input : 선택한 공연 정보, 좌석 및 해당 좌석을 선점 / 취소 / 예약하고자 하는지
  * Output : 해당 좌석이 선점되었는지 아닌지

## 3. 예약 정보
### POST reservation
  사용자가 예약한 정보를 DB에 저장
  * Input : 공연 정보, 사용자 개인정보 (전화번호, 비밀번호), 선택한 좌석
  * Result : 예약 정보를 Firestore에 추가

### POST /user/reservation
  사용자의 개인정보를 통해 예약 정보 출력
  * Input : 핸드폰 번호, 비밀번호
  * Output : 사용자가 예약한 모든 공연 정보

각 Input, Output Format은 [위키 문서](https://github.com/yimjisu/GLACE_Team3/wiki/API-structure) 참고
