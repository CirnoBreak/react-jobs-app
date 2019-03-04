interface PathInterface {
  type: string;
  avatar?: string;
}

const getRedirectPath = ({ type, avatar }: PathInterface): string => {
  let url: string = (type === 'applicant') ? '/applicant' : '/recruiter';
  if (!avatar) {
    url += 'info';
  }
  return url;
};

export default getRedirectPath;
