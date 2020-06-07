import React, { useState, useEffect, useContext } from "react";
import SkillsSettings from "./SkillsSettings";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Dialog,
  Typography,
  Button,
  List,
  ListItem,
  ListSubheader,
  Grid,
  Paper
} from "@material-ui/core";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

const UserSkillsList = props => {
  const classes = useStyles();
  const { session } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(
    () => {
      (async () => {
        const response = await GET("/skills", session.token);
        const result = await response.json();
        let skills = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].user === props.userId) {
            skills = [...skills, result[i]];
          }
        }
        setSkills(skills);
      })();
    },
    [props.userId, session.token, open]
  );

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" align="left" color="textPrimary">
          Skills
        </Typography>
        {props.isProfileSelf && (
          <Button className={classes.editBtn} onClick={handleClickOpen}>
            <EditIcon style={{ fontSize: 16 }} />
          </Button>
        )}
        <Dialog
          fullWidth
          maxWidth="xs"
          onClose={handleClickClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <List
            subheader={
              <ListSubheader>
                <Typography
                  component="span"
                  variant="button"
                  className={classes.dialog}
                >
                  Skills
                </Typography>
              </ListSubheader>
            }
          >
            <SkillsSettings />
          </List>
        </Dialog>
      </Box>
      <List disablePadding>
        {skills.map(skill => (
          <ListItem className={classes.listItem} key={skill.name}>
            <Typography variant="body2">{skill.name}</Typography>
          </ListItem>
        ))}
        {skills <= 0 && props.isProfileSelf && (
          <Grid className={classes.item} item xs={12}>
            <Paper elevation={false} className={classes.paper}>
              <Typography
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 12,
                  color: "#bab8b8",
                  wordBreak: "break-word"
                }}
              >
                Add your skills here
              </Typography>
            </Paper>
          </Grid>
        )}
        {skills <= 0 && !props.isProfileSelf && (
          <Grid className={classes.item} item xs={12}>
            <Paper elevation={false} className={classes.paper}>
              <Typography
                style={{
                  textAlign: "center",
                  margin: 10,
                  fontSize: 12,
                  color: "#bab8b8",
                  wordBreak: "break-word"
                }}
              >
                No skills to show
              </Typography>
            </Paper>
          </Grid>
        )}
      </List>
    </Box>
  );
};

export default UserSkillsList;

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(0.5, 0, 0.5, 0)
  },
  editBtn: {
    padding: 0,
    minWidth: 28,
    width: 28,
    height: 28,
    borderRadius: "50%"
  },
  paper: {
    padding: theme.spacing(4, 0, 4, 0),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main
  },
  item: {
    marginBottom: "0.625rem"
  }
}));
