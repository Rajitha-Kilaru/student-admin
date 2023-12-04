import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./index.css";
import axios from "../../../api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentTable from "./StudentTable";

const now = new Date();
function getSemester() {
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 8 && currentMonth <= 11) return "Fall";
  if (currentMonth >= 0 && currentMonth <= 2) return "Winter";
  if (currentMonth >= 3 && currentMonth <= 5) return "Spring";
  if (currentMonth >= 6 && currentMonth <= 7) return "Summer";
}
const defGrad = new Date();
defGrad.setFullYear(defGrad.getFullYear() + 2);
defGrad.setMonth(4);
defGrad.setDate(20);

const def = {
  user: {
    name: "",
    email: "",
  },
  semester: {
    joined: getSemester(),
    joiningYear: now.getFullYear(),
    current: getSemester(),
    currentYear: now.getFullYear(),
  },
  graduationStatus: "In Progress",
  graduationDate: defGrad.toISOString(),
  joiningDate: now.toISOString(),
  subject: "",
};

const Students = () => {
  const user = useSelector((state) => state?.user?.data.user);
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [studentData, setStudentData] = useState(def);
  const [editId, setEditId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentFilterData, setStudentFilterData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if(students.length > 0){
      setStudentFilterData([...students])
    }
  },[students])

  useEffect(() => {
    if(studentName || selectedSemester){
      let filterData = []
      if(studentName && selectedSemester){
        filterData = students.filter((item) => item.semester.current === selectedSemester && item.user.name.toLowerCase().includes(studentName.toLowerCase()))
      }else if(studentName){
        filterData = students.filter((item) => item.user.name.toLowerCase().includes(studentName.toLowerCase()))
      } else if(selectedSemester){
        filterData = students.filter((item) => item.semester.current === selectedSemester)
      }
      setStudentFilterData([...filterData])
    }else{
      setStudentFilterData([...students])
    }
  },[selectedSemester, studentName])

  const fetchStudents = () => {
    axios.get("/admin/students").then((res) => {
      setStudents(res.data);
    });
  };

  const handleAddStudent = () => {
    debugger;
    axios.post("/admin/student", studentData).then(() => {
      fetchStudents();
      setStudentData(def);
      setOpenModal(false);
    });
  };

  const handleEditStudent = (id) => {
    setEditId(id);
    const student = studentFilterData.find((s) => s.user._id === id);
    setStudentData(student);
    setOpenModal(true);
  };

  const handleUpdateStudent = () => {
    axios.put(`/admin/student/${editId}`, studentData).then(() => {
      fetchStudents();
      setStudentData(def);
      setOpenModal(false);
      setEditId(null);
    });
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`/admin/student/${id}`).then(() => {
      fetchStudents();
    });
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 className="main-text">STUDENTS</h3>
        {user?.role === "admin" && (
          <div className="student-filters">
            <TextField
              label="Search student name"
              value={studentName}
              onChange={(e) =>
                setStudentName(e.target.value)
              }
            />
            <FormControl
            >
              <InputLabel id="test-select-label">Filter current semester</InputLabel>
              <Select
                value={selectedSemester}
                label="Filter current semester"
                onChange={(e) =>
                  setSelectedSemester(e.target.value)
                }
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Fall">Fall</MenuItem>
                <MenuItem value="Winter">Winter</MenuItem>
                <MenuItem value="Summer">Summer</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={() => setOpenModal(true)}>Add Student</Button>
          </div>
        )}
      </div>
      <StudentTable
        students={studentFilterData}
        handleEditStudent={handleEditStudent}
        handleDeleteStudent={handleDeleteStudent}
      />
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{editId ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent>
          {console.log("110::", studentData)}
          <TextField
            label="Name"
            value={studentData?.user?.name}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                user: { ...studentData.user, name: e.target.value },
              })
            }
            fullWidth
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />
          <TextField
            label="Email"
            value={studentData?.user?.email}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                user: { ...studentData.user, email: e.target.value },
              })
            }
            fullWidth
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />
          {/* {!editId && (
            <TextField
              label="Password"
              type="password"
              value={studentData?.user?.password}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  user: { ...studentData.user, password: e.target.value },
                })
              }
              fullWidth
              style={{
                marginBottom: "4px",
                marginTop: "4px",
              }}
            />
          )} */}
          <TextField
            label="Joining Date"
            type="date"
            value={
              studentData?.joiningDate
                ? new Date(studentData.joiningDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setStudentData({ ...studentData, joiningDate: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />
          <FormControl
            fullWidth
            style={{ marginBottom: "4px", marginTop: "4px" }}
          >
            <InputLabel>Subject</InputLabel>
            <Select
              value={studentData?.subject}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  subject: e.target.value,
                })
              }
            >
              <MenuItem value="MSCS">MSCS</MenuItem>
              <MenuItem value="MSIS">MSIS</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            style={{ marginBottom: "4px", marginTop: "4px" }}
          >
            <InputLabel>Joined Semester</InputLabel>
            <Select
              value={studentData?.semester?.joined}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  semester: { ...studentData.semester, joined: e.target.value },
                })
              }
            >
              <MenuItem value="Fall">Fall</MenuItem>
              <MenuItem value="Winter">Winter</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Joining Year"
            type="number"
            value={studentData?.semester?.joiningYear}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                semester: {
                  ...studentData.semester,
                  joiningYear: e.target.value,
                },
              })
            }
            fullWidth
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />
          <FormControl
            fullWidth
            style={{ marginBottom: "4px", marginTop: "4px" }}
          >
            <InputLabel>Current Semester</InputLabel>
            <Select
              value={studentData?.semester?.current}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  semester: {
                    ...studentData.semester,
                    current: e.target.value,
                  },
                })
              }
            >
              <MenuItem value="Fall">Fall</MenuItem>
              <MenuItem value="Winter">Winter</MenuItem>
              <MenuItem value="Spring">Spring</MenuItem>
              <MenuItem value="Summer">Summer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Current Year"
            type="number"
            value={studentData?.semester?.currentYear}
            onChange={(e) =>
              setStudentData({
                ...studentData,
                semester: {
                  ...studentData.semester,
                  currentYear: e.target.value,
                },
              })
            }
            fullWidth
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />

          <TextField
            label="Graduation Date"
            type="date"
            value={
              studentData?.graduationDate
                ? new Date(studentData.graduationDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={(e) =>
              setStudentData({ ...studentData, graduationDate: e.target.value })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
          />

          <FormControl
            fullWidth
            style={{ marginBottom: "4px", marginTop: "4px" }}
          >
            <InputLabel>Graduation Status</InputLabel>
            <Select
              value={studentData?.graduationStatus}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  graduationStatus: e.target.value,
                })
              }
            >
              <MenuItem value="Graduated">Graduated</MenuItem>
              <MenuItem value="Not Graduated">Not Graduated</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              marginBottom: "4px",
              marginTop: "4px",
            }}
            onClick={() => setOpenModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={editId ? handleUpdateStudent : handleAddStudent}
            color="primary"
          >
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <div className="icon-container"></div>
    </main>
  );
};

export default Students;
