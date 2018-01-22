import React from 'react';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import CommentIcon from 'material-ui-icons/Comment';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import styles from 'pages/AllHtml/allHtml.scss';


const AllHtmlPage = () => {
  return (
    <div>
      <AppBar position="static" color="default" >
        <Toolbar>
          <Typography type="title" >
            Title
          </Typography>
        </Toolbar>
      </AppBar>
      <hr />
      <div>
        <Button raised className={styles.button}>
          Default
        </Button>
        <Button raised color="primary" className={styles.button}>
          Primary
        </Button>
        <Button raised color="accent" className={styles.button}>
          Accent
        </Button>
        <Button raised color="contrast" className={styles.button}>
          Contrast
        </Button>
        <Button raised color="accent" disabled className={styles.button}>
          Disabled
        </Button>
        <input
          style={{ display: 'none' }}
          accept="image/*"
          className={styles.input}
          id="raised-button-file"
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button raised component="span" className={styles.button}>
            Upload
          </Button>
        </label>
        <Button raised dense className={styles.button}>
          Dense
        </Button>
        <hr />
        <Button className={styles.button}>Default</Button>
        <Button color="primary" className={styles.button}>
          Primary
        </Button>
        <Button color="accent" className={styles.button}>
          Accent
        </Button>
        <Button color="contrast" className={styles.button}>
          Contrast
        </Button>
        <Button disabled className={styles.button}>
          Disabled
        </Button>
        <Button href="#flat-buttons" className={styles.button}>
          Link
        </Button>
        <Button disabled href="/" className={styles.button}>
          Link disabled
        </Button>
        <Button dense className={styles.button}>
          Dense
        </Button>
        <Button className={styles.button} >
          Does something
        </Button>
        <hr />
        <Button fab color="primary" aria-label="add" className={styles.button}>
          <AddIcon />
        </Button>
        <Button fab mini color="primary" aria-label="add" className={styles.button}>
          <AddIcon />
        </Button>
        <Button fab color="accent" aria-label="edit" className={styles.button}>
          <ModeEditIcon />
        </Button>
        <Button fab mini color="accent" aria-label="edit" className={styles.button}>
          <ModeEditIcon />
        </Button>
        <Button fab disabled aria-label="delete" className={styles.button}>
          <DeleteIcon />
        </Button>
        <Button fab mini disabled aria-label="delete" className={styles.button}>
          <DeleteIcon />
        </Button>
      </div>
      <hr />
      <div>
        <Badge className={styles.badge} badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
        <Badge className={styles.badge} badgeContent={10} color="accent">
          <MailIcon />
        </Badge>
        <IconButton>
          <Badge className={styles.badge} badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </IconButton>
      </div>
      <hr />
      <Card className={styles.card} >
        <CardContent>
          <Typography>Word of the Day</Typography>
          <Typography type="headline" component="h2">
            be•nev•o•lent
          </Typography>
          <Typography>adjective</Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Learn More</Button>
        </CardActions>
      </Card>
      <hr />
      <Chip label="Basic Chip 1" className={styles.chip} />
      <Chip label="Basic Chip 2" className={styles.chip} />
      <hr />
      <List>
        {[ 0, 1, 2, 3 ].map((value) => (
          <ListItem
            key={value}
            dense
            button
          >
            <Checkbox
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {[ 0, 1, 2, 3 ].map((value, index) => (
          <ListItem
            key={value}
            dense
            button
          >
            <Checkbox
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <Switch
                checked={Boolean(index % 2)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <hr />
      <CircularProgress className={styles.progress} />
      <CircularProgress className={styles.progress} size={50} />
      <CircularProgress className={styles.progress} color="accent" />
      <CircularProgress className={styles.progress} style={{ color: purple[500] }} thickness={7} />
      <hr />
      <LinearProgress />
      <br />
      <LinearProgress color="accent" />
      <hr />
    </div>
  );
};

export default AllHtmlPage;
