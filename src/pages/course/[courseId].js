import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

import styles from "@/styles/CourseDetail.module.scss";
import { PriceToIDR } from "@/utils/priceFormatter";
import { HeartIcon } from "@/assets/icons";
import { wishlist } from "@/store/slices/courseSlice";
import Head from "next/head";

const isProductNew = (createdAt) => {
  const productDate = new Date(createdAt);
  const now = new Date();
  const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  return productDate >= oneWeekAgo;
};

const CourseDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId } = router.query;

  const courses = useSelector((state) => state.courses.courseList);
  const itemData = courses.find((p) => String(p.id) === courseId);

  return (
    <>
      <Head>
        <title>{itemData.title}</title>
        <meta name="description" content={itemData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p className={styles.backButton} onClick={() => router.back()}>
          &#60; Back
        </p>
        <div className={styles.courseCard}>
          <Image src={itemData.imageUrl} width={250} height={125} alt={itemData.title} />

          <div className={styles.courseInfo}>
            <p className={styles.courseTitle}>{itemData.title}</p>
            <p className={styles.courseDescription}>{itemData.description}</p>
            <p className={styles.courseAuthor}>
              {itemData.author}, {itemData.organization}
            </p>
            {itemData.ratingCount > 0 ? (
              <p>
                <span className={styles.courseRating}>{itemData.rating}</span>
                <StarRatings
                  rating={Math.round(itemData.rating * 2) / 2}
                  starRatedColor="orange"
                  name="rating"
                  starDimension="12px"
                  starSpacing="1px"
                />
                <span className={styles.courseRatingCount}>({itemData.ratingCount})</span>
              </p>
            ) : (
              <p className={styles.courseNoRating}>No Review Yet</p>
            )}
            <p className={styles.courseDuration}>
              {itemData.totalDuration} total jam • {itemData.totalMaterial} •{" "}
              {itemData.difficultyLevel}
            </p>
            <div className={styles.labels}>
              {isProductNew(itemData.createdAt) && <span className={styles.labelNew}>NEW</span>}
              {itemData.rating > 4 && itemData.ratingCount > 20 && (
                <span className={styles.labelBestSeller}>BEST SELLER</span>
              )}
              {isProductNew(itemData.createdAt) &&
                itemData.rating > 4 &&
                itemData.ratingCount > 20 && (
                  <span className={styles.labelHotLesson}>Hot Lesson</span>
                )}
            </div>
          </div>

          <div>
            <p className={styles.courseDiscountedPrice}>{PriceToIDR(itemData.discountedPrice)}</p>
            <p className={styles.coursePrice}>{PriceToIDR(itemData.price)}</p>
          </div>

          <div onClick={() => dispatch(wishlist({ courseId, courses }))}>
            <HeartIcon
              className={`${styles.heartIcon} ${itemData.wishlist ? styles.active : {}}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
