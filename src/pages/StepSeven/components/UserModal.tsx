import React,{useEffect} from 'react'
import { Modal, Button,Form ,Input} from 'antd';

export const UserModal = (props)=>{
    const [form] = Form.useForm();
    const {visible,handleClose,record,onFinish} = props
    useEffect(() => {
        form.setFieldsValue(record)
    },[visible])

    const onOk = ()=>{
        form.submit()
    }
    const onFinishFailed = (error)=>{
        console.log(error)
    }
    return <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={handleClose}
        forceRender
    >
        <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="name"
                name="name"
                key='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="email"
                key='email'
                name="email"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="createTime"
                key='createTime'
                name="create_time"
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
} 