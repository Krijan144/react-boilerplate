import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { styled } from "@/theme/stitches";
import { useGetConversation } from "@/store/conversation";
import {
  connect,
  conversationSeen,
  messageSeen,
  sendMessage,
  socket,
  watchConversation,
} from "@/store/socket";
import { setValue } from "@/store/input/slice";
import { setSubmitValue } from "@/store/submit/slice";
import {
  compareDates,
  formatTime,
  updateArrayWithObject,
  sortArray,
} from "@/utils";
import { useGetMessage } from "@/store/message";
import { Input } from "@/ui/component/input";
import SkeletonLoader from "@/ui/component/skeleton";
import { updateConversationData } from "@/store/conversation/slice";
import { setActive } from "@/store/active/slice";
import UserBox from "@/ui/container/userBox";
import ChatContainer from "@/ui/container/chatContainer";
import { selfId } from "@/constant";

// Define a type for the message data
interface MessageData {
  ID: string;
  UserInfo: object;
  MostRecentMessage: {
    message_body: string | undefined;
    created_at: string | undefined;
  };
}
interface newFunctionType {
  newData: any;
  setNewData: React.Dispatch<any>;
  data: any;
  setRecentMsg: React.Dispatch<any>;
  active: string;
}

const Messenger = () => {
  const dispatch = useDispatch();

  const [newData, setNewData] = useState<any>([]);
  const [recentMsg, setRecentMsg] = useState<any>();
  const [searchData, setSearchData] = useState<MessageData[]>([]);
  const [date, setDate] = useState<string>();
  const [users, setUsers] = useState<object[]>([]);
  useGetConversation({
    id: selfId,
  });
  // Selectors
  const inputValue = useSelector((state: any) => state.inputValue);
  const submitValue = useSelector((state: any) => state.submitValue);
  const conversationData = useSelector(
    (state: any) => state.conversations.data
  );
  const convLoading = useSelector(
    (state: any) => state.conversations.isLoading
  );
  const active = useSelector((state: any) => state.active.active);
  const prev = useSelector((state: any) => state.active.prev);
  const { messageData, messageFetching } = useGetMessage(active);

  // Send a message when submitValue.text changes
  useEffect(() => {
    if (submitValue?.text) {
      try {
        sendMessage(inputValue?.text, active, prev);
        dispatch(setValue({ inputName: "text", inputValue: "" }));
        dispatch(setSubmitValue({ submitName: "text", submitValue: false }));
      } catch (e) {
        console.error(e, "socket error");
      }
    }
  }, [submitValue]);

  // Search for conversations when inputValue.search changes
  useEffect(() => {
    if (inputValue.search) {
      searchFn(conversationData, setSearchData, inputValue);
    }
  }, [inputValue.search]);

  // Update conversation data when recentMsg changes
  useEffect(() => {
    if (recentMsg) {
      const update = updateArrayWithObject(conversationData, recentMsg);
      console.log({ update });
      dispatch(updateConversationData(update));
    }
  }, [recentMsg]);

  // Set the active conversation if no active conversation is selected
  useEffect(() => {
    if (conversationData && conversationData.length && !active) {
      dispatch(setActive(sortArray(conversationData)[0]?.ID));
    }
  }, [conversationData]);
  // Watch the active conversation and fetch users
  useEffect(() => {
    if (active) {
      watchConversation(active, prev);
      const selectedConversation = conversationData.find(
        (item: any) => item.ID === active
      );
      setUsers(selectedConversation?.UserInfo || []);
    }
  }, [active]);

  // Set the current date when the component mounts
  useEffect(() => {
    connect();
    const currentDate = new Date();
    const isoTimestamp = currentDate.toISOString();
    setDate(isoTimestamp);
  }, []);

  // Handle incoming WebSocket messages
  socket.onmessage = (e) => {
    try {
      const data = JSON.parse(e?.data);
      console.log({ data });
      if (
        compareDates({
          currentDate: date,
          socketDate: data?.most_recent_message
            ? data?.most_recent_message?.created_at
            : data?.created_at,
        })
      ) {
        handleNewMessage({
          newData,
          setNewData,
          data,
          setRecentMsg,
          active,
        });
      }
    } catch (err) {
      console.error(err, "error");
    }
  };
  useEffect(() => {
    if (messageData && messageData.messages.length) {
      messageData.messages.map((item: any) => {
        if (
          item.SenderID !== selfId &&
          !Object.keys(item.SeenBy).some((key) => key === selfId)
        ) {
          messageSeen(item.ConversationID, item.ID);
        }
      });
    }
  }, [messageData]);
  return (
    <>
      <StyledBox>
        <StyledUserBox>
          <Input
            placeholder="Search by Name"
            name="search"
            value={inputValue?.search}
          />
          {convLoading ? (
            <>
              <StyledSkeleton>
                <SkeletonLoader borderRadius="50%" height="45px" width="45px" />
                <SkeletonLoader
                  borderRadius="10px"
                  height="3rem"
                  width="300px"
                />
              </StyledSkeleton>
              <StyledSkeleton>
                <SkeletonLoader borderRadius="50%" height="45px" width="45px" />
                <SkeletonLoader
                  borderRadius="10px"
                  height="3rem"
                  width="300px"
                />
              </StyledSkeleton>
            </>
          ) : (
            <>
              {searchData.length
                ? sortArray(searchData).map(
                    (item: MessageData, index: number) => {
                      const activeVariant =
                        item.ID === active ? "active" : "normal";

                      return (
                        <React.Fragment key={index}>
                          <UserBox
                            lastMessage={item.MostRecentMessage?.message_body}
                            date={moment(
                              item.MostRecentMessage?.created_at
                            ).format("ll")}
                            users={item.UserInfo}
                            id={item.ID}
                            search={inputValue?.search}
                            variant={activeVariant}
                            onClick={(id: string) => {
                              dispatch(setActive(id));
                              conversationSeen(id);
                            }}
                          />
                        </React.Fragment>
                      );
                    }
                  )
                : sortArray(conversationData).map(
                    (item: MessageData, index: number) => {
                      const activeVariant =
                        item.ID === active ? "active" : "normal";

                      return (
                        <React.Fragment key={index}>
                          <UserBox
                            lastMessage={item.MostRecentMessage?.message_body}
                            date={formatTime(
                              item.MostRecentMessage?.created_at
                            )}
                            users={item.UserInfo}
                            id={item.ID}
                            variant={activeVariant}
                            onClick={(id: string) => {
                              dispatch(setActive(id));
                              conversationSeen(id);
                            }}
                          />
                        </React.Fragment>
                      );
                    }
                  )}
            </>
          )}
        </StyledUserBox>

        <ChatContainer
          users={users}
          value={inputValue?.text}
          newData={newData}
          messageData={messageData}
          conversationId={active}
          loading={messageFetching}
        />
      </StyledBox>
    </>
  );
};

export default Messenger;

const StyledBox = styled("div", {
  display: "flex",
  position: "relative",
  marginTop: "4.5rem",
});
const StyledUserBox = styled("div", {
  height: "calc(100vh - 5rem)",
  width: 500,
  overflowY: "auto",
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  "&::-webkit-scrollbar": {
    width: 5,
    height: 5,
    backgroundColor: "#f5f5f5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 10,
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(209,210,211,0.45)",
  },
});
const StyledSkeleton = styled("div", {
  display: "flex",
  gap: 10,
  padding: "1rem",
});

const handleNewMessage = ({
  newData,
  setNewData,
  data,
  setRecentMsg,
  active,
}: newFunctionType) => {
  switch (data.hasOwnProperty("most_recent_message")) {
    case true:
      setRecentMsg(data);
      if (data.most_recent_message.conversation_id !== active) {
        newData.length
          ? setNewData((prevState: any) => [
              ...prevState,
              {
                [data.most_recent_message.conversation_id]:
                  data.most_recent_message,
              },
            ])
          : setNewData([
              {
                [data.most_recent_message.conversation_id]:
                  data.most_recent_message,
              },
            ]);
      }

      break;
    case false:
      newData.length
        ? setNewData((prevState: any) => [
            ...prevState,
            {
              [data.conversation_id]: data,
            },
          ])
        : setNewData([
            {
              [data.conversation_id]: data,
            },
          ]);

      break;

    default:
      break;
  }
};

function searchFn(conversationData: any, setSearchData: any, inputValue: any) {
  const filteredData = conversationData.filter(
    (item: { UserInfo: { [s: string]: any } | ArrayLike<any> }) => {
      // Assuming each item has a UserInfo object with the necessary properties
      const userInfoValues = Object.values(item.UserInfo);
      for (const userInfo of userInfoValues) {
        if (
          userInfo?.full_name
            .toLowerCase()
            .includes(inputValue.search.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    }
  );
  setSearchData(filteredData);
}
