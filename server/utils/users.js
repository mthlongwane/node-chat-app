[{
    id: 'xyz',
    name: 'Andrew',
    room: 'The Office Fans'
}]

//add user
//removeUser(id)
//getUser(id)
//getUserList(room)
/* Example
class Person {

    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    getUserDescription(){
        return `${this.name} is ${this.age} year(s) old. `
    }
}

var me  = new Person("lizo", 22);
var description = me.getUserDescription();
console.log(description);*/
class Users {

    constructor(){
        this.users =[];
    }

    addUser(id, name, room){
        var newUser = {id, name, room};
        this.users.push(newUser);
        return newUser;
    }

    removeUser(id){
       var user = this.getUser(id) ;

        if(user){
            this.users = this.users.filter((user)=> user.id !==  id);
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id) [0] ;
    }
    getUserList(room){
        //filter returns array based on function query
        var users = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = users.map( (user) => user.name );

        return namesArray;
    }

}

module.exports ={Users};