import { useState } from "react";
import NavBar from "../NavBar/NavBar.tsx";
import { Button, Space, Form, Input, Avatar, Layout, Upload } from "antd";
import style from "./styles.module.css";
import getRole from "../NavBar/getRole.ts";
import getUser from "../NavBar/getUser.ts";
import { useAppDispatch } from "../../redux/store/store.tsx";
import { updateGuide } from "../../redux/guide/guideThank.ts";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function PersonalAccount() {
    const role = getRole();
    const user = getUser();
    const dispatch = useAppDispatch();
    const { name, email, avatar_url, languages, rating, social_media_links, phone, bio } = user;

    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name,
        email,
        languages,
        rating,
        phone,
        social_media_links,
        bio,
    });
    const [fileList, setFileList] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpload = (info) => {
        setFileList(info.fileList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission
        const data = new FormData();

        // Append form data
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        // Append the files if there are any selected
        if (fileList.length > 0) {
            fileList.forEach(file => {
                data.append('files', file.originFileObj);
            });
        }

        try {
            if (role === 'user') {
                // Handle user submission if needed
            } else if (role === 'guide') {
                await dispatch(updateGuide({ ...formData, id: user.id }));
                // Send the data to your API or Redux store
                // For example:
                // await myApi.updateGuide(data);
            }
            setIsEditable(false);
        } catch (error) {
            console.error("Произошла ошибка при обновлении:", error);
        }
    };

    return (
        <Layout className={style.layout}>
            <NavBar />
            <Space className={style.profile}>
                <Form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.avatar}>
                        <Avatar
                            icon={<UserOutlined />}
                            size={80}
                            src={avatar_url}
                            className={style.avatarImage}
                        />
                        <Dragger
                            multiple
                            fileList={fileList}
                            onChange={handleUpload}
                            beforeUpload={() => false}  // Prevent automatic upload
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
                            <p className="ant-upload-hint">Поддерживаются любые файлы</p>
                        </Dragger>
                    </div>

                    <Form.Item label="Имя">
                        {isEditable ? (
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{formData.name}</span>
                        )}
                    </Form.Item>

                    <Form.Item label="Email">
                        {isEditable ? (
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                            />
                        ) : (
                            <span>{formData.email}</span>
                        )}
                    </Form.Item>

                    {role === "guide" && (
                        <>
                            <Form.Item label="Языки">
                                {isEditable ? (
                                    <Input
                                        name="languages"
                                        value={formData.languages}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{formData.languages}</span>
                                )}
                            </Form.Item>

                            <Form.Item label="Рейтинг">
                                {isEditable ? (
                                    <Input
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        type="number"
                                    />
                                ) : (
                                    <span>{formData.rating}</span>
                                )}
                            </Form.Item>

                            <Form.Item label="Телефон">
                                {isEditable ? (
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{formData.phone}</span>
                                )}
                            </Form.Item>

                            <Form.Item label="Соцсети">
                                {isEditable ? (
                                    <Input
                                        name="social_media_links"
                                        value={formData.social_media_links}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{formData.social_media_links}</span>
                                )}
                            </Form.Item>

                            <Form.Item label="Биография">
                                {isEditable ? (
                                    <Input
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{formData.bio}</span>
                                )}
                            </Form.Item>
                        </>
                    )}

                    {isEditable ? (
                        <Button type="submit" onClick={handleSubmit}>
                            Сохранить
                        </Button>
                    ) : (
                        <Button onClick={() => setIsEditable(true)}>
                            Редактировать
                        </Button>
                    )}
                </Form>
            </Space>
        </Layout>
    );
}

export default PersonalAccount;