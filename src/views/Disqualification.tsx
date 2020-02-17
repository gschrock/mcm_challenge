import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  loanResponse: { [key: string]: string | boolean } | null;
}

export const Disqualification: React.SFC<Props> = ({ loanResponse }) => {
  let history = useHistory();
  if (!loanResponse) history.push("/");
  return (
    <div
      className={"container"}
      dangerouslySetInnerHTML={{
        __html: `<strong>Does not qualify:</strong><br>${loanResponse &&
          loanResponse.message}<br><strong>Customer Support: 1-800-777-7777</strong>`
      }}
    />
  );
};
