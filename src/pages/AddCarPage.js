import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, ProgressBar } from "react-bootstrap";
import "../pages/AddCarPage.scss";
import Finish from "../components/Car/AddCar/Finish";
import Basic from "../components/Car/AddCar/Basic";
import Pricing from "../components/Car/AddCar/Pricing";
import Detail from "../components/Car/AddCar/Detail";
import { postAddNewCar } from "../service/apiService";
import { toast } from "react-toastify";
import LoadingIcon from "../components/Loading";

const AddCarPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    licensePlate: "",
    color: "Black",
    brand: "",
    model: "",
    productionYears: 2022,
    numberOfSeats: 4,
    transmissionType: "Automatic",
    fuelType: "Gasoline",
    mileage: 0,
    fuelConsumption: 0,
    basePrice: 0,
    deposit: 0,
    address: "",
    additionalFunctions: "",
    description: "",
    termsOfUse: "",
  });

  const [addFunc, setAddFunc] = useState({
    bluetooth: false,
    gps: false,
    camera: false,
    sunRoof: false,
    childLock: false,
    childSeat: false,
    dvd: false,
    usb: false,
  });

  const [terms, setTerms] = useState({
    noSmoking: false,
    noFood: false,
    noPet: false,
    other: false,
  });
  const [loading, setLoading] = useState(true);

  const [otherDetail, setOtherDetail] = useState("");

  const [documents, setDocuments] = useState([]);

  const [carImages, setCarImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleImagesChange = (images) => {
    setCarImages(images);
  };

  const handleFormDataChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDocumentsChange = (documents) => {
    setDocuments(documents);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAddFunc({
      ...addFunc,
      [name]: checked,
    });
  };
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    onActiveChange();
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    onActiveChange();
    if (step > 1) setStep(step - 1);
  };

  const handleCancel = () => {
    navigate("/admin/list-cars");
  };

  const onActiveChange = () => {
    const carName = `${
      formData.brand + " " + formData.model + " " + formData.productionYears
    }`;
    // Derive the active functions and terms
    const activeFunc = Object.keys(addFunc)
      .filter((key) => addFunc[key])
      .join(", ");

    const activeTerms = Object.keys(terms)
      .filter((key2) => terms[key2])
      .join(", ");

    // Update `formData` with all changes at once
    setFormData((prevFormData) => {
      let updatedTerms = activeTerms;
      if (terms.other) {
        updatedTerms = activeTerms
          ? `${activeTerms}, ${otherDetail}`
          : otherDetail;
      }

      return {
        ...prevFormData,
        name: carName,
        additionalFunctions: activeFunc,
        termsOfUse: updatedTerms,
      };
    });
  };

  const handleSubmit = async () => {
    onActiveChange();
    try {
      console.log(carImages);
      const response = await postAddNewCar(formData, documents, carImages);
      if (response && response.statusCode === 201) {
        const cars = response.data;
        console.log(">>> Cars:", cars);
        toast.success(response.message);
        navigate("/admin/list-cars");
      } else {
        toast.error(response.error);
        console.error("Response does not contain data.");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const existFile = () => {
    console.log("image: " + carImages);
    if (Array.isArray(carImages)) {
      carImages.forEach((file) => {
        console.log("file here" + file.name);
      });
    }
    console.log("image: " + documents);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Basic
            formData={formData}
            setFormData={handleFormDataChange}
            onDocumentsChange={handleDocumentsChange}
          />
        );
      case 2:
        return (
          <Detail
            formData={formData}
            setFormData={handleFormDataChange}
            images={carImages}
            onImagesChange={handleImagesChange}
            handleCheckboxChange={handleCheckboxChange}
            addFunc={addFunc}
            setCarImages={setCarImages}
            setPreviewImage={setPreviewImage}
          />
        );
      case 3:
        return (
          <Pricing
            formData={formData}
            setFormData={handleFormDataChange}
            terms={terms}
            setTerms={setTerms}
            otherDetail={otherDetail}
            setOtherDetail={setOtherDetail}
          />
        );
      case 4:
        return (
          <Finish
            formData={formData}
            setFormData={handleFormDataChange}
            previewImage={previewImage}
          />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <Container>
      <h2>Add a car</h2>
      <div className="booking-page">
        {/* Process Bar */}
        <ProgressBar className="progress position-relative mb-4">
          <div className="progress-bar-label">{`Step ${step} of 4`}</div>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(step / 4) * 100}%` }}
            aria-valuenow={(step / 4) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </ProgressBar>

        <div className="step-content">{renderStep()}</div>

        <div className="d-flex justify-content-between mt-4">
          {step === 1 && (
            <Button variant="warning" onClick={handleCancel}>
              Cancel
            </Button>
          )}

          {step !== 1 && step !== 5 && (
            <Button variant="warning" onClick={handleBack}>
              &larr; Back
            </Button>
          )}

          {step === 4 ? (
            <Button variant="warning" onClick={handleNext}>
              Submit
            </Button>
          ) : step !== 4 ? (
            <Button variant="warning" onClick={handleNext}>
              Next →
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default AddCarPage;
