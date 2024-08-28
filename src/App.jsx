
// import {Box,Container,VStack,Button,HStack,Input} from "@chakra-ui/react"
// import Messages from "./components/Messages"
// import { useState ,useEffect,useRef} from "react"
// import {getAuth,GoogleAuthProvider,onAuthStateChanged,signInWithPopup,signOut} from "firebase/auth"
// import { app } from "./firebase"
// import {getFirestore,addDoc,collection, Firestore, serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"
// const auth=getAuth(app)
// const loginHandler=()=>{
//   const Provider=new GoogleAuthProvider();
//   signInWithPopup(auth,Provider);
// }
// const signoutHandle=()=> signOut(auth)
// const db=getFirestore(app)
// function App() {
 
//   const [user,setuser]=useState(false);
//   const [textmsg, settextmsg] = useState('')
//   const [messg, setMessg] = useState([]);
//   const divforscroll=useRef(null);
//   useEffect(() => {
//     const q = query(collection(db, "Messages"), orderBy("createdAt", "des"));

//     const unsubscribe = onAuthStateChanged(auth, (data) => {      
//       setuser(data);
//     });

//     const unsubscribeForMessage = onSnapshot(collection(db,"Messages"), (snap) => {
//       setMessg(
//         snap.docs.map((item) => {
//           const id = item.id;
//           return { id, ...item.data() };
//         })
//       );
//     });
//     return ()=>{
//       unsubscribe();
//       unsubscribeForMessage();
//     }
//   },[]);
  
//   const sumbmitHandler=async(e)=>{
//      e.preventDefault();
//      try {
//       settextmsg("");   
//       await addDoc(collection(db,"Messages"),{
//         text:textmsg,
//         uid:user.uid,
//         uri:user.photoURL,
//         createAt:serverTimestamp(),
//       });

//      } catch (error) {
//       alert(error)
//      }
     
//      divforscroll.current.scrollIntoView({ behavior: "smooth" });
//   }
//   console.log(messg);
//   return (
//     <>
//       <Box bg={"red.50"}>
//        {
//         user ? (
//           <Container h={"100vh"} bg={"blue.50"} >
//           <VStack h={"full"} paddingY={"4"}>
//               <Button onClick={signoutHandle} colorScheme="red"  w={"full"}>LOG OUT
//            </Button>
//             <VStack h={"full"} w="full" overflowY={"auto"} css={{"&::-webkit-scrollbar":{
//               display:"none",
//             }}}>
//             {/* <Messages  text={"sample message"} user="me" uri={user.photoURL}/>   */}
//             {
//               messg.map((item)=>
//                (
//                  <Messages key={item.id} user={item.uid==user.uid?"me": "other"} text={item.text} uri={item.uri} />
//                )
//               )
//             }
//              <div ref={divforscroll}></div>
//               </VStack>
//           <form onSubmit={sumbmitHandler} className=" w-full" >
//           <HStack >
//            <Input w={"full"} placeholder={"Enter a Message...."} value={textmsg} onChange={(e)=>settextmsg(e.target.value)}/>
//              <Button bg={"purple"} textColor={"white"} type="submit">SEND</Button>
//            </HStack>
//           </form>
//           </VStack>
//           </Container>
//         ):(<VStack justifyContent={"center"} h="100vh">
//           <Button onClick={loginHandler} bg={"pink"}>Login via Google</Button>
//         </VStack>)
//        }
//       </Box>
//     </>
//   )
// }

// export default App


import React, { useState, useEffect, useRef } from "react";
import { Box, Container, VStack, Button, HStack, Input } from "@chakra-ui/react";
import Messages from "./components/Messages";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const Provider = new GoogleAuthProvider();
  signInWithPopup(auth, Provider);
};

const signoutHandle = () => signOut(auth);

function App() {
  const [user, setUser] = useState(null);
  const [textmsg, setTextmsg] = useState('');
  const [messg, setMessg] = useState([]);
  const divforscroll = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessg(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Messages"), {
        text: textmsg,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setTextmsg('');
      divforscroll.current.scrollIntoView({ behavior: "smooth" });
      // divforscroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"blue.50"}>
          <VStack h={"full"} paddingY={"4"}>
            <Button onClick={signoutHandle} colorScheme="red" w={"full"}>
              LOG OUT
            </Button>
            <VStack h={"full"} w="full" overflowY={"auto"} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
              {messg.map((item) => (
                <Messages key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} uri={item.uri} />
              ))}
              <div ref={divforscroll}></div>
            </VStack>
            <form onSubmit={sumbmitHandler} className=" w-full">
              <HStack>
                <Input w={"full"} placeholder={"Enter a Message...."} value={textmsg} onChange={(e) => setTextmsg(e.target.value)} />
                <Button bg={"purple"} textColor={"white"} type="submit">
                  SEND
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack justifyContent={"center"} h="100vh">
          <Button onClick={loginHandler} bg={"pink"}>
            Login via Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
