# 👨‍👩‍👧‍👦 아이코(ICO)

<img src="./image/main.jpg" width="500" height="400">

- SSAFY 8th PJT **Team D103**​ 🌞
- 프로젝트 기간 : `2023.04.10` ~ `2023.05.19`
- 구성원 : 강교철, 김동주, 변윤경, 사공지은, 서재건, 오민준  
- 팀 노션 : <a href="" target="_blank">👉 아이코(ICO) Notion 👈</a>

<br>

# 📌 ​Contents

[:one: Introduction](#one-introduction)<br>
[:two:​ Tech Stack](#two-tech-stack)<br>
[:three:​ System Architecture](#three-system-architecture)<br>
[:four:​ ERD](#four-erd)<br>
[:five:​ Package Structure](#five-package-structure)<br>
[:six:​ API Document](#six-api-document)<br>
[:seven:​ Contributor](#seven-contributor)<br>


<br>

## ​:one: Introduction
> 한 줄 소개?

### 💻 기능 영상 소개

~


<br>

## ​:two:​ Tech Stack

| Tech         | Stack                                  |
| ------------ | -------------------------------------- |
| **Language** | Java, TypeScript                       |
| **Back-end**  | SpringBoot, JWT |
| **Front-end** | React.js, tailwind, Recoil                  |
| **Database** | MySQL, MongoDB, S3                                |
| **Server**   | AWS EC2, Nginx                         |
| **DevOps**   | Git, Docker, Jenkins                            |


<details>
<summary>Back-end Tech 상세 보기</summary>
<div markdown="1">

  <br>

```
- Java: 11
- SpringBoot: 2.7.11
- MySQL: 8.0.29
- MongoDB: 5.0.17
- Docker: 23.0.4
- Docker-compose: 1.29.2
- Jenkins: 2.387.2
- Nginx: 1.18.0
```
</div>
</details>


<br>

## :three:​ System Architecture

![img](./image/system-architecture.png)

<br>

## :four:​ ERD

![img](./image/erd.png)

<br>

## :five: Package Structure

<details>
<summary>Front-end Package Structure</summary>
<div markdown="1">

```
예시
📂FRONTEND
│  └─📂src
│       └─📂api
│       └─📂assets
│            └─📂audio
│            └─📂css
│            └─📂js
│            └─📂components
│                 └─📂main
│                 └─📂storyCreate
│                 └─📂storyResult
│                 └─📂user
│            └─📂pages
│            └─📂routes
│            └─📂types
```

</div>
</details>

<details>
<summary>Back-end Package Structure</summary>
<div markdown="1">

```
📦Back-end
 ┣ 📂api-module
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂ico
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂api
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂bank
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂certification
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂coupon
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂immigration
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂job
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂nation
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂resume
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂rule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂stock
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂studentProduct
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tax
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂teacherProduct
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂transaction
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂treasuryHistory
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂bank
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂certification
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂coupon
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂immigration
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂job
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂nation
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂resume
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂rule
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂stock
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂student
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂tax
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂teacher
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂transaction
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂treasury
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜S3UploadService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂sse
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ApiModuleApplication.java
 ┃ ┃ ┃ ┗ 📂resources
 ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂ico
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂api
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ApiModuleApplicationTests.java
 ┃ ┗ 📜Dockerfile
 ┣ 📂batch-module
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂ico
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂batch
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂job
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂scheduler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BatchModuleApplication.java
 ┃ ┃ ┃ ┗ 📂resources
 ┃ ┃ ┗ 📂test
 ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂ico
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂batch
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BatchModuleApplicationTests.java
 ┃ ┗ 📜Dockerfile
 ┣ 📂core-module
 ┃ ┗ 📂src
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┗ 📂ico
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂core
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂code
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂repository
 ┣ 📜build.gradle
 ┣ 📜docker-compose.yml
 ```

</div>
</details>

<br>

## :six: API Document

:point_right: [API Document]()

<br>

## :seven:​ Contributor

```
👉 팀원 소개
```

<table class="tg">
<tbody>
    <tr>
        <td>강교철</td>
        <td><a href="https://github.com/gyocheol">@gyocheol</a></td>
    </tr>
    <tr>
        <td>김동주</td>
        <td><a href="https://github.com/jook1356">@jook1356</a></td>
    </tr>
    <tr>
        <td>변윤경</td>
        <td><a href="https://github.com/forever4410">@forever4410</a></td>
    </tr>
    <tr>
        <td>사공지은</td>
        <td><a href="https://github.com/sagongjieun">@sagongjieun</a></td>
    </tr>
    <tr>
        <td>서재건</td>
        <td><a href="https://github.com/RUNGOAT">@RUNGOAT</a></td>
    </tr>
    <tr>
        <td>오민준</td>
        <td><a href="https://github.com/gosuminjun">@gosuminjun</a></td>
    </tr>
</tbody>
</table>
