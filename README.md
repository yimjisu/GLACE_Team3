# GLACE CIC_Team3
## 실시간 좌석 예약 서비스 프로토타입 개발

### 세 단계로 나누어 구현
  **1. 예약 서비스 구현**
  
   * React를 사용한 클라이언트
   * 좌석 선택이 없는 좌석 예약 서비스
   * 공연 선택, 개인정보 입력, 예약 완료, 예약 확인하기 페이지로 구성
      
  **2. 좌석 배치도 구현**
  
   * json 데이터를 활용하여 좌석 배치도 그림
   * 클릭/터치를 통해 좌석 선택/해제
   * 드래그/패닝을 통해 배치도 이동 가능
    
  **3. 선점 로직 구현**
  
   * 선점이란 특정 좌석을 한 사용자가 선택 후 예약 확인 단계로 넘어갔을 때, 다른 사용자가 선점 시간이 끝날 때까지 선택할 수 없는 상태
   * Socket을 사용해 실시간으로 상태가 선점한 좌석이 발생했을 때, 다른 모든 사용자의 화면에 선점 상태로 표시되게 함
   * 선점 시간은 5분. 즉, 5분 내로 예약 완료가 안될 시 좌석은 비선점 상태가 되어 다른 사람이 선점할 수 있음

## 설치 및 실행
* 설치
```
npm install
```
* 실행
```
npm run dev
```
## 기능 설명
 공연 선택, 좌석 선택, 개인정보 입력, 예약완료로 예약 서비스 진행. 예약 확인 페이지 존재
 * **공연 선택**
     * 공연의 포스터, 제목, 장소, 기간을 보여줌
     * 포스터 클릭/터치 시 공연 날짜와 시간/좌석을 선택하는 화면으로 이동
     * 날짜 선택시 해당하는 공연 시간과 잔여좌석/전체좌석을 보여줌

* **좌석 선택**
     * 인원 수 선택하여 좌석 선택 가능
     * 이미 선점된 좌석에 X표시되어 선택 불가능

* **개인정보 입력**
     * 자신이 선택한 공연과 좌석 정보(날짜, 시간, 좌석)를 보여줌
     * 휴대폰 번호와 비밀번호, 비밀번호 확인을 통한 비회원 로그인 예약 시스템

* **예약 완료**
     * 자신이 예약한 공연과 좌석 정보를 보여줌
     * 하단의 '처음으로' 버튼을 클릭/터치 시 처음 화면으로 이동

### 부가 기능

* **예약 확인하기**
     * 휴대폰 번호와 비밀번호를 통해 예약 정보 확인 가능
     * 자신이 예약한 공연과 좌석 정보를 보여줌
     * 동일 휴대폰 번호와 비밀번호를 이용한 예약이 여러 개일시 좌우 버튼을 클릭/터치하여 확인 가능

* **상단 로고(GLACE)**
     * 클릭/터치 시 처음 화면으로 이동

아래 링크에 Front-end(React)와 Back-end(Node.js, Firebase) 설명 추가
#### [Front-end](https://github.com/yimjisu/GLACE_Team3/blob/main/app/README.md)
#### [Back-end](https://github.com/yimjisu/GLACE_Team3/blob/main/server/README.md)


## Contributing
[Issues page](https://github.com/yimjisu/GLACE_Team3/issues)를 통해 이슈 요청
