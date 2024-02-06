import { atom, selector } from "recoil";
import axios from "axios";

// we need to make the async call within the atom
// the default value of an atom has to be synchronous orrr it can be a selector that is asynchronous !!
export const notifications = atom({
    key: "networkAtom",
    // we can use selector to make default value async
    default: selector({
        key: "networkSelector",
        // we can use get to make async calls
        get: async () => {
            const res = await axios.get("https://sum-server.100xdevs.com/notifications");
            return res.data;
        }
    
    })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})