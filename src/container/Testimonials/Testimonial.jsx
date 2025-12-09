import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { client, urlFor } from "../../client";
import Quote from "../../assets/blockquote.svg";
import { AppWrap } from "../../wrapper";
import "./Testimonial.css";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await client.fetch('*[_type == "testimonial"]');
        setReviews(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="testimonial-container">
      <div className="title">
        <h2>Testimonial</h2>
        <p>What members are saying.</p>
      </div>

      <div className="slider-container">
        <blockquote>
          <img className="top-quote quote" src={Quote} alt="quote" />
          <img className="bottom-quote quote" src={Quote} alt="quote" />
        </blockquote>

        {loading ? (
          <p className="loading-text">Loading testimonials...</p>
        ) : reviews.length > 0 ? (
          <Splide
            options={{
              perPage: 1,
              autoplay: true,
              speed: 1000,
              rewind: true,
              rewindByDrag: true,
            }}
          >
            {reviews.map((review) => (
              <SplideSlide key={review._id}>
                {review.image ? (
                  <img
                    className="review-img"
                    src={urlFor(review.image).url()}
                    alt={review.name || "Review"}
                  />
                ) : (
                  <p>No Image Available</p>
                )}

                <div className="content">
                  <p className="text">
                    {review.text || "No review text available"}
                  </p>

                  <div className="info">
                    <div className="rating">
                      {Array.from({ length: review.rating || 0 }, (_, i) => (
                        <span key={i} className="star">
                          &#9733;
                        </span>
                      ))}
                      {Array.from(
                        { length: 5 - (review.rating || 0) },
                        (_, i) => (
                          <span key={i} className="star">
                            &#9734;
                          </span>
                        )
                      )}
                    </div>

                    <p className="user">{review.name || "Anonymous"}</p>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <p className="no-reviews">No testimonials available</p>
        )}
      </div>
    </section>
  );
};

export default AppWrap(
  Testimonial,
  "testimonials",
  "app__whitebg",
  true,
  false
);
