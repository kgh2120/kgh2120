const fs = require("fs");
const dayjs = require("dayjs");
const Parser = require("rss-parser");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
const { log } = require("console");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

let text = `

## About Me 👋
**김규현 (Kim KyooHyun)**
- [Blog](https://dev-qhyun.tistory.com)
- [Email](kgh2120@gmail.com)




## Skills



| Category | Technologies|
|-----------|-------------|
| Backend | <img src="https://skillicons.dev/icons?i=java,spring" /> |
| Database | <img src="https://skillicons.dev/icons?i=mysql,redis" /> |
| Frontend | <img src="https://skillicons.dev/icons?i=javascript,typescript,react " /> |
| DevOps | <img src="https://skillicons.dev/icons?i=gitlab,docker,nginx" /> |


---

## Recent Activities


### ✍ Study

- [[Github](https://github.com/ssausand-sunny/system_design_interview_book_study)] 가상 면접 사례로 배우는 대규모 시스템 설계 기초 북 스터디(24.06.25 ~ 24.08.22)
- [[Github](https://github.com/SSARTEL-10th/EffectiveJava_bookstudy)] Effective Java 북 스터디(23.10.27 ~ 24.01.05)
- [[Github](https://github.com/SSARTEL-10th/JPTS_bookstudy)] 개발자가 반드시 알아야 할 자바 성능 튜닝 이야기 북 스터디(23.09.06 ~ 23.10.20)


### 🖥 Project

- [[Github](https://github.com/kgh2120/hybm)] 1인 가구의 냉장고 재고 관리 서비스 '마트.. 다녀오셨어요?' 백엔드 개발 (24.04.08 ~ 24.05.19)
- [[Github](https://github.com/kgh2120/mmm)] 직장 내 막내들을 위한 음식 선호도 기반 점심 메뉴 추천 서비스 '막내야 뭐 먹을래?' 백엔드 개발 (24.02.19 ~ 24.04.05)
- [[Github](https://github.com/kgh2120/goumunity-backend)] 지역 밀착 절약 정보 커뮤니티 '거뮤니티' 백엔드 개발 (24.01.03 ~ 24.02.16)

### 📙 Blog

`;

const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://dev-qhyun.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link, pubDate } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);

    const date = dayjs(pubDate).add(9, "hours").format("YY.MM.DD");
    text += `- <a href=${link}>${title}</a> (${date})</br>`;
    text += `\n`
  }
  text += `

### Stats

| Github Streak| Github Stats|
|:---:|:---:|
|<img src="https://streak-stats.demolab.com?user=kgh2120&theme=dark&hide_border=true&locale=ko&date_format=%5BY.%5Dn.j&mode=weekly" width=300 />|<img src="https://github-readme-stats.vercel.app/api?username=kgh2120&show_icons=true" width=300 />|
| **Most Language** | **Beakjoon** |
|<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=kgh2120&layout=compact" width=300 />|<img src="http://mazassumnida.wtf/api/generate_badge?boj=bzzamta" witdh=300 />

`


  // README.md 파일 작성
  fs.writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");

  console.log(text);
})();