import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BsBellFill } from "react-icons/bs";
import "../../styles/home.css";
import { Button } from "antd";
import { Badge, Popover } from "@mui/material";
import axios from "../../api";

const NotificationDropDown = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getDetails = () => {
    axios
      .get("/student")
      .then((res) => {
        setNotifications(res?.data?.announcements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setDetails = () => {
    axios
      .put("/student/notifications")
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (open) {
      setDetails();
      getDetails();
    }
  }, [open]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? "simple-popover" : undefined;
  console.log("32::", notifications);

  const getCount = () => {
    if(notifications.length > 0){
       const count = notifications.filter((item) => !item.read)
       return count?.length > 0 ? count.length : 0
    }
    return 0
  }

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="notification-btn"
      >
        <Badge badgeContent={getCount()} color="primary">
          <BsBellFill />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="notification-dropdown"
      >
        {notifications && notifications?.length !== 0 ? (
          <h4 className="notification-header">
            Notifications ({notifications?.length})
          </h4>
        ) : (
          <h4 className="notification-header">Notifications </h4>
        )}

        <div className="menu-scroll">
          {notifications && notifications?.length !== 0 ? (
            <InfiniteScroll
              dataLength={notifications?.length}
              height={300}
              next={[]}
              hasMore={notifications?.length <= notificationsCount}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div>
                {notifications?.length &&
                  notifications.map((item, ind) => {
                    return (
                      <div
                        className="notification-layout d-flex"
                        key={`${item._id}-${ind}`}
                      >
                        <div className="notification-message">
                          <div>
                            <p className="title">{item.title}</p>
                            <p className="messege">
                              {item.description.length < 30
                                ? item.description
                                : `:  ${item.description.slice(0, 30)}...`}
                            </p>
                          </div>
                        </div>

                        <hr></hr>
                      </div>
                    );
                  })}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="menu-scroll nodata">
              {" "}
              No Notifications available{" "}
            </div>
          )}
        </div>
      </Popover>
    </>
  );
};

export default NotificationDropDown;
