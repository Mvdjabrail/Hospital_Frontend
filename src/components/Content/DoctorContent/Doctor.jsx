import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserId, getUsers } from "../../../features/users/userSlice";
import css from "./doctor.module.css";

const Doctor = () => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const user = useSelector((state) => state.usersReducer.users);
  const userId = localStorage.getItem("userId");

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

  const handleUserRemove = (id) => {
    dispatch(deleteUserId(id));
  };

  return (
    <>
         <div className={css.pacientConteyner}>
          <div className={css.mainUser}>
            <h1 className={css.users}>Пациенты</h1>
            {user.map((item) => {
              if (item.role !== "admin" && item.role !== "doctor") {
                return (
                  <>
                    <div className={css.loginDiv}>
                      <div>{item.login}</div>
                      <div>{item.role}</div>
                      {item.role === "admin" ? (
                        <div style={{ width: "34%" }}></div>
                      ) : (
                        <button
                          onClick={() => handleUserRemove(item._id)}
                          className={css.btn}
                        >
                          {item.role === "user" && "Назначить врачем"}
                        </button>
                      )}
                    </div>
                    <hr />
                  </>
                );
              }
            })}
          </div>
       </div>
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
            <div
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "15%",
                marginTop: "10%",
              }}
            >
              Account
            </div>
            {user.map((user) => {
              return (
                <>
                  {user._id === userId && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className={css.prof}
                          style={{ marginBottom: "2%" }}
                        >
                          Имя: {user.firstName}
                        </div>
                        <div></div>
                      </div>
                      <hr className={css.hr_doctor} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h2 className={css.prof} style={{ marginBottom: "2%" }}>
                          Фамилия: {user.lastName}
                        </h2>
                      </div>
                      <hr className={css.hr_doctor} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className={css.prof}
                          style={{ marginBottom: "2%" }}
                        >
                          Почта: {user.email}
                        </div>
                      </div>
                      <hr className={css.hr_doctor} />
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
