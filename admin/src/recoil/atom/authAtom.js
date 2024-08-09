import {atom} from 'recoil'

const authState = atom({
    key: 'authState',
    default: ''
})

export default authState;