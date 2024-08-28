import React from 'react'
import {Text,Avatar,HStack} from "@chakra-ui/react"
function Messages({text,user="other",uri}) {
  return (
    <>
    <HStack  bg={"gray.300"} alignSelf={user=="me"? "flex-end" : "flex-start"} borderRadius={"base"}  paddingY={"2"} paddingX={user=="me" ? "4" :"2"} >
       {
        user=="other"&&<Avatar src='uri'/>
       }
        <Text>{text}</Text>
        {
            user=="me"&& <Avatar src={uri}/> 
        }
    </HStack>
    </>
  )
}

export default Messages