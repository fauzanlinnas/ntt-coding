import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

import styles from "@/styles/CourseDetail.module.scss";
import { PriceToIDR } from "@/utils/priceFormatter";
import { HeartIcon } from "@/assets/icons";
import { wishlist } from "@/store/slices/courseSlice";

const CourseDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId } = router.query;

  const courses = useSelector((state) => state.courses.courseList);
  const itemData = courses.find((p) => String(p.id) === courseId);

  return (
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
        </div>
        <div>
          <p className={styles.courseDiscountedPrice}>{PriceToIDR(itemData.discountedPrice)}</p>
          <p className={styles.coursePrice}>{PriceToIDR(itemData.price)}</p>
        </div>
        <div onClick={() => dispatch(wishlist({ courseId, courses }))}>
          <HeartIcon className={`${styles.heartIcon} ${itemData.wishlist ? styles.active : {}}`} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
