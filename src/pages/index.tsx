import React, { useEffect } from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import Link from "@material-ui/core/Link";
import { grey } from "@material-ui/core/colors";

const MyApp: React.FC = () => {
  return (
    <>
      <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
        <img className="logo" alt="logo" src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg" style={{ paddingTop: "10%", height: "400px" }} />
        <br/>
        <Typography variant="h1">Metamask JSON-RPC</Typography>
        <Typography gutterBottom style={{ paddingTop: "100px", paddingBottom: "20px" }} variant="inherit">
          This API lets you interact with an EVM-based network via JSON-RPC
        </Typography>
        <br/>
        <Button variant="contained" color="primary" href="/api-documentation">
          API Reference Documentation
        </Button>
        <br />
        <br />
        <br />
      </Grid>
    </>
  );
};

export default MyApp;
