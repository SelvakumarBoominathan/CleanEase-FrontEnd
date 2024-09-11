import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({
  show,
  onHide,
  empName,
  rating,
  setRating,
  hover,
  setHover,
  reviewtext,
  setReviewText,
  handleReviewSubmit,
  username,
  empID,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`Rate ${empName}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;

              return (
                <Form.Label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                  />
                </Form.Label>
              );
            })}
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Provide review: </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewtext}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleReviewSubmit(rating, reviewtext, username, empID)
          }
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
