import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
	Box,
	Grid,
	Button
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext } from "../../context/GlobalContext";
import { GET, POST, DELETE } from "../../actions/api";

const ConnectInteraction = (props) => {
	const classes = useStyles();
	const { session } = useContext(GlobalContext);

	// 0 = default, 1 = connected, 2 = request sent, 3 = request received
	const [connectionState, setConnectionState] = useState(-1);
	const [connectionId, setConnectionId] = useState(null);
	const [requestId, setRequestId] = useState(null);
	const [isHovering, setIsHovering] = useState(false);

	useEffect(
		() => {
			(async () => {
				const user1 = props.user1;
				const user2 = props.user2;
				let response = await GET('/connections', session.token);
				const connections = await response.json();

				for(let i = 0; i < connections.length; i++) {
					if(
						 (connections[i].user1 === user1 &&
						 connections[i].user2 === user2) ||
						 (connections[i].user1 === user2 &&
						 connections[i].user2 === user1)
					 ) {
						 setConnectionState(1); //connected
						 setConnectionId(connections[i].id);
						 return;
					}
				}

				response = await GET('/requests', session.token);
				const requests = await response.json();

				for(let i = 0; i < requests.length; i++) {
					if(
						requests[i].sender === user1 &&
						requests[i].receiver === user2) {
							setConnectionState(2); //request sent
							setRequestId(requests[i].id);
							return;
					}
					else if(
						requests[i].sender === user2 &&
						requests[i].receiver === user1) {
							setConnectionState(3); //request received
							setRequestId(requests[i].id);
							return;
					}
				}

				setConnectionState(0); //default
			})();
		},
		[session.token, props.user1, props.user2]
	);

	const handleAddConnection = async () => {
		let body = {
			sender: props.user1,
			receiver: props.user2
		};

		const response = await POST('/requests', body, session.token);
		const result = await response.json();
		setConnectionState(2);
		setRequestId(result.id);
	}

	const handleRemoveConnection = async () => {
		await DELETE(`/connections/${connectionId}`, session.token);
		setConnectionState(0);
		setConnectionId(null);
	}

	const handleCancelRequest = async () => {
		await DELETE(`/requests/${requestId}`, session.token);
		setConnectionState(0);
		setRequestId(null);
	}

	const handleAccept = async () => {
		let body = {
			user1: props.user2, //In DB, user1: who sent
			user2: props.user1 //In DB, user2: who accepted
		};

		const response = await POST('/connections', body, session.token);
		const result = await response.json();
		setConnectionState(1);
		setConnectionId(result.id);
		await DELETE(`/requests/${requestId}`, session.token);
		setRequestId(null);
	}

	const handleReject = async () => {
		await DELETE(`/requests/${requestId}`, session.token);
		setConnectionState(0);
	}

	return (
		<Grid item xs={12}>
			{
				connectionState === 0 &&
				<Button variant="outlined" color="default" onClick={handleAddConnection}>
					Add as connection
				</Button>
			}
			{
				connectionState === 1 &&
				<Button
					variant="outlined"
					color="default"
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					onClick={handleRemoveConnection}>
					{
						!isHovering ?
						<>
							Connected
							<DoneIcon className={classes.connectionIcon}/>
						</>
						:
						<>
							Remove connection
							<CloseIcon className={classes.connectionIcon}/>
						</>
					}
				</Button>
			}
			{
				connectionState === 2 &&
				<Box>
					You have sent a connection request
					<Button
						className={classes.requestButton}
						variant="outlined"
						color="default"
						onClick={handleCancelRequest}>
						Cancel Request
					</Button>
				</Box>
			}
			{
				connectionState === 3 &&
				<Box>
					{props.userFirstName} wants to connect with you
					<Box display="flex" justifyContent="space-evenly">
						<Button
							className={classes.requestButton}
							variant="outlined"
							color="default"
							onClick={handleAccept}>
							Accept
						</Button>
						<Button
							className={classes.requestButton}
							variant="outlined"
							color="default"
							onClick={handleReject}>
							Reject
						</Button>
					</Box>
				</Box>
			}
		</Grid>
	);
}

const useStyles = makeStyles(() => ({
  connectionIcon: {
    marginLeft: 10
  },
	requestButton: {
		marginTop: 10
	}
}));

export default ConnectInteraction;
