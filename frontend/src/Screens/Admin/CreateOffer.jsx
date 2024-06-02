import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormContainer from "../../Components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { useGetAllCategoriesQuery } from "../../slices/productApiSlice";
import {
  useApplyOfferMutation,
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useGetAllOffersQuery,
  useUpdateOfferMutation,
} from "../../slices/offersApiSlice";
import { toast } from "react-toastify";

function CreateOffer() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOffer, setSelectedOffer] = useState({
    offerName: "",
    offerDiscount: 0,
    status: "Inactive",
  });
  const [offerDetails, setOfferDetails] = useState([]);
  const [offerName, setOfferName] = useState("");
  const [offerDiscount, setOfferDiscount] = useState(0);
  const [status, setStatus] = useState("Inactive");
  const [offerToApply, setOfferToApply] = useState({
    offerName: "",
    offerDiscount: 0,
    status: "Inactive",
  });

  // const [offerToUpdate, setOfferToUpdate] = useState({
  //   offerName: null,
  //   offerDiscount: null,
  //   status: null,
  // });

  //get all categories
  const {
    data: allCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  //get all offers
  const {
    data: allOffers,
    isLoading: loadingAllOffers,
    error: errorAllOffers,
    refetch: refetchOffers,
  } = useGetAllOffersQuery();

  //delete offer
  const [
    deleteOffer,
    { isLoading: loadingDeleteOffer, error: errorDeleteOffer },
  ] = useDeleteOfferMutation();

  //create offer
  const [
    createOfferMutation,
    { isLoading: createOfferLoading, error: createOfferError },
  ] = useCreateOfferMutation();

  //update offer
  const [
    updateOffer,
    { isLoading: updateOfferLoading, error: updateOfferError },
  ] = useUpdateOfferMutation();

  //apply offer
  const [applyOffer, { isLoading: applyOfferLoading, error: applyOfferError }] =
    useApplyOfferMutation();

  const handleOfferDelete = async (e, offer) => {
    e.preventDefault();
    try {
      const res = await deleteOffer(offer._id).unwrap();
      toast.success("Deleted offer");
      refetchOffers();
      setSelectedOffer({
        offerName: "",
        offerDiscount: 0,
        status: "Inactive",
      });
      setOfferName("");
      setOfferDiscount(0);
      setStatus("Inactive");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleOfferSelection = (e, offerName) => {
    e.preventDefault();

    let currentOffer = allOffers?.filter(
      (offer) => offer.offerName === offerName
    );
    console.log(currentOffer);
    setOfferToApply({
      offerName: currentOffer.offerName,
      offerDiscount: currentOffer.offerDiscount,
      status: currentOffer.status,
    });
  };

  const handleOfferCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await createOfferMutation({
        offerName: "New Offer",
        offerDiscount: 0,
        status: "Inactive",
      }).unwrap();
      toast.success(`New offer created: ${res._id}`);
      refetchOffers();
      setSelectedOffer({
        offerName: "",
        offerDiscount: 0,
        status: "Inactive",
      });
      setOfferName("");
      setOfferDiscount(0);
      setStatus("Inactive");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandlerOfferUpdate = async (e) => {
    console.log(selectedOffer, { offerName, offerDiscount, status });
    e.preventDefault();
    try {
      const res = await updateOffer({
        offerId: selectedOffer._id,
        offerName,
        offerDiscount,
        status,
      }).unwrap();
      toast.success(`Offer Updated: ${res.offerName}`);
      // setSelectedOffer(offerName, offerDiscount, status);
      setSelectedOffer({
        offerName: "",
        offerDiscount: 0,
        status: "Inactive",
      });
      setOfferName("");
      setOfferDiscount(0);
      setStatus("Inactive");
      refetchOffers();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandlerOfferApply = async (e) => {
    e.preventDefault();
    console.log(offerToApply);
    try {
      if (offerToApply?.status === "Active") {
        const res = await applyOffer({
          offer: { ...offerToApply },
          productCategory: selectedCategory,
        }).unwrap();
        toast.success("Offer applied");
        setOfferToApply({
          offerName: "",
          offerDiscount: 0,
          status: "Inactive",
        });
        setSelectedCategory("");
      } else {
        toast.error("Offer is inavtive!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (allOffers?.length) {
      setOfferDetails(allOffers);
    }
  }, [allOffers]);

  useEffect(() => {
    if (selectedOffer?.offerName) {
      setOfferName(selectedOffer?.offerName);
      setOfferDiscount(selectedOffer?.offerDiscount);
      setStatus(selectedOffer?.status);
      // console.log(selectedOffer);
    }
  }, [selectedOffer, setSelectedOffer]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Tabs
        defaultActiveKey="bundle"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="bundle" title="Bundle">
          <div className="main-container-offers">
            <FormContainer>
              <h1>Create Offer</h1>
              <div className="create-offer-dropdown-container">
                <div>
                  {loadingAllOffers ? (
                    <Loader />
                  ) : errorAllOffers ? (
                    <Message variant="danger">{errorAllOffers}</Message>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="offer-category"
                      >
                        {/* {offerName || "Select Offer"} */}
                        {selectedOffer?.offerName
                          ? selectedOffer?.offerName
                          : "Select Offer"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {allOffers?.map((offer) => (
                          <Dropdown.Item
                            key={offer._id}
                            onClick={() => setSelectedOffer(offer)}
                          >
                            {offer.offerName}
                          </Dropdown.Item>
                        ))}
                        <Dropdown.Item onClick={(e) => handleOfferCreation(e)}>
                          Create New Offer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <Form onSubmit={(e) => submitHandlerOfferUpdate(e)}>
                <Form.Group controlId="offerName" className="my-2">
                  <Form.Label>Offer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={offerName}
                    onChange={(e) => {
                      setOfferName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="offerDiscount" className="my-2">
                  <Form.Label>Offer Discount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Discount %"
                    value={offerDiscount}
                    onChange={(e) => {
                      setOfferDiscount(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="status" className="my-2">
                  <Form.Label>Offer Status</Form.Label>
                  <Form.Select
                    placeholder="Enter Name"
                    aria-label="Offer Status"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="my-2 offer-btn"
                >
                  Update Offer
                </Button>
                <Button
                  variant="primary"
                  className="my-2 offer-btn"
                  onClick={(e) => {
                    handleOfferDelete(e, selectedOffer);
                  }}
                >
                  Delete Offer
                </Button>
              </Form>
            </FormContainer>
            <FormContainer>
              <h1>Apply Offer</h1>
              <div className="create-offer-dropdown-container">
                <div>
                  {categoriesLoading ? (
                    <Loader />
                  ) : categoriesError ? (
                    <Message variant="danger">{categoriesError}</Message>
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="offer-category"
                      >
                        {selectedCategory || "Select Category"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {allCategories?.map((category, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <Form onSubmit={(e) => submitHandlerOfferUpdate(e)}>
                <Form.Group controlId="status" className="my-2">
                  <Form.Label>Select Offer</Form.Label>
                  <Form.Select
                    placeholder="Offer Name"
                    aria-label="Offer Name"
                    value={offerToApply?.offerName}
                    onChange={(e) => {
                      setOfferToApply(
                        allOffers?.filter(
                          (offer) => offer.offerName === e.target.value
                        )[0]
                      );
                    }}
                  >
                    <option>Select Offer</option>
                    {/* <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option> */}
                    {allOffers?.map((offer) => (
                      <option key={offer._id} value={offer.offerName}>
                        {" "}
                        {offer.offerName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="category" className="my-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="my-2 offer-btn"
                  onClick={(e) => submitHandlerOfferApply(e)}
                >
                  Apply Offer
                </Button>
              </Form>
            </FormContainer>
          </div>
        </Tab>
        <Tab eventKey="coupon" title="Coupon" disabled>
          <>
            {/* <FormContainer>
              <h1>Create Coupon</h1>

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                  Update Product
                </Button>
              </Form>
            </FormContainer> */}
          </>
        </Tab>
      </Tabs>
    </>
  );
}

export default CreateOffer;
