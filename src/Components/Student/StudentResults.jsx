import React, { useEffect, useState } from "react";
import { Empty } from 'antd';
import './index.css'
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
import axios from "../../api";

const StudentResults = () => {
  const [enrolled, setEnrolled] = useState([1, 3]);

  const fetchData = async () => {
    const { data } = await axios.get("/student");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h1 className="main-text">Academic Results</h1>
      </div>
      <div className="student-info">
        <>
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
                      <TableCell>
                        1111
                      </TableCell>
                      <TableCell>
                        222
                      </TableCell>
                      <TableCell>333</TableCell>
                      <TableCell>444</TableCell>
                      <TableCell>dddd
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>) : <div><Empty /></div>}
        </>
      </div>
    </main>
  );
};

export default StudentResults;
