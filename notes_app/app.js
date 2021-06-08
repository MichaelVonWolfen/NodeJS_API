const { command, string } = require('yargs');
const yargs = require('yargs');
const notes = require("./notes")
yargs.version('2.0.2')

yargs.command({
    command:"add",
    description:"Adds a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:String
        },
        body:{
            describe:"Note body",
            demandOption:true,
            type:String
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body)
    }
})
yargs.command({
    command:"rmv",
    description:"Removes a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption:true,
            type:String
        }
    },
    handler(argv){
        notes.remove(argv.title)
    }
})
yargs.command({
    command:"list",
    description:"Lists all notes",
    
    handler(argv){
        notes.listNotes()
    }
})
yargs.command({
    command:"read",
    description:"Finds a note and prints it's content",
    builder:{
        title:{
            describe:"Note to search for",
            demandOption:true,
            type:String
        },
    },
    handler(argv){
        notes.read(argv.title)
    }
})
yargs.parse()