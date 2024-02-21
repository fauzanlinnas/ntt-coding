import React from "react";
import Image from "next/image";

import styles from "@/styles/Home.module.scss";
import StarRatings from "react-star-ratings";
import { PriceToIDR } from "@/utils/priceFormatter";

const isProductNew = (createdAt) => {
  const productDate = new Date(createdAt);
  const now = new Date();
  const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  return productDate >= oneWeekAgo;
};

const CourseItem = ({ itemData }) => {
  return (
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
          {itemData.totalDuration} total jam • {itemData.totalMaterial} • {itemData.difficultyLevel}
        </p>
        <div className={styles.labels}>
          {isProductNew(itemData.createdAt) && <span className={styles.labelNew}>NEW</span>}
          {itemData.rating > 4 && itemData.ratingCount > 20 && (
            <span className={styles.labelBestSeller}>BEST SELLER</span>
          )}
          {isProductNew(itemData.createdAt) && itemData.rating > 4 && itemData.ratingCount > 20 && (
            <span className={styles.labelHotLesson}>Hot Lesson</span>
          )}
        </div>
      </div>

      <div>
        <p className={styles.courseDiscountedPrice}>{PriceToIDR(itemData.discountedPrice)}</p>
        <p className={styles.coursePrice}>{PriceToIDR(itemData.price)}</p>
      </div>
    </div>
  );
};

export default CourseItem;
