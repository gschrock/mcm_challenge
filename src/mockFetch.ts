import validator from "validator";

const disqualifyIpsum =
  "Worf, It's better than music. It's jazz. Commander William Riker of the Starship Enterprise. I'll be sure to note that in my log. Maybe if we felt any human loss as keenly as we feel one of those close to us, human history would be far less bloody. Fear is the true enemy, the only enemy. But the probability of making a six is no greater than that of rolling a seven. The game's not big enough unless it scares you a little. We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. You're going to be an interesting companion, Mr. Data. What? We're not at all alike! Some days you get the bear, and some days the bear gets you. Your head is not an artifact! I'd like to think that I haven't changed those things, sir. I am your worst nightmare! And blowing into maximum warp speed, you appeared for an instant to be in two places at once. I'll alert the crew. You bet I'm agitated! I may be surrounded by insanity, but I am not insane. This should be interesting. Shields up! Rrrrred alert!";

export default function mockFetch(requestValues: { [key: string]: string }) {
  return new Promise(resolve => {
    /**
     * Making up some results based on requirements
     * of challenge here.
     */
    // Disqualify if auto purchase price is greater than 1/5th of income
    if (
      (parseInt(validator.blacklist(requestValues.price, "$")) >
        parseInt(validator.blacklist(requestValues.income, "$")) * 0.2 ||
        parseInt(requestValues.score) < 600) &&
      parseInt(validator.blacklist(requestValues.price, "$")) < 1000000
    ) {
      const disqualifyBlob = new Blob(
        [
          JSON.stringify(
            { qualified: false, message: disqualifyIpsum },
            null,
            2
          )
        ],
        { type: "application/json" }
      );
      const init = { status: 200, statusText: "Success" };
      const mockResponse: Response = new Response(disqualifyBlob, init);

      setTimeout(() => {
        resolve(mockResponse);
      }, 500);
    }
    // Send 400 if auto purchase price is above 1M
    else if (
      parseInt(validator.blacklist(requestValues.price, "$")) > 1000000
    ) {
      const badRequestBlob = new Blob(
        [JSON.stringify({ value: "Bad Request" }, null, 2)],
        { type: "application/json" }
      );
      const init = { status: 400, statusText: "Bad Request" };
      const mockResponse: Response = new Response(badRequestBlob, init);

      setTimeout(() => {
        resolve(mockResponse);
      }, 500);
    }
    // Otherwise send positive qualification flag.
    else {
      const qualifyBlob = new Blob(
        [JSON.stringify({ qualified: true }, null, 2)],
        {
          type: "application/json"
        }
      );
      const init = { status: 200, statusText: "Success" };
      const mockResponse: Response = new Response(qualifyBlob, init);

      setTimeout(() => {
        resolve(mockResponse);
      }, 500);
    }
  });
}
