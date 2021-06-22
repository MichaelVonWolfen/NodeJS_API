const fs = require("fs")
// const book ={
//     title:"Ego is the enemy",
//     author:"Jason Manwell"
// }
// const book_json = JSON.stringify(book)
// fs.writeFileSync('book_data.json', book_json)

const data_buffer = fs.readFileSync("book_data.json");

const data = JSON.parse(data_buffer.toString())
data.title = "Nothing is good!"
data.page_number= 23
console.log(data)
fs.writeFileSync("data.json", JSON.stringify(data))