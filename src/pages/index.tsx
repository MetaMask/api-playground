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
        <br />
        <Typography variant="h1">MetaMask JSON-RPC</Typography>
        <Typography gutterBottom style={{ paddingTop: "100px", paddingBottom: "20px" }} variant="inherit">
          This API lets you interact with MetaMask via JSON-RPC
        </Typography>
        <br />
        <Link
          component={(props: { children: any }) => (
            <GatsbyLink to={"/api-documentation"} style={{ textDecoration: "none", color: grey[500], marginRight: "10px" }} activeStyle={{ color: grey[500] }}>
              {props.children}
            </GatsbyLink>
          )}>
          <Button variant="contained" color="primary">API Reference Documentation</Button>
        </Link>
        <br />
        <br />
        <br />
      </Grid>
    </>
  );
};

export default MyApp;
