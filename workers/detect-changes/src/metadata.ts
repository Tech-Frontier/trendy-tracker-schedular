export default [
  {
    "id": "daangn-backend",
    "company": "daangn",
    "jobCategory": "backend",
    "name": "당근 서버 개발자",
    "url": "https://about.daangn.com/jobs/software-engineer-backend",
    // NOTE: 공고 목록 dom
    "listSelector": "#layout > div > main > div:nth-of-type(3) > ul",
    // NOTE: 공고 목록 아이템 dom
    "itemSelector": "div > li",
    // NOTE: 해시값을 구하기 위한 dom
    "hashSelector": "#layout"
  },
  {
    "id": "daangn-frontend",
    "company": "daangn",
    "jobCategory": "frontend",
    "name": "당근 프론트엔드 개발자",
    "url": "https://about.daangn.com/jobs/software-engineer-frontend",
    // NOTE: 공고 목록 dom
    "listSelector": "#layout > div > main > div:nth-of-type(3) > ul",
    // NOTE: 공고 목록 아이템 dom
    "itemSelector": "div > li",
    // NOTE: 해시값을 구하기 위한 dom
    "hashSelector": "#layout"
  }
];
