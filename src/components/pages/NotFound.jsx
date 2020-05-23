import React from 'react';
import { Link } from "react-router-dom";
import
{
	Box,
  Button,
	Typography
}
from '@material-ui/core'

export default function DevboatDescription() {
	return(
		<Box mt={30} textAlign="center">
			<Typography variant="h3">404 Not Found</Typography>
  		<Typography variant="body1">
        Sorry the page you are looking for does not exist.
      </Typography>
      <Box width={1} mt={10} align="center ">
        <Link to="/">
          <Button
            variant="contained"
            className="btn btn-success"
          >
            <Box px={8}>Go to home</Box>
          </Button>
        </Link>
      </Box>
    </Box>
	);
}
