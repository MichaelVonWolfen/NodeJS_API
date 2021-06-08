const fs = require("fs")
const { join } = require("path")
const chalk = require("chalk")
const get_Notes = function(){

}
const add_notes =(title, body)=>{
    const notes = load_Notes()
    // const duplicate = notes.filter(function(note){
    //     return note.title === title
    // })
    debugger
    const duplicate = notes.find((note) => note.title === title)
    if(!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note title added"))
    }else{
        console.log(chalk.yellow.inverse("Note title taken!"))
    }
}
const load_Notes = ()=>{
    try{
        const data_buff = fs.readFileSync("notes.json")
        const data_JSON = data_buff.toString()
        return JSON.parse(data_JSON)
    }catch(e){
        return []
    }
}
const remove_note = (title)=>{
    const notes = load_Notes()
    let notes_to_keep = notes.filter((note)=> title !== note.title)
    if(notes_to_keep.length !== notes.length)
        console.log(chalk.green.inverse(`Note "${title}" removed!`))
    else
        console.log(chalk.red.inverse(`Note ${title} does not exists!\n\nNothing was changed!`))
        saveNotes(notes_to_keep)
}
const saveNotes = (notes) =>{
    fs.writeFileSync("notes.JSON", JSON.stringify(notes));
};
const list_notes = ()=>{
    const notes = load_Notes()
    console.log(chalk.green("Your Notes:"))
    notes.forEach(note => {
        console.log(`${chalk.red('@')}\t${note.title}`)
    });
}
const read_note = (title)=>{
    const notes = load_Notes()
    const searched_note = notes.find((note) => note.title === title)

    if(searched_note){
        console.log(chalk.green(title))
        console.log(searched_note.body)
    }else{
        console.log(chalk.red.greenBG.inverse(`"${title}" was not found!`))
    }
}
module.exports = {
    getNotes: get_Notes, 
    addNotes: add_notes,
    remove:remove_note,
    listNotes:list_notes,
    read:read_note

}