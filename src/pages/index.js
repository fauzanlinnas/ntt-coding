import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setCurrentPage, setSortBy } from "../store/slices/courseSlice";
import Link from "next/link";
import CourseItem from "@/components/home/CourseItem";
import { useEffect, useState } from "react";
import api from "@/services/api/axiosInstance";

import styles from "@/styles/Home.module.scss";
import Pagination from "@/components/Pagination";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const dispatch = useDispatch();
  const { courseList, renderedList, currentPage, itemsPerPage, sortBy } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses.json");
        const coursesData = response.data;
        dispatch(setCourse(coursesData));
        dispatch(setCurrentPage(1));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (courseList.length <= 0) fetchCourses();
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleSort = (order) => {
    dispatch(setSortBy(order));
    dispatch(setCurrentPage(1));
  };

  return (
    <>
      <Head>
        <title>NTT Coding Home</title>
        <meta name="description" content="NextJS project for NTT assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <label>Sort by Price:</label>
          <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {renderedList.map((item) => (
          <Link key={item.id} href={`/course/${item.id}`}>
            <CourseItem itemData={item} />
          </Link>
        ))}
        <Pagination
          totalItems={courseList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default Home;
