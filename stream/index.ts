import axios from "axios"
import { interval, Observable } from "rxjs"

export const stream$ = new Observable(observer => {
    const sub = interval(5000).subscribe(() => {
      axios.get('https://poloniex.com/public?command=returnTicker')
        .then(({ data }) => {
          const ArrKeys = Object.keys(data)
          let temp: any = []
          ArrKeys.map((item) => {
            temp.push({
              id: data[item].id,
              name: item,
              last: data[item].last,
              highestBid: data[item].highestBid,
              percentChange: data[item].percentChange,
            })
          })
          observer.next(temp)
          console.log('update')
        }).catch((e) => observer.error(e))
    })
    return function unsubscribe(){
      console.log('stop')
      sub.unsubscribe()
    }
  })