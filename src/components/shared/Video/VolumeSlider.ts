import {withStyles} from '@mui/styles';
import {Slider} from '@mui/material';

const styles = {
  root: {
    color: '#aaaaaa',
    height: 3,
    padding: '13px 0',
  },
  track: {
    height: 4,
    borderRadius: 2,
    color: '#ffffff',
  },
  thumb: {
    color: '#ffffff',
  },
};

export default withStyles(styles)(Slider);
