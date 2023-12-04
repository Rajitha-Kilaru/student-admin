import { Table } from "antd";
import { Button } from "@mui/material";
import { notification, Space } from "antd";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StudentTable = ({ students, handleEditStudent, handleDeleteStudent }) => {
  const openNotification = (id) => {
    console.log("8::", id);
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => notification.destroy()}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            handleDeleteStudent(id)
            notification.destroy()
        }}
        >
          Confirm
        </Button>
      </Space>
    );
    notification.warning({
      message: "Confirmation",
      duration: 0,
      icon: <DeleteForeverIcon />,
      description: "Are you sure you want to delete student",
      key,
      btn,
    });
  };
  const columns = [
    {
      title: "CWID",
      dataIndex: "cwid",
      key: "cwid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Joined Semester",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Joining Year",
      dataIndex: "joiningYear",
      key: "joiningYear",
    },
    {
      title: "Current Semester",
      dataIndex: "current",
      key: "current",
    },
    {
      title: "Current Year",
      dataIndex: "currentYear",
      key: "currentYear",
    },
    {
      title: "Graduation Date",
      dataIndex: "graduationDate",
      key: "graduationDate",
    },
    {
      title: "Graduation Status",
      dataIndex: "graduationStatus",
      key: "graduationStatus",
    },
    {
      title: "Actions",
      key: "action",
      width: 200,
      render: (text, record) => (
        <span className="student-actions">
          <Button onClick={() => handleEditStudent(text.id)}>Edit</Button>
          {/* <Button onClick={() => handleDeleteStudent(text.id)}>Delete</Button> */}
          <Button onClick={() => openNotification(text.id)}>Delete</Button>
        </span>
      ),
    },
  ];
  console.log("83::", students);
  const getStudentTableData = () => {
    if (students.length > 0) {
      return students.reduce((acc, cur) => {
        if (cur) {
          acc.push({
            cwid: cur.cwid,
            name: cur.user.name,
            email: cur.user.email,
            joiningDate: new Date(cur.joiningDate).toISOString().split("T")[0],
            subject: cur.subject,
            joined: cur.semester.joined,
            joiningYear: cur.semester.joiningYear,
            current: cur.semester.current,
            currentYear: cur.semester.currentYear,
            graduationDate: new Date(cur.graduationDate)
              .toISOString()
              .split("T")[0],
            graduationStatus: cur.graduationStatus,
            id: cur.user._id,
          });
        }
        return acc;
      }, []);
    } else {
      return [];
    }
  };

  return (
    <div className="student-table">
      <Table
        bordered={true}
        pagination={true}
        showHeader
        scroll={{ y: 600 }}
        columns={columns}
        dataSource={getStudentTableData()}
      />
    </div>
  );
};

export default StudentTable;
