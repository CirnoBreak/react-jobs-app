import { observable, action } from 'mobx';

const RegStore = observable({
  user: '',
  pwd: '',
  repeatPwd: '',
  type: 'genius'
})

export default RegStore