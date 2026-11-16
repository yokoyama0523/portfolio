import type { Product } from "../../content/catalog";
import { itemPage as text } from "../../content/item";
import { Stars } from "../Stars";

export function Reviews({ product }: { product: Product }) {
  const { reviews } = product;
  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  return (
    <section className="rv">
      <div className="h">
        <h2 className="small-title">{text.reviewsTitle}</h2>
      </div>
      <div className="sum">
        {reviews.length ? (
          <>
            <b>{average.toFixed(1)}</b>
            <Stars value={Math.round(average)} />
            <span className="note">{text.reviewCount(reviews.length)}</span>
          </>
        ) : (
          <span className="note">{text.noReviews}</span>
        )}
      </div>
      <ul>
        {reviews.map((review) => (
          <li key={review.who + review.text}>
            <Stars value={review.rating} />
            <span>{review.text}</span>
            <span className="who">{text.reviewer(review.who, review.size)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
