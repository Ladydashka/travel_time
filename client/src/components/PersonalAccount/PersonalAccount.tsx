import { useState } from "react";
import NavBar from "../NavBar/NavBar.tsx";
import {Button, Space, Form, Input, Avatar, Layout} from "antd"
import style from "./styles.module.css";
import getRole from "../NavBar/getRole.ts";
import getUser from "../NavBar/getUser.ts";
import {useAppDispatch} from "../../redux/store/store.tsx";
import {updateGuide} from "../../redux/guide/guideThank.ts";
import {UserOutlined} from '@ant-design/icons';



function PersonalAccount() {
    const role = getRole();
    const user = getUser();
    const dispatch = useAppDispatch();
    const { name, email, avatar_url, languages, rating, social_media_links, phone, bio } = user

    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name,
        email,
        languages: languages,
        rating,
        phone,
        social_media_links: social_media_links,
        bio,
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if(role === 'user'){

            } else if(role === 'guide'){
                await dispatch(updateGuide({ ...formData,id: user.id }));
            }
            setIsEditable(false);
        } catch (error) {
            console.error("Произошла ошибка при регистрации:", error);
        }

    };

    return (
      <Layout className={style.layout}>
          <NavBar />
          <Space className={style.profile}>
              <Form  className={style.form}>
                  <div className={style.avatar}>
                      <Avatar
                          icon={<UserOutlined />}
                          size={80}
                          src={avatar_url}
                          className={style.avatarImage}
                      />
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

                      <Button  onClick={() => setIsEditable(true)}>
                          Редактировать
                      </Button>
                  )}
              </Form>
          </Space>
      </Layout>
    );
}

export default PersonalAccount;
