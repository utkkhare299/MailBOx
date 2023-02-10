import { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [totalUnread, setTotalUnread] = useState(0);
  const [recievedMails, setRecievedMails] = useState([]);
  const [totalUnreadSent, setTotalUnreadSent] = useState(0);
  const [sentMails, setSentMails] = useState([]);
  useEffect(() => {
    getSentMails();
    getMails();
  }, []);

  const getMails = async () => {
    const userEmail = user?.email?.replace(/\.|@/g, "");
    const url = `https://expense-d1606-default-rtdb.firebaseio.com/${userEmail}/recieved-mails.json`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const mails = [];
      for (let key in data) {
        mails.push({
          id: key,
          content: data[key].content,
          sentBy: data[key].sentBy,
          read: data[key].read,
        });
      }
      let totalUnreadMessages = 0;
      mails.forEach((mail) => {
        if (!mail.read) totalUnreadMessages += 1;
      });
      setRecievedMails(mails);
      setTotalUnread(totalUnreadMessages);
    } catch (error) {
      alert(error.message);
    }
  };
  const getSentMails = async () => {
    const userEmail = user?.email?.replace(/\.|@/g, "");
    const url = `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent-mails.json`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const mails = [];
      for (let key in data) {
        mails.push({
          id: key,
          content: data[key].content,
          sendTo: data[key].sendTo,
          read: data[key].read,
        });
      }
      let totalUnreadMessages = 0;
      mails.forEach((mail) => {
        if (!mail.read) totalUnreadMessages += 1;
      });
      setTotalUnreadSent(totalUnreadMessages);
      setSentMails(mails);
    } catch (error) {
      alert(error.message);
    }
  };
  const deleteMail = async (id) => {
    const userEmail = user?.email?.replace(/\.|@/g, "");
    const url = `https://expense-d1606-default-rtdb.firebaseio.com/${userEmail}/recieved-mails/${id}.json`;

    const options = {
      method: "DELETE",
    };

    try {
      const res = await fetch(url, options);
      await res.json();
      const newMails = recievedMails.filter((mail) => mail.id !== id);
      setRecievedMails(newMails);
    } catch (err) {
      console.error(err.message);
    }
  };
  const changeReadStatus = async (mail, sent = false) => {
    const userEmail = user?.email?.replace(/\.|@/g, "");
    let url = `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/recieved-mails/${mail.id}.json`;

    if (sent) {
      url = `https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent-mails/${mail.id}.json`;
    }
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        read: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (!mail.read) {
        const res = await fetch(url, options);
        await res.json();
        setTotalUnreadSent((prev) => (prev > 0 ? prev - 1 : prev));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const loginHandler = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const authContext = {
    user,
    login: loginHandler,
    getMails,
    getSentMails,
    sentMails,
    deleteMail,
    totalUnread,
    totalUnreadSent,
    changeReadStatus,
    mails: recievedMails,
  };

  return (
    <AppContext.Provider value={authContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
