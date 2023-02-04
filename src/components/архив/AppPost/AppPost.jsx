//AppPost
import React, { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import { styled } from '@mui/material/styles';
import { Avatar, Card, CardContent, CardHeader, Grid, CardMedia, IconButton, Typography, CardActions, Collapse } from "@mui/material";

import { ExpandMore, Favorite, MoreVert, Share } from "@mui/icons-material";

import s from './styles.module.css';

dayjs.locale('ru');
const ExpandMoreStyle = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
  })(({ expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
  }));


export function AppPost({image, title, text, author:{name, email}, created_at }) {
	const [expanded, setExpanded] = useState(false);

	const date = dayjs(created_at);

	const handleExpandClick = () => {
	  setExpanded(!expanded);
	};

	return (
		<Grid container item xs={2} sm={4} md={3} >
			<Card className={s.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe">
						{email.slice(0,1)}
						</Avatar>
					}
					title={email}
					subheader={date.format('dddd, MMMM DD YYYY')}
				/>
				<CardMedia
					component="img"
					height="194"
					image={image}
					alt="Paella dish"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary" noWrap>
						{text}
					</Typography>
				</CardContent>
				<CardActions disableSpacing sx={{ marginTop: "auto" }}>
					<IconButton aria-label="add to favorites">
						<Favorite />
					</IconButton>
					<ExpandMoreStyle
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMore/>
					</ExpandMoreStyle>
				</CardActions>

				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
					<Typography paragraph>
						{text}
					</Typography>
					</CardContent>
				</Collapse>
			</Card>
		</Grid>
	);
}
