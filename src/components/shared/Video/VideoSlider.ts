import {withStyles} from '@mui/styles';
import {Slider} from '@mui/material';

const styles = {
  root: {
    color: '#aaaaaa',
    height: 3,
    padding: '2px 0',
  },
  track: {
    height: 4,
    borderRadius: 2,
    color: '#f32d36',
  },
  thumb: {
    color: '#f32d36',
  },
};

export default withStyles(styles)(Slider);
