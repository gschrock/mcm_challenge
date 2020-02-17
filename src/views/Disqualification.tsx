import React from "react";

interface Props {
  loanResponse: { [key: string]: string | boolean } | null;
}

export const Disqualification: React.SFC<Props> = ({ loanResponse }) => {
  return <div>{loanResponse && loanResponse.message}</div>;
};
