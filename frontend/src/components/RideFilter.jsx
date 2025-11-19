import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  Typography,
  TextField,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function RideFilter({
  filterType,
  setFilterType,
  maxPrice,
  setMaxPrice,
  departureTime,
  setDepartureTime,
}) {
  return (
    <div className="max-h-fit w-[35%] rounded-2xl border border-gray-300">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="filter-select-label">Sort By</InputLabel>
          <Select
            labelId="filter-select-label"
            value={filterType}
            label="Sort By"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="departure">Departure Time</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>

        {filterType === "departure" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={departureTime}
              onChange={setDepartureTime}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        )}

        {filterType === "price" && (
          <>
            <Typography>Maximum Price: ${maxPrice}</Typography>
            <Slider
              value={maxPrice}
              onChange={(e, newValue) => setMaxPrice(newValue)}
              valueLabelDisplay="auto"
              min={10}
              max={100}
              step={5}
              sx={{
                mt: 3,
                color: "#ffdd1f",
                "& .MuiSlider-thumb": {
                  color: "#ffdd1f",
                },
                "& .MuiSlider-track": {
                  color: "#ffdd1f",
                },
                "& .MuiSlider-rail": {
                  color: "#d4d4d4",
                },
              }}
            />
          </>
        )}
      </Box>
    </div>
  );
}

export default RideFilter;
