import { Swipe, SwipeItem } from 'vant';

let vantComponents = [
    Swipe, 
    SwipeItem
]

export default function vantPlugins(app){
    vantComponents.forEach((item)=> {
        return app.use(item)
    })
}