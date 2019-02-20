import { useObservable } from 'mobx-react-lite';

const useRegStore = () => useObservable({
  user: '',
  pwd: '',
  repeatPwd: '',
  type: ''
});

export default useRegStore;