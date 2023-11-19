import { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import handleErrorMessage from "../../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../../config/https";
import { useDispatch } from "react-redux";
import ASelect from "../../ASelect";

const initialValues = {
  name: "",
  province: {
    _id: "",
    name: "",
  },
  regency: {
    _id: "",
    name: "",
  },
  district: {
    _id: "",
    name: "",
  },
  village: {
    _id: "",
    name: "",
  },
  passcode: "",
  address: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Field name is required").min(5),
  province: Yup.object().shape({
    _id: Yup.string().required("Field province is required"),
  }),
  regency: Yup.object().shape({
    _id: Yup.string().required("Field regency is required"),
  }),
  district: Yup.object().shape({
    _id: Yup.string().required("Field district is required"),
  }),
  village: Yup.object().shape({
    _id: Yup.string().required("Field village is required"),
  }),
  passcode: Yup.string().required("Field passcode is required")
});

export default function FormAddress() {
  const dispatch = useDispatch();

  // GET PROVINCE
  const [isLoadProvince, setIsLoadProvince] = useState(true);
  const [dataProvince, setDataProvince] = useState([]);
  useEffect(() => {
    if (isLoadProvince) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/provinces`)
        .then((response) => {
          setDataProvince(response.data.data);
        })
        .catch((error) => {
          const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          // SET LOADING
          dispatch({ type: "SET_LOADING", value: false });
          setIsLoadProvince(false);
        });
    }
  }, [isLoadProvince, dispatch]);

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  function handleIsError(key, sub_key) {
    if (sub_key)
      return (
        formik.touched[key] &&
        formik.errors[key] &&
        formik.touched[key][sub_key] &&
        formik.errors[key][sub_key]
      );

    return formik.touched[key] && formik.errors[key];
  }

  function handleChangeProvince(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataProvince.find(
      (province) => province.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");

    if (findByID) getOptionsRegency(findByID.id);

    formik.setFieldValue("regency", { _id: "", name: "" });
    formik.setFieldValue("district", { _id: "", name: "" });
    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // GET REGENCY
  const [dataRegency, setDataRegency] = useState([]);
  function getOptionsRegency(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/regencies/${id}`)
      .then((response) => {
        setDataRegency(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  function handleChangeRegency(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataRegency.find(
      (regency) => regency.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");

    if (findByID) getOptionsDistrict(findByID.id);

    formik.setFieldValue("district", { _id: "", name: "" });
    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // GET DISTRICT
  const [dataDistrict, setDataDistrict] = useState([]);
  function getOptionsDistrict(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/district/${id}`)
      .then((response) => {
        setDataDistrict(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  function handleChangeDistrict(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataDistrict.find(
      (district) => district.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");

    if (findByID) getOptionsVillage(findByID.id);

    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // GET VILLAGE
  const [dataVillage, setDataVillage] = useState([]);
  function getOptionsVillage(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/villages/${id}`)
      .then((response) => {
        setDataVillage(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  function handleChangeVillage(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataVillage.find((village) => village.id === event.target.value);
    formik.setFieldValue(key, findByID ? findByID.name : "");
  }
  
  const navigate = useNavigate()
  // SUBMIT
  function handleOnSubmit(payload) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/address/new`, payload)
      .then((response) => {
        navigate('/address');
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  return (
    <Card className="p-4">
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            {/* NAME */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="name" className="mb-2">
                  Name
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleIsError("name") && "border-danger"}
                />

                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger text__5">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* PROVINCE */}
            <Col md="6">
              <ASelect
                id="province"
                label="province"
                name="province._id"
                value={formik.values.province._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeProvince(event, keyChange)
                }
                keyChange="province.name"
                isError={handleIsError("province", "_id")}
                msgError={formik.errors.province && formik.errors.province._id}
                options={dataProvince}
              />
            </Col>

            {/* REGENCY */}
            <Col md="6">
              <ASelect
                id="regency"
                label="regency"
                name="regency._id"
                value={formik.values.regency._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeRegency(event, keyChange)
                }
                keyChange="regency.name"
                isError={handleIsError("regency", "_id")}
                msgError={formik.errors.regency && formik.errors.regency._id}
                options={dataRegency}
              />
            </Col>

            {/* DISTRICT */}
            <Col md="6">
              <ASelect
                id="district"
                label="district"
                name="district._id"
                value={formik.values.district._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) =>
                  handleChangeDistrict(event, keyChange)
                }
                keyChange="district.name"
                isError={handleIsError("district", "_id")}
                msgError={formik.errors.district && formik.errors.district._id}
                options={dataDistrict}
              />
            </Col>

            {/* VILLAGE */}
            <Col md="6">
              <ASelect
                id="village"
                label="village"
                name="village._id"
                value={formik.values.village._id}
                onBlur={formik.handleBlur}
                handleChange={(event, keyChange) => handleChangeVillage(event, keyChange)}
                keyChange="village.name"
                isError={handleIsError("village", "_id")}
                msgError={formik.errors.village && formik.errors.village._id}
                options={dataVillage}
              />
            </Col>

            {/* PASSCODE */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="passcode" className="mb-2">
                  Passcode
                </Form.Label>
                <Form.Control
                  id="passcode"
                  name="passcode"
                  type="text"
                  placeholder="Passcode"
                  value={formik.values.passcode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  maxLength="5"
                  className={handleIsError("passcode") && "border-danger"}
                />

                {formik.touched.passcode && formik.errors.passcode && (
                  <small className="text-danger text__5">
                    {formik.errors.passcode}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* ADDRESS */}
            <Col md="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="address" className="mb-2">
                  Address
                </Form.Label>
                <Form.Control
                  as="textarea" 
                  rows={3}
                  id="address"
                  name="address"
                  placeholder="Input your address"
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  maxLength="100"
                  className={handleIsError("passcode") && "border-danger"}
                />

                {formik.touched.address && formik.errors.address && (
                  <small className="text-danger text__5">
                    {formik.errors.address}
                  </small>
                )}
              </Form.Group>
            </Col>

            <Col xs="12">
              <Button type="submit" variant="success">
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
