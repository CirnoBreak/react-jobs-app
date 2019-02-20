import { observable } from 'mobx';

const LogStore = observable({
  user: '',
  pwd: ''
})

export default LogStore