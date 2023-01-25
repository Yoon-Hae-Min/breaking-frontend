export const USEINFINITEQUERY_OPTION = {
  SELECT: (data) => {
    return data.pages.reduce((acc, { result }) => [...result, ...acc], []);
  },
};
