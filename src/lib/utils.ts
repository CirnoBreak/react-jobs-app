const getRedirectPath = ({ type, avatar }): String => {
  let url: String = (type === 'applicant') ? '/applicant' : '/recruiter';
  if (!avatar) {
    url += 'info';
  }
  return url;
};

export default getRedirectPath;
