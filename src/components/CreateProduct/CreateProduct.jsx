import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CardContext } from '../../context/cardContext'
import { UserContext } from '../../context/userContext'
import api from '../../utils/api'
import { BaseButton } from '../BaseButton/BaseButton'
import { Form } from '../Form/Form'
import './index.scss'

export const CreateProduct = ({ setIsActiveModal }) => {

    const { register, handleSubmit, reset } = useForm();

    const { setCards } = useContext(UserContext);

    const sendProduct = async (data) => {

        try {
            await api.addProduct(data).then((p) => setCards((state) => [...state, p]));
            setIsActiveModal(false)
        } catch (error) {
        }
        console.log(data);
    }

    return (<div className="create-product">
        <Form handleFormSubmit={handleSubmit(sendProduct)} >
            <span>Create product</span>
            <input type="text" className="auth__input" placeholder='name'  {...register('name', { required: true })} />
            <input type="number" className="auth__input" placeholder='price'  {...register('price', { required: true })} />
            <input type="text" className="auth__input" placeholder='description'  {...register('description', { required: true })} />
            <input type="text" className="auth__input" placeholder='pictures'  {...register('pictures', { required: true })} />
            <BaseButton type="submit" color={'yellow'}>Создать товар</BaseButton>
        </Form>
    </div>)
}
// "available": true, // boolean
// "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
// "name": "Куриные желудочки для собак", // string, обязательное
// "price": 450, // number, обязательное
// "discount": 10, // number 
// "stock": 10, // number
// "wight": "100 г", // string
// "description": "Описание demo", // string, обязательное