import React from "react";
import "./styles/CardUser.css";
import Swal from "sweetalert2";

const CardUser = ({
  user,
  setUpdateInfo,
  deleteUserById,
  setFormClose,
  formClose,
}) => {
  const handleUpdate = () => {
    setFormClose(false);
    setUpdateInfo(user);
  };

  const handleDelete = () => {
    /* deleteUserById(user.id) */
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUserById(user.id);

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "User has been deleted",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "User has not been deleted",
            "error"
          );
        }
      });
  };

  return (
    <article className="article__user">
      <div className="article__header">
        {user.image_url ? (
          <img className="user__img" src={user.image_url} alt="" />
        ) : (
          <img className="user__img" src="/img/defaultImgProfile.jpg" alt="" />
        )}

        <h2 className="user__name">
          {user.first_name} {user.last_name}
        </h2>
      </div>
      <ul className="user__list">
        <li className="user__item">
          <span className="user__label">Email</span>
          <span className="user__info">{user.email}</span>
        </li>
        {user.birthday ? (
          <li className="user__item">
            <span className="user__label">Birthday</span>
            <span className="user__info">
              <i className="bx bx-cake"></i>
              {user.birthday}
            </span>
          </li>
        ) : (
          <li className="user__item">
            <span className="user__label">Birthday</span>
            <span className="user__info">
              <i className="bx bx-cake"></i>NULL
            </span>
          </li>
        )}
      </ul>
      <div className="article__options">
        <button className="user__btn user__update" onClick={handleUpdate}>
          <i className="bx bx-edit user__icon"></i>
        </button>
        <button className="user__btn user__delete" onClick={handleDelete}>
          <i className="bx bx-trash user__icon"></i>
        </button>
      </div>
    </article>
  );
};

export default CardUser;
