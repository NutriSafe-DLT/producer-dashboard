import { InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React from "react";
import Controls from "./controls/Controls";

const SearchInputField = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <Controls.Input
      label="Search"
      value={searchTerm}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInputField;
