export default (url) => {
    const str = url.split("/");
    return parseInt(str[str.length - 1]);
  };