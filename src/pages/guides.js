import React from "react";
import Grid from "@material-ui/core/Grid";
import PlantWikiCard from "../components/PlantWikiCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    padding: "20px 20px 20px 20px",
    background: "rgba(250, 243, 221, 0.85)",
    borderRadius: "10px",
    width: '50%',
  },
}));


const Guides = () => {
  const classes = useStyles();
  const plantArr = [
    "BakChoy",
    "Bayam",
    "KaiLan",
    "KangKong",
    "Lettuce",
    "Tomato",
  ];

  const recipeArr = [
    "Baked Tuna Stuffed Tomatoes",
    "Iceberg Lettuce With Oyster Sauce",
    "Spaghetti With Tomato, Chilli And Squid",
    "Kang Kong Sambal Belacan",
  ]; //added on 27/12/21 & added a recipe on 12/1/22

  return (
   
    <Grid container spacing={2} justify="space-evenly" className={classes.container}>
        <Grid container justify="space-between">  
        <Typography inline variant="h4" align="center">Plants</Typography>
        </Grid> {/*added on 31/12/21*/}
      {plantArr.map((name, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
            key={index}
          >
            <PlantWikiCard name={name} />
          </Grid>
        );
      })}

 
  <Grid container justify="space-between">  
  <Typography inline variant="h4" align="center">Recipes</Typography>
  </Grid> {/*added on 27/12/21*/}


            {recipeArr.map((name, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
            key={index}
          >
            <PlantWikiCard name={name} />
          </Grid> /*added on 27/12/21*/
        );
      })}
      
  <Grid container justify="space-between">  
  <Typography inline variant="h5" align="left">Have a recipe or information you would like to share? Let us know on ...</Typography>
  </Grid> {/*added on 4/1/22*/}

    </Grid>
  );
};




export default Guides;
