import React, { Fragment } from 'react';
import Comment from "../user-profile/Comment";

export default function Comments(props) {
	return(
		<Fragment>
			{props.comments.map((item) => (
				<Comment
					key={item.id}
					id={item.id}
					content={item.content}
					date={item.created_on}
					userId={item.user}/>
			))}
		</Fragment>
	);
}
