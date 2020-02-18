import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  loanResponse: { [key: string]: string | boolean } | null;
}

export const Disqualification: React.SFC<Props> = ({ loanResponse }) => {
  let history = useHistory();
  /**
   * If user attempts to navigate here without loan
   * response data redirect them back to landing route.
   */
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
