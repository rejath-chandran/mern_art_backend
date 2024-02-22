

export const connected_socket=[]

export  function Add(id){
 connected_socket.push(id)
 console.log(connected_socket)
}

export function Remove(id){

const index=connected_socket.indexOf(id)
if(index > -1){
connected_socket.splice(index,1)
}

}

export const notify_que=[]