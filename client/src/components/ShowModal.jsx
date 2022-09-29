import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateUserShowsDb } from "./FeaturedSeries";
import { updateUserShows } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ScrollDialog(props) {
  const dispatch = useDispatch();
  const item = props.item;
  const user = props.user;
  console.log(item);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const clickHandler = (likedMovieId, currentUser) => {
    dispatch(updateUserShows(likedMovieId));
  };

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>More</Button>
      {/* <Button onClick={handleClickOpen("body")}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{item.name}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
          <p>Release Date: {item.first_air_date}</p>
          <p>Rating: {item.vote_average}</p>
          <h4>Overview</h4>
          <p>{item.overview}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              clickHandler(String(item.id), user);
              updateUserShowsDb(user);
            }}
          >
            Like
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
