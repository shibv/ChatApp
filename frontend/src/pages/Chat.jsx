import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {allUsersRoute, host} from '../utils/ApiRoutes'
import {Link, useNavigate} from 'react-router-dom'
import { Contacts } from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat]= useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {

    const handleFun = async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }
      else{
           // setIsLoaded(true);
            setcurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
            setIsLoaded(true)
      }
    }
    handleFun();
  
   
  }, [])

  useEffect(() => {
    const handleChangeUser = () => {
      if(currentUser){
        socket.current =  io(host)
        socket.current.emit("add-user", currentUser._id);
      }
    }
    handleChangeUser();
  }, [currentUser])



  useEffect( () => {


    const handleSetavatar = async()=>{
      if(currentUser){
        if( currentUser.isAvatarImageSet){
          
         const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
         setContacts(data.data);
         
        }
        else{
         navigate("/setAvtar");
        }
   }
    }

    handleSetavatar();

     
  }, [currentUser])

const handleChatChange = (chat) => {
  setCurrentChat(chat);

}
 


  return (
    <Container>
      <div className="container">
           <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}  />

           {
           isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
                    <ChatContainer currentChat={currentChat} currentUser = {currentUser} socket={socket} />
            )
           }
          
      </div>

      
    </Container>
  )
}

export default Chat


const Container =  styled.div`

height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1rem;
background-color: #131324;
padding: 2rem 2rem;

.container{
  
  height: 85vh;
  width: 85vw;
  background-color: #00000076; 
  display: grid;
  grid-template-columns: 30% 70%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}


`;
