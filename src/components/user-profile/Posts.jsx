import React, { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Post from "../user-profile/Post";
import { GlobalContext } from "../../context/GlobalContext";
import { GET } from "../../actions/api";

export default function Posts(props) {
  const { session } = useContext(GlobalContext);

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await GET('/posts', session.token);
			const result = await response.json();
			let posts = [];
			for (let i = 0; i < result.length; i++) {
				if (result[i].user === props.userId) {
					posts = [...posts, result[i]];
				}
			}
			setPosts(posts);
		})();
	}, [props.userId, session.token]);

	return(
		<Fragment>
			{posts.map((item) => (
				<Post
					key={item.id}
					id={item.id}
					content={item.content}
					userFirstName={props.userFirstName}
					userLastName={props.userLastName}
					userPicture={props.userPicture}
					userCrop={props.userCrop}/>
			))}
		</Fragment>
	);
}
