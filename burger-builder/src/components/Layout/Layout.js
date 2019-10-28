import React from 'react';

import classes from './Layout.module.css';

const layout = props => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default layout;
