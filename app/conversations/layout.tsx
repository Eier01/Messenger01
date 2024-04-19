import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from '../actions/getConversations';
import getUsers from "../actions/getUsers";

export default async function UsersLayout({
    children
}:{children: React.ReactNode}) {

    const conversations = await getConversations()
    const users = await getUsers()
    
    console.log("conersacion layout");
    return ( 
        // @ts-expect-error server Component       
        <Sidebar>
            <div className="h-full">
                <ConversationList
                users={users}
                    initialItems={conversations}
                />                
                {children}
            </div>
        </Sidebar>
        
    )
}