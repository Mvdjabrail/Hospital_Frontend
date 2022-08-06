import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, patchUser } from "../../../features/users/userSlice";
import { showModalServices } from "../../../features/Services/ServicesSlice";
import Services from "./Services";
import { showModalDrugs } from "../../../features/drugs/drugsSlice";
import Drugs from "./Drugs";
import css from "./admin.module.css";

const AdminContent = () => {
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersReducer.users);
  const handleShowServices = () => {
    dispatch(showModalServices(true));
  };

  const handleShowDrugs = () => {
    dispatch(showModalDrugs(true));
  };

  const handleAdmin = (item) => {
    dispatch(patchUser(item));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(photo);
    } else {
      setPreview(null);
    }
  }, [dispatch, photo]);
  return (
    <>
      <div className={css.admin_page}>
        <div className={css.admin_page_content}>
          <div className={css.createImage}>
            <div>
              <input
                type="file"
                id="upload"
                multiple
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.substring(0, 5) === "image") {
                    setPhoto(file);
                  } else {
                    setPhoto(null);
                  }
                }}
              />
              {preview ? (
                <>
                  <div className={css.divImg}>
                    <img className={css.img2} src={preview} alt="" />
                  </div>
                  <label htmlFor="upload">
                    <ion-icon name="create-outline"></ion-icon>
                  </label>{" "}
                </>
              ) : (
                <label htmlFor="upload">
                  <div className={css.addDiv}>
                    <img
                      className={css.img1}
                      src="https://thumbs.dreamstime.com/b/%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B5-%D1%82%D0%B2%D0%B5%D1%80%D0%B4%D1%8B%D0%B9-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%B8-admin-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9-147255512.jpg"
                      alt=""
                    />
                  </div>
                </label>
              )}
            </div>
          </div>
          <div className={css.input_block}>
            {user.map((user) => {
              return (
                <>
                {user.role === 'admin' && (
              <>
                  <div>
                    <div>Имя:{user.firstName}</div>
                  </div>
                  <div>
                    <div>Фамилия:{user.lastName}</div>
                  </div>
                  <div>
                    <div>Почта:{user.email}</div>
                  </div>
                  </>)
                }
                </>
              );
            })}
          </div>
        </div>
        <div className={css.mainUser}>
          <h1>Пользователи</h1>
          {user.map((item) => {
            return (
              <>
                <div className={css.loginDiv}>
                  <div>{item.login}</div>
                  <div>{item.role}</div>
                  {item.role === "admin" ? (
                    <div style={{ width: "34%" }}></div>
                  ) : (
                    <button
                      onClick={() => handleAdmin(item)}
                      className={css.btn}
                    >
                      {(item.role === "user" && "Назначить врачем") ||
                        (item.role === "doctor" && "Назначить пользователем")}
                    </button>
                  )}
                </div>
              </>
            );
          })}
        </div>
        <div className={css.addService}>
          <div>
            <button onClick={handleShowServices}>Добавить услугу</button>
          </div>
          <div>
            <button onClick={handleShowDrugs}>Добавить лекарство</button>
          </div>
        </div>
      </div>
      <Services />
      <Drugs />
    </>
  );
};

export default AdminContent;
