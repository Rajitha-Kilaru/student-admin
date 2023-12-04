import "../../styles/home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api";
import { ImProfile } from "react-icons/im";
import "./index.css";
import {
  Grid,
} from "@mui/material";
import { getStudentDetails } from "../../redux/reducers/user";

const HomeStudent = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.data?.user);
  const token = useSelector((state) => state?.user?.data?.token);
  const student = useSelector((state) => state?.user?.studentsDetails);

  const getDetails = () => {
    console.log('14::', token, user._id);

    axios({
      url: `http://localhost:3000/admin/student/${user._id}`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      dispatch(getStudentDetails(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <main className="main-container">
      <div class="student-profile py-4">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4}>
            <div class="card-shadow profile">
              <div class="card-header bg-transparent text-center">
                <img class="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp" />
                <h3>{student?.name}</h3>
              </div>
              <div class="card-body text-center">
                <h3 class="mb-0"><strong class="pr-1">{student?.rollnumber}</strong></h3>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div class="card-shadow">
              <div class="card-header bg-transparent border-0">
                <h3 class="mb-0"><ImProfile className="pr-2" />Student Information</h3>
              </div>
              <div class="card-body pt-0">
                <table class="table table-bordered">
                  <tr>
                    <th width="30%">Academic Year	</th>
                    <td width="2%">:</td>
                    <td>{student?.year}-{student?.semister}</td>
                  </tr>
                  <tr>
                    <th width="30%">Gender</th>
                    <td width="2%">:</td>
                    <td>{student?.gender}</td>
                  </tr>
                  <tr>
                    <th width="30%">Phone</th>
                    <td width="2%">:</td>
                    <td>{student?.phone}</td>
                  </tr>
                  <tr>
                    <th width="30%">E-mail</th>
                    <td width="2%">:</td>
                    <td>{student?.email}</td>
                  </tr>
                </table>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default HomeStudent;
