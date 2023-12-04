import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  TextField,
} from "@mui/material";
import axios from "../api";
import { useSelector } from "react-redux";

const Announcements = () => {
  const user = useSelector((state) => state.user.data.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);

  const fetchCourses = () => {
    axios.get(`/${user.role}/courses`).then((res) => {
      res.data.forEach((_) => {
        _.studentDetails = JSON.parse(JSON.stringify(_.students));
        _.students = _.students?.map((s) => s._id);
      });
      setCourses(res.data);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  console.log("45::", courses);

  const handleSubmit = async () => {
    if (title && description && subject) {
      const payload = {
        title,
        description,
        course: subject._id,
      };
      axios.post("/admin/announcement", payload).then(() => {
        setTitle("");
        setDescription("");
        setSubject("");
        const key = `open${Date.now()}-s`;
        notification.success({
          message: "Success",
          description: "Announcement Submitted Successfully",
          key,
          duration: 4,
          icon: <CheckCircleOutlined className="success" />,
        });
      });
    } else {
      const key = `open${Date.now()}`;
      notification.error({
        message: "Submit failed",
        description: "Please Fill Required Felids",
        key,
        duration: 4,
      });
    }
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <h1 className="main-text">Announcements</h1>
      </div>
      <div className="teacher-info">
        <FormControl style={{ minWidth: 240, marginRight: 16 }}>
          <TextField
            label="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl style={{ minWidth: 240, marginRight: 16 }}>
          <TextField
            label="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl style={{ minWidth: 240, marginRight: 16 }}>
          <InputLabel id="subject-select-label">Courses</InputLabel>
          <Select
            labelId="subject-select-label"
            id="subject-select"
            required
            value={subject}
            label="Subject"
            onChange={(event) => setSubject(event.target.value)}
          >
            {courses?.map((course) => (
              <MenuItem value={course}>{course.courseName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          style={{ height: 56, width: 120 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </main>
  );
};

export default Announcements;
