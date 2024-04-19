import getCurrentUser from "@/app/actions/getCurrentUser"
import { pusherServer } from "@/app/libs/pusher"
import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb"

interface IParams{
    conversationId?:string
}

export async function DELETE(
    request:Request,
    {params}:{params: IParams}
){
    try{
        const {conversationId} = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('No estas autorizado', {status:401})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users:true
            }
        })

        if(!existingConversation){
            return new NextResponse('Id invalido', {status:400})
        }
        
        const deleteConversation = await prisma.conversation.deleteMany({
            where:{
                id: conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        })

        existingConversation.users.forEach((user) =>{
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        return NextResponse.json(deleteConversation)

    }catch(error: any){
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse('Errorn Interno', {status:500})
    }
}