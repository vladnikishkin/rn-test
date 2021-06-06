
import { makeAutoObservable } from 'mobx'

class Store {

    data = []
    prevData = []
    err = false
    loading = true

    constructor(){
        makeAutoObservable(this)
    }

    initData(value: any){
        this.data = value
    }
    udpateData(value: any){
        this.prevData = this.data
        this.data = value
    }
    hundlerErr(value: boolean){
        this.err = value
    }
    hundlerLoading(value: boolean){
        this.loading = value
    }

}

export default new Store()