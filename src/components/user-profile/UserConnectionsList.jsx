import React from 'react';
import {
	Box
} from '@material-ui/core';
import ConnectionUser from "./ConnectionUser";

const UserConnectionsList = (props) => {
	return (
		<Box>
			{props.connections &&
				props.connections.map((item) => (
					<ConnectionUser key={item} userId={item}/>
				))
			}
		</Box>
	);
}

export default UserConnectionsList;
