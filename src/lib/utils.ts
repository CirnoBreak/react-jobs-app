const getRedirectPath = ({ type, avatar }): String => {
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
};

export default getRedirectPath;
