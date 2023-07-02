import { Button, Cascader, Form, Input, Select, message } from "antd";
import { getResidences } from "../api/residences";
import { registerUser } from "../api/user";
import { useEffect, useState } from "react";
import sha256 from "crypto-js/sha256";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegisterForm() {
  const [residences, setResidences] = useState([]);
  useEffect(() => {
    async function fetchResidenceData() {
      setResidences(await getResidences());
    }
    fetchResidenceData();
  }, []);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      await registerUser(
        `+${values.prefix} ${values.phone}`,
        sha256(values.password).toString(),
        values.residence
      );
      message.success("Successfully Registered!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("System Error!");
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: [],
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          { pattern: /^1[0-9]{10}$/, message: "incorrect phone number!" },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            pattern: /^[a-zA-Z0-9_]{6,20}$/,
            message:
              "password must contain only a-z, A-Z, 0-9 and undersore(_)!",
          },
          {
            min: 6,
            max: 20,
            message: "password must have a length between 6 and 20!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
