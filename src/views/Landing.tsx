import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import validator from "validator";

export default function Landing() {
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

  const handleSubmit = () => {
    const valid = isFormValid();
    console.log(values);

    console.log("Valid! ", valid);
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
    <>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
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
        <Form.Group as={Col} md="3" controlId="validationCustom02">
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
        <Form.Group as={Col} md="3" controlId="validationCustom03">
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
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Estimated Yearly Income</Form.Label>
          <Form.Control
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
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Estimated Credit Score</Form.Label>
          <Form.Control
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
      <Button onClick={() => handleSubmit()} type="submit">
        Submit form
      </Button>
    </>
  );
}
