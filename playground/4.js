const add = (a, b, callbkack) =>{
    setTimeout(()=>{
        let sum = a + b
        callbkack(sum)
    },2000)
}
add(4, 3, (sum)=>{
    console.log(sum)
})