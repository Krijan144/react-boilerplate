import { selfId } from "@/constant";
import moment from "moment";

export const shortName = (name: string) => {
  const words = name?.split(" ");
  const firstLetters = words?.map((word) => word[0]?.toUpperCase());
  return firstLetters?.join("");
};

export const addSpacesBetweenLetters = (input: string) => {
  const words = input?.split(" "); // Split the string into words
  const spacedWords = words?.map((word) => word.split("").join(" ")); // Split each word into letters and join with spaces
  return spacedWords.join(" "); // Join the spaced words with spaces
};

export const removeDuplicates = (arr: any, key: string) => {
  const uniqueArray = [];
  const seen = new Set();

  for (const item of arr) {
    const itemKey = item[key];

    if (!seen.has(itemKey)) {
      seen.add(itemKey);
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
};

export const sortArray = (a: any = []) => {
  const arr = a.length && [...a];
  // Use the Array.prototype.sort() method to sort the array based on the date key
  arr.length &&
    arr?.sort(
      (
        a: { MostRecentMessage: { created_at: any } },
        b: { MostRecentMessage: { created_at: any } }
      ) => {
        const dateA = a.MostRecentMessage.created_at;
        const dateB = b.MostRecentMessage.created_at;

        // Compare the dates
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      }
    );

  return arr;
};
export const sortMessage = (a: any = []) => {
  const arr = [...a];
  // Use the Array.prototype.sort() method to sort the array based on the date key
  arr.length &&
    arr?.sort((a, b) => {
      const dateA = a?.CreatedAt;
      const dateB = b?.CreatedAt;

      // Compare the dates
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    });

  return arr;
};

export const isObjectInArray = (
  array: any[],
  idToFind: any,
  createdAtToFind: any
) => {
  return array.some(
    (obj) => obj.id === idToFind && obj.createdAt === createdAtToFind
  );
};
export const updateMessage = (obj: {
  attachment: any;
  conversation_id: any;
  created_at: any;
  message_body: any;
  message_type: any;
  seen_by: any;
  sender_id: any;
}) => {
  const newObj = {
    Attachment: obj.attachment,
    ConversationID: obj.conversation_id,
    CreatedAt: obj.created_at,
    MessageBody: obj.message_body,
    MessageType: obj.message_type,
    SeenBy: obj.seen_by,
    SenderID: obj.sender_id,
  };
  return newObj;
};
export const updateArrayWithObject = (arr: any, obj: any) => {
  const index = arr.findIndex(
    (item: any) => item.ID === obj.most_recent_message.conversation_id
  );
  if (index !== -1) {
    const updatedArray = arr.map((item: any) => {
      if (item.ID === obj.most_recent_message.conversation_id) {
        // Create a new object with the desired modification
        return {
          CreatedAt: obj.created_at,
          ID: obj.most_recent_message.conversation_id,
          Initial: obj.initial,
          LastUpdated: obj.last_updated,
          MostRecentMessage: obj.most_recent_message,
          UIDChatPartner: obj.uid_chat_partner,
          UIDOwner: obj.uid_owner,
          UserInfo: obj.user_info,
          Users: obj.users,
        };
      }
      return item; // Return the original item if no modification is needed
    });

    return updatedArray;
  } else {
    const newObj = {
      CreatedAt: obj.created_at,
      ID: obj.most_recent_message.conversation_id,
      Initial: obj.initial,
      LastUpdated: obj.last_updated,
      MostRecentMessage: obj.most_recent_message,
      UIDChatPartner: obj.uid_chat_partner,
      UIDOwner: obj.uid_owner,
      UserInfo: obj.user_info,
      Users: obj.users,
    };
    return [...arr, newObj];
  }
};
export const compareDates = ({ currentDate, socketDate }: any) => {
  const Date1 = new Date(currentDate);
  const Date2 = new Date(socketDate);
  return Date1 < Date2;
};
export const filterAndMapByKey = (arr: any[], key: string, arr2: any[]) => {
  // Filter items that have the specified key and don't match sender_id and created_at in arr2
  const filteredItems = arr.filter(
    (item: any) =>
      item.hasOwnProperty(key) &&
      !arr2.some(
        (item2: any) =>
          item.created_at === item2.CreatedAt &&
          item.sender_id === item2.SenderID
      )
  );

  // Map the values associated with the specified key
  const mappedValues = filteredItems.map((item: any) => item[key]);

  return mappedValues;
};
export const getFullNameById = (id: string, data: any) => {
  // Check if the object has the provided id as a key
  if (data.hasOwnProperty(id)) {
    // Return the full_name property of the matching object
    return data[id].full_name;
  } else {
    // Return a message indicating that the id was not found
    return "ID not found";
  }
};

export const formatTime = (date: string | undefined) => {
  const inputDate = moment(date);
  const now = moment();

  if (now.diff(inputDate, "hours") < 24) {
    // If the date is less than 24 hours from the current time, format as HH:mm
    return inputDate.format("HH:mm");
  } else {
    // If the date is more than 24 hours from the current time, format as "ll"
    if (inputDate.year() === now.year()) {
      return inputDate.format("MMM D");
    }
    return inputDate.format("ll");
  }
};
export const reverseName = (name: string): string => {
  const nameParts = (name && name.split(" ")) || [];
  if (nameParts.length && nameParts.length === 2) {
    return `${nameParts[1]} ${nameParts[0]}`;
  } else {
    // Handle the case where the input is not in the expected format
    return name;
  }
};
export const selfFilter = (object: any) => {
  return Object.entries(object)?.filter((obj) => obj[0] !== selfId);
};

export const getFullNameFromObjects = (
  obj1: Record<string, boolean>,
  obj2: Record<string, { full_name: string }>
): string => {
  const result: string[] = [];

  for (const key1 in obj1) {
    if (obj2[key1] && obj2[key1].full_name) {
      result.push(obj2[key1].full_name);
    }
  }

  return result.join(", ");
};
