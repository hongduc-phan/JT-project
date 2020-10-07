import queryString from 'query-string';

const parseQueryString = (params: any) => {
  const condition: any = {};

  Object.keys(params).forEach((key) => {
    const value = params[key];
    condition[key] = value;
  });

  const parsedQueryString = queryString.stringify(condition);

  return parsedQueryString ? `?${parsedQueryString}` : '';
};

export default parseQueryString;
