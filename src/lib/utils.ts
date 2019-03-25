interface PathInterface {
  type: string;
  avatar?: string;
}

export const getRedirectPath = ({ type, avatar }: PathInterface): string => {
  let url: string = (type === 'applicant') ? '/applicant' : '/recruiter';
  if (!avatar) {
    url += 'info';
  }
  return url;
};

export const getChatId = (userId, targetId) => {
  return [userId, targetId].sort().join('_');
};