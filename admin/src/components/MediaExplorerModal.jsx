import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UserForm from '../routes/Users/UserForm';
import MediaExplorer from './MediaExplorer';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
  },
}));

export default function MediaExplorerModal({ open, setOpen, onSelectImage }) {
  const classes = useStyles();

  const handleClose = (imagePath) => {
    setOpen(false);
    onSelectImage(imagePath);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <div className={classes.paper}>
          <MediaExplorer onSelect={handleClose} noTitle browser={false} />
        </div>
      </Fade>
    </Modal>
  );
}
