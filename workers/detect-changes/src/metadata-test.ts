export default [
  {
    "id": "baemin-backend",
    "company": "woowahan",
    "jobCategory": "backend",
    "name": "배민 서버 개발자",
    "url": "https://career.woowahan.com/?jobCodes=BA007001&category=jobGroupCodes%3ABA005001#recruit-list",
    // NOTE: 공고 목록 dom
    "listSelector": "#PCAppMain > div.content > section > div > div > div.recruit-list > ul",
    "waitSelector": "#PCAppMain > div.content > section > div > div > div.recruit-list > ul",
    // NOTE: 공고 목록 아이템 dom
    "itemSelector": "li",
    // NOTE: 해시값을 구하기 위한 dom
    "hashSelector": ".recruit-detail",
  },
  {
    "id": "baemin-frontend",
    "company": "woowahan",
    "jobCategory": "frontend",
    "name": "배민 프론트엔드 개발자",
    "url": "https://career.woowahan.com/?jobCodes=BA007002&category=jobGroupCodes%3ABA005001#recruit-list",
    // NOTE: 공고 목록 dom
    "listSelector": "#PCAppMain > div.content > section > div > div > div.recruit-list > ul",
    "waitSelector": "#PCAppMain > div.content > section > div > div > div.recruit-list > ul",
    // NOTE: 공고 목록 아이템 dom
    "itemSelector": "li",
    // NOTE: 해시값을 구하기 위한 dom
    "hashSelector": ".recruit-detail",
  },
];
