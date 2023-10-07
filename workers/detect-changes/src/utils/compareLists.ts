export function compareLists(prevList: string[], currentList: string[]) {
  // prevList에 없는 요소를 찾는다.
  const addedList = currentList.filter((item) => !prevList.includes(item));

  // currentList에 없는 요소를 찾는다.
  const removedList = prevList.filter((item) => !currentList.includes(item));

  // prevList와 currentList 둘 다 존재하는 요소를 찾는다.
  const persistentList = currentList.filter((item) => prevList.includes(item));

  return {
    addedList: addedList.slice(0, 2),
    removedList,
    persistentList,
  };
}
