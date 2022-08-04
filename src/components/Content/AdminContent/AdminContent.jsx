import React, { useEffect, useState } from "react";
import css from "./admin.module.css";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

const AdminContent = () => {
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

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
    <Container className={css.admin_page}>
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
                    src="https://www.babypillowth.com/images/templates/upload.png"
                    alt=""
                  />
                  <div className={css.add}>Выбрать файл</div>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className={css.input_block}>
          <div>
            <div>Название услуги </div>
          </div>
          <div>
            <div>Об услуге</div>
          </div>
          <div>
            <div>Класс услуги</div>
          </div>
        </div>
      </div>
      <div>
        <div>Добавить Услугу</div>
        <div><input type="text" /></div>
        <div><input type="text" /></div>
        <div><input type="text" /></div>
      </div>
    </Container>
    </>
  );
};

export default AdminContent;
