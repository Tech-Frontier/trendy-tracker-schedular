const TODAY = new Date().getTime();
const START = new Date('2023-11-21').getTime();
const DAYS = (TODAY - START) / (1000*60*60*24);

export const MAX_PAGE = Math.min(
  100,
  Math.max(
    1,
    // NOTE: 하루에 페이지 하나씩 늘리기
    Math.floor(DAYS),
  )
);
