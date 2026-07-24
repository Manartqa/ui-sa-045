import React from "react";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const SIDEBAR_WIDTH = 256;

export const SELECTED_MENU_KEY = "request-a4";

export const SIDEBAR_MENU_ITEMS: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "หน้าหลัก",
  },
  {
    key: "grp-request",
    type: "group",
    label: "ระบบคำขอ",
    children: [
      {
        key: "request",
        icon: <FileTextOutlined />,
        label: "คำขออนุญาต",
        children: [
          {
            key: "request-a6",
            label:
              "คำขออนุญาตผลิตเฉพาะส่วนประกอบของอาวุธเป็นการเฉพาะคราว แบบ อ.6",
          },
          {
            key: "request-a4",
            label:
              "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4",
          },
          {
            key: "request-a9",
            label:
              "คําขออนุญาตขนย้ายวัตถุหรืออาวุธที่ใช้ในการผลิตอาวุธหรืออาวุธที่ผลิตขึ้นฯ แบบ อ.9",
          },
          {
            key: "request-a14",
            label: "คําขออนุญาตขายหรือจําหน่ายอาวุธฯ นอกราชอาณาจักร แบบ อ.14",
          },
          {
            key: "request-a15",
            label: "คําขออนุญาตขายหรือจําหน่ายอาวุธฯ ในราชอาณาจักร แบบ อ.15",
          },
        ],
      },
    ],
  },
  {
    key: "grp-system",
    type: "group",
    label: "ระบบ",
    children: [
      {
        key: "operator-info",
        icon: <UserAddOutlined />,
        label: "ข้อมูลผู้ประกอบการ",
      },
    ],
  },
  {
    key: "grp-settings",
    type: "group",
    label: "การตั้งค่าระบบ",
    children: [
      {
        key: "general-settings",
        icon: <SettingOutlined />,
        label: "ตั้งค่าระบบทั่วไป",
      },
    ],
  },
];
