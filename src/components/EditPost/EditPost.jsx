import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { BaseButton } from "../BaseButton/BaseButton";
import { Form } from "../Form/Form";
import './style.scss'

export const EditPost = () => {

    const [product, setProduct] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const sendData = async (data) => {
        // console.log(data)
        await api.editPostById(postId, {...product, title: data.name })
    }

    const { postId } = useParams();


    useEffect(() => {

    }, [postId]);

    useEffect(() => {
        api
            .getProductById(postId)
            .then((productData) => setProduct(productData))
            .catch((err) => {
                // navigate("/");
            })
    }, [postId]);

    return (<>
        <Form className="edit-post" handleFormSubmit={handleSubmit(sendData)}>
            <div className="profile__info">
                <div>
                    <label htmlFor="name" >
                        <input
                            {...register('name')}
                            className="auth__input"
                            type="text"
                            name="name"
                            placeholder="Имя"
                            defaultValue={product?.title}
                        />
                    </label>
                    {errors.name && (
                        <p className="auth__error">{errors?.name?.message}</p>
                    )}
                </div>
            </div>

            <BaseButton type="submit" color={"yellow"}>
                Сохранить
            </BaseButton>
        </Form>
    </>)
}