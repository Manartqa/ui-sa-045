"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { HOME_BREADCRUMB_ITEMS } from "./Home.config";

export default function HomeHeader() {
  return <Breadcrumb items={HOME_BREADCRUMB_ITEMS} />;
}
