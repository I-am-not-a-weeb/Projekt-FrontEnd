import React, { useContext, useState } from "react";




function RankingPage() {
    const theme = useContext(ThemeContext);

    const [accounts, setAccounts] = useState({});
    const [memes, setMemes] = useState({});
    const [comments, setComments] = useState({});


  return (
    <div className="flex">
      <div className="flex-1">

      </div>
      <div className="flex-1">

      </div>
      <div className="flex-1">

      </div>
    </div>
  );
}