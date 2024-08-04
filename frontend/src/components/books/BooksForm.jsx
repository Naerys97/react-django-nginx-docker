import { Form, Formik } from "formik";
import { Button, Col, Container, Divider, FlexboxGrid, Row } from "rsuite";
import * as yup from "yup";

import { useGetAuthorsQuery } from "../../features/authors/authorsApi";
import { useGetGenresQuery } from "../../features/genres/genresApi";
import { useGetEditorialsQuery } from "../../features/editorials/editorialsApi";
import FormControls from "../common/FormControls";
import { FiCheck, FiRotateCcw } from "react-icons/fi";

function BooksForm(props) {
  const { bookData, onSubmit } = props;

  const initialValues = bookData || {
    title: "",
    authors: [],
    amount: 1,
    description: "",
    quality: "",
    genres: [],
    details: "",
    editorial: "",
    language: "",
    cover: null,
  };

  const quality = ["Excellent", "Good", "Regular", "Bad"];

  const language = ["English", "Spanish", "French", "Russian"];

  const {
    isLoading,
    isFetching,
    data: authors = [],
    isSuccess,
  } = useGetAuthorsQuery();

  const { data: genres = [] } = useGetGenresQuery();
  const { data: editorial = [] } = useGetEditorialsQuery();

  const validationSchema = yup.object({
    title: yup.string().required("This field is required!"),
    authors: yup.array().required("This field is required!"),
    amount: yup
      .number()
      .required("This field is required!")
      .positive()
      .min(1, "Amount must be greater than 0"),
    description: yup.string().required("This field is required!"),
    quality: yup.string().required("This field is required!"),
    genres: yup.array(),
    details: yup.string(),
    editorial: yup.number().positive(),
    language: yup.string(),
    cover: yup.mixed().nullable(),
  });

  const authorsOptions =
    isSuccess &&
    authors.map((author) => ({
      value: author.id,
      label: author.name,
    }));

  const genresOptions = genres.map((g) => ({
    value: g.id,
    label: g.genre,
  }));

  const editorialsOptions = editorial.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  return (
    <>
      <Container style={{ margin: "0px 2%", padding: "10px" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValidating }) => (
            <Form>
              <Row gutter={40}>
                <Col className="form-cols" xs={24} sm={24} md={8}>
                  <FormControls control="text" name="title" label="Title" />
                </Col>
                <Col className="form-cols" xs={24} sm={12} md={8}>
                  <FormControls
                    control="creatable"
                    name="authors"
                    label="Authors"
                    options={authorsOptions}
                    isLoading={isLoading || isFetching}
                  />
                </Col>
                <Col className="form-cols" xs={24} sm={12} md={8}>
                  <FormControls control="number" name="amount" label="Amount" />
                </Col>
              </Row>

              <Row gutter={40}>
                <Col className="form-cols" xs={24} md={8}>
                  <FormControls
                    control="multi"
                    name="genres"
                    label="Genres"
                    data={genresOptions}
                  />
                </Col>
                <Col className="form-cols" xs={24} md={8}>
                  <FormControls
                    control="select"
                    name="editorial"
                    label="Editorial"
                    data={editorialsOptions}
                  />
                </Col>
                <Col className="form-cols" xs={24} md={8}>
                  <FormControls
                    control="select"
                    name="language"
                    label="Language"
                    data={language.map((v) => ({
                      label: v,
                      value: v,
                    }))}
                  />
                </Col>
              </Row>

              <Row gutter={40}>
                <Col className="form-cols" xs={24} md={12}>
                  <FormControls
                    control="textarea"
                    name="description"
                    label="Description"
                  />
                </Col>
                <Col className="form-cols" xs={24} md={12}>
                  <FormControls
                    control="textarea"
                    name="details"
                    label="Details"
                  />
                </Col>
              </Row>
              <Row gutter={40}>
                <Col className="form-cols" xs={24} sm={12} md={12} lg={8}>
                  <FormControls
                    control="radio"
                    name="quality"
                    label="Quality"
                    options={quality.map((i) => ({
                      label: i,
                      value: i.toLowerCase(),
                    }))}
                  />
                </Col>
                <Col className="form-cols" xs={24} sm={12} md={12} lg={14}>
                  <FormControls
                    control="upload"
                    name="cover"
                    label="Cover"
                    accept="image/*"
                  />
                </Col>
              </Row>
              <Divider />
              <FlexboxGrid as={Row} gutter={10} justify="end">
                <Col>
                  <Button
                    appearance="primary"
                    type="submit"
                    className="button-blue"
                    startIcon={<FiCheck />}
                    disabled={isSubmitting || isValidating}
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="reset"
                    appearance="primary"
                    className="button-red"
                    startIcon={<FiRotateCcw />}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                </Col>
              </FlexboxGrid>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default BooksForm;
