// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weather_form = document.querySelector('form')
weather_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const search = document.querySelector('input')
    const message_out = document.querySelector('#message-1')
    console.log("testing")
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(search.value)}`).then((response)=>{
        // console.log(response.text())
        response.json().then((data) =>{
            message_out.textContent = JSON.stringify(data);
        })
    })
})