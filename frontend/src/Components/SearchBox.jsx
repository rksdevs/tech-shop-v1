import { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <TextField
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className="mr-sm-2 ml-sm-5"
        label="Search"
        id="outlined-size-small"
        size="small"
        InputLabelProps={{
          sx: {
            "&.Mui-focused": {
              color: "#CE5A67", // Change 'your_focus_label_color_here' to your desired focus label color
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#CE5A67", // Change 'your_focus_color_here' to your desired focus color
            },
        }}
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#CE5A67", color: "#fff" }}
      >
        Go
      </Button>
    </Form>
  );
};

export default SearchBox;
