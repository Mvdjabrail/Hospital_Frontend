import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDeps } from "../../../features/departments/depsSlice";
import styles from "./deps.module.css";
import Aos from "aos";
import "aos/dist/aos.css"

const Deps = () => {
  const dispatch = useDispatch();

  const deps = useSelector((state)=>state.deps.departments)

  useEffect(() => {
    dispatch(getDeps());
  }, [dispatch]);

  useEffect(()=>{
    Aos.init({duration: 2000})
}, [])
  return (
    <>
      <h1 className={styles.title}>Отделения</h1>
      <hr />
      <h4 className={styles.quote}>
        "Медицина поистине самое благородное из всех искусств."
      </h4>
      <div className={styles.author}>- Гиппократ</div>
      <hr />
      <div className={styles.depsCnt}>
        {deps.map((el) => {
          return (
            <Link to={`/services/${el._id}`}> <div data-aos="fade-up" className={styles.deps}>
              <img alt="pic" className={styles.img} src={`http://localhost:4000/${el.image}`} />
              <div className={styles.depTitle}>{el.title}</div>
              <div className={styles.depText}>
                Claritas est etiam processus dynamicus, qui sequitur mutationem
                consuetudium lectorum.
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Deps;
