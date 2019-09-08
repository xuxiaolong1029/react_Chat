// function hello(name1,name2){
//     console.log(name1,name2)
// }

// let arr=['imooc','woniu']
// hello(...arr);
// const name='imooc';
// const obj={
//     name,
//     [name]:'hello',
//     hello(){
//         console.log('sss')
//     }
// }
// console.log(obj)
class myapp{
    constructor(obj){
        this.name=obj.name;
    }
    sayHello(){
        console.log(`hello  ${this.name}`);
    }
}
let obj={
    name:'imooc',
    age:18
}
const app = new myapp(obj);
app.sayHello()
