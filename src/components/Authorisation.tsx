'use client';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Register from './Register';
import Login from './Login';

import 'react-tabs/style/react-tabs.css';
type Props = {};
// https://www.npmjs.com/package/react-tabs
export default function Authorisation({}: Props) {
  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Register</Tab>
      </TabList>

      <TabPanel>
        <Login />
      </TabPanel>
      <TabPanel>
        <Register />
      </TabPanel>
    </Tabs>
  );
}
