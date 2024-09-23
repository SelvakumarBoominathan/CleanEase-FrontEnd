// Modal for Adding Employee
// <Modal show={showModal} onHide={() => setShowModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Add New Employee</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Form.Group controlId="formImage">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter image URL"
//           value={newEmployee.image}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, image: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formCategory">
//         <Form.Label>Category</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter category"
//           value={newEmployee.category}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, category: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formName">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter name"
//           value={newEmployee.name}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, name: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formCity">
//         <Form.Label>City</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter city"
//           value={newEmployee.city}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, city: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formId">
//         <Form.Label>ID</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter ID"
//           value={newEmployee.id}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, id: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formPrice">
//         <Form.Label>Price</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter price"
//           value={newEmployee.price}
//           onChange={(e) =>
//             setNewEmployee({ ...newEmployee, price: e.target.value })
//           }
//         />
//       </Form.Group>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowModal(false)}>
//       Cancel
//     </Button>
//     <Button variant="primary" onClick={handleAddEmployee}>
//       Submit
//     </Button>
//   </Modal.Footer>
// </Modal>

// {/* Modal for Update Employee */}
// <Modal show={showUpdateModal} onHide={() => setUpdateShowModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Update Employee</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       <Form.Group controlId="formImage">
//         <Form.Label>Image URL</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter image URL"
//           value={updateEmployee.image}
//           onChange={(e) =>
//             setUpdateEmployee({
//               ...updateEmployee,
//               image: e.target.value,
//             })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formCategory">
//         <Form.Label>Category</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter category"
//           value={updateEmployee.category}
//           onChange={(e) =>
//             setUpdateEmployee({
//               ...updateEmployee,
//               category: e.target.value,
//             })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formName">
//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter name"
//           value={updateEmployee.name}
//           onChange={(e) =>
//             setUpdateEmployee({ ...updateEmployee, name: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formCity">
//         <Form.Label>City</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter city"
//           value={updateEmployee.city}
//           onChange={(e) =>
//             setUpdateEmployee({ ...updateEmployee, city: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formId">
//         <Form.Label>ID</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter ID"
//           value={updateEmployee.id}
//           onChange={(e) =>
//             setUpdateEmployee({ ...updateEmployee, id: e.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group controlId="formPrice">
//         <Form.Label>Price</Form.Label>
//         <Form.Control
//           type="number"
//           placeholder="Enter price"
//           value={updateEmployee.price}
//           onChange={(e) =>
//             setUpdateEmployee({
//               ...updateEmployee,
//               price: e.target.value,
//             })
//           }
//         />
//       </Form.Group>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setUpdateShowModal(false)}>
//       Cancel
//     </Button>
//     <Button variant="primary" onClick={handleUpdatesubmit}>
//       Submit
//     </Button>
//   </Modal.Footer>
// </Modal>

// {/*Modal for add review */}
// <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>{`Rate ${empName}`}</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     <Form>
//       <Form.Group>
//         {[...Array(5)].map((_, i) => {
//           const ratingValue = i + 1;

//           return (
//             <Form.Label key={i}>
//               <input
//                 type="radio"
//                 name="rating"
//                 value={ratingValue}
//                 onClick={() => setRating(ratingValue)}
//                 style={{ display: "none" }}
//               />
//               <FaStar
//                 size={30}
//                 color={
//                   ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
//                 }
//                 onMouseEnter={() => setHover(ratingValue)}
//                 onMouseLeave={() => setHover(null)}
//                 style={{ cursor: "pointer", transition: "color 200ms" }}
//               />
//             </Form.Label>
//           );
//         })}
//       </Form.Group>

//       <Form.Group className="mt-4">
//         <Form.Label>Provide review: </Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           value={reviewtext}
//           onChange={(e) => setReviewText(e.target.value)}
//           placeholder="Write your review here..."
//         ></Form.Control>
//       </Form.Group>
//     </Form>
//   </Modal.Body>

//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
//       Cancel
//     </Button>
//     <Button
//       variant="primary"
//       onClick={() =>
//         handleReviewSubmit(rating, reviewtext, username, empID)
//       }
//     >
//       Submit
//     </Button>
//   </Modal.Footer>
// </Modal>