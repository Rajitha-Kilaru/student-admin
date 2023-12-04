import React, { useState, useEffect } from "react";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import './HomeAdmin.css'
import axios from "../../api";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const HomeAdmin = () => {

  const [enrolled, setEnrolled] = useState([1, 3]);
  const [count, setCount] = useState({ teachers: 0, students: 0 });

  useEffect(() => {
    axios
      .get("/admin/count")
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main style={{ padding: "0 1rem" }} className="main-container">
      <div className="main-title">
        <h3 className="main-text">Hi Admin</h3>
      </div>
      {enrolled?.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: "24px" }}>
          <h4 className="p-2">1 year - 1 semester</h4>
          <Table aria-label="courses table">
            <TableHead>
              <TableRow>
                <TableCell>subject</TableCell>
                <TableCell>subject</TableCell>
                <TableCell>subject</TableCell>
                <TableCell>subject</TableCell>
                <TableCell>subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrolled.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>111</TableCell>
                  <TableCell>222</TableCell>
                  <TableCell>333</TableCell>
                  <TableCell>444</TableCell>
                  <TableCell>
                    <Link to={`/student/${course?._id}`}>
                      <Button
                        variant="contained"
                        onClick={() => { }}
                      >
                        View Student Info
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : <div><Empty /></div>}
    </main>
  );
};

export default HomeAdmin;
