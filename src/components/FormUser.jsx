import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import defaultValues from "../utils/defaultValues";
import './styles/FormUser.css'

const FormUser = ({ createUser, updateInfo, updateUserById, setUpdateInfo, setFormClose, formClose}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    } else {
      reset(defaultValues);
    }
    
  }, [updateInfo])
  

  const submit = (data) => {
    setFormClose(true)
    const newData = {}


    for (const key in data) {
      if (data[key]){
        newData[key] = data[key];
      }
    }

    if (updateInfo) {
      updateUserById(updateInfo.id, newData)
      setUpdateInfo()
    } else {
      createUser(newData);
    }
    
    reset(defaultValues);
  };


  const handleExit = () => {
    setFormClose(true)
  }

  return (
    <div className={`form-container ${formClose && 'close'}`}>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <h3 className="form__title">
          {
            updateInfo 
            ?
            'Update User Information'
            :
            'Create New User'
          }
        </h3>
        <span onClick={handleExit} className="form__exit">X</span>
        <div className="form__item">
          <div className="form__item-header">
            <label className="label" htmlFor="email"><i className="bx bx-envelope"></i></label>
            <input className="input" {...register("email", {required: true,maxLength: 150,minLength: 1,})} type="email" id="email" placeholder="Email"/>
          </div>
          {errors?.email?.type === "required" && <p className="error"><i className='bx bx-error'></i>This field is required</p>}
          {errors?.email?.type === "maxLength" && (<p className="error"><i className='bx bx-error'></i>Email cannot exceed 150 characters</p>)}
          {errors?.email?.type === "minLength" && (<p className="error"><i className='bx bx-error'></i>Minimum characters for Email with 1</p>)}
        </div>
      
        <div className="form__item">
          <div className="form__item-header">
            <label className="label" htmlFor="password"><i className="bx bx-lock-alt"></i></label>
            <input className="input" {...register("password", {required: true, maxLength: 25} )} type="password" id="password" placeholder="Password"/>
          </div>  
          {errors?.password?.type === "required" && <p className="error"><i className='bx bx-error'></i>This field is required</p>}
          {errors?.password?.type === "maxLength" && (<p className="error"><i className='bx bx-error'></i>Password cannot exceed 25 characters</p>)}
        </div>
      
        <div className="form__item">
          <div className="form__item-header">
            <label className="label" htmlFor="first_name"><i className="bx bx-rename"></i></label>
            <input className="input" {...register("first_name", {required: true,maxLength: 25, minLength: 1,  pattern: /^[A-Za-z]+$/i})} type="text" id="first_name" placeholder="First Name"/>
          </div>
          {errors?.first_name?.type === "required" && <p className="error"><i className='bx bx-error'></i>This field is required</p>}
          {errors?.first_name?.type === "maxLength" && (<p className="error"><i className='bx bx-error'></i>First name cannot exceed 25 characters</p>)}
          {errors?.first_name?.type === "minLength" && (<p className="error"><i className='bx bx-error'></i>Minimum characters for First name with 1</p>)}
          {errors?.first_name?.type === "pattern" && (<p className="error"><i className='bx bx-error'></i>Alphabetical characters only</p>)}
        </div>
      
        <div className="form__item">
          <div className="form__item-header">
            <label className="label" htmlFor="last_name"><i className="bx bx-rename"></i></label>
            <input className="input" {...register("last_name", {required: true,maxLength: 25, minLength: 1,  pattern: /^[A-Za-z]+$/i})} type="text" id="last_name" placeholder="Last Name"/>
          </div>
          {errors?.last_name?.type === "required" && <p className="error"><i className='bx bx-error'></i>This field is required</p>}
          {errors?.last_name?.type === "maxLength" && (<p className="error"><i className='bx bx-error'></i>Last name cannot exceed 25 characters</p>)}
          {errors?.last_name?.type === "minLength" && (<p className="error"><i className='bx bx-error'></i>Minimum characters for last name with 1</p>)}
          {errors?.last_name?.type === "pattern" && (<p className="error"><i className='bx bx-error'></i>Alphabetical characters only</p>)}
        </div>
        
        <div className="form__item">
          <div className="form__item-header">
            <label className="label birthday" htmlFor="birthday"><i className="bx bx-calendar"></i></label>
            <input className="input" {...register("birthday")} type="date" id="birthday" />
            
          </div>
        </div>
      
        <div className="form__item">
          <div className="form__item-header">
            <label className="label" htmlFor="image_url"><i className="bx bx-image"></i></label>
            <input className="input" {...register("image_url")} type="text" id="image_url" placeholder="URL Img"/>    
          </div>
        </div>
        
        <button className="form__btn">{updateInfo ? 'Update' : 'Create'} </button>
      </form>
    </div>
  );
};

export default FormUser;
