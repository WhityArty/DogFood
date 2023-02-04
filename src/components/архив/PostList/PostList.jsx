import { Grid } from '@mui/material';
import React from 'react';

import { AppPost } from '../AppPost/AppPost';
import { postData } from './Posts';

export const PostList = (props) => {

    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
                {postData && postData.map((item) => (
                    <AppPost key={item.id} {...item} />
                ))}
				</Grid>
    );
};

export default PostList;
