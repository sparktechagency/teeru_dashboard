"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ReusableFormProps = {
  onSubmit: (values: Record<string, any>) => void;
  children: ReactNode;
  defaultValues?: Record<string, any>;
  className?: string;
};

const ReusableForm = ({
  onSubmit,
  children,
  defaultValues,
  className,
}: ReusableFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Record<string, any>) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      onFinish={handleFinish}
      className={cn("space-y-1", className)}
    >
      {children}
    </Form>
  );
};

export default ReusableForm;
