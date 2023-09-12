interface PropsT {
  perPage: number;
  currentPage: number;
  data?: Array<any>;
}

const usePagination = ({
  perPage,
  currentPage,
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
}: PropsT) => {
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  return currentPosts;
};

export default usePagination;
