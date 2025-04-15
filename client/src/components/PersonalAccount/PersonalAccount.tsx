import { useState } from "react";
import NavBar from "../NavBar/NavBar.tsx";
import {Button, Form, Input, Avatar, Layout, Upload, UploadFile, Space} from "antd";
import style from "./styles.module.css";
import { useAppDispatch } from "../../redux/store/store.tsx";
import { updateGuide } from "../../redux/guide/guideThunk.ts";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import getRole from "../../selectors/getRole.ts";
import getUser from "../../selectors/getUser.ts";
import {UploadChangeParam} from "antd/lib/upload";
import {User} from "../../types/types.ts";
import {updateUser} from "../../redux/user/userThunk.ts";

const { Dragger } = Upload;

function PersonalAccount() {
    const role = getRole();
    const user: User | null = getUser();
    const dispatch = useAppDispatch();


    const [isEditable, setIsEditable] = useState(false);

    const [data, setData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        languages: '',
        phone: '',
        social_media_links: '',
        bio: '',
    });

    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpload = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.fileList.length > 0) {
            const newFile = info.fileList[0].originFileObj as File;
            setFile(newFile);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        if (file) {
            formData.append('file', file);
        }
        try {
            if (role === 'guide' && user) {
                await dispatch(updateGuide({formData, id: user.id.toString() }));
            } if ((role === 'user' && user)){
                console.log('dSDSvSDFwWRSgwRgrGSG')
                await dispatch(updateUser({formData, id: user.id.toString() }));

            }

            setIsEditable(false);

    } catch (error) {
            console.error("Произошла ошибка при обновлении:", error);
        }
    };

    return (
        <Layout className={style.layout}>
            <NavBar />
            <Content className={style.profile}>
                <Form className={style.form} onFinish={handleSubmit}>
                    <div>
                        {isEditable ? (
                            <Form.Item className={style.dragger}>
                                <Dragger
                                    name="file"
                                    multiple={false}
                                    onChange={handleUpload}
                                    beforeUpload={() => false}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <UploadOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Нажмите или перетащите файл для загрузки
                                    </p>
                                    <p className="ant-upload-hint">Поддерживаются любые файлы</p>
                                </Dragger>
                            </Form.Item>
                        ) : (
                            <Form.Item className={style.avatar}>
                                <Avatar
                                    icon={<UserOutlined />}
                                    size={80}
                                />
                            </Form.Item>
                        )}
                    </div>

                    <Form.Item >
                        {isEditable ? (
                            <Input
                                className={style.formInput}
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                placeholder={'Имя'}
                            />
                        ) : (
                          <Space className={style.spanElements}>
                              <span className={style.label} >Имя</span>
                              <span className={style.span}>{data.name || 'Данные не заполнены'}</span>
                          </Space>
                        )}
                    </Form.Item>

                    <Form.Item >
                        {isEditable ? (
                            <Input
                                className={style.formInput}
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder={'Email'}
                            />
                        ) : (
                         <Space className={style.spanElements}>
                             <span className={style.label} >Email</span>
                             <span className={style.span}>{data.email}</span>
                         </Space>
                        )}
                    </Form.Item>

                    {role === "guide" && (
                        <>
                            <Form.Item >
                                {isEditable ? (
                                    <Input
                                        className={style.formInput}
                                        name="languages"
                                        value={data.languages}
                                        onChange={handleInputChange}
                                        placeholder={'Языки'}
                                    />
                                ) : (
                                  <Space className={style.spanElements}>
                                      <span className={style.label}>Языки</span>
                                      <span className={style.span}>{data.languages || 'Данные не заполнены'}</span>
                                  </Space>
                                )}
                            </Form.Item>

                            <Form.Item >
                                {isEditable ? (
                                    <Input
                                        className={style.formInput}
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleInputChange}
                                        placeholder={'Телефон'}
                                    />
                                ) : (
                                 <Space className={style.spanElements}>
                                     <span className={style.label} >Телефон</span>
                                     <span className={style.span}>{data.phone || "Данные не заполнены"}</span>
                                 </Space>
                                )}
                            </Form.Item>

                            <Form.Item >
                                {isEditable ? (
                                    <Input
                                        className={style.formInput}
                                        name="social_media_links"
                                        value={data.social_media_links}
                                        onChange={handleInputChange}
                                        placeholder={'Социальные сети'}
                                    />
                                ) : (
                                  <Space className={style.spanElements}>
                                      <span className={style.label} >Социальные сети</span>
                                      <span className={style.span}>{data.social_media_links || 'Данные не заполнены'}</span>
                                  </Space>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {isEditable ? (
                                    <Input
                                        className={style.formInput}
                                        name="bio"
                                        value={data.bio}
                                        onChange={handleInputChange}
                                        placeholder={'Биография'}
                                    />
                                ) : (
                                 <Space className={style.spanElements}>
                                     <span className={style.label}>Биография</span>
                                     <span className={style.span}>{data.bio || 'Данные не заполнены'}</span>
                                 </Space>
                                )}
                            </Form.Item>
                        </>
                    )}

                    {isEditable ? (
                        <Button className={style.button} type="primary" onClick={handleSubmit}>
                            Сохранить
                        </Button>
                    ) : (
                        <Button className={style.button} type="primary" onClick={() => setIsEditable(true)}>
                            Редактировать
                        </Button>
                    )}
                </Form>
            </Content>
        </Layout>
    );
}

export default PersonalAccount;