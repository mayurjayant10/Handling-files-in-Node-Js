const fs = require('fs')
const filepath = "./tasks.json"

const loadtasks =()=>{
    try {
        const databuffer = fs.readFileSync(filepath)
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return[]
    }
}

const savetask=(tasks)=>{
    const dataJSON =JSON.stringify(tasks)
    fs.writeFileSync(filepath,dataJSON)

}    
   


const addtask =(task)=>{
    const tasks =loadtasks()
    tasks.push({task})
    savetask(tasks)
    console.log('task added',task)

}
const listtask =()=>{
    const tasks = loadtasks()
     tasks.forEach((task,index) => {
        console.log(`${index+1} : ${task.task}`)
    });

}

const removetask = (index) => {
  const tasks = loadtasks();

  if (isNaN(index) || index < 1 || index > tasks.length) {
    console.log("Please provide a valid task number");
    return;
  }

  const removed = tasks.splice(index -1 , 1);
  savetask(tasks);
  console.log("Removed task:", removed[0].task);
};

const command = process.argv[2]
const argument = process.argv[3]

if(command === 'add'){
    addtask(argument)
}else if(command==='list'){
  listtask()
}else if(command==='remove'){
    removetask(parseInt(argument))
}else{
    console.log('command not found ')
}
