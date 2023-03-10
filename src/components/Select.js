import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  selectOptions,
  setSegmentType,
  segmentType,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSegmentType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Segment Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={segmentType}
          onChange={handleChange}
          input={<OutlinedInput label="Segment Type" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {selectOptions.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                <Checkbox checked={segmentType.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
