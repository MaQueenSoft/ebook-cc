import moment from "moment";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { GrCheckmark } from "react-icons/gr";
import { capitalise } from "../../utilities/utilities";
import { useState } from "react";
import { Switch } from '@headlessui/react'


export const category_columns = ({ onDeleteOpen, handleDrawer }) => [
  {
    Header: "Category Name",
    accessor: (d) => capitalise(d.category_name),
  },

  {
    Header: "Banner",
    accessor: "category_banner_path",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      return (
        <>
          <img src={cell.row.original.category_banner_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Logo",
    accessor: "category_logo_path",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      return (
        <>
          <img src={cell.row.original.category_logo_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Status",
    accessor: "category_status",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      const status = cell.row.original.category_status;
      return (
        <>
          {
            status ? 'Active' : 'Inactive'
          }
        </>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      return (
        <>
          <Link
            onClick={() => handleDrawer("edit", cellId, cell.row.original)}
            className="inline-flex px-2 ml-3 text-xs leading-5 text-indigo-600 bg-indigo-100 rounded-full"
          >
            <button
              className="text-indigo-900 "
              size="default"
              variant="outlined"
            >
              Edit<span className="sr-only">, </span>
            </button>
          </Link>

          <span className="inline-flex px-2 ml-3 text-xs leading-5 text-red-600 bg-red-100 rounded-full">
            <button
              onClick={() => {
                onDeleteOpen(cellId);
              }}
              size="default"
              variant="outlined"
            >
              Delete
              <span className="sr-only">, </span>
            </button>
          </span>
        </>
      );
    },
  },
];

export const sub_category_columns = ({ onDeleteOpen, handleDrawer }) => [
  {
    Header: "Category Name",
    accessor: (d) => capitalise(d.sub_category_name),
  },

  {
    Header: "Banner",
    accessor: "category_banner_path",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      return (
        <>
          <img src={cell.row.original.sub_category_banner_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Logo",
    accessor: "category_logo_path",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      return (
        <>
          <img src={cell.row.original.sub_category_logo_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Status",
    accessor: "category_status",
    Cell: (cell) => {
      const cellId = cell.row.original.category_id;
      const status = cell.row.original.sub_category_status;
      return (
        <>
          {
            status ? 'Active' : 'Inactive'
          }
        </>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: (cell) => {
      const cellId = cell.row.original.subcategory_id;
      return (
        <>
          <Link
            onClick={() => handleDrawer("edit", cellId, cell.row.original)}
            className="inline-flex px-2 ml-3 text-xs leading-5 text-indigo-600 bg-indigo-100 rounded-full"
          >
            <button
              className="text-indigo-900 "
              size="default"
              variant="outlined"
            >
              Edit<span className="sr-only">, </span>
            </button>
          </Link>

          <span className="inline-flex px-2 ml-3 text-xs leading-5 text-red-600 bg-red-100 rounded-full">
            <button
              onClick={() => {
                onDeleteOpen(cellId);
              }}
              size="default"
              variant="outlined"
            >
              Delete
              <span className="sr-only">, </span>
            </button>
          </span>
        </>
      );
    },
  },
];

export const game_columns = ({ onDeleteOpen, handleDrawer }) => [
  {
    Header: "Game Name",
    accessor: (d) => capitalise(d.game_name),
  },

  {
    Header: "Banner",
    accessor: "game_banner_path",
    Cell: (cell) => {
      const cellId = cell.row.original.game_id;
      return (
        <>
          <img src={cell.row.original.game_banner_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Logo",
    accessor: "game_logo_path",
    Cell: (cell) => {
      const cellId = cell.row.original.game_id;
      return (
        <>
          <img src={cell.row.original.game_logo_path} width="30%" height="10%" />
        </>
      );
    },
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: (cell) => {
      const cellId = cell.row.original.game_id;
      return (
        <>
          <Link
            onClick={() => handleDrawer("edit", cellId, cell.row.original)}
            className="inline-flex px-2 ml-3 text-xs leading-5 text-indigo-600 bg-indigo-100 rounded-full"
          >
            <button
              className="text-indigo-900 "
              size="default"
              variant="outlined"
            >
              Edit<span className="sr-only">, </span>
            </button>
          </Link>

          <span className="inline-flex px-2 ml-3 text-xs leading-5 text-red-600 bg-red-100 rounded-full">
            <button
              onClick={() => {
                onDeleteOpen(cellId);
              }}
              size="default"
              variant="outlined"
            >
              Delete
              <span className="sr-only">, </span>
            </button>
          </span>
        </>
      );
    },
  },
];