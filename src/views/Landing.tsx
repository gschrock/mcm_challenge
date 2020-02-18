import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import validator from "validator";
import mockFetch from "../mockFetch";
import { marketingIpsum } from "./marketingIpsum";

interface Props {
  loanResponse: { [key: string]: string | boolean } | null;
  handleSetLoanResponse: (data: { [key: string]: string | boolean }) => void;
}

export const Landing: React.SFC<Props> = ({
  loanResponse,
  handleSetLoanResponse
}) => {
  let history = useHistory();

  const [values, setValues] = useState<{
    [key: string]: { value: string; valid: boolean };
  }>({
    price: {
      value: "",
      valid: true
    },
    make: {
      value: "",
      valid: true
    },
    model: {
      value: "",
      valid: true
    },
    income: {
      value: "",
      valid: true
    },
    score: {
      value: "",
      valid: true
    }
  });

  /**
   * If user attempts to navigate back to layout view,
   * redirect them accordingly back to where they originally
   * came from.
   */
  if (loanResponse && !loanResponse.qualified) history.push("/denied");
  if (loanResponse && loanResponse.qualified) history.push("/success");

  const handleSubmit = () => {
    const valid = isFormValid();

    const mockedFetch = async () => {
      await mockFetch({
        price: values.price.value,
        income: values.income.value,
        score: values.score.value
      })
        .then((response: any) => {
          /**
           * If this were a real fetch call we'd want
           * more graceful error handling than this, but
           * this is just to mock the 400 we want in this
           * exercise.
           *
           * E.g. we could redirect to a "something went
           * wrong" page, display a message to user, etc.
           */
          if (response.status === 400) {
            console.error(new Error("Bad Request"));
          }
          return response.json();
        })
        .then(data => {
          /**
           * Depending on success or denial we redirect
           * to corresponding view.
           */
          if (data.qualified) {
            handleSetLoanResponse(data);
            history.push("/success");
          }
          if (!data.qualifed && data.message) {
            handleSetLoanResponse(data);
            history.push("/denied");
          }
        });
    };

    if (valid) {
      mockedFetch();
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: {
        value,
        valid: values[name].valid
      }
    });
  };

  const isFormValid = () => {
    setValues({
      price: {
        ...values.price,
        valid: validator.isCurrency(values.price.value)
      },
      make: {
        ...values.make,
        valid: validator.isAlphanumeric(values.make.value)
      },
      model: {
        ...values.model,
        valid: validator.isAlphanumeric(values.model.value)
      },
      income: {
        ...values.income,
        valid: validator.isCurrency(values.income.value)
      },
      score: {
        ...values.score,
        valid: validator.isInt(values.score.value, { min: 300, max: 850 })
      }
    });

    return (
      validator.isCurrency(values.price.value) &&
      validator.isAlphanumeric(values.make.value) &&
      validator.isAlphanumeric(values.model.value) &&
      validator.isCurrency(values.income.value) &&
      validator.isInt(values.score.value, { min: 300, max: 850 })
    );
  };

  return (
    <div className={"container"}>
      <div className={"marketing-ipsum ipsum-top"}>{marketingIpsum}</div>
      <Form.Row>
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>Auto Purchase Price</Form.Label>
          <Form.Control
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleInputChange(e);
            }}
            isInvalid={!values.price.valid}
            name={"price"}
            type="text"
            placeholder="Auto Purchase Price"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid auto purchase price.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Auto Make</Form.Label>
          <Form.Control
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleInputChange(e);
            }}
            isInvalid={!values.make.valid}
            name={"make"}
            type="text"
            placeholder="Auto Make"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an auto make.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom03">
          <Form.Label>Auto Model</Form.Label>
          <Form.Control
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleInputChange(e);
            }}
            isInvalid={!values.model.valid}
            name={"model"}
            type="text"
            placeholder="Auto Model"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an auto model.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="validationCustom04">
          <Form.Label>Estimated Yearly Income</Form.Label>
          <Form.Control
            className={"custom-control"}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleInputChange(e);
            }}
            isInvalid={!values.income.valid}
            name={"income"}
            type="text"
            placeholder="Estimated Yearly Income"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an estimated yearly income.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          style={{ paddingRight: "265px" }}
          controlId="validationCustom05"
        >
          <Form.Label>Estimated Credit Score</Form.Label>
          <Form.Control
            className={"custom-control"}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              handleInputChange(e);
            }}
            isInvalid={!values.score.valid}
            name={"score"}
            type="text"
            placeholder="Estimated Credit Score"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide an estimated credit score.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <div className={"button-container"}>
        <Button
          className={"button"}
          onClick={() => handleSubmit()}
          type="submit"
        >
          Submit form
        </Button>
      </div>
      <div className={"marketing-ipsum ipsum-bottom"}>{marketingIpsum}</div>
    </div>
  );
};
